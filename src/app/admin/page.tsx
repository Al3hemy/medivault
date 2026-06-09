'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
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
          <h1 className="text-3xl font-display font-bold mb-2">Hospital Administration</h1>
          <p className="text-muted-foreground">Manage hospital staff, departments, and audit logs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Staff Directory</h3>
            <p className="text-sm text-muted-foreground flex-1">Manage clinicians, nurses, and lab technicians.</p>
            <button className="primary-btn h-10 rounded-lg text-sm bg-primary/10 text-primary hover:bg-primary/20">Manage Staff</button>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg">System Audit Logs</h3>
            <p className="text-sm text-muted-foreground flex-1">View system access records and HIPAA compliance logs.</p>
            <button className="primary-btn h-10 rounded-lg text-sm bg-primary/10 text-primary hover:bg-primary/20">View Logs</button>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Department Settings</h3>
            <p className="text-sm text-muted-foreground flex-1">Configure hospital wards and clinical departments.</p>
            <button className="primary-btn h-10 rounded-lg text-sm bg-primary/10 text-primary hover:bg-primary/20">Configure</button>
          </div>
        </div>
      </div>
    </div>
  );
}
