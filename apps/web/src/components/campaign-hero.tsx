interface CampaignHeroProps {
    campaign: {
        title: string;
        brand: string;
        model: string;
        image: string | null;
    };
}

export function CampaignHero({ campaign }: CampaignHeroProps) {
    return (
        <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {campaign.image ? (
                    <img
                        src={campaign.image}
                        alt={`${campaign.brand} ${campaign.model}`}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        Ingen bilde tilgjengelig
                    </div>
                )}
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {campaign.brand} {campaign.model}
                    </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{campaign.title}</h1>
            </div>
        </div>
    );
}
