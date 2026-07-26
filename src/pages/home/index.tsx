import { ApplicationSection } from './components/application-section'
import { HeroSection } from './components/hero-section'
import { HomeHeader } from './components/home-header'
import { HowItWorksSection } from './components/how-it-works-section'
import { LoginCTA } from './components/login-cta'

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <HeroSection />
      <main className="mx-auto -mt-16 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <ApplicationSection />
        <HowItWorksSection />
        <LoginCTA />
      </main>
    </div>
  )
}