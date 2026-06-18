defmodule MdtopdfWeb.DocumentListLive do
  use MdtopdfWeb, :live_view

  alias Mdtopdf.Documents
  alias Mdtopdf.Templates

  @impl true
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:documents, Documents.list_documents())
     |> assign(:templates, Templates.list_templates())
     |> assign(:show_templates, false)
     |> allow_upload(:md_file,
       accept: ~w(.md),
       max_entries: 1,
       max_file_size: 10_000_000
     )}
  end

  @impl true
  def handle_event("validate", _params, socket) do
    {:noreply, socket}
  end

  def handle_event("save-upload", _params, socket) do
    [result] =
      consume_uploaded_entries(socket, :md_file, fn %{path: path}, entry ->
        content = File.read!(path)
        filename = entry.client_name

        case Documents.create_document(%{filename: filename, md_content: content}) do
          {:ok, document} -> {:ok, document}
          {:error, changeset} -> {:postpone, changeset}
        end
      end)

    case result do
      %Documents.Document{} = doc ->
        {:noreply,
         socket
         |> put_flash(:info, "\"#{doc.filename}\" uploaded successfully.")
         |> push_navigate(to: ~p"/documents/#{doc.id}")}

      _ ->
        {:noreply, put_flash(socket, :error, "Upload failed.")}
    end
  end

  def handle_event("cancel-upload", %{"ref" => ref}, socket) do
    {:noreply, cancel_upload(socket, :md_file, ref)}
  end

  def handle_event("toggle-templates", _params, socket) do
    {:noreply, assign(socket, :show_templates, !socket.assigns.show_templates)}
  end

  def handle_event("select-template", %{"key" => key}, socket) do
    demo_content = Templates.demo_content(key)
    template = Templates.get_template!(key)

    filename =
      case key do
        "cv_german" -> "Lebenslauf.md"
        _ -> "Untitled.md"
      end

    case Documents.create_document(%{
           filename: filename,
           md_content: demo_content,
           template: key
         }) do
      {:ok, document} ->
        {:noreply,
         socket
         |> put_flash(:info, "\"#{template.name}\" created.")
         |> push_navigate(to: ~p"/documents/#{document.id}")}

      {:error, _} ->
        {:noreply, put_flash(socket, :error, "Failed to create document.")}
    end
  end

  def handle_event("delete-document", %{"id" => id}, socket) do
    document = Documents.get_document!(id)
    {:ok, _} = Documents.delete_document(document)

    {:noreply,
     socket
     |> assign(:documents, Documents.list_documents())
     |> put_flash(:info, "\"#{document.filename}\" deleted.")}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <div class="max-w-5xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">MD to PDF</h1>
      <p class="text-gray-500 mb-8">Upload Markdown files and convert them to PDF using Typst.</p>

      <div class="flex gap-4 mb-10">
        <%!-- Upload zone --%>
        <form id="upload-form" phx-submit="save-upload" phx-change="validate" class="flex-1">
          <section
            phx-drop-target={@uploads.md_file.ref}
            class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-colors phx-drop-target:border-blue-500 phx-drop-target:bg-blue-50 h-full flex flex-col justify-center"
          >
            <div class="flex flex-col items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9.75m3 0-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p class="text-gray-600 font-medium text-sm">Drop a <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.md</code> file here</p>
              <.live_file_input upload={@uploads.md_file} class="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            </div>

            <div :for={entry <- @uploads.md_file.entries} class="mt-3">
              <div class="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm">
                <span class="font-medium text-gray-700">{entry.client_name}</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-gray-200 rounded-full h-1.5">
                    <div class="bg-blue-600 h-1.5 rounded-full transition-all" style={"width: #{entry.progress}%"}></div>
                  </div>
                  <button type="button" phx-click="cancel-upload" phx-value-ref={entry.ref} class="text-red-500 hover:text-red-700 text-xs">Cancel</button>
                </div>
              </div>
              <p :for={err <- upload_errors(@uploads.md_file, entry)} class="text-red-600 text-xs mt-1">{upload_error_message(err)}</p>
            </div>

            <button :if={@uploads.md_file.entries != []} type="submit" class="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Upload & Open
            </button>
          </section>
        </form>

        <%!-- New from Template --%>
        <div class="flex-1">
          <button
            phx-click="toggle-templates"
            class="w-full h-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-colors hover:border-emerald-400 hover:bg-emerald-50 flex flex-col items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <p class="text-gray-600 font-medium text-sm">New from Template</p>
          </button>
        </div>
      </div>

      <%!-- Template selector --%>
      <div :if={@show_templates} class="mb-10 bg-white border border-gray-200 rounded-xl p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Choose a Template</h2>
        <div class="grid grid-cols-2 gap-4">
          <button
            :for={tmpl <- @templates}
            phx-click="select-template"
            phx-value-key={tmpl.key}
            class="border border-gray-200 rounded-lg p-5 text-left hover:border-blue-400 hover:bg-blue-50 transition-colors group"
          >
            <div class="flex items-start gap-3">
              <div class={[
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                if(tmpl.key == "cv_german", do: "bg-emerald-100 text-emerald-600", else: "bg-blue-100 text-blue-600")
              ]}>
                <svg :if={tmpl.key == "cv_german"} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                <svg :if={tmpl.key != "cv_german"} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900 group-hover:text-blue-700">{tmpl.name}</p>
                <p class="text-sm text-gray-500 mt-0.5">{tmpl.description}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <%!-- Document listing --%>
      <div :if={@documents != []} class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filename</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr :for={doc <- @documents} class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <.link navigate={~p"/documents/#{doc.id}"} class="text-blue-600 hover:text-blue-800 font-medium">
                  {doc.filename}
                </.link>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{doc.template}</td>
              <td class="px-6 py-4">
                <span class={[
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  if(doc.status == "converted", do: "bg-green-100 text-green-800", else: "bg-gray-100 text-gray-800")
                ]}>
                  {doc.status}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {Calendar.strftime(doc.inserted_at, "%Y-%m-%d %H:%M")}
              </td>
              <td class="px-6 py-4 text-right">
                <button
                  phx-click="delete-document"
                  phx-value-id={doc.id}
                  data-confirm="Delete this document?"
                  class="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p :if={@documents == []} class="text-center text-gray-400 py-12">
        No documents yet. Upload a Markdown file or create one from a template.
      </p>
    </div>
    """
  end

  defp upload_error_message(:too_large), do: "File is too large (max 10 MB)."
  defp upload_error_message(:not_accepted), do: "Only .md files are accepted."
  defp upload_error_message(:too_many_files), do: "Only one file at a time."
  defp upload_error_message(err), do: "Upload error: #{inspect(err)}"
end
