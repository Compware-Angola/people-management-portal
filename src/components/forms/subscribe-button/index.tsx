import { Button } from '@/components/ui/button'
import { useFormContext } from '..'

type Props = React.ComponentProps<'button'> & {label:string}
export function SubscribeButton({ label, className, ...rest }: Props) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting} className={className} {...rest}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
