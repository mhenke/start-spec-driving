import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";

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
    <Card className="overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={campaign.image}
          alt={`${campaign.brand} ${campaign.model}`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
            {campaign.campaignType}
          </span>
        </div>
      </div>
      <CardHeader className="space-y-1 p-5">
        <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
          {campaign.brand}
        </span>
        <CardTitle className="line-clamp-1 text-xl font-extrabold tracking-tight">
          {campaign.model}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-0 pb-4">
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-[11px]">Månedspris</span>
            <span className="font-bold">fra {formatCurrency(campaign.monthlyPrice)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground text-[11px]">Varighet</span>
            <span className="font-bold">36 mnd</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Link
          to="/campaign/$id"
          params={{ id: campaign.id.toString() }}
          className={cn(buttonVariants({ size: "lg" }), "w-full rounded-md py-6 font-bold")}
        >
          Se detaljer
        </Link>
      </CardFooter>
    </Card>
  );
}
