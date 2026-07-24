import type { NavItem } from '@/components/layout/dashboard/nav-main'
import { UserCircle, User, FileText } from 'lucide-react'

export const ACCOUNT: NavItem[] = [
  {
    title: 'Conta',
    url: '/accounts',
    icon: UserCircle,
    items: [
      {
        title: 'Perfil',
        url: '/accounts/profile',
        icon: User,
      },
      {
        title: 'Minha Candidatura',
        url: '/accounts/applications',
        icon: FileText,
      },
    ],
  },
]