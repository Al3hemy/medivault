'use client';
import { motion } from 'framer-motion';

export default function Security() {
  return (
    <div className="min-h-screen pt-32 px-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-display font-extrabold tracking-tight">
            Ironclad <span className="text-gradient">Security</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Your health data is sensitive. We treat it with the highest cryptographic standards.
          </p>
        </motion.div>

        <motion.div 
          className="glass-panel p-8 rounded-2xl space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-6 items-start">
            <div className="mt-1 bg-success/20 p-3 rounded-full text-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">NDPR & HIPAA Compliant</h3>
              <p className="text-muted-foreground leading-relaxed">
                MediVault strictly adheres to the Nigeria Data Protection Regulation (NDPR) and international HIPAA standards, ensuring legal compliance and ethical data handling.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="mt-1 bg-primary/20 p-3 rounded-full text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">End-to-End Encryption</h3>
              <p className="text-muted-foreground leading-relaxed">
                Data is encrypted both at rest (using AES-256) and in transit (via TLS 1.3). Only authorized personnel with temporary access tokens can decrypt patient clinical entries.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="mt-1 bg-warning/20 p-3 rounded-full text-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Immutable Audit Logs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every action—every record view, creation, or modification—is permanently logged in an immutable database structure. Patients can review an audit trail to see exactly who accessed their data and when.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}