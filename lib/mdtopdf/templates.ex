defmodule Mdtopdf.Templates do
  @moduledoc false

  @templates [
    %{
      key: "default",
      name: "Default Document",
      description: "Clean A4 layout for general Markdown documents.",
      template_file: "default.typ.eex",
      demo_file: nil,
      has_photo: false
    },
    %{
      key: "cv_german",
      name: "German CV (Lebenslauf)",
      description: "Standard German Lebenslauf with photo, EU-format sections.",
      template_file: "cv_german.typ.eex",
      demo_file: "cv_german.md",
      has_photo: true
    }
  ]

  def list_templates, do: @templates

  def get_template!(key) do
    Enum.find(@templates, fn t -> t.key == key end) ||
      raise "Template not found: #{key}"
  end

  def has_photo?(key) do
    get_template!(key).has_photo
  end

  def demo_content(key) do
    entry = get_template!(key)

    case entry.demo_file do
      nil -> ""
      file -> load_file(file)
    end
  end

  def template_path(key) do
    entry = get_template!(key)
    Path.join(template_dir(), entry.template_file)
  end

  defp template_dir do
    Application.app_dir(:mdtopdf, "priv/typst_templates")
  end

  defp load_file(filename) do
    path = Path.join(template_dir(), filename)

    case File.read(path) do
      {:ok, content} -> content
      {:error, _} -> ""
    end
  end
end
