# Mdtopdf (TYPST Implementation)

A powerful, high-performance Elixir web service built on the Phoenix Framework designed to dynamically compile Markdown into professional, print-quality PDF documents using the Typst typesetting engine.

## 🚀 Features

- **Markdown-to-PDF Conversion:** Seamless translation from standard Markdown text into structured PDF outputs.
- **Typst Typesetting Engine:** Utilizes the speed and advanced layout features of Typst as an alternative to bulky LaTeX compilation.
- **Blazing Fast Concurrency:** Leverages the Erlang BEAM virtual machine via Elixir to handle multiple document generation requests simultaneously.
- **Built-in Phoenix REST API:** Clear application endpoints to send Markdown payloads and download compiled assets.

---

## 🛠️ Tech Stack

- **Language:** Elixir
- **Framework:** Phoenix
- **Document Engine:** Typst CLI / Native Integrations
- **License:** MIT

---

## 📦 Getting Started

### Prerequisites

Before setting up the project, make sure you have the following installed on your machine:
- **Elixir** (and Erlang/OTP)
- **Node.js** (for asset processing)
- **Typst CLI** (ensure `typst` is accessible in your system PATH)

### Local Installation

Follow these steps to get your local development environment running:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd TYPST
   ```

2. **Run the setup command:**
   This Mix command will automatically fetch dependencies and configure your database/assets.
   ```bash
   mix setup
   ```

3. **Start the Phoenix server:**
   You can boot up the application normally or run it inside an interactive Elixir shell (`IEx`) for debugging:
   ```bash
   # Standard start
   mix phx.server

   # Start inside Interactive Elixir (Recommended for Development)
   iex -S mix phx.server
   ```

Now, open your browser and navigate to **`http://localhost:4000`** to view the application running.

---

## 📖 API Usage Example

*Note: Update this section with your actual controller paths once endpoints are officially declared.*

### Convert Markdown to PDF
```bash
curl -X POST http://localhost:4000/api/v1/convert \
  -H "Content-Type: application/json" \
  -d '{"markdown": "# Hello World\nThis is a PDF compiled via Typst."}' \
  --output document.pdf
```

---


To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
