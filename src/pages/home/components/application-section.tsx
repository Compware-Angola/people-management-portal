import { GraduationCap } from 'lucide-react'
import { ApplicationCard } from './application-card'

export function ApplicationSection() {
  return (
    <section  id="application">
      <div className="flex justify-center mx-auto">
        <ApplicationCard
          to="/applications/teacher"
          icon={<GraduationCap className="h-6 w-6" />}
          eyebrow="Corpo Docente"
          title="Candidatura para Professor"
          description="Destinado a docentes interessados em integrar o corpo académico da instituição."
          benefits={[
            'Processo seguro e confidencial',
            'Acompanhe o estado da candidatura',
            'Envio digital de documentos',
          ]}
          cta="Candidatar-me como Professor"
        />

        {/* <ApplicationCard
          to="/applications"
          icon={<Briefcase className="h-6 w-6" />}
          eyebrow="Corpo Profissional"
          title="Candidatura para Outro Profissional"
          description="Para técnicos, investigadores, administrativos e demais profissionais."
          benefits={[
            'Dados protegidos',
            'Processo totalmente online',
            'Submissão rápida',
          ]}
          cta="Candidatar-me como Profissional"
        /> */}
      </div>
    </section>
  )
}