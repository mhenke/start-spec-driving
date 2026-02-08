import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTRPC } from "../utils/trpc";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // Assuming lucide-react is available (usually is with shadcn)

// We should share this schema, but for now re-defining to move fast
const leadSchema = z.object({
    name: z.string().min(1, "Navn er påkrevd"),
    email: z.string().email("Ugyldig e-post"),
    phone: z.string().min(8, "Ugyldig telefonnummer"),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
    campaignId: number;
}

export function LeadForm({ campaignId }: LeadFormProps) {
    const trpc = useTRPC();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadSchema),
    });

    const createLead = useMutation(trpc.lead.create.mutationOptions({
        onSuccess: () => {
            toast.success("Interesse registrert! Vi tar kontakt snart.");
            reset();
            setIsSubmitting(false);
        },
        onError: (err) => {
            toast.error(`Noe gikk galt: ${err.message}`);
            setIsSubmitting(false);
        },
    }));

    const onSubmit = (data: LeadFormData) => {
        setIsSubmitting(true);
        createLead.mutate({
            ...data,
            campaignId,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div className="space-y-2">
                <Label htmlFor="name">Navn</Label>
                <Input id="name" placeholder="Ditt navn" {...register("name")} />
                {errors.name && (
                    <p className="text-sm text-destructive text-red-500">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">E-post</Label>
                <Input id="email" type="email" placeholder="din@epost.no" {...register("email")} />
                {errors.email && (
                    <p className="text-sm text-destructive text-red-500">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" type="tel" placeholder="Mobilnummer" {...register("phone")} />
                {errors.phone && (
                    <p className="text-sm text-destructive text-red-500">{errors.phone.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sender...
                    </>
                ) : (
                    "Meld interesse"
                )}
            </Button>
        </form>
    );
}
