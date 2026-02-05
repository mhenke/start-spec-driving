import { Link } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { buttonVariants } from "./ui/button";
import { formatNOK, formatCampaignType } from "../utils/formatters";
import { useState } from "react";
import { Tag, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
    campaign: {
        id: string;
        title: string | null;
        brand: string;
        model: string;
        monthlyPrice: number;
        campaignType: string;
        image: string | null;
    };
}

export const CampaignCard = ({ campaign }: CampaignCardProps) => {
    const [imgSrc, setImgSrc] = useState(
        campaign.image || "/placeholder-car.png"
    );
    const displayName = `${campaign.brand} ${campaign.model}`;

    return (
        <article className="h-full">
            <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg border-muted/50">
                <div className="aspect-video w-full overflow-hidden bg-muted relative">
                    <img
                        src={imgSrc}
                        alt={displayName}
                        className="object-cover w-full h-full"
                        onError={() => setImgSrc("/placeholder-car.png")}
                    />
                    <div className="absolute top-2 right-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium border shadow-sm">
                            <Tag className="w-3 h-3" />
                            {formatCampaignType(campaign.campaignType)}
                        </div>
                    </div>
                </div>

                <CardHeader className="space-y-1 p-5">
                    {campaign.title && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                            {campaign.title}
                        </p>
                    )}
                    <CardTitle className="text-xl leading-snug">{displayName}</CardTitle>
                </CardHeader>

                <CardContent className="px-5 pb-5 flex-grow">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-foreground">
                            {formatNOK(campaign.monthlyPrice)}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                            Inkl. mva, ekskl. frakt/levering
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="px-5 pb-5 pt-0">
                    <Link
                        to="/campaign/$id"
                        params={{ id: campaign.id }}
                        className={cn(
                            buttonVariants({ variant: "default" }),
                            "w-full group"
                        )}
                        aria-label={`Se detaljer for ${displayName} ${campaign.title || ""}`}
                    >
                        Se detaljer
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                </CardFooter>
            </Card>
        </article>
    );
};
