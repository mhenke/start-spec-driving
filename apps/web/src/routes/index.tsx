import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { useTRPC } from "@/utils/trpc";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function CampaignImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={cn("flex flex-col items-center justify-center bg-muted text-muted-foreground", className)}>
        <span className="text-sm font-medium">Bilde kommer snart</span>
        <span className="text-xs">Coming Soon</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
    />
  );
}

function HomeComponent() {
  const trpc = useTRPC();
  const campaigns = useQuery(trpc.campaigns.list.queryOptions());

  if (campaigns.isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Laster kampanjer...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Gunstig leasing av elbil</h1>
        <p className="text-muted-foreground text-lg">
          Utforsk våre beste tilbud på populære elbilmodeller.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.data?.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <CampaignImage
                src={campaign.image}
                alt={`${campaign.brand} ${campaign.model}`}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {campaign.campaignType}
              </div>
              <CardTitle>
                {campaign.brand} {campaign.model}
              </CardTitle>
              <CardDescription>{campaign.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                fra {campaign.monthlyPrice.toLocaleString("nb-NO")} kr / mnd
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Innskudd: {campaign.downpayment.toLocaleString("nb-NO")} kr
              </p>
            </CardContent>
            <CardFooter>
              <Link
                to="/campaigns/$id"
                params={{ id: String(campaign.id) }}
                className={cn(buttonVariants(), "w-full")}
              >
                Se detaljer
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {campaigns.data?.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Ingen aktive kampanjer for øyeblikket.</p>
        </div>
      )}
    </div>
  );
}