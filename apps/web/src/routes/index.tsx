import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "@/utils/trpc";
import { CampaignCard } from "@/components/campaign-card";
import { CampaignListSkeleton } from "@/components/campaign-list-skeleton";
import { ErrorDisplay } from "@/components/error-display";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

function HomeComponent() {
  const trpc = useTRPC();
  const campaigns = useQuery(trpc.campaign.list.queryOptions());

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="text-center space-y-4">
        <pre className="inline-block text-left overflow-x-auto font-mono text-[10px] md:text-xs leading-none opacity-80 decoration-primary/30">
          {TITLE_TEXT}
        </pre>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Oppdag de beste leasingtilbudene på ett sted. Enkelt, trygt og
          gjennomsiktig.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold tracking-tight">Aktive kampanjer</h2>
          <span className="text-sm text-muted-foreground">
            {campaigns.data?.length ?? 0} tilbud funnet
          </span>
        </div>

        {campaigns.isLoading ? (
          <CampaignListSkeleton />
        ) : campaigns.isError ? (
          <ErrorDisplay onRetry={() => campaigns.refetch()} />
        ) : campaigns.data?.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed rounded-xl bg-muted/30">
            <p className="text-muted-foreground">
              Ingen kampanjer tilgjengelig for øyeblikket.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.data?.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
