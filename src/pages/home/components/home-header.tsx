import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Boxes,  LogInIcon } from "lucide-react";

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-3" to="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
             <Boxes className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-semibold leading-tight text-foreground">
                UMA
              </p>
              <p className="text-xs text-muted-foreground">
                  Universidade Metodista de Angola
              </p>
            </div>
          </Link>
<Link to="/login">
 <Button variant="outline" className="gap-2">
            <LogInIcon className="h-4 w-4" />
            Entrar
          </Button>
</Link>
         
        </div>
      </header>
  )
}


