import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/campaign/$id")({
  component: CampaignDetailComponent,
});

function CampaignDetailComponent() {
  const { id } = Route.useParams();
  const trpc = useTRPC();
  const campaignQuery = useQuery(
    trpc.campaigns.getById.queryOptions({ id: parseInt(id) }),
  );

  if (campaignQuery.isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center">Laster kampanje...</div>;
  }

  const campaign = campaignQuery.data;

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Kampanjen ble ikke funnet</h1>
        <Button asChild className="mt-4">
          <Link to="/">Tilbake til forsiden</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tilbake
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="aspect-video w-full overflow-hidden rounded-xl border">
            <img
              src={campaign.image}
              alt={`${campaign.brand} ${campaign.model}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-extrabold lg:text-4xl">
              {campaign.brand} {campaign.model}
            </h1>
            <p className="text-muted-foreground mt-2 text-xl">{campaign.title}</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <span className="text-muted-foreground text-sm">Månedspris</span>
              <p className="text-xl font-bold">{formatCurrency(campaign.monthlyPrice)}</p>
            </div>
            <div className="rounded-lg border p-4">
              <span className="text-muted-foreground text-sm">Startleie</span>
              <p className="text-xl font-bold">{formatCurrency(campaign.downpayment)}</p>
            </div>
            <div className="rounded-lg border p-4">
              <span className="text-muted-foreground text-sm">Løpetid</span>
              <p className="text-xl font-bold">{campaign.durationMonths} mnd</p>
            </div>
            <div className="rounded-lg border p-4">
              <span className="text-muted-foreground text-sm">Km per år</span>
              <p className="text-xl font-bold">{formatNumber(campaign.kmPerYear)} km</p>
            </div>
            <div className="rounded-lg border p-4">
              <span className="text-muted-foreground text-sm">Type</span>
              <p className="text-xl font-bold">{campaign.campaignType}</p>
            </div>
            {campaign.sourceUrl && (
              <div className="flex items-end">
                <Button variant="outline" asChild className="w-full">
                  <a href={campaign.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Se original annonse
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar / Lead Form */}
        <div>
          <LeadForm campaignId={campaign.id} />
        </div>
      </div>
    </div>
  );
}
