import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "../../utils/trpc";
import { CampaignCard } from "../../components/campaign-card";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/campaigns/")({
  component: CampaignListPage,
});

function CampaignListPage() {
  const trpc = useTRPC();
  // Using suspense query for Tanstack Start data loading
  const campaignsQuery = useSuspenseQuery(trpc.campaign.list.queryOptions());
  const campaigns = campaignsQuery.data;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Aktuelle Kampanjer</h1>

      {campaigns.length === 0 ? (
        <p className="text-muted-foreground">Ingen aktive kampanjer for øyeblikket.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
