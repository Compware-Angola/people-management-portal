import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "../../hooks/form";


export function TextField({
    label,
    type = "text",
    placeholder,
}: {
    label: string;
    type?: string;
    placeholder?: string;
}) {
    const field = useFieldContext<string>();

    const errors = field.state.meta.errors;

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            <Input
                type={type}
                placeholder={placeholder}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
            />

            {errors.length > 0 && (
                <p className="text-sm text-destructive">
                    {errors.map((e: any) => e.message ?? e).join(", ")}
                </p>
            )}
        </div>
    );
}