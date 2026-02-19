import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/utils/trpc";

import { ShieldCheck, Zap } from "lucide-react";

interface LeadFormProps {
  campaignId: number;
}

export function LeadForm({ campaignId }: LeadFormProps) {
  const trpc = useTRPC();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const submitMutation = useMutation(trpc.leads.submit.mutationOptions());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitMutation.mutateAsync({
        campaignId,
        name,
        email,
        phone,
      });

      toast.success("Takk for din interesse! Vi kontakter deg snart.");
      setName("");
      setEmail("");
      setPhone("");
    } catch (error: any) {
      const message = error.shape?.message || "Noe gikk galt. Vennligst prøv igjen senere.";
      toast.error(message);
    }
  };

  return (
    <Card className="sticky top-8 border-none shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-extrabold tracking-tight">
          Interessert i denne bilen?
        </CardTitle>
        <CardDescription className="text-sm">
          Fyll ut skjemaet under, så kontakter en av våre rådgivere deg for et uforpliktende tilbud.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Navn
            </Label>
            <Input
              id="name"
              placeholder="Ditt fulle navn"
              required
              className="h-12"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              E-post
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="navn@eksempel.no"
              required
              className="h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Telefon
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="8 siffre"
              required
              className="h-12"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button type="submit" className="h-12 w-full text-base font-bold" disabled={submitMutation.isPending}>
            {submitMutation.isPending ? "Sender..." : "Send forespørsel"}
          </Button>
          <p className="text-center text-[10px] text-muted-foreground">
            Ved å sende forespørselen godtar du at vi behandler dine personopplysninger i henhold til våre personvernsvilkår.
          </p>
        </form>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Trygg handel</span>
              <span className="text-[10px] text-muted-foreground">Autorisert bilforhandler</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
              <Zap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Rask levering</span>
              <span className="text-[10px] text-muted-foreground">Bilen står på lager nå</span>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <p className="text-[11px] font-medium text-muted-foreground">
            Har du spørsmål? <a href="tel:22110000" className="text-primary hover:underline">Ring oss på 22 11 00 00</a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
