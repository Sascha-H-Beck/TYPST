defmodule Mdtopdf.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      MdtopdfWeb.Telemetry,
      Mdtopdf.Repo,
      {DNSCluster, query: Application.get_env(:mdtopdf, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Mdtopdf.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Mdtopdf.Finch},
      # Start a worker by calling: Mdtopdf.Worker.start_link(arg)
      # {Mdtopdf.Worker, arg},
      # Start to serve requests, typically the last entry
      MdtopdfWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Mdtopdf.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    MdtopdfWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
