import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/layout/dashboard/user-menu";
import { useAuth } from "@/hooks/auth/use-auth";
import { Link } from "@tanstack/react-router";
import { LogInIcon, UserPlus } from "lucide-react";

export function HomeHeader() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            className="flex items-center gap-3"
            to={isAuthenticated ? '/dashboard' : '/'}
          >
              <img src="/logo_uma.webp" alt="Universidade Metodista de Angola" className="h-24 w-24 object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button asChild variant="ghost" className="gap-2">
                  <Link to="/create-account">
                    <UserPlus className="h-4 w-4" />
                    Criar conta
                  </Link>
                </Button>

                <Button asChild variant="outline" className="gap-2">
                  <Link to="/login">
                    <LogInIcon className="h-4 w-4" />
                    Entrar
                  </Link>
                </Button>
              </>
            )}
          </div>
         
        </div>
      </header>
  )
}
