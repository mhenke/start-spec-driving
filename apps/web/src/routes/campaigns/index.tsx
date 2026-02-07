import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/campaigns/")({
  component: CampaignGridComponent,
});

function CampaignGridComponent() {
  const trpc = useTRPC();
  const { data: campaigns, isLoading, error } = useQuery(trpc.campaign.list.queryOptions());

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Leiebilskampanjer</h1>
        <p>Laster kampanjer...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Leiebilskampanjer</h1>
        <div className="text-red-600">Feil ved lasting av kampanjer: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Leiebilskampanjer</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns?.map((campaign) => (
          <div key={campaign.id} className="rounded-lg border bg-white p-6 shadow-sm text-gray-900">
            <img
              src={campaign.image}
              alt={`${campaign.brand} ${campaign.model}`}
              className="mb-4 h-48 w-full object-cover rounded"
            />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">{campaign.title}</h3>
            <p className="mb-1 text-gray-700"><strong>Merke:</strong> {campaign.brand}</p>
            <p className="mb-1 text-gray-700"><strong>Modell:</strong> {campaign.model}</p>
            <p className="mb-1 text-gray-700"><strong>Månedlig pris:</strong> {campaign.monthlyPrice.toLocaleString('nb-NO')} NOK</p>
            <p className="mb-1 text-gray-700"><strong>Kampanjetype:</strong> {campaign.campaignType}</p>
            <Link
              to="/campaigns/$id"
              params={{ id: campaign.id.toString() }}
              className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Se detaljer
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}