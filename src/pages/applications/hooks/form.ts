import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "../components/form/text-field";
import { FileField } from "../components/form/file-field";
import { SubscribeButton } from "../components/form/subscribe-button";


export const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        TextField,
        FileField,
    },
    formComponents: {
        SubscribeButton,
    },
});