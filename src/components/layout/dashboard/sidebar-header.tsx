import { cn } from '@/lib/utils'
import { SidebarHeader, useSidebar } from '../../ui/sidebar'
import { Link } from '@tanstack/react-router'

export function DashboardSidebarHeader() {
  const { open } = useSidebar()
  return (
    <SidebarHeader>
      <Link
        to="/dashboard"
        className={cn(
          'h-16 shrink-0 flex items-center gap-2.5',
          !open ? 'justify-center px-0' : 'px-5',
        )}
      >
        <img src="/logo_uma.webp" className="h-18 w-auto object-contain" />
      </Link>
    </SidebarHeader>
  )
}
