import { User, FileText } from 'lucide-react'
import { WelcomeHeader } from './components/welcome-header'
import { NavCard } from './components/nav-card'


export function DashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <WelcomeHeader />

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

        {/* <NavCard
          title="Alterar Senha"
          description="Mantenha a sua conta segura"
          icon={KeyRound}
          to="/profile"
          accent="amber"
        />

        <NavCard
          title="Ajuda e Suporte"
          description="Tire dúvidas sobre o processo de candidatura"
          icon={HelpCircle}
          to="/support"
          accent="emerald"
        /> */}
      </div>
    </div>
  )
}