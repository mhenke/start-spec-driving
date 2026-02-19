import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface CampaignCardProps {
  campaign: {
    id: number;
    title: string;
    brand: string;
    model: string;
    monthlyPrice: number;
    image: string;
    campaignType: string;
  };
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={campaign.image}
          alt={`${campaign.brand} ${campaign.model}`}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
            {campaign.brand}
          </span>
          <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs font-bold">
            {campaign.campaignType}
          </span>
        </div>
        <CardTitle className="line-clamp-1 text-lg">{campaign.model}</CardTitle>
        <p className="text-muted-foreground line-clamp-1 text-sm">{campaign.title}</p>
      </CardHeader>
      <CardContent className="px-4 py-0">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Månedspris</span>
          <span className="text-2xl font-bold">{formatCurrency(campaign.monthlyPrice)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button asChild className="w-full">
          <Link to="/campaign/$id" params={{ id: campaign.id.toString() }}>
            Se detaljer
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
