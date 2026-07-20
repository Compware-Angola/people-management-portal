import { withForm } from "../../hooks/form";
import { personalSchema, wizardFormOpts } from "../form/shared-form";


export const PersonalStep = withForm({
    ...wizardFormOpts,
    props: {
        step: 0,
        setStep: (_step: number) => { },
    },
    render: function Render({ form, step, setStep }) {
        return (
            <form.FormGroup
                name="personal"
                validators={{ onDynamic: personalSchema }}
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
                        <form.AppField name="personal.fullName">
                            {(field) => <field.TextField label="Nome completo" />}
                        </form.AppField>

                        <form.AppField name="personal.birthDate">
                            {(field) => (
                                <field.TextField label="Data nascimento" type="date" />
                            )}
                        </form.AppField>

                        <form.AppField name="personal.nationality">
                            {(field) => <field.TextField label="Nacionalidade" />}
                        </form.AppField>

                        <div className="flex justify-end pt-4">
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