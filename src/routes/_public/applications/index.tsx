import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/applications/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/applications/"!</div>
}
