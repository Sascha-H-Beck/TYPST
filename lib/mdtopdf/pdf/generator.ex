defmodule Mdtopdf.Pdf.Generator do
  @moduledoc false

  alias Mdtopdf.Documents.Document
  alias Mdtopdf.Images
  alias Mdtopdf.Markdown.SectionParser
  alias Mdtopdf.Markdown.ToTypst
  alias Mdtopdf.Templates

  def generate_pdf(%Document{} = doc) do
    case doc.template do
      "cv_german" -> render_cv(doc, :pdf)
      _ -> render_default(doc, :pdf)
    end
  end

  def generate_preview_svgs(%Document{} = doc) do
    case doc.template do
      "cv_german" -> render_cv(doc, :svg)
      _ -> render_default(doc, :svg)
    end
  end

  # -- Default pipeline (generic markdown) --

  defp render_default(%Document{md_content: md_content}, format) do
    {image_assets, assets_list} = load_image_assets(md_content)
    typst_markup = ToTypst.convert(md_content, image_assets)

    with {:ok, template} <- load_template("default") do
      render(template, [content: typst_markup], assets_list, format)
    end
  end

  # -- CV pipeline (section-aware) --

  defp render_cv(%Document{} = doc, format) do
    {image_assets, assets_list} = load_image_assets(doc.md_content)
    sections = SectionParser.parse_sections(doc.md_content, image_assets)

    {photo_markup, photo_assets} = build_photo(doc)
    all_assets = assets_list ++ photo_assets

    bindings = [
      photo_markup: photo_markup,
      personal_data: Map.get(sections, :personal_data, ""),
      work_experience: Map.get(sections, :work_experience, ""),
      education: Map.get(sections, :education, ""),
      further_training: Map.get(sections, :further_training, ""),
      skills: Map.get(sections, :skills, ""),
      interests: Map.get(sections, :interests, ""),
      extra: Map.get(sections, :extra, "")
    ]

    with {:ok, template} <- load_template("cv_german") do
      render(template, bindings, all_assets, format)
    end
  end

  defp build_photo(%Document{photo_binary: nil}), do: {"", []}

  defp build_photo(%Document{photo_binary: photo_binary}) when is_binary(photo_binary) do
    markup = "#image(read(\"cv_photo\", encoding: none), width: 3.5cm)"
    assets = [{"cv_photo", photo_binary}]
    {markup, assets}
  end

  # -- Shared rendering --

  defp render(template, bindings, assets, :pdf) do
    Typst.render_to_pdf(template, bindings, trim: true, assets: assets)
  end

  defp render(template, bindings, assets, :svg) do
    Typst.render_to_svg(template, bindings, trim: true, assets: assets)
  end

  # -- Helpers --

  defp load_image_assets(md_content) do
    image_ids = ToTypst.extract_image_ids(md_content)

    if image_ids == [] do
      {%{}, []}
    else
      images = Images.list_by_ids(image_ids)

      image_assets =
        images
        |> Enum.map(fn img -> {"img_#{img.id}", true} end)
        |> Map.new()

      assets_list =
        images
        |> Enum.map(fn img -> {"img_#{img.id}", img.data} end)

      {image_assets, assets_list}
    end
  end

  defp load_template(key) do
    path = Templates.template_path(key)

    case File.read(path) do
      {:ok, template} -> {:ok, template}
      {:error, reason} -> {:error, "Failed to load template: #{inspect(reason)}"}
    end
  end
end
