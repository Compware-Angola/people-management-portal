// application-form.tsx
import { useState } from "react";
import { revalidateLogic } from "@tanstack/react-form";

import { PersonalStep } from "./steps/personal-step";
import { ContactStep } from "./steps/contact-step";
import { DocumentsStep } from "./steps/documents-step";
import { useAppForm } from "../hooks/form";
import { applicationSchema, wizardFormOpts } from "./form/shared-form";
import { StepsSidebar } from "./StepsSidebar";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
    { title: "Dados pessoais" },
    { title: "Contacto" },
    { title: "Documentos" },
];

export function ApplicationForm() {
    const [step, setStep] = useState(0);

    const form = useAppForm({
        ...wizardFormOpts,
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: applicationSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value);
        },
    });

    const current = steps[step];
    const progress = ((step + 1) / steps.length) * 100;

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row bg-muted/40">
            <StepsSidebar steps={steps} currentStep={step} />

            <main className="flex-1 flex justify-center px-6 py-12 lg:py-20">
                <div className="w-full">
                    {/* Barra de progresso */}
                    <div className="mb-6 h-1 w-full rounded-full bg-border overflow-hidden">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <span>Etapa {step + 1} de {steps.length}</span>
                    </div>

                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        {current.title}
                    </h1>

                    <Card
                        key={step}
                        className="mt-6 border-border/60 shadow-sm shadow-black/[0.03] animate-in fade-in slide-in-from-bottom-1 duration-300"
                    >
                        <CardContent className="p-6 lg:p-8">
                            {step === 0 && (
                                <PersonalStep form={form} step={step} setStep={setStep} />
                            )}
                            {step === 1 && (
                                <ContactStep form={form} step={step} setStep={setStep} />
                            )}
                            {step === 2 && (
                                <DocumentsStep form={form} step={step} setStep={setStep} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}