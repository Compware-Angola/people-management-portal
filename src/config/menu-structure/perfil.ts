import type { NavItem } from '@/components/layout/dashboard/nav-main'
import { User } from 'lucide-react'

export const PROFILE_NAV: NavItem[] = [
  {
    title: 'Perfil',
    icon: User,
    url: '/profile',
  },
]
