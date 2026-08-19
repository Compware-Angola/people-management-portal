import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { EmailField } from './email-field'
import { PasswordField } from './password-field'
import { TextField } from './text-field'
import { TextareaField } from './text-area-field'
import { OTPField } from './otp-field'
import { AsyncComboboxField, ComboboxField } from './combobox-field'
import { SelectField } from './select-field'
import { FileField } from './file-field'
import { UploadFileField } from './upload-file-field'
import { SubscribeButton } from './subscribe-button'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    EmailField,
    PasswordField,
    TextField,
    TextareaField,
    OTPField,
    AsyncComboboxField,
    SelectField,
    ComboboxField,
    FileField,
    UploadFileField,
  },
  formComponents: {
    SubscribeButton,
  },
})
