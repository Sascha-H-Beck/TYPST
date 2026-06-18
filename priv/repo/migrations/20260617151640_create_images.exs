defmodule Mdtopdf.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:images, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :document_id, references(:documents, type: :binary_id, on_delete: :delete_all), null: false
      add :filename, :string, null: false
      add :content_type, :string, null: false
      add :data, :binary, null: false

      timestamps(type: :utc_datetime)
    end

    create index(:images, [:document_id])
  end
end
