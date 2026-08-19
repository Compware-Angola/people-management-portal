import { withForm } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { documentsSchema } from '../schemas/documents.schema'
import { wizardFormOpts } from '../utils'

export const DocumentsStep = withForm({
  ...wizardFormOpts,
  props: {
    step: 3,
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
              e.preventDefault()
              e.stopPropagation()
              formGroup.handleSubmit()
            }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <form.AppField name="documents.identificationDocument">
                {(field) => (
                  <field.UploadFileField
                    label="BI/PASSAPORTE(*)"
                    accept=".pdf,.jpg,.png"

                    maxSizeMB={2}
                  />
                )}
              </form.AppField>
              <form.AppField name="documents.courseCertificate">
                {(field) => (
                  <field.UploadFileField
                    label="Certificado INAREES (*)"
                    accept=".pdf,.jpg,.png"
                  />
                )}
              </form.AppField>


              <form.AppField name="documents.cv">
                {(field) => (
                  <field.UploadFileField
                    label="Curriculum(*)"
                    accept=".pdf,.doc,.docx"
                  />
                )}
              </form.AppField>

              <form.AppField name="documents.pedagogicalAggregation">
                {(field) => (
                  <field.UploadFileField
                    label="Agregação Pedagógica (*)"
                    accept=".pdf,.jpg,.png"
                  />
                )}
              </form.AppField>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <form.AppField name="documents.certificates">
                {(field) => (
                  <field.UploadFileField
                    label="Diplomas(*)"
                    accept=".pdf,.jpg,.png"
                    multiple
                  />
                )}
              </form.AppField>

            </div>

            <div className="flex justify-between border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Voltar
              </Button>

              <form.AppForm>
                <form.SubscribeButton label="Finalizar"  />
              </form.AppForm>
            </div>
          </form>
        )}
      </form.FormGroup>
    )
  },
})