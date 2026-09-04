import type { NavItem } from '@/components/layout/dashboard/nav-main'
import { BriefcaseBusiness, LayoutDashboard } from 'lucide-react'

export const DASHBOARD_NAV: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    url: '/dashboard',
  },
  {
    title: 'Vagas',
    icon: BriefcaseBusiness,
    url: '/',
    hash: 'application',
  },
]
