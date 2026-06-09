'use client';

import styles from '../auth.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SignIn() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className={styles.title}>Welcome Back</h1>
      <p className={styles.subtitle}>Sign in to access your MediVault.</p>

      <button className={styles.googleBtn}>
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
          </g>
        </svg>
        Sign in with Google
      </button>

      <div className={styles.divider}>or continue with email</div>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="you@example.com" className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" className={styles.input} />
        </div>
        <button type="button" className={styles.primaryBtn}>Sign In</button>
      
        <div className="text-center mt-6">
          <button type="button" onClick={() => {
            alert("WebAuthn requires HTTPS and registered Hardware Keys. (Mock UI Activated: Scanning FaceID...)");
          }} className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors text-primary font-semibold text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-fingerprint"><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M8 12h.01"/><path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M8 16h.01"/><path d="M12 20h.01"/><path d="M16 20h.01"/><path d="M8 20h.01"/><path d="M12 8h.01"/><path d="M16 8h.01"/><path d="M8 8h.01"/><path d="M12 4h.01"/><path d="M16 4h.01"/><path d="M8 4h.01"/><path d="M4 12v4a8 8 0 0 0 16 0v-4"/><path d="M12 22v-6"/><path d="M8 22v-6"/><path d="M16 22v-6"/><path d="M4 16v-6a8 8 0 0 1 16 0v6"/></svg>
            Sign in with Face ID / Touch ID
          </button>
        </div>
      </form>

      <p className={styles.footerText}>
        Don't have an account? <Link href="/auth/signup" className={styles.link}>Sign up</Link>
      </p>
    </motion.div>
  );
}
