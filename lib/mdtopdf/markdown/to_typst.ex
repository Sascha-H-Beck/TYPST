defmodule Mdtopdf.Markdown.ToTypst do
  @moduledoc false

  @typst_special_chars ~r/([#\*_`@<>\$\\])/
  @local_image_pattern ~r{^/images/([0-9a-f-]+)$}
  @md_image_pattern ~r{!\[[^\]]*\]\(/images/([0-9a-f-]+)\)}

  def extract_image_ids(markdown) when is_binary(markdown) do
    @md_image_pattern
    |> Regex.scan(markdown)
    |> Enum.map(fn [_, id] -> id end)
    |> Enum.uniq()
  end

  # Earmark.Parser.as_ast/1 has an incorrect typespec (returns binary() in spec
  # but actually returns a list at runtime). Suppress the resulting Dialyzer cascade.
  @dialyzer :no_return
  def convert(markdown, image_assets \\ %{})

  def convert(markdown, image_assets) when is_binary(markdown) do
    case Earmark.Parser.as_ast(markdown) do
      {:ok, ast, _} ->
        ast
        |> transform_nodes(0, image_assets)
        |> String.trim_trailing()

      {:error, _, _} ->
        ""
    end
  end

  # Walks a list of AST nodes and joins their output
  defp transform_nodes(nodes, depth, image_assets) when is_list(nodes) do
    nodes
    |> Enum.map(&transform_node(&1, depth, image_assets))
    |> Enum.join()
  end

  # Text node — escape Typst-special characters
  defp transform_node(text, _depth, _image_assets) when is_binary(text) do
    escape_typst(text)
  end

  # Headings
  defp transform_node({"h1", _, children, _}, _depth, _ia), do: heading(1, children)
  defp transform_node({"h2", _, children, _}, _depth, _ia), do: heading(2, children)
  defp transform_node({"h3", _, children, _}, _depth, _ia), do: heading(3, children)
  defp transform_node({"h4", _, children, _}, _depth, _ia), do: heading(4, children)
  defp transform_node({"h5", _, children, _}, _depth, _ia), do: heading(5, children)
  defp transform_node({"h6", _, children, _}, _depth, _ia), do: heading(6, children)

  # Paragraph
  defp transform_node({"p", _, children, _}, _depth, _ia) do
    content = transform_inline(children)
    "#{content}\n\n"
  end

  # Bold
  defp transform_node({"strong", _, children, _}, _depth, _ia) do
    "*#{transform_inline(children)}*"
  end

  # Italic
  defp transform_node({"em", _, children, _}, _depth, _ia) do
    "_#{transform_inline(children)}_"
  end

  # Inline code
  defp transform_node({"code", _, [text], _}, _depth, _ia) when is_binary(text) do
    "`#{text}`"
  end

  defp transform_node({"code", _, children, _}, _depth, _ia) do
    "`#{raw_text(children)}`"
  end

  # Code block: pre > code
  defp transform_node({"pre", _, [{"code", attrs, [code], _}], _}, _depth, _ia) do
    lang = extract_language(attrs)
    lang_suffix = if lang, do: lang, else: ""
    "```#{lang_suffix}\n#{code}\n```\n\n"
  end

  defp transform_node({"pre", _, children, _}, _depth, _ia) do
    "```\n#{raw_text(children)}\n```\n\n"
  end

  # Unordered list
  defp transform_node({"ul", _, items, _}, depth, ia) do
    result =
      items
      |> Enum.map(fn {"li", _, children, _} -> list_item("- ", children, depth, ia) end)
      |> Enum.join()

    if depth == 0, do: result <> "\n", else: result
  end

  # Ordered list
  defp transform_node({"ol", _, items, _}, depth, ia) do
    result =
      items
      |> Enum.map(fn {"li", _, children, _} -> list_item("+ ", children, depth, ia) end)
      |> Enum.join()

    if depth == 0, do: result <> "\n", else: result
  end

  # Blockquote
  defp transform_node({"blockquote", _, children, _}, depth, ia) do
    content =
      children
      |> transform_nodes(depth, ia)
      |> String.trim()

    "#quote(block: true)[#{content}]\n\n"
  end

  # Link
  defp transform_node({"a", attrs, children, _}, _depth, _ia) do
    href = get_attr(attrs, "href", "#")
    "#link(\"#{href}\")[#{transform_inline(children)}]"
  end

  # Image — with local asset support
  defp transform_node({"img", attrs, _, _}, _depth, image_assets) do
    src = get_attr(attrs, "src", "")
    render_image(src, image_assets)
  end

  # Horizontal rule
  defp transform_node({"hr", _, _, _}, _depth, _ia), do: "#line(length: 100%)\n\n"

  # Line break
  defp transform_node({"br", _, _, _}, _depth, _ia), do: "\\\n"

  # Strikethrough
  defp transform_node({"del", _, children, _}, _depth, _ia) do
    "#strike[#{transform_inline(children)}]"
  end

  # Table
  defp transform_node({"table", _, children, _}, _depth, _ia) do
    {headers, rows} = extract_table_data(children)
    col_count = length(headers)

    header_cells =
      headers
      |> Enum.map(fn text -> "[*#{text}*]" end)
      |> Enum.join(", ")

    body_cells =
      rows
      |> Enum.map(fn row ->
        row
        |> Enum.map(fn text -> "[#{text}]" end)
        |> Enum.join(", ")
      end)
      |> Enum.join(",\n  ")

    separator = if body_cells != "", do: ",\n  ", else: ""

    "#table(\n  columns: #{col_count},\n  #{header_cells}#{separator}#{body_cells},\n)\n\n"
  end

  # Catch-all: process children of unknown tags
  defp transform_node({_tag, _, children, _}, depth, ia) do
    transform_nodes(children, depth, ia)
  end

  # --- Helpers ---

  defp heading(level, children) do
    prefix = String.duplicate("=", level)
    "#{prefix} #{transform_inline(children)}\n"
  end

  # Converts a local /images/:id URL to a Typst #image(read(...)) call
  defp render_image(src, image_assets) do
    case Regex.run(@local_image_pattern, src) do
      [_, id] ->
        asset_name = "img_#{id}"

        if Map.has_key?(image_assets, asset_name) do
          "#image(read(\"#{asset_name}\", encoding: none))\n\n"
        else
          "/* image not found: #{src} */\n\n"
        end

      nil ->
        "/* external image: #{src} */\n\n"
    end
  end

  # Inline content processing (no paragraph breaks)
  defp transform_inline(children) when is_list(children) do
    Enum.map(children, &transform_inline_node/1) |> Enum.join()
  end

  defp transform_inline_node(text) when is_binary(text), do: escape_typst(text)
  defp transform_inline_node({"strong", _, children, _}), do: "*#{transform_inline(children)}*"
  defp transform_inline_node({"em", _, children, _}), do: "_#{transform_inline(children)}_"
  defp transform_inline_node({"del", _, children, _}), do: "#strike[#{transform_inline(children)}]"
  defp transform_inline_node({"br", _, _, _}), do: "\\\n"

  defp transform_inline_node({"code", _, [text], _}) when is_binary(text), do: "`#{text}`"
  defp transform_inline_node({"code", _, children, _}), do: "`#{raw_text(children)}`"

  defp transform_inline_node({"a", attrs, children, _}) do
    href = get_attr(attrs, "href", "#")
    "#link(\"#{href}\")[#{transform_inline(children)}]"
  end

  defp transform_inline_node({"img", attrs, _, _}) do
    escape_typst(get_attr(attrs, "alt", "image"))
  end

  defp transform_inline_node({_tag, _, children, _}), do: transform_inline(children)

  defp list_item(marker, children, depth, image_assets) do
    indent = String.duplicate("  ", depth)

    {inline, nested} =
      Enum.split_with(children, fn
        {"ul", _, _, _} -> false
        {"ol", _, _, _} -> false
        _ -> true
      end)

    content = transform_inline(inline) |> String.trim()
    nested_output = transform_nodes(nested, depth + 1, image_assets)

    "#{indent}#{marker}#{content}\n#{nested_output}"
  end

  defp extract_language(attrs) do
    case get_attr(attrs, "class", nil) do
      nil -> nil
      class -> class |> String.replace(~r/^(lang-|language-)/, "")
    end
  end

  defp extract_table_data(children) do
    thead =
      Enum.find_value(children, [], fn
        {"thead", _, rows, _} -> rows
        _ -> nil
      end)

    tbody =
      Enum.find_value(children, [], fn
        {"tbody", _, rows, _} -> rows
        _ -> nil
      end)

    headers =
      case thead do
        [{"tr", _, cells, _} | _] ->
          Enum.map(cells, fn {_, _, children, _} -> transform_inline(children) |> String.trim() end)

        _ ->
          []
      end

    rows =
      Enum.map(tbody, fn
        {"tr", _, cells, _} ->
          Enum.map(cells, fn {_, _, children, _} -> transform_inline(children) |> String.trim() end)
      end)

    {headers, rows}
  end

  defp get_attr(attrs, key, default) do
    case List.keyfind(attrs, key, 0) do
      {^key, value} -> value
      _ -> default
    end
  end

  defp raw_text(children) when is_list(children) do
    Enum.map(children, fn
      text when is_binary(text) -> text
      {_, _, c, _} -> raw_text(c)
    end)
    |> Enum.join()
  end

  defp escape_typst(text) do
    Regex.replace(@typst_special_chars, text, "\\\\\\1")
  end
end
