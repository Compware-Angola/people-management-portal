import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useFieldContext } from '..'
import { useRef } from 'react'
import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

type TextFieldProps = {
  label?: string
  placeholder?: string
  icon?: ComponentType<LucideProps>
} & React.ComponentProps<'input'>

export function TextField(props: TextFieldProps) {
  const { label = 'Texto', placeholder, icon: Icon, ...rest } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <div className="relative">
        {Icon && (
          <Icon
            onClick={() => inputRef.current?.focus()}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
        )}
        <Input
          ref={inputRef}
          {...rest}
          className={cn(Icon && 'pl-10')}
          id={field.name}
          type={rest.type || 'text'}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={isInvalid}
        />
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
