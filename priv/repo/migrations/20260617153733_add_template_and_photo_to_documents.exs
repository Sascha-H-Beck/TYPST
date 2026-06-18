defmodule Mdtopdf.Repo.Migrations.AddTemplateAndPhotoToDocuments do
  use Ecto.Migration

  def change do
    alter table(:documents) do
      add :template, :string, null: false, default: "default"
      add :photo_binary, :binary
      add :photo_content_type, :string
    end
  end
end
