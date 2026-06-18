defmodule Mdtopdf.Repo do
  use Ecto.Repo,
    otp_app: :mdtopdf,
    adapter: Ecto.Adapters.Postgres
end
