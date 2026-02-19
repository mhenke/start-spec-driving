import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Zap } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
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
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-pulse">
        <div className="mx-auto h-8 w-48 rounded bg-muted"></div>
        <div className="mx-auto mt-4 h-4 w-64 rounded bg-muted"></div>
      </div>
    );
  }

  const campaign = campaignQuery.data;

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Kampanjen ble ikke funnet</h1>
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "default" }), "mt-4")}
        >
          Tilbake til forsiden
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center space-x-2 overflow-hidden text-sm whitespace-nowrap text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-primary hover:underline">
          Hjem
        </Link>
        <ArrowLeft className="h-3 w-3 rotate-180" />
        <Link to="/" className="transition-colors hover:text-primary hover:underline">
          Leasingkampanjer
        </Link>
        <span className="mx-2">›</span>
        <span className="font-semibold text-foreground truncate">
          {campaign.brand} {campaign.model}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition-all">
            <div className="aspect-video w-full overflow-hidden border">
              <img
                src={campaign.image}
                alt={`${campaign.brand} ${campaign.model}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-8 border-b pb-6">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {campaign.brand} {campaign.model}
              </h1>
              <p className="mt-4 text-xl text-muted-foreground font-medium">
                {campaign.title}
              </p>
            </div>

            <div className="space-y-8">
              <h2 className="flex items-center text-2xl font-extrabold tracking-tight text-foreground">
                <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="h-5 w-5 fill-current" />
                </span>
                Tekniske spesifikasjoner
              </h2>

              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-border">
                    <tr className="flex flex-col sm:table-row">
                      <td className="w-full bg-muted/20 px-6 py-5 font-semibold text-muted-foreground sm:w-1/3">Merke</td>
                      <td className="px-6 py-5 text-base font-bold">{campaign.brand}</td>
                    </tr>
                    <tr className="flex flex-col sm:table-row">
                      <td className="w-full bg-muted/20 px-6 py-5 font-semibold text-muted-foreground sm:w-1/3">Modell</td>
                      <td className="px-6 py-5 text-base font-bold">{campaign.model}</td>
                    </tr>
                    <tr className="flex flex-col sm:table-row">
                      <td className="w-full bg-muted/20 px-6 py-5 font-semibold text-muted-foreground sm:w-1/3">Månedspris</td>
                      <td className="px-6 py-5 text-xl font-black text-primary italic">
                        fra {formatCurrency(campaign.monthlyPrice)}
                      </td>
                    </tr>
                    <tr className="flex flex-col sm:table-row">
                      <td className="w-full bg-muted/20 px-6 py-5 font-semibold text-muted-foreground sm:w-1/3">Startleie / Forskudd</td>
                      <td className="px-6 py-5 text-base font-bold">{formatCurrency(campaign.downpayment)}</td>
                    </tr>
                    <tr className="flex flex-col sm:table-row">
                      <td className="w-full bg-muted/20 px-6 py-5 font-semibold text-muted-foreground sm:w-1/3">Løpetid</td>
                      <td className="px-6 py-5 text-base font-bold">{campaign.durationMonths} måneder</td>
                    </tr>
                    <tr className="flex flex-col sm:table-row">
                      <td className="w-full bg-muted/20 px-6 py-5 font-semibold text-muted-foreground sm:w-1/3">Kjørelengde</td>
                      <td className="px-6 py-5 text-base font-bold">{formatNumber(campaign.kmPerYear)} km / år</td>
                    </tr>
                    <tr className="flex flex-col sm:table-row">
                      <td className="w-full bg-muted/20 px-6 py-5 font-semibold text-muted-foreground sm:w-1/3">Totalpris (3 år)</td>
                      <td className="px-6 py-5 text-base font-bold text-muted-foreground">
                        {formatCurrency(campaign.downpayment + (campaign.monthlyPrice * 36))}
                      </td>
                    </tr>
                    <tr className="flex flex-col sm:table-row">
                      <td className="w-full bg-muted/20 px-6 py-5 font-semibold text-muted-foreground sm:w-1/3">Kampanjetype</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
                          {campaign.campaignType}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-6 rounded-2xl bg-muted/30 p-8 border border-border/50">
            <h3 className="text-xl font-extrabold flex items-center gap-2">
              <span className="block h-1.5 w-6 rounded-full bg-primary" />
              Vilkår og betingelser
            </h3>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
              <p>
                Prisene inkluderer merverdiavgift og vrakpant. Termingebyr (95 kr) og etableringsgebyr (4 990 kr) tilkommer. Totalpris vil variere med rentenivået. Leieavtalen forutsetter godkjent kredittvurdering av finansieringsselskapet.
              </p>
              <p>
                Kjørelengde utover avtalt distanse avregnes etter gjeldende satser ved tilbakelevering. Vedlikehold og forsikring er ikke inkludert med mindre annet er spesifisert i kontrakten. Bilen må leveres tilbake til forhandler ved endt leasingperiode i henhold til standard for unormal slitasje.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar / Lead Form */}
        <aside className="space-y-8">
          <LeadForm campaignId={campaign.id} />
          {campaign.sourceUrl && (
            <div className="px-2">
              <a
                href={campaign.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full h-14 rounded-xl border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold flex items-center justify-center"
                )}
              >
                <ExternalLink className="mr-3 h-4 w-4" />
                Se original annonse
              </a>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
