defmodule Mdtopdf.Images do
  import Ecto.Query
  alias Mdtopdf.Repo
  alias Mdtopdf.Images.Image

  def get_image!(id) do
    Repo.get!(Image, id)
  end

  def create_image(attrs) do
    %Image{}
    |> Image.changeset(attrs)
    |> Repo.insert()
  end

  def list_by_ids(ids) when is_list(ids) do
    Image
    |> where([i], i.id in ^ids)
    |> Repo.all()
  end
end
