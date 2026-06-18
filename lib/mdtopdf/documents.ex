defmodule Mdtopdf.Documents do
  import Ecto.Query
  alias Mdtopdf.Repo
  alias Mdtopdf.Documents.Document

  def list_documents do
    Document
    |> select([d], %{
      id: d.id,
      filename: d.filename,
      status: d.status,
      template: d.template,
      inserted_at: d.inserted_at,
      updated_at: d.updated_at
    })
    |> order_by([d], desc: d.inserted_at)
    |> Repo.all()
  end

  def get_document!(id) do
    Repo.get!(Document, id)
  end

  def create_document(attrs) do
    %Document{}
    |> Document.changeset(attrs)
    |> Repo.insert()
  end

  def update_document(%Document{} = document, attrs) do
    document
    |> Document.changeset(Map.merge(attrs, %{status: "uploaded", pdf_binary: nil}))
    |> Ecto.Changeset.put_change(:pdf_binary, nil)
    |> Repo.update()
  end

  def store_pdf(%Document{} = document, pdf_binary) do
    document
    |> Document.pdf_changeset(%{pdf_binary: pdf_binary, status: "converted"})
    |> Repo.update()
  end

  def update_photo(%Document{} = document, photo_binary, content_type) do
    document
    |> Document.photo_changeset(%{photo_binary: photo_binary, photo_content_type: content_type})
    |> Repo.update()
  end

  def delete_document(%Document{} = document) do
    Repo.delete(document)
  end
end
