import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/utils/trpc";

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
      // trpc/zod errors are handled by the global error handler or can be extracted here
      const message = error.shape?.message || "Noe gikk galt. Vennligst prøv igjen senere.";
      toast.error(message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interessert i denne bilen?</CardTitle>
        <CardDescription>
          Fyll ut skjemaet under, så tar en av våre rådgivere kontakt med deg.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Fullt navn</Label>
            <Input
              id="name"
              placeholder="Ola Nordmann"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-postadresse</Label>
            <Input
              id="email"
              type="email"
              placeholder="ola@eksempel.no"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="99 00 11 22"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
            {submitMutation.isPending ? "Sender..." : "Søk nå"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
