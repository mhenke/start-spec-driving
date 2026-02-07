import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTRPC } from "@/utils/trpc";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campaigns/$id")({
  component: CampaignDetailComponent,
});

function CampaignDetailComponent() {
  const { id } = Route.useParams();
  const trpc = useTRPC();
  const campaign = useQuery(trpc.campaigns.getById.queryOptions({ id: Number(id) }));
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await trpc.leads.create.mutate({
        campaignId: Number(id),
        name,
        email,
        phone,
      });
      setIsSubmitted(true);
      toast.success("Takk for din interesse! Vi kontakter deg snart.");
    } catch (error) {
      toast.error("Noe gikk galt. Vennligst prøv igjen senere.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (campaign.isLoading) return <div className="container mx-auto p-8 text-center">Laster detaljer...</div>;
  if (!campaign.data) return <div className="container mx-auto p-8 text-center">Kampanjen ble ikke funnet.</div>;

  const data = campaign.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 aspect-video overflow-hidden rounded-xl bg-muted">
            <img 
              src={data.image} 
              alt={`${data.brand} ${data.model}`} 
              className="h-full w-full object-cover"
            />
          </div>
          
          <h1 className="mb-2 text-3xl font-bold">{data.brand} {data.model}</h1>
          <p className="mb-6 text-xl text-muted-foreground">{data.title}</p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Månedspris" value={`${data.monthlyPrice.toLocaleString("nb-NO")} kr`} />
            <DetailItem label="Innskudd" value={`${data.downpayment.toLocaleString("nb-NO")} kr`} />
            <DetailItem label="Varighet" value={`${data.durationMonths} måneder`} />
            <DetailItem label="Kjørelengde" value={`${data.kmPerYear.toLocaleString("nb-NO")} km/år`} />
            <DetailItem label="Kampanjetype" value={data.campaignType} />
            <DetailItem label="Gyldig til" value={new Date(data.validTo).toLocaleDateString("nb-NO")} />
          </div>

          {data.sourceUrl && (
            <div className="mt-8">
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Se kilde
              </a>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Motta et uforpliktende tilbud</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="rounded-lg bg-green-50 p-4 text-center text-green-700">
                  <p className="font-semibold">Takk!</p>
                  <p className="text-sm">Din forespørsel er mottatt. En rådgiver vil kontakte deg innen kort tid.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Fullt navn</Label>
                    <Input 
                      id="name" 
                      required 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Ditt navn"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-post</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="din@epost.no"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      required 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="Ditt nummer"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sender..." : "Søk nå"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Ved å klikke "Søk nå" samtykker du til at vi kan kontakte deg angående dette tilbudet.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
