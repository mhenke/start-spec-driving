import { useQuery, useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTRPC } from "@/utils/trpc";
import { useState } from "react";

export const Route = createFileRoute("/campaign_/$id")({
  component: CampaignDetailComponent,
});

function CampaignDetailComponent() {
  const { id } = Route.useParams();
  const campaignId = parseInt(id);
  const trpc = useTRPC();
  const { data: campaign, isLoading, isError } = useQuery(
    trpc.campaign.getById.queryOptions({ id: campaignId })
  );
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const createLead = useMutation(trpc.campaign.createLead.mutationOptions());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    
    try {
      await createLead.mutateAsync({
        campaignId,
        name,
        email,
        phone,
      });
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error submitting lead:", error);
      setSubmitStatus("error");
    }
  };

  if (isLoading) {
    return <div>Laster kampanje...</div>;
  }

  if (isError) {
    return <div>Feil ved lasting av kampanje</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {campaign && (
        <>
          <Link to="/campaigns/" className="mb-4 inline-block text-blue-600 hover:underline">
            ← Tilbake til kampanjer
          </Link>
          
          <article className="rounded-lg border bg-white p-6 shadow-md">
            <div className="mb-6">
              {campaign.image && (
                <img 
                  src={campaign.image} 
                  alt={`${campaign.brand} ${campaign.model}`} 
                  className="w-full h-64 object-contain mb-4 rounded-md"
                />
              )}
              <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Kampanjeinformasjon</h2>
                  <dl className="space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Merke:</dt>
                      <dd>{campaign.brand}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Modell:</dt>
                      <dd>{campaign.model}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Månedlig pris:</dt>
                      <dd className="font-semibold">{campaign.monthlyPrice.toLocaleString('nb-NO')} kr</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Oppstart:</dt>
                      <dd className="font-semibold">{campaign.downPayment.toLocaleString('nb-NO')} kr</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Varighet:</dt>
                      <dd>{campaign.durationMonths} måneder</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Km per år:</dt>
                      <dd>{campaign.kmPerYear.toLocaleString('nb-NO')} km</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Kampanjetype:</dt>
                      <dd>{campaign.campaignType}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Gyldig fra:</dt>
                      <dd>{new Date(campaign.validFrom).toLocaleDateString('nb-NO', { day: '2-digit', month: '2-digit', year: 'numeric' })}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Gyldig til:</dt>
                      <dd>{new Date(campaign.validTo).toLocaleDateString('nb-NO', { day: '2-digit', month: '2-digit', year: 'numeric' })}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <dt className="font-medium">Kilde:</dt>
                      <dd>
                        {campaign.sourceUrl ? (
                          <a 
                            href={campaign.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Lenke
                          </a>
                        ) : (
                          "Ikke oppgitt"
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Send forespørsel</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium">Navn *</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="Ditt fulle navn"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-1 font-medium">E-post *</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="din.epost@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block mb-1 font-medium">Telefon *</label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="+47 123 45 678"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {submitStatus === "submitting" ? "Sender..." : "Send forespørsel"}
                    </button>
                    
                    {submitStatus === "success" && (
                      <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                        Takk for din forespørsel! Vi kontakter deg snart.
                      </div>
                    )}
                    
                    {submitStatus === "error" && (
                      <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                        Det oppstod en feil. Vennligst prøv igjen.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </div>
  );
}
