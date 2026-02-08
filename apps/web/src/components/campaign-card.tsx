import { Link } from "@tanstack/react-router";
import { formatNOK } from "../utils/format";
import type { Campaign } from "@start-spec-driving/db/schema";
import { Button } from "./ui/button";


// Fallback if shadcn not fully set up or imported differently
// I'll check imports later, for now standard structure.

interface CampaignCardProps {
    campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                <img
                    src={campaign.image}
                    alt={`${campaign.brand} ${campaign.model}`}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                />
                {campaign.campaignType === 'Næring' && (
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Næring
                    </span>
                )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">
                    {campaign.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                    {campaign.brand} {campaign.model}
                </p>

                <div className="mt-auto">
                    <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-xl font-bold" suppressHydrationWarning>{formatNOK(campaign.monthlyPrice)}</span>
                        <span className="text-muted-foreground text-sm">/mnd</span>
                    </div>

                    <Button className="w-full">
                        <Link to="/campaigns/$campaignId" params={{ campaignId: String(campaign.id) }}>
                            Se detaljer
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
