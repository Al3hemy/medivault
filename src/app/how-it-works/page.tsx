'use client';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-32 px-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-display font-extrabold tracking-tight">
            How It <span className="text-gradient">Works</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A seamless experience from the waiting room to the consultation room.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Patient Journey */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-display font-bold border-b border-border pb-4">For Patients</h2>
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3 before:-z-10 before:w-0.5 before:bg-border">
              <div className="flex gap-4">
                <div className="h-6 w-6 shrink-0 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">1</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Create an Account</h4>
                  <p className="text-sm text-muted-foreground">Sign up with your NIN to instantly generate your unique MediVault ID (MVID).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-6 w-6 shrink-0 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">2</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Visit a Hospital</h4>
                  <p className="text-sm text-muted-foreground">Arrive at any registered clinic and provide your MVID to the receptionist.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-6 w-6 shrink-0 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">3</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Grant Access</h4>
                  <p className="text-sm text-muted-foreground">Receive a temporary OTP on your phone to grant the doctor access to your records.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Clinician Journey */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-display font-bold border-b border-border pb-4">For Clinicians</h2>
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-3 before:-z-10 before:w-0.5 before:bg-border">
              <div className="flex gap-4">
                <div className="h-6 w-6 shrink-0 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">1</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Enter MVID</h4>
                  <p className="text-sm text-muted-foreground">Input the patient's MVID into your dashboard to initiate a records request.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-6 w-6 shrink-0 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">2</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Review AI Digest</h4>
                  <p className="text-sm text-muted-foreground">Instantly read an AI-generated summary of the patient's chronic illnesses and recent visits.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-6 w-6 shrink-0 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">3</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Add Clinical Entry</h4>
                  <p className="text-sm text-muted-foreground">Document the consultation. Once saved, it becomes immutably attached to the patient's MVID.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}