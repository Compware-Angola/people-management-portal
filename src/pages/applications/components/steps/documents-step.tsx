import { withForm } from "../../hooks/form";
import { Button } from "@/components/ui/button";
import { documentsSchema, wizardFormOpts } from "../form/shared-form";

export const DocumentsStep = withForm({
    ...wizardFormOpts,
    props: {
        step: 2,
        setStep: (_step: number) => { },
    },
    render: function Render({ form, step, setStep }) {
        return (
            <form.FormGroup

                name="documents"
                validators={{ onDynamic: documentsSchema }}
                onGroupSubmit={() => form.handleSubmit()}
            >
                {(formGroup) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            formGroup.handleSubmit();
                        }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <form.AppField name="documents.cv">
                                {(field) => (
                                    <field.FileField
                                        label="Curriculum Vitae"
                                        accept=".pdf,.doc,.docx"
                                    />
                                )}
                            </form.AppField>

                            <form.AppField name="documents.identificationDocument">
                                {(field) => (
                                    <field.FileField
                                        label="Documento de identificação"
                                        accept=".pdf,.jpg,.png"
                                    />
                                )}
                            </form.AppField>

                            <form.AppField name="documents.certificates">
                                {(field) => (
                                    <field.FileField
                                        label="Certificados"
                                        accept=".pdf,.jpg,.png"
                                        multiple
                                    />
                                )}
                            </form.AppField>
                        </div>


                        <div className="flex justify-between pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep(step - 1)}
                            >
                                Voltar
                            </Button>

                            <form.AppForm>
                                <form.SubscribeButton label="Enviar candidatura" />
                            </form.AppForm>
                        </div>
                    </form>
                )}
            </form.FormGroup>
        );
    },
});