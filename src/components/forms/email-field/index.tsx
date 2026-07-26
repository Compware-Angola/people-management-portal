'use client'

import { useFieldContext } from '..'
import type { Updater } from '@tanstack/react-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'
import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailFieldProps {
  label?: string
  placeholder?: string
  icon?: ComponentType<LucideProps>
}

export function EmailField(props: EmailFieldProps) {
  const { label = 'Email', placeholder, icon: Icon } = props
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
          className={cn(Icon && 'pl-10')}
          id={field.name}
          type="email"
          value={field.state.value}
          onBlur={field.handleBlur}
          autoComplete="email"
          onChange={(e: { target: { value: Updater<string> } }) =>
            field.handleChange(e.target.value)
          }
          placeholder={placeholder}
          aria-invalid={isInvalid}
        />
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
