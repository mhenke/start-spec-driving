import { Button } from "./ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorDisplayProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorDisplay = ({
    message = "Noe gikk galt under henting av data.",
    onRetry,
}: ErrorDisplayProps) => (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-destructive/20 rounded-lg bg-destructive/5 text-center space-y-4">
        <div className="p-3 rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-destructive">Feil oppsto</h3>
            <p className="text-muted-foreground">{message}</p>
        </div>
        {onRetry && (
            <Button variant="outline" onClick={onRetry} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Prøv igjen
            </Button>
        )}
    </div>
);
