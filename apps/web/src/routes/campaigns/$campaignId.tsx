import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "../../utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatNOK } from "../../utils/format";
import { LeadForm } from "../../components/lead-form";

export const Route = createFileRoute("/campaigns/$campaignId")({
  component: CampaignDetailPage,
  loader: async ({ context, params }) => {
    // Tanstack Start loader pattern if needed, but suspense query handles it in component
    return { campaignId: Number(params.campaignId) };
  },
});

function CampaignDetailPage() {
  const params = Route.useParams();
  const trpc = useTRPC();
  const campaignId = Number(params.campaignId);

  const campaignQuery = useSuspenseQuery(trpc.campaign.byId.queryOptions({ id: campaignId }));
  const campaign = campaignQuery.data;

  if (!campaign) {
    return <div className="container py-8">Kampanje ikke funnet.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column: Image and Details */}
        <div>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted mb-8 relative">
            <img
              src={campaign.image}
              alt={`${campaign.brand} ${campaign.model}`}
              className="h-full w-full object-cover"
            />
            {campaign.campaignType === 'Næring' && (
              <span className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded font-medium">
                Næring
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-2">{campaign.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{campaign.brand} {campaign.model}</p>

          <div className="grid grid-cols-2 gap-4 border-t pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Månedspris</p>
              <p className="text-2xl font-bold" suppressHydrationWarning>{formatNOK(campaign.monthlyPrice)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Startleie</p>
              <p className="text-xl" suppressHydrationWarning>{formatNOK(campaign.downpayment)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kjørelengde</p>
              <p className="text-lg">{campaign.kmPerYear.toLocaleString('nb-NO')} km/år</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avtaleperiode</p>
              <p className="text-lg">{campaign.durationMonths} mnd</p>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Form */}
        <div className="bg-slate-50 p-8 rounded-xl border h-fit">
          <h2 className="text-2xl font-semibold mb-2">Interessert?</h2>
          <p className="text-muted-foreground mb-6">
            Fyll ut skjemaet så tar en rådgiver kontakt med deg for et uforpliktende tilbud.
          </p>
          <LeadForm campaignId={campaign.id} />
        </div>
      </div>
    </div>
  );
}
