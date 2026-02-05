import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useTRPC } from "@/utils/trpc";
import { CampaignHero } from "@/components/campaign-hero";
import { DetailTable } from "@/components/detail-table";
import { LeadForm } from "@/components/lead-form";
import { ErrorDisplay } from "@/components/error-display";
import Loader from "@/components/loader";

export const Route = createFileRoute("/campaign/$id")({
  component: CampaignDetailComponent,
});

function CampaignDetailComponent() {
  const { id } = Route.useParams();
  const trpc = useTRPC();

  const campaignQuery = useQuery(
    trpc.campaign.get.queryOptions({ id })
  );

  if (campaignQuery.isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (campaignQuery.isError || !campaignQuery.data) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorDisplay
          message={!campaignQuery.data ? "Kampanjen ble ikke funnet eller er ikke lenger aktiv." : undefined}
          onRetry={() => campaignQuery.refetch()}
        />
        <div className="mt-8 text-center">
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-1">
            <ChevronLeft className="size-4" />
            Tilbake til forsiden
          </Link>
        </div>
      </div>
    );
  }

  const campaign = campaignQuery.data;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <nav>
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="size-4" />
          Tilbake til oversikt
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <CampaignHero campaign={campaign} />

          <div className="block lg:hidden">
            <LeadForm campaignId={campaign.id} />
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Om denne kampanjen</h2>
            <p className="text-muted-foreground leading-relaxed">
              Dette er et eksklusivt leasingtilbud på {campaign.brand} {campaign.model}.
              Kampanjen er validert og klar for signering. Ta kontakt via skjemaet
              for en uforpliktende prat om dine behov.
            </p>
          </section>
        </div>

        <div className="space-y-8">
          <div className="hidden lg:block sticky top-24">
            <LeadForm campaignId={campaign.id} />
          </div>

          <section className="bg-muted/30 p-6 rounded-xl space-y-4">
            <h3 className="font-semibold px-1 text-sm uppercase tracking-wider text-muted-foreground">
              Tekniske spesifikasjoner
            </h3>
            <DetailTable campaign={campaign} />
          </section>
        </div>
      </div>
    </div>
  );
}
