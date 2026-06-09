'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LabDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  if (status === 'loading') return <div className="p-24 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="glass-panel p-8 rounded-2xl">
          <h1 className="text-3xl font-display font-bold mb-2">Laboratory Portal</h1>
          <p className="text-muted-foreground">Process lab orders and upload test results securely.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Pending Orders</h3>
            <p className="text-sm text-muted-foreground">Scan patient MVID to view pending lab tests requested by clinicians.</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter MVID..." className="flex-1 rounded-lg border border-border bg-background px-3 text-sm" />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110">Lookup</button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Recent Uploads</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-accent/50 text-sm border border-border">
                <span className="font-semibold text-primary">CBC Test</span> • Patient: MVID-7829
                <div className="text-xs text-muted-foreground mt-1">Uploaded 2 hrs ago</div>
              </div>
              <div className="p-3 rounded-lg bg-accent/50 text-sm border border-border">
                <span className="font-semibold text-primary">Lipid Panel</span> • Patient: MVID-3341
                <div className="text-xs text-muted-foreground mt-1">Uploaded 5 hrs ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
