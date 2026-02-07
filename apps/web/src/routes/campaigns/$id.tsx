import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useParams, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTRPC } from "@/utils/trpc";

export const Route = createFileRoute("/campaigns/$id")({
  component: CampaignDetailComponent,
});

function CampaignDetailComponent() {
  const { id } = useParams({ from: "/campaigns/$id" });
  const campaignId = parseInt(id);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { data: campaign, isLoading, error } = useQuery(
    trpc.campaign.getById.queryOptions({ id: campaignId })
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const leadMutation = useMutation({
    mutationFn: (data: { campaignId: number; name: string; email: string; phone: string }) =>
      trpc.lead.create.mutateAsync(data),
    onSuccess: () => {
      alert("Takk for din interesse! Vi kontakter deg snart.");
      setFormData({ name: "", email: "", phone: "" });
      setFormErrors({});
    },
    onError: (error) => {
      alert("Feil ved innsending av skjema: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Navn er påkrevd";
    if (!formData.email.trim()) errors.email = "E-post er påkrevd";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Ugyldig e-postadresse";
    if (!formData.phone.trim()) errors.phone = "Telefonnummer er påkrevd";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    leadMutation.mutate({
      campaignId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <button 
          onClick={() => navigate({ to: "/campaigns" })}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Tilbake til kampanjer
        </button>
        <p>Laster kampanjedetaljer...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <button 
          onClick={() => navigate({ to: "/campaigns" })}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Tilbake til kampanjer
        </button>
        <div className="text-red-600">
          {error ? `Feil: ${error.message}` : "Kampanje ikke funnet"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <button 
        onClick={() => navigate({ to: "/campaigns" })}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Tilbake til kampanjer
      </button>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <img
            src={campaign.image}
            alt={`${campaign.brand} ${campaign.model}`}
            className="h-96 w-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="mb-4 text-3xl font-bold">{campaign.title}</h1>
          
          <div className="space-y-2">
            <p><strong>Merke:</strong> {campaign.brand}</p>
            <p><strong>Modell:</strong> {campaign.model}</p>
            <p><strong>Månedlig pris:</strong> {campaign.monthlyPrice.toLocaleString('nb-NO')} NOK</p>
            <p><strong>Startleie:</strong> {campaign.downpayment.toLocaleString('nb-NO')} NOK</p>
            <p><strong>Varighet:</strong> {campaign.durationMonths} måneder</p>
            <p><strong>Kilometer per år:</strong> {campaign.kmPerYear.toLocaleString('nb-NO')}</p>
            <p><strong>Kampanjetype:</strong> {campaign.campaignType}</p>
            <p><strong>Verifisert:</strong> {campaign.verified ? "Ja" : "Nei"}</p>
            <p><strong>Gyldig fra:</strong> {new Date(campaign.validFrom).toLocaleDateString('nb-NO')}</p>
            <p><strong>Gyldig til:</strong> {new Date(campaign.validTo).toLocaleDateString('nb-NO')}</p>
            {campaign.sourceUrl && (
              <p><strong>Kilde:</strong> <a href={campaign.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{campaign.sourceUrl}</a></p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border bg-gray-50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Send forespørsel</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Navn *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full rounded-md border px-3 py-2 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ditt fulle navn"
            />
            {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-post *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full rounded-md border px-3 py-2 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="din.epost@example.com"
            />
            {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full rounded-md border px-3 py-2 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="+47 123 45 678"
            />
            {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={leadMutation.isPending}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {leadMutation.isPending ? "Sender..." : "Send forespørsel"}
          </button>
        </form>
      </div>
    </div>
  );
}