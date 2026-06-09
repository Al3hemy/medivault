'use client';

import styles from '../auth.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignUp() {
  const [role, setRole] = useState('PATIENT');
  
  const roles = [
    { id: 'PATIENT', label: 'Patient' },
    { id: 'CLINICIAN', label: 'Doctor / Clinical' },
    { id: 'ADMIN', label: 'Admin (Hospital)' },
    { id: 'LAB', label: 'Lab' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className={styles.title}>Create Account</h1>
      <p className={styles.subtitle}>Join MediVault and select your account type.</p>

      <div className={styles.roleSelector}>
        {roles.map(r => (
          <div 
            key={r.id} 
            className={`${styles.roleCard} ${role === r.id ? styles.roleCardSelected : ''}`}
            onClick={() => setRole(r.id)}
          >
            {r.label}
          </div>
        ))}
      </div>

      <button className={styles.googleBtn}>
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
          </g>
        </svg>
        Sign up with Google
      </button>

      <div className={styles.divider}>or register with email</div>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); alert("Signup is mocked for MVP. Please use Sign In instead."); }}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="John Doe" className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="you@example.com" className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" className={styles.input} />
        </div>
        <button type="submit" className={styles.primaryBtn}>Create {roles.find(r => r.id === role)?.label} Account</button>
      </form>

      <p className={styles.footerText}>
        Already have an account? <Link href="/auth/signin" className={styles.link}>Sign in</Link>
      </p>
    </motion.div>
  );
}
