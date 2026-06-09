'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => setMounted(true), []);

  const getDashboardLink = () => {
    switch ((session?.user as any)?.role) {
      case 'PATIENT': return '/patient';
      case 'CLINICIAN': return '/clinician';
      case 'ADMIN': return '/admin';
      case 'LAB': return '/lab';
      default: return '/';
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 border border-transparent">
          {/* Logo Section */}
          <Link className="group active" href="/" data-status="active" aria-current="page">
            <span className="inline-flex items-center gap-2">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl [background-image:var(--gradient-primary)] shadow-glow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-plus h-5 w-5 text-primary-foreground" aria-hidden="true">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="M9 12h6"></path>
                  <path d="M12 9v6"></path>
                </svg>
                <span className="absolute inset-0 rounded-xl opacity-0 [background-image:var(--gradient-primary)] blur-md transition-opacity duration-500 group-hover:opacity-60"></span>
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">
                Medi<span className="text-gradient">Vault</span>
              </span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link className="relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground text-foreground" href="/" data-status="active" aria-current="page">
              Home
              <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full [background-image:var(--gradient-primary)]"></span>
            </Link>
            <Link href="/platform" className="relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Platform</Link>
            <Link href="/security" className="relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Security</Link>
            <Link href="/how-it-works" className="relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">How it works</Link>
            <Link href="/contact" className="relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Switch to dark mode" className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-border bg-background/60 backdrop-blur transition-colors hover:border-primary/40 hover:bg-accent" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {mounted && (
                <span className="text-primary" style={{opacity:1, transform:'none'}}>
                  {theme === 'dark' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon h-5 w-5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-5 w-5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                  )}
                </span>
              )}
            </button>
            
            {session ? (
              <>
                <Link href={getDashboardLink()} className="items-center justify-center gap-2 whitespace-nowrap font-semibold cursor-pointer transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 h-8 rounded-md px-3 text-xs hidden sm:inline-flex text-primary-foreground shadow-glow [background-image:var(--gradient-primary)]">
                  Dashboard
                </Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="items-center justify-center gap-2 whitespace-nowrap font-semibold cursor-pointer transition-all duration-300 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs hidden sm:inline-flex">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth" className="items-center justify-center gap-2 whitespace-nowrap font-semibold cursor-pointer transition-all duration-300 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs hidden sm:inline-flex">
                  Sign in
                </Link>
                <Link href="/auth?mode=signup" className="items-center justify-center gap-2 whitespace-nowrap font-semibold cursor-pointer transition-all duration-300 text-primary-foreground shadow-glow [background-image:var(--gradient-primary)] hover:brightness-110 hover:-translate-y-0.5 h-8 rounded-md px-3 text-xs hidden sm:inline-flex">
                  Get started
                </Link>
              </>
            )}

            <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background/60 lg:hidden" aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-5 w-5" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
