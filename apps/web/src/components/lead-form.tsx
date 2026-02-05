import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { useTRPC } from "@/utils/trpc";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

interface LeadFormProps {
    campaignId: string;
}

export function LeadForm({ campaignId }: LeadFormProps) {
    const trpc = useTRPC();
    const createLead = useMutation(trpc.lead.create.mutationOptions());

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            campaignId: campaignId,
        },
        validators: {
            onSubmit: z.object({
                name: z.string().min(1, "Navn er påkrevd"),
                email: z.string().email("Ugyldig e-postadresse"),
                phone: z.string().regex(/^\d{8}$/, "Telefonnummer må være 8 siffer"),
                campaignId: z.string(),
            }),
        },
        onSubmit: async ({ value }) => {
            try {
                await createLead.mutateAsync(value);
                toast.success("Takk for din interesse! Vi kontakter deg snart.");
                form.reset();
            } catch (error: any) {
                toast.error(error.message || "Noe gikk galt. Vennligst prøv igjen.");
            }
        },
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Interessert?</CardTitle>
                <CardDescription>
                    Fyll ut skjemaet under, så tar en av våre rådgivere kontakt med deg.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <form.Field name="name">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Navn</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    placeholder="Ditt fulle navn"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    disabled={createLead.isPending}
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.toString()} className="text-xs text-destructive">
                                        {typeof error === "string" ? error : (error as any)?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="email">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>E-post</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="email"
                                    placeholder="din@epost.no"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    disabled={createLead.isPending}
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.toString()} className="text-xs text-destructive">
                                        {typeof error === "string" ? error : (error as any)?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="phone">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Telefon</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="tel"
                                    placeholder="8 siffer"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    disabled={createLead.isPending}
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.toString()} className="text-xs text-destructive">
                                        {typeof error === "string" ? error : (error as any)?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Subscribe>
                        {(state) => (
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={state.isSubmitting || !state.canSubmit}
                            >
                                {state.isSubmitting ? "Sender..." : "Send forespørsel"}
                            </Button>
                        )}
                    </form.Subscribe>
                </form>
            </CardContent>
        </Card>
    );
}
