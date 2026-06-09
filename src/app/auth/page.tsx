'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      // Redirect based on role (could also be handled in middleware or by fetching session)
      if (email.includes('doctor')) {
        router.push('/clinician');
      } else {
        router.push('/patient');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md rounded-3xl p-8 shadow-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-2">Sign in to your MediVault account.</p>
          </div>

          {error && <div className="mb-4 text-sm text-destructive text-center">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input 
                type="email" 
                required 
                className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="patient@medivault.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input 
                type="password" 
                required 
                className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="w-full h-12 rounded-xl text-primary-foreground font-semibold shadow-glow [background-image:var(--gradient-primary)] hover:brightness-110 hover:-translate-y-0.5 transition-all mt-4">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-muted-foreground space-y-2">
            <p><strong>Demo Accounts:</strong></p>
            <p>Doctor: doctor@medivault.com / password</p>
            <p>Patient: patient@medivault.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
}