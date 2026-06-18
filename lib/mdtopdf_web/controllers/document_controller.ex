defmodule MdtopdfWeb.DocumentController do
  use MdtopdfWeb, :controller

  alias Mdtopdf.Documents

  def download(conn, %{"id" => id}) do
    document = Documents.get_document!(id)

    if document.pdf_binary do
      pdf_filename = Path.rootname(document.filename) <> ".pdf"

      conn
      |> put_resp_content_type("application/pdf")
      |> put_resp_header("content-disposition", "attachment; filename=\"#{pdf_filename}\"")
      |> send_resp(200, document.pdf_binary)
    else
      conn
      |> put_flash(:error, "No PDF has been generated yet.")
      |> redirect(to: ~p"/documents/#{document.id}")
    end
  end
end
