defmodule Mdtopdf.Documents.Document do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "documents" do
    field :filename, :string
    field :md_content, :string, default: ""
    field :pdf_binary, :binary
    field :status, :string, default: "uploaded"
    field :template, :string, default: "default"
    field :photo_binary, :binary
    field :photo_content_type, :string

    timestamps(type: :utc_datetime)
  end

  def changeset(document, attrs) do
    document
    |> cast(attrs, [:filename, :md_content, :status, :template])
    |> validate_required([:filename, :md_content])
    |> validate_inclusion(:status, ["uploaded", "converted"])
  end

  def pdf_changeset(document, attrs) do
    document
    |> cast(attrs, [:pdf_binary, :status])
    |> validate_required([:pdf_binary, :status])
  end

  def photo_changeset(document, attrs) do
    document
    |> cast(attrs, [:photo_binary, :photo_content_type])
    |> validate_required([:photo_binary, :photo_content_type])
  end
end
