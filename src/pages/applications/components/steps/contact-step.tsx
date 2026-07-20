import { withForm } from "../../hooks/form";
import { Button } from "@/components/ui/button";
import { contactSchema, wizardFormOpts } from "../form/shared-form";

export const ContactStep = withForm({
    ...wizardFormOpts,
    props: {
        step: 1,
        setStep: (_step: number) => { },
    },
    render: function Render({ form, step, setStep }) {
        return (
            <form.FormGroup
                name="contact"
                validators={{ onDynamic: contactSchema }}
                onGroupSubmit={() => setStep(step + 1)}
            >
                {(formGroup) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            formGroup.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        <form.AppField name="contact.email">
                            {(field) => (
                                <field.TextField
                                    label="Email"
                                    type="email"
                                    placeholder="exemplo@email.com"
                                />
                            )}
                        </form.AppField>

                        <form.AppField name="contact.phone">
                            {(field) => (
                                <field.TextField
                                    label="Telefone"
                                    placeholder="+244 900 000 000"
                                />
                            )}
                        </form.AppField>

                        <form.AppField name="contact.address">
                            {(field) => (
                                <field.TextField
                                    label="Morada"
                                    placeholder="Rua, bairro..."
                                />
                            )}
                        </form.AppField>

                        <div className="flex justify-between pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep(step - 1)}
                            >
                                Voltar
                            </Button>

                            <form.AppForm>
                                <form.SubscribeButton label="Continuar" />
                            </form.AppForm>
                        </div>
                    </form>
                )}
            </form.FormGroup>
        );
    },
});