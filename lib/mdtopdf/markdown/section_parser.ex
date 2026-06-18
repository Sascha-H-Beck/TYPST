defmodule Mdtopdf.Markdown.SectionParser do
  @moduledoc false

  alias Mdtopdf.Markdown.ToTypst

  @section_mapping %{
    "persönliche daten" => :personal_data,
    "personliche daten" => :personal_data,
    "berufserfahrung" => :work_experience,
    "ausbildung" => :education,
    "weiterbildungen" => :further_training,
    "kenntnisse" => :skills,
    "interessen" => :interests
  }

  @all_section_keys [:personal_data, :work_experience, :education, :further_training, :skills, :interests]

  def parse_sections(markdown, image_assets \\ %{}) when is_binary(markdown) do
    sections = split_by_headings(markdown)

    mapped =
      Enum.reduce(sections, %{}, fn {heading, content}, acc ->
        key = normalize_heading(heading)

        case Map.get(@section_mapping, key) do
          nil -> Map.update(acc, :extra, content, &(&1 <> "\n\n" <> content))
          section_key -> Map.put(acc, section_key, content)
        end
      end)

    @all_section_keys
    |> Enum.map(fn key ->
      raw_md = Map.get(mapped, key, "")
      typst = if raw_md == "", do: "", else: ToTypst.convert(raw_md, image_assets)
      {key, typst}
    end)
    |> Map.new()
    |> Map.put(:extra, ToTypst.convert(Map.get(mapped, :extra, ""), image_assets))
  end

  # Splits markdown into {heading, content} tuples by ## headings.
  # Content before the first ## heading is assigned heading "".
  defp split_by_headings(markdown) do
    lines = String.split(markdown, "\n")

    {sections, current_heading, current_lines} =
      Enum.reduce(lines, {[], "", []}, fn line, {sections, heading, lines} ->
        case Regex.run(~r/^##\s+(.+)$/, String.trim(line)) do
          [_, new_heading] ->
            updated =
              if heading != "" or lines != [] do
                [{heading, Enum.reverse(lines) |> Enum.join("\n") |> String.trim()} | sections]
              else
                sections
              end

            {updated, new_heading, []}

          nil ->
            {sections, heading, [line | lines]}
        end
      end)

    final =
      if current_heading != "" or current_lines != [] do
        [{current_heading, Enum.reverse(current_lines) |> Enum.join("\n") |> String.trim()} | sections]
      else
        sections
      end

    Enum.reverse(final)
    |> Enum.reject(fn {_, content} -> content == "" end)
  end

  defp normalize_heading(heading) do
    heading
    |> String.downcase()
    |> String.trim()
  end
end
