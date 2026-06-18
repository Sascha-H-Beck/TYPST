defmodule MdtopdfWeb.ImageController do
  use MdtopdfWeb, :controller

  alias Mdtopdf.Images

  def show(conn, %{"id" => id}) do
    image = Images.get_image!(id)

    conn
    |> put_resp_content_type(image.content_type)
    |> put_resp_header("cache-control", "public, max-age=31536000, immutable")
    |> send_resp(200, image.data)
  end
end
