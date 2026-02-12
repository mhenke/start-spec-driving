import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/campaigns/")({
  component: CampaignsIndexComponent,
});

function CampaignsIndexComponent() {
  const trpc = useTRPC();
  const { data: campaigns, isLoading, isError } = useQuery(
    trpc.campaign.getAllVerified.queryOptions()
  );

  if (isLoading) {
    return <div>Laster kampanjer...</div>;
  }

  if (isError) {
    return <div>Feil ved lasting av kampanjer</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Biltyper med leiebilskampanjer</h1>
      
      {campaigns && campaigns.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className="rounded-lg border bg-white p-4 shadow-md hover:shadow-lg"
            >
              {campaign.image && (
                <img 
                  src={campaign.image} 
                  alt={`${campaign.brand} ${campaign.model}`} 
                  className="mb-4 h-40 w-full object-cover rounded-md"
                />
              )}
              <h2 className="mb-2 text-xl font-semibold">{campaign.title}</h2>
              <p className="mb-1"><strong>{campaign.brand} {campaign.model}</strong></p>
              <p className="mb-2">Pris: <strong>{campaign.monthlyPrice.toLocaleString('nb-NO')} kr/mnd</strong></p>
              <p className="mb-2">Kampanjetype: <strong>{campaign.campaignType}</strong></p>
              <Link 
                to="/campaign/$id" 
                params={{ id: campaign.id.toString() }}
                className="mt-3 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Se detaljer
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Ingen aktive kampanjer for øyeblikket.</p>
      )}
    </div>
  );
}