'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clinicians, setClinicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session?.user && (session.user as any).role === 'ADMIN') {
      fetch('/api/admin/clinicians')
        .then(res => res.json())
        .then(data => {
          if (data.clinicians) setClinicians(data.clinicians);
          setLoading(false);
        });
    }
  }, [status, router, session]);

  if (status === 'loading' || loading) return <div className="p-24 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="glass-panel p-8 rounded-2xl">
          <h1 className="text-3xl font-display font-bold mb-2">Hospital Administration</h1>
          <p className="text-muted-foreground">Manage hospital staff, departments, and audit logs.</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="font-semibold text-lg mb-4">Clinician Directory</h3>
          {clinicians.length === 0 ? (
            <p className="text-sm text-muted-foreground">No clinicians registered yet.</p>
          ) : (
            <div className="space-y-4">
              {clinicians.map((clinician) => (
                <div key={clinician.id} className="p-4 border border-border rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{clinician.user.name}</p>
                    <p className="text-sm text-muted-foreground">{clinician.user.email} • MDCN: {clinician.mdcnNumber}</p>
                  </div>
                  <button className="text-xs font-semibold px-3 py-1 rounded-full bg-success/10 text-success border border-success/20">
                    Verified
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
