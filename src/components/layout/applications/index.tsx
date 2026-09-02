import { Outlet, useLocation } from '@tanstack/react-router'

export function ApplicationLayout() {
  const location = useLocation()
  const isTeacherApplication = location.pathname.includes(
    '/profile-completion',
  )

  const title = isTeacherApplication
    ? 'Candidatura para Docente'
    : 'Candidatura Geral'

  const description = isTeacherApplication
    ? 'Preencha o formulário para candidatura a uma vaga de docente.'
    : 'Preencha o formulário de candidatura para integrar a nossa instituição.'

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
      <aside
        className="
            relative 
            flex 
            h-64  
            lg:h-screen
            flex-col 
            justify-between 
            overflow-hidden 
            p-8
            lg:p-12
        "
      >
        {/* Imagem */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/black-students.jpg')",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(110,15,15,.65)',
          }}
        />

        {/* Gradiente */}
        <div
          className="
                absolute 
                inset-0 
                bg-gradient-to-b 
                from-black/20 
                via-transparent 
                to-black/40
            "
        />

        <div className="relative z-10 h-6 lg:h-12" />

        <div className="relative z-10 max-w-xl text-white">
          <h1
            className="
                    text-3xl
                    lg:text-5xl
                    font-bold
                    leading-tight
                "
          >
            {title}
          </h1>

          <p className="mt-3 lg:mt-5 text-white/90">{description}</p>
        </div>

        <div className="relative z-10 mt-5">
          <p className="text-xs text-white/75">
            © {new Date().getFullYear()} Universidade Metodista de Angola
          </p>
        </div>
      </aside>

      {/* FORMULÁRIO */}
      <main
        className="
            flex 
            flex-1
            items-center 
            justify-center 
            bg-white 
            p-6 
            sm:p-10
        "
      >
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
