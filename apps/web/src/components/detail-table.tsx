import { formatNOK, formatKM, formatDate, formatCampaignType } from "@/utils/formatters";

interface DetailTableProps {
    campaign: {
        monthlyPrice: number;
        downpayment: number;
        durationMonths: number;
        kmPerYear: number;
        campaignType: string;
        validFrom: Date | string | null;
        validTo: Date | string | null;
        sourceUrl: string | null;
    };
}

export function DetailTable({ campaign }: DetailTableProps) {
    const specs = [
        { label: "Månedsleie", value: formatNOK(campaign.monthlyPrice, true) },
        { label: "Startleie", value: formatNOK(campaign.downpayment) },
        { label: "Avtaleperiode", value: `${campaign.durationMonths} mnd` },
        { label: "Kjørelengde", value: formatKM(campaign.kmPerYear) },
        { label: "Kundetype", value: formatCampaignType(campaign.campaignType) },
        { label: "Gyldig fra", value: formatDate(campaign.validFrom) },
        { label: "Gyldig til", value: formatDate(campaign.validTo) },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between border-b border-border pb-2 text-sm last:border-0">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                </div>
            ))}
            {campaign.sourceUrl && (
                <div className="flex justify-between pt-2 text-sm">
                    <span className="text-muted-foreground">Kilde</span>
                    <a
                        href={campaign.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate max-w-[150px]"
                    >
                        Se originalannonse
                    </a>
                </div>
            )}
        </div>
    );
}
