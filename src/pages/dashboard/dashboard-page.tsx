import { User, FileText } from 'lucide-react'
import { WelcomeHeader } from './components/welcome-header'
import { NavCard } from './components/nav-card'
import { ApplicationStatusCard } from './components/application-status-card'

export function DashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <WelcomeHeader />

      <ApplicationStatusCard />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NavCard
          title="Meu Perfil"
          description="Consulte e atualize os seus dados pessoais"
          icon={User}
          to="/accounts/profile"
          accent="primary"
        />
        <NavCard
          title="Minha Candidatura"
          description="Atualize a sua formação, experiência e documentos"
          icon={FileText}
          to="/accounts/applications"
          accent="blue"
        />
      </div>
    </div>
  )
}