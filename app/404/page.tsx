import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Calendar, 
  Sparkles, 
  Users, 
  Zap, 
  Mail, 
  ChevronRight,
  Terminal
} from "lucide-react"

export default function Custom404Page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-8 overflow-hidden bg-background selection:bg-primary/30">
      
      {/* --- Atmospheric Background Effects --- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.08] via-background to-background" aria-hidden="true" />
      
      {/* Refined fading grid */}
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%)'
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient light streams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] opacity-30 dark:opacity-40 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent blur-3xl rounded-full mix-blend-screen" />
      </div>

      {/* --- Main Content Layout --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">

        {/* Hero Typography */}
        <div className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-primary">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-foregrouncheckd to-foreground/50">
              Recruitment
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50 italic pr-4">
              Closed
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Recruitment is not ongoing right now. Stay tuned on the site for upcoming updates!
          </p>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mb-12">
          {/* Feature Card 1 */}
          <div className="group relative p-6 rounded-2xl bg-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Zap className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-2 font-tech">Frictionless Onboarding</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Streamlined registration process designed for zero hassle.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="group relative p-6 rounded-2xl bg-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Sparkles className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-2 font-tech">Exclusive Perks</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Unlock premium resources, tools, and member-only benefits.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="group relative p-6 rounded-2xl bg-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Calendar className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-2 font-tech">Events & Workshops</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Priority access to hackathons, tech talks, and bootcamps.</p>
          </div>

          {/* Feature Card 4 */}
          <div className="group relative p-6 rounded-2xl bg-card/40 border border-border/50 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Users className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-2 font-tech">Elite Network</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Connect with peers, alumni, and industry professionals.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mb-12">
          <Button asChild size="lg" className="h-12 px-8 rounded-full group w-full sm:w-auto shadow-[0_0_40px_-10px_hsl(var(--primary))] hover:shadow-[0_0_60px_-15px_hsl(var(--primary))] transition-all duration-300">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Return Home</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full group w-full sm:w-auto border-border/50 hover:bg-foreground/[0.02]">
            <Link href="/contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </Button>
        </div>

        {/* Elegant Email Footer */}
        <div className="mt-auto text-center">
          <p className="text-sm text-muted-foreground/80 flex items-center justify-center gap-2 flex-wrap">
            Want to be notified the moment we launch? Reach out at
            <a 
              href="mailto:acm@rvce.edu.in?subject=Membership%20Updates" 
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium transition-colors border-b border-primary/30 hover:border-primary pb-0.5"
            >
              acm@rvce.edu.in
              <ArrowLeft className="w-3 h-3 rotate-145 -translate-y-[1px]" style={{ transform: 'rotate(135deg)' }} />
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}