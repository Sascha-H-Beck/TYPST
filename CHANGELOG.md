# Changelog

## 0.3.0 — 2026-06-17

### Added

- Template system with registry (`Mdtopdf.Templates`) and per-document `template` field
- German CV (Lebenslauf) template with EU-standard sections and photo support
- Section-aware Markdown parser (`Mdtopdf.Markdown.SectionParser`) for structured documents
- Dedicated CV photo upload (stored as `photo_binary` on document, rendered in Typst via assets)
- Template selector UI on document list page ("New from Template")
- Demo CV Markdown content (`cv_german.md`) auto-loaded when creating from template
- Template badge shown in document list and editor toolbar

---

## 0.2.0 — 2026-06-17

### Added

- Image upload support (PNG, JPG) via Leaf editor toolbar with upload modal
- Images rendered in MD preview (served via ImageController) and PDF output (Typst virtual filesystem assets)
- Images table with cascade delete on document removal

### Fixed

- Leaf toolbar/dropdown transparency: added daisyUI class overrides with 80% opaque backgrounds

---

## 0.1.0 — 2026-06-17

### Added

- Phoenix LiveView application for Markdown to PDF conversion via Typst
- Drag-and-drop (or file browser) upload of `.md` files
- Full-featured Markdown editor (Leaf) with hybrid visual/markdown mode
- Live Markdown preview (Earmark → HTML)
- PDF preview rendered as inline SVG (Typst NIF `render_to_svg`) — no iframes
- PDF generation (Typst NIF `render_to_pdf`) with EEx-based Typst templates
- PDF download via controller endpoint
- Unsaved-changes guard: PDF preview frozen and "Generate PDF" disabled while editor is dirty
- Document listing with upload status (uploaded / converted)
- Document deletion
- PostgreSQL persistence for documents and generated PDF binaries
- Page navigation for multi-page PDF previews
- Tailwind CSS styling with Typography plugin for prose rendering
