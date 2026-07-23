import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export function LoginCTA() {
  return (
   <Card className="mt-24 overflow-hidden rounded-3xl shadow-lg">
          <div className="relative flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center md:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="relative max-w-xl">
              <h3 className="text-3xl font-bold  sm:text-4xl">
                Já iniciou uma candidatura?
              </h3>
              <p className="mt-3 text-base leading-relaxed ">
                Entre na sua conta para acompanhar o estado da candidatura,
                atualizar informações ou concluir etapas pendentes.
              </p>
            </div>
            <Button size="lg" variant="default" className="relative gap-2">
              <LogIn className="h-4 w-4" />
              Entrar na Plataforma
            </Button>
          </div>
        </Card>
  )
}