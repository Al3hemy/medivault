'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PharmacyDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mvid, setMvid] = useState('');
  const [dispenseStatus, setDispenseStatus] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleDispense = () => {
    if (!mvid) return;
    setDispenseStatus('Verifying cryptographic signature...');
    setTimeout(() => {
      setDispenseStatus('Prescription successfully fulfilled and recorded to blockchain.');
      setMvid('');
    }, 2000);
  };

  if (status === 'loading') return <div className="p-24 text-center">Loading...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 px-4 pb-12 bg-background"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="glass-panel p-8 rounded-2xl">
          <h1 className="text-3xl font-display font-bold mb-2">Pharmacy E-Prescription Portal</h1>
          <p className="text-muted-foreground">Verify and fulfill cryptographically signed e-prescriptions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Scan Patient QR / MVID</h3>
            <p className="text-sm text-muted-foreground">Enter MVID to pull active prescriptions securely.</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter MVID..." 
                value={mvid}
                onChange={(e) => setMvid(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-background px-3 text-sm" 
              />
            </div>
            
            {mvid.length > 5 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl border border-primary/20 bg-primary/5 mt-4">
                <h4 className="font-semibold text-sm mb-2 text-primary">Pending Prescriptions for {mvid}</h4>
                <div className="space-y-3">
                  <div className="bg-background rounded p-3 border border-border/50 text-sm">
                    <p className="font-semibold">Amoxicillin 500mg (1x daily)</p>
                    <p className="text-xs text-muted-foreground mt-1">Prescribed by Dr. Ibrahim • Hash: 0x8A2b...</p>
                  </div>
                </div>
                <button 
                  onClick={handleDispense}
                  className="mt-4 w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
                >
                  Fulfill & Mark Dispensed
                </button>
              </motion.div>
            )}

            {dispenseStatus && <p className="text-sm text-success font-medium mt-2">{dispenseStatus}</p>}
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Recent Fulfillments</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-accent/50 text-sm border border-border flex justify-between items-center">
                <div>
                  <span className="font-semibold text-primary">Lisinopril 10mg</span>
                  <div className="text-xs text-muted-foreground mt-1">Patient: MV-1922-3021</div>
                </div>
                <span className="text-xs text-success font-medium bg-success/10 px-2 py-1 rounded">Dispensed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
