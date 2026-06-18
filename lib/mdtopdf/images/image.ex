defmodule Mdtopdf.Images.Image do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  schema "images" do
    field :filename, :string
    field :content_type, :string
    field :data, :binary

    belongs_to :document, Mdtopdf.Documents.Document

    timestamps(type: :utc_datetime)
  end

  def changeset(image, attrs) do
    image
    |> cast(attrs, [:document_id, :filename, :content_type, :data])
    |> validate_required([:document_id, :filename, :content_type, :data])
    |> foreign_key_constraint(:document_id)
  end
end
