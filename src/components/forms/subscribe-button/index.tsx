import { Button } from '@/components/ui/button'
import { useFormContext } from '..'
import { Spinner } from '@/components/ui/spinner'

type Props = React.ComponentProps<'button'> & { label: string }
export function SubscribeButton({ label, className, ...rest }: Props) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting} className={className} {...rest}>
          {isSubmitting ? (
            <>
              <Spinner />
            </>
          ) : (
            label
          )}
        </Button>
      )}
    </form.Subscribe>
  )
}
