'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClinicianDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchMvid, setSearchMvid] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [showEntryForm, setShowEntryForm] = useState(false);
  
  const [complaint, setComplaint] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // AI Co-Pilot hook
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (complaint.length > 15) {
        setIsTyping(true);
        fetch('/api/ai/copilot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ complaint })
        })
        .then(res => res.json())
        .then(data => {
          setAiSuggestions(data.suggestions || []);
          setIsTyping(false);
        })
        .catch(() => setIsTyping(false));
      } else {
        setAiSuggestions([]);
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(timeoutId);
  }, [complaint]);

  if (status === 'loading') return <div className="p-24 text-center">Loading...</div>;
  if (!session) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleGenerateSummary = async () => {
    setAiSummary('Generating...');
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mvid: searchMvid || 'MV-2026-7X4Q-K2P9' }),
      });
      const data = await res.json();
      setAiSummary(data.summary || 'Failed to generate summary.');
    } catch (err) {
      setAiSummary('Error connecting to AI service.');
    }
  };

  const handleDiagnosisSubmit = async () => {
    if (!complaint) return;
    setIsDiagnosing(true);
    setSubmissionStatus('Generating cryptographic hash...');

    try {
      const res = await fetch('/api/blockchain/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mvid: searchMvid || 'MV-2026-7X4Q-K2P9', complaint, diagnosis: '' })
      });
      const data = await res.json();

      if (data.success) {
        setSubmissionStatus(`Blockchain Secured. TxHash: ${data.txHash.substring(0,10)}...`);
        setTimeout(() => {
          setSubmissionStatus('');
          setComplaint('');
          setAiSuggestions([]);
          setShowEntryForm(false);
        }, 3000);
      } else {
        setSubmissionStatus('Failed to secure record.');
      }
    } catch (err) {
      setSubmissionStatus('Network error.');
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleVideoCall = () => {
    alert("Telemedicine SDK requires camera permissions. (Mock UI Activated: Dialing Patient...)");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clinician Portal</h1>
          <p className="text-muted-foreground mt-1">Dr. {session.user?.name} • General Practice</p>
        </div>
        <button onClick={handleVideoCall} className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-semibold text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
          Video Consult
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Patient Lookup</h2>
            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">MediVault ID</label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono uppercase"
                  placeholder="MV-XXXX-XXXX-XXXX"
                  value={searchMvid}
                  onChange={e => setSearchMvid(e.target.value)}
                />
              </div>
              <button disabled={isLoading} className="w-full h-10 rounded-xl text-primary-foreground font-semibold shadow-glow [background-image:var(--gradient-primary)] hover:brightness-110 hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50">
                {isLoading ? 'Verifying...' : 'Access Records'}
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">AI Summarizer</h2>
            <p className="text-xs text-muted-foreground mb-4">Quickly digest a patient's entire clinical history using Google Gemini.</p>
            <button onClick={handleGenerateSummary} className="w-full h-10 rounded-xl border border-primary/50 text-primary font-semibold hover:bg-primary/10 transition-all text-sm flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
              Generate AI Digest
            </button>
            
            {aiSummary && (
              <div className="mt-4 p-4 rounded-xl bg-accent/30 border border-border/50 text-sm leading-relaxed prose prose-sm dark:prose-invert">
                {aiSummary === 'Generating...' ? (
                  <span className="animate-pulse">Analyzing cryptographic records...</span>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\n/g, '<br/>') }} />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {showEntryForm ? (
            <div className="rounded-3xl border border-border bg-card shadow-sm p-6 relative">
              <button onClick={() => setShowEntryForm(false)} className="absolute top-6 right-6 text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</button>
              <h2 className="text-xl font-semibold mb-6">New Clinical Entry</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 flex items-center gap-2">
                    Presenting Complaint
                    {isTyping && <span className="text-[10px] text-primary animate-pulse flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> AI Thinking...</span>}
                  </label>
                  <textarea 
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    className="w-full h-32 rounded-xl border border-border bg-background p-4 text-sm resize-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    placeholder="E.g. 45yo male presents with acute lower quadrant pain..."
                  />
                </div>

                {aiSuggestions.length > 0 && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-primary tracking-wider uppercase mb-3">AI Co-Pilot Suggestions</h4>
                    <ul className="space-y-2">
                      {aiSuggestions.map((s, i) => (
                        <li key={i} className="text-sm flex items-start gap-2 text-foreground/80">
                          <span className="text-primary mt-0.5">•</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 flex flex-col items-end gap-3">
                  <button 
                    onClick={handleDiagnosisSubmit}
                    disabled={isDiagnosing || !complaint}
                    className="h-10 px-6 rounded-xl text-primary-foreground font-semibold shadow-glow [background-image:var(--gradient-primary)] hover:brightness-110 transition-all text-sm disabled:opacity-50"
                  >
                    {isDiagnosing ? 'Securing on Blockchain...' : 'Sign & Encrypt Entry'}
                  </button>
                  {submissionStatus && <p className="text-sm text-success font-medium">{submissionStatus}</p>}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden h-full">
              <div className="border-b border-border/60 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">Adaeze Okafor</h2>
                  <p className="text-sm text-muted-foreground font-mono">MV-2026-7X4Q-K2P9</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success border border-success/20">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success"></span> Active Session
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Clinical History</h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  
                  {/* Timeline Item */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-border bg-background/50 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">General Consultation</h4>
                        <time className="text-xs text-muted-foreground">May 15, 2026</time>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Patient presented with acute lower back pain, radiating to the left leg. Symptoms began 3 days ago after lifting heavy boxes.</p>
                      <div className="text-[10px] font-mono text-muted-foreground/60 break-all bg-accent/30 p-1.5 rounded">
                        Hash: 8f4e2...a91c
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
              <div className="border-t border-border/60 p-4 bg-accent/10">
                <button 
                  onClick={() => setShowEntryForm(true)}
                  className="w-full h-12 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:border-primary/50 transition-all font-medium text-sm flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  Add New Clinical Entry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
