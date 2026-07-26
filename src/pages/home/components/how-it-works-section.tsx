import { StepCard } from "./step-card";


export function HowItWorksSection() {
  return (
    <section className="mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Como funciona
        </p>

        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
          Três passos para submeter a sua candidatura
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <StepCard
          n="01"
          title="Escolha o tipo de candidatura"
          text="Selecione o perfil..."
        />

        <StepCard
          n="02"
          title="Preencha e envie os documentos"
          text="Complete o formulário..."
        />

        <StepCard
          n="03"
          title="Acompanhe em tempo real"
          text="Receba notificações..."
        />
      </div>
    </section>
  )
}