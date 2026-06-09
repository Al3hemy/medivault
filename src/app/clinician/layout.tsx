import type { Metadata } from 'next';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Clinician Portal - MediVault',
};

export default function ClinicianLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#0f172a', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
          <Stethoscope size={24} />
          MediVault | Clinician
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>Dr. Smith (MDCN: 10994)</span>
        </div>
      </header>
      <main style={{ flex: 1, padding: '2rem', background: 'var(--bg-color)' }}>
        {children}
      </main>
    </div>
  );
}
