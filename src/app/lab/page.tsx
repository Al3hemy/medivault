'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LabDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mvid, setMvid] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleUpload = async () => {
    if (!mvid || !file) return;
    setIsUploading(true);
    setUploadStatus('Uploading to secure vault...');
    
    try {
      const formData = new FormData();
      formData.append('mvid', mvid);
      formData.append('file', file);

      const res = await fetch('/api/lab/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUploadStatus(`Success! Document linked to ${mvid}`);
        setMvid('');
        setFile(null);
      } else {
        setUploadStatus('Upload failed: ' + data.error);
      }
    } catch (err) {
      setUploadStatus('Network error during upload.');
    } finally {
      setIsUploading(false);
    }
  };

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
            <h3 className="font-semibold text-lg">Upload Test Result</h3>
            <p className="text-sm text-muted-foreground">Scan patient MVID to link the test result.</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter MVID..." 
                value={mvid}
                onChange={(e) => setMvid(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" 
              />
            </div>
            <div>
              <input 
                type="file" 
                accept=".pdf,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
              />
            </div>
            <button 
              onClick={handleUpload}
              disabled={isUploading || !mvid || !file}
              className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {isUploading ? 'Uploading...' : 'Upload Result'}
            </button>
            {uploadStatus && (
              <p className={`text-sm font-medium ${uploadStatus.includes('failed') || uploadStatus.includes('error') ? 'text-destructive' : 'text-success'}`}>
                {uploadStatus}
              </p>
            )}
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Recent Uploads</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-accent/50 text-sm border border-border">
                <span className="font-semibold text-primary">CBC Test</span> • Patient: MV-8291-0391
                <div className="text-xs text-muted-foreground mt-1">Uploaded 2 hrs ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
