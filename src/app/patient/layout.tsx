import type { Metadata } from 'next';
import { Activity } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Patient Portal - MediVault',
};

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'var(--primary)', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
          <Activity size={24} />
          MediVault | Patient
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>NIN: 12345678901</span>
        </div>
      </header>
      <main style={{ flex: 1, padding: '2rem', background: 'var(--bg-color)' }}>
        {children}
      </main>
    </div>
  );
}
