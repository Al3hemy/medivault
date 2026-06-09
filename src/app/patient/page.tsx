'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PatientDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  if (status === 'loading') return <div className="p-24 text-center">Loading...</div>;
  if (!session) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {session.user?.name}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-background/60 p-4 shadow-sm text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your MediVault ID</p>
          <p className="text-xl font-bold text-gradient mt-1">MV-2026-7X4Q-K2P9</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Active Access Tokens</h3>
          <p className="text-3xl font-bold mt-2">1</p>
          <button className="mt-4 text-sm font-semibold text-primary hover:underline">Manage Access</button>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Records</h3>
          <p className="text-3xl font-bold mt-2">14</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Last Consultation</h3>
          <p className="text-xl font-bold mt-2">2 Days Ago</p>
          <p className="text-sm text-muted-foreground mt-1">St. Nicholas Hospital</p>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border/60 p-6">
          <h2 className="text-lg font-semibold">Recent Health Records</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="rounded-xl border border-border/40 p-4 transition-colors hover:bg-accent/40 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success border border-success/20">Verified</span>
                    <p className="text-sm font-medium">General Consultation</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Dr. Ibrahim • General Hospital Gbagada</p>
                  <p className="text-xs text-muted-foreground/80 font-mono bg-background/50 inline-block px-2 py-1 rounded">Hash: 8f4e2...a91c</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">May 15, 2026</p>
                  <button className="mt-2 text-xs font-semibold text-primary hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
