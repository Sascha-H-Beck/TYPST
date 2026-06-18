defmodule Mdtopdf.Repo.Migrations.CreateDocuments do
  use Ecto.Migration

  def change do
    create table(:documents, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :filename, :string, null: false
      add :md_content, :text, null: false, default: ""
      add :pdf_binary, :binary
      add :status, :string, null: false, default: "uploaded"

      timestamps(type: :utc_datetime)
    end
  end
end
