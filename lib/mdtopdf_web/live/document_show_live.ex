defmodule MdtopdfWeb.DocumentShowLive do
  use MdtopdfWeb, :live_view

  import Leaf, only: [leaf_editor: 1]

  alias Mdtopdf.Documents
  alias Mdtopdf.Images
  alias Mdtopdf.Pdf.Generator
  alias Mdtopdf.Templates

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    document = Documents.get_document!(id)
    has_photo = Templates.has_photo?(document.template)
    md_preview_html = render_md_preview(document.md_content)
    pdf_preview_svgs = generate_svgs(document)

    {:ok,
     socket
     |> assign(:document, document)
     |> assign(:has_photo, has_photo)
     |> assign(:editor_content, document.md_content)
     |> assign(:saved_content, document.md_content)
     |> assign(:dirty, false)
     |> assign(:md_preview_html, md_preview_html)
     |> assign(:pdf_preview_svgs, pdf_preview_svgs)
     |> assign(:active_tab, :md)
     |> assign(:pdf_generating, false)
     |> assign(:current_page, 0)
     |> assign(:show_image_upload, false)
     |> assign(:show_photo_upload, false)
     |> allow_upload(:image,
       accept: ~w(.png .jpg .jpeg),
       max_entries: 1,
       max_file_size: 5_000_000
     )
     |> allow_upload(:photo,
       accept: ~w(.png .jpg .jpeg),
       max_entries: 1,
       max_file_size: 5_000_000
     )}
  end

  # --- handle_info callbacks ---

  @impl true
  def handle_info({:leaf_changed, %{markdown: markdown}}, socket) do
    dirty = markdown != socket.assigns.saved_content
    md_preview_html = render_md_preview(markdown)

    {:noreply,
     socket
     |> assign(:editor_content, markdown)
     |> assign(:dirty, dirty)
     |> assign(:md_preview_html, md_preview_html)}
  end

  def handle_info({:leaf_insert_request, %{type: :image}}, socket) do
    {:noreply, assign(socket, :show_image_upload, true)}
  end

  def handle_info({:leaf_insert_request, _}, socket), do: {:noreply, socket}
  def handle_info({:leaf_mode_changed, _}, socket), do: {:noreply, socket}
  def handle_info({:leaf_focus, _}, socket), do: {:noreply, socket}
  def handle_info({:leaf_blur, _}, socket), do: {:noreply, socket}

  # --- handle_event callbacks ---

  @impl true
  def handle_event("save", _params, socket) do
    content = socket.assigns.editor_content

    case Documents.update_document(socket.assigns.document, %{md_content: content}) do
      {:ok, document} ->
        pdf_preview_svgs = generate_svgs(document)

        {:noreply,
         socket
         |> assign(:document, document)
         |> assign(:saved_content, content)
         |> assign(:dirty, false)
         |> assign(:pdf_preview_svgs, pdf_preview_svgs)
         |> assign(:current_page, 0)
         |> put_flash(:info, "Saved.")}

      {:error, _changeset} ->
        {:noreply, put_flash(socket, :error, "Failed to save.")}
    end
  end

  def handle_event("generate-pdf", _params, socket) do
    socket = assign(socket, :pdf_generating, true)
    document = socket.assigns.document

    case Generator.generate_pdf(document) do
      {:ok, pdf_binary} ->
        {:ok, document} = Documents.store_pdf(document, pdf_binary)

        {:noreply,
         socket
         |> assign(:document, document)
         |> assign(:pdf_generating, false)
         |> put_flash(:info, "PDF generated successfully.")}

      {:error, reason} ->
        {:noreply,
         socket
         |> assign(:pdf_generating, false)
         |> put_flash(:error, "PDF generation failed: #{reason}")}
    end
  end

  def handle_event("switch-tab", %{"tab" => tab}, socket) do
    {:noreply, assign(socket, :active_tab, String.to_existing_atom(tab))}
  end

  def handle_event("prev-page", _params, socket) do
    {:noreply, assign(socket, :current_page, max(0, socket.assigns.current_page - 1))}
  end

  def handle_event("next-page", _params, socket) do
    total = length(socket.assigns.pdf_preview_svgs)
    {:noreply, assign(socket, :current_page, min(total - 1, socket.assigns.current_page + 1))}
  end

  # -- Image upload events --

  def handle_event("validate-image", _params, socket), do: {:noreply, socket}

  def handle_event("save-image", _params, socket) do
    document = socket.assigns.document

    [result] =
      consume_uploaded_entries(socket, :image, fn %{path: path}, entry ->
        data = File.read!(path)

        case Images.create_image(%{
               document_id: document.id,
               filename: entry.client_name,
               content_type: entry.client_type,
               data: data
             }) do
          {:ok, image} -> {:ok, image}
          {:error, changeset} -> {:postpone, changeset}
        end
      end)

    case result do
      %Images.Image{} = image ->
        send_update(Leaf, id: "md-editor", action: :insert_image, url: ~p"/images/#{image.id}", alt: image.filename)
        {:noreply, socket |> assign(:show_image_upload, false) |> assign(:dirty, true)}

      _ ->
        {:noreply, put_flash(socket, :error, "Image upload failed.")}
    end
  end

  def handle_event("cancel-image-upload", _params, socket) do
    socket = cancel_all_entries(socket, :image)
    {:noreply, assign(socket, :show_image_upload, false)}
  end

  def handle_event("cancel-image-entry", %{"ref" => ref}, socket) do
    {:noreply, cancel_upload(socket, :image, ref)}
  end

  # -- Photo upload events --

  def handle_event("show-photo-upload", _params, socket) do
    {:noreply, assign(socket, :show_photo_upload, true)}
  end

  def handle_event("validate-photo", _params, socket), do: {:noreply, socket}

  def handle_event("save-photo", _params, socket) do
    document = socket.assigns.document

    [result] =
      consume_uploaded_entries(socket, :photo, fn %{path: path}, entry ->
        data = File.read!(path)
        {:ok, {data, entry.client_type}}
      end)

    {photo_data, content_type} = result

    case Documents.update_photo(document, photo_data, content_type) do
      {:ok, document} ->
        pdf_preview_svgs = generate_svgs(document)

        {:noreply,
         socket
         |> assign(:document, document)
         |> assign(:pdf_preview_svgs, pdf_preview_svgs)
         |> assign(:show_photo_upload, false)
         |> put_flash(:info, "Photo updated.")}

      {:error, _} ->
        {:noreply, put_flash(socket, :error, "Photo upload failed.")}
    end
  end

  def handle_event("cancel-photo-upload", _params, socket) do
    socket = cancel_all_entries(socket, :photo)
    {:noreply, assign(socket, :show_photo_upload, false)}
  end

  def handle_event("cancel-photo-entry", %{"ref" => ref}, socket) do
    {:noreply, cancel_upload(socket, :photo, ref)}
  end

  # --- Private helpers ---

  defp cancel_all_entries(socket, upload_name) do
    case Map.get(socket.assigns.uploads, upload_name) do
      %{entries: [entry | _]} -> cancel_upload(socket, upload_name, entry.ref)
      _ -> socket
    end
  end

  defp render_md_preview(""), do: ""

  defp render_md_preview(content) do
    case Earmark.as_html(content) do
      {:ok, html, _} -> html
      {:error, html, _} -> html
    end
  end

  defp generate_svgs(%Documents.Document{} = doc) do
    case Generator.generate_preview_svgs(doc) do
      {:ok, svgs} -> svgs
      {:error, _} -> []
    end
  end

  defp upload_error_message(:too_large), do: "File is too large (max 5 MB)."
  defp upload_error_message(:not_accepted), do: "Only PNG and JPG files are accepted."
  defp upload_error_message(:too_many_files), do: "Only one file at a time."
  defp upload_error_message(err), do: "Upload error: #{inspect(err)}"

  @impl true
  def render(assigns) do
    ~H"""
    <div class="flex flex-col h-[calc(100vh-2rem)]">
      <%!-- Toolbar --%>
      <div class="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 shrink-0">
        <div class="flex items-center gap-3">
          <.link navigate={~p"/"} class="text-gray-500 hover:text-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </.link>
          <h2 class="text-lg font-semibold text-gray-900 truncate max-w-xs">{@document.filename}</h2>
          <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{@document.template}</span>
          <span :if={@dirty} class="inline-flex items-center gap-1 text-amber-600 text-sm font-medium">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            Unsaved
          </span>
        </div>

        <div class="flex items-center gap-2">
          <%!-- Photo button (CV templates only) --%>
          <button
            :if={@has_photo}
            phx-click="show-photo-upload"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
            {if @document.photo_binary, do: "Change Photo", else: "Add Photo"}
          </button>

          <button
            phx-click="save"
            disabled={!@dirty}
            class={[
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              if(@dirty, do: "bg-blue-600 text-white hover:bg-blue-700", else: "bg-gray-100 text-gray-400 cursor-not-allowed")
            ]}
          >
            Save
          </button>
          <button
            phx-click="generate-pdf"
            disabled={@dirty or @pdf_generating or @saved_content == ""}
            class={[
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              if(!@dirty and !@pdf_generating and @saved_content != "",
                do: "bg-emerald-600 text-white hover:bg-emerald-700",
                else: "bg-gray-100 text-gray-400 cursor-not-allowed")
            ]}
          >
            {if @pdf_generating, do: "Generating...", else: "Generate PDF"}
          </button>
          <.link
            :if={@document.status == "converted" and @document.pdf_binary != nil}
            href={~p"/documents/#{@document.id}/download"}
            class="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Download PDF
          </.link>
        </div>
      </div>

      <%!-- Main content --%>
      <div class="flex flex-1 min-h-0">
        <%!-- Editor panel --%>
        <div class="w-1/2 border-r border-gray-200 overflow-hidden flex flex-col">
          <.leaf_editor
            id="md-editor"
            content={@editor_content}
            mode={:hybrid}
            preset={:advanced}
            toolbar={[:image]}
            upload_handler={true}
            height="100%"
            debounce={400}
          />
        </div>

        <%!-- Preview panel --%>
        <div class="w-1/2 flex flex-col">
          <div class="flex border-b border-gray-200 bg-gray-50 shrink-0">
            <button
              phx-click="switch-tab"
              phx-value-tab="md"
              class={["px-4 py-2.5 text-sm font-medium transition-colors border-b-2",
                if(@active_tab == :md, do: "border-blue-600 text-blue-600", else: "border-transparent text-gray-500 hover:text-gray-700")]}
            >
              Markdown Preview
            </button>
            <button
              phx-click="switch-tab"
              phx-value-tab="pdf"
              class={["px-4 py-2.5 text-sm font-medium transition-colors border-b-2",
                if(@active_tab == :pdf, do: "border-blue-600 text-blue-600", else: "border-transparent text-gray-500 hover:text-gray-700")]}
            >
              PDF Preview
            </button>
          </div>

          <div class="flex-1 overflow-auto">
            <div :if={@active_tab == :md} class="p-6 prose prose-sm max-w-none">
              {Phoenix.HTML.raw(@md_preview_html)}
            </div>

            <div :if={@active_tab == :pdf} class="p-4">
              <div :if={@dirty} class="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                Save your changes to refresh the PDF preview.
              </div>

              <div :if={@pdf_preview_svgs == []} class="text-center text-gray-400 py-12">
                No preview available.
              </div>

              <div :if={@pdf_preview_svgs != []} class="space-y-4">
                <div :if={length(@pdf_preview_svgs) > 1} class="flex items-center justify-center gap-4">
                  <button phx-click="prev-page" disabled={@current_page == 0} class="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                  <span class="text-sm text-gray-600">Page {@current_page + 1} of {length(@pdf_preview_svgs)}</span>
                  <button phx-click="next-page" disabled={@current_page >= length(@pdf_preview_svgs) - 1} class="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
                </div>

                <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-2">
                  {Phoenix.HTML.raw(Enum.at(@pdf_preview_svgs, @current_page, ""))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <%!-- Image upload modal --%>
      <div :if={@show_image_upload} class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6" phx-click-away="cancel-image-upload">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Upload Image</h3>
            <button phx-click="cancel-image-upload" class="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <form id="image-upload-form" phx-submit="save-image" phx-change="validate-image">
            <section phx-drop-target={@uploads.image.ref} class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <.live_file_input upload={@uploads.image} class="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 cursor-pointer" />
              <div :for={entry <- @uploads.image.entries} class="mt-3">
                <div class="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm">
                  <span class="font-medium text-gray-700 truncate">{entry.client_name}</span>
                  <button type="button" phx-click="cancel-image-entry" phx-value-ref={entry.ref} class="text-red-500 text-xs">Cancel</button>
                </div>
                <p :for={err <- upload_errors(@uploads.image, entry)} class="text-red-600 text-xs mt-1">{upload_error_message(err)}</p>
              </div>
            </section>
            <div class="flex justify-end gap-2 mt-4">
              <button type="button" phx-click="cancel-image-upload" class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
              <button type="submit" disabled={@uploads.image.entries == []} class={["px-4 py-2 rounded-lg text-sm font-medium", if(@uploads.image.entries != [], do: "bg-blue-600 text-white hover:bg-blue-700", else: "bg-gray-100 text-gray-400 cursor-not-allowed")]}>
                Insert Image
              </button>
            </div>
          </form>
        </div>
      </div>

      <%!-- Photo upload modal --%>
      <div :if={@show_photo_upload} class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6" phx-click-away="cancel-photo-upload">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">CV Photo</h3>
            <button phx-click="cancel-photo-upload" class="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <form id="photo-upload-form" phx-submit="save-photo" phx-change="validate-photo">
            <section phx-drop-target={@uploads.photo.ref} class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p class="text-sm text-gray-600 mb-3">Upload a professional headshot (PNG or JPG, max 5 MB)</p>
              <.live_file_input upload={@uploads.photo} class="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 cursor-pointer" />
              <div :for={entry <- @uploads.photo.entries} class="mt-3">
                <div class="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm">
                  <span class="font-medium text-gray-700 truncate">{entry.client_name}</span>
                  <button type="button" phx-click="cancel-photo-entry" phx-value-ref={entry.ref} class="text-red-500 text-xs">Cancel</button>
                </div>
                <p :for={err <- upload_errors(@uploads.photo, entry)} class="text-red-600 text-xs mt-1">{upload_error_message(err)}</p>
              </div>
            </section>
            <div class="flex justify-end gap-2 mt-4">
              <button type="button" phx-click="cancel-photo-upload" class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
              <button type="submit" disabled={@uploads.photo.entries == []} class={["px-4 py-2 rounded-lg text-sm font-medium", if(@uploads.photo.entries != [], do: "bg-emerald-600 text-white hover:bg-emerald-700", else: "bg-gray-100 text-gray-400 cursor-not-allowed")]}>
                Upload Photo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    """
  end
end
