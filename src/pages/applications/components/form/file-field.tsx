import { useRef, useState } from "react";
import { useFieldContext } from "../../hooks/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { File as FileIcon, Upload, X } from "lucide-react";

function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function FileField({
    label,
    accept,
    multiple = false,
    description,
}: {
    label: string;
    accept?: string;
    multiple?: boolean;
    description?: string;
}) {
    const field = useFieldContext<File | File[] | undefined>();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const errors = field.state.meta.errors;
    const hasError = errors.length > 0;
    const value = field.state.value;

    const files: File[] = multiple
        ? Array.isArray(value)
            ? value
            : []
        : value instanceof File
            ? [value]
            : [];

    function addFiles(fileList: FileList | File[]) {
        const incoming = Array.from(fileList);
        if (incoming.length === 0) return;

        if (multiple) {
            field.handleChange([...files, ...incoming]);
        } else {
            field.handleChange(incoming[0]);
        }
        field.handleBlur();
    }

    function removeFile(index: number) {
        if (multiple) {
            field.handleChange(files.filter((_, i) => i !== index));
        } else {
            field.handleChange(undefined);
        }
    }

    return (
        <div className="space-y-2">
            <Label>{label}</Label>

            {description && (
                <p className="text-sm text-muted-foreground -mt-1">{description}</p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = "";
                }}
            />

            <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    addFiles(e.dataTransfer.files);
                }}
                className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors cursor-pointer",
                    isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40",
                    hasError && "border-destructive/60"
                )}
            >
                <Upload className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Clique para escolher</span>{" "}
                    ou arraste o ficheiro aqui
                </p>
                {accept && (
                    <p className="text-xs text-muted-foreground/70">{accept}</p>
                )}
            </div>

            {files.length > 0 && (
                <ul className="space-y-2">
                    {files.map((file, index) => (
                        <li
                            key={`${file.name}-${index}`}
                            className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2"
                        >
                            <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatBytes(file.size)}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                aria-label={`Remover ${file.name}`}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {hasError && (
                <p className="text-sm text-destructive">
                    {errors.map((e: any) => e.message ?? e).join(", ")}
                </p>
            )}
        </div>
    );
}