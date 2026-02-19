import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CampaignCard } from "@/components/campaign-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const trpc = useTRPC();
  const campaignsQuery = useQuery(trpc.campaigns.getVerified.queryOptions());

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Gunstige leasingavtaler
        </h1>
        <p className="text-muted-foreground text-xl">
          Finn din neste bil blant våre utvalgte kampanjer.
        </p>
      </header>

      {campaignsQuery.isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : campaignsQuery.data?.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-lg">Ingen aktive kampanjer for øyeblikket.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaignsQuery.data?.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
