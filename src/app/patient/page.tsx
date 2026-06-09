'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

export default function PatientDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetch('/api/patient/profile')
        .then(res => res.json())
        .then(data => {
          if (data.patient) {
            setPatientData(data.patient);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [session]);

  if (status === 'loading' || loading) return <div className="p-24 text-center text-muted-foreground">Loading your secure vault...</div>;
  if (!session || !patientData) return <div className="p-24 text-center">Failed to load profile. Please sign in as a Patient.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-4 pt-24 pb-12"
    >
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {session.user?.name}</p>
        </div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="flex items-center gap-6 rounded-xl border border-border/60 bg-background/60 p-4 shadow-sm"
        >
          <div className="bg-white p-2 rounded-lg">
            <QRCodeSVG value={patientData.mvid} size={80} level="H" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your MediVault ID</p>
            <p className="text-xl font-bold text-gradient mt-1 tracking-widest">{patientData.mvid}</p>
            <p className="text-xs text-muted-foreground mt-2">Scan for instant clinical access</p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid gap-6 md:grid-cols-3 mb-8"
      >
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="text-sm font-medium text-muted-foreground">Active Access Tokens</h3>
          <p className="text-3xl font-bold mt-2">{patientData.accessTokens?.filter((t: any) => t.status === 'ACTIVE').length || 0}</p>
          <button className="mt-4 text-sm font-semibold text-primary hover:underline">Manage Access</button>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="text-sm font-medium text-muted-foreground">Total Records</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="text-sm font-medium text-muted-foreground">Last Consultation</h3>
          <p className="text-xl font-bold mt-2">-</p>
          <p className="text-sm text-muted-foreground mt-1">No recent visits</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="border-b border-border/60 p-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Active Doctor Sessions</h2>
          <button className="text-xs font-semibold px-3 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors">
            Revoke All
          </button>
        </div>
        <div className="p-6">
          {patientData.accessTokens?.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No doctors currently have access to your vault.</p>
          ) : (
            <div className="space-y-4">
              {patientData.accessTokens?.filter((t: any) => t.status === 'ACTIVE').map((token: any) => (
                <div key={token.id} className="rounded-xl border border-border/40 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{token.provider?.name || 'Unknown Doctor'}</p>
                    <p className="text-xs text-muted-foreground">Expires: {new Date(token.expiresAt).toLocaleString()}</p>
                  </div>
                  <button className="text-xs text-destructive hover:underline font-medium">Revoke</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
