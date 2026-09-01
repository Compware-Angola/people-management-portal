import { Link } from '@tanstack/react-router'
import { Mail, MapPin, Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <img
            src="/logo_uma.webp"
            alt="Universidade Metodista de Angola"
            className="h-11 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Portal oficial de vagas e candidaturas da Universidade Metodista de
            Angola. Um processo digital, transparente e confidencial.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base text-foreground">Navegação</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-smooth hover:text-foreground">
                Vagas abertas
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="transition-smooth hover:text-foreground"
              >
                Minhas candidaturas
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="transition-smooth hover:text-foreground"
              >
                Entrar
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-foreground">Contactos</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Rua Nossa Senhora da Muxima, Luanda, Angola
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              +244 222 000 000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              recrutamento@metodista.ao
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © 2026 Universidade Metodista de Angola. Todos os direitos
            reservados.
          </p>
          <p>Portal Académico — Vagas e Candidaturas</p>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-brand-navy via-brand-yellow to-brand-red" />
    </footer>
  )
}
