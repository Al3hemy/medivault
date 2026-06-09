import type { Metadata } from 'next';
import styles from './auth.module.css';
import { Activity } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authentication - MediVault',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.authContainer}>
      <div className={styles.leftPane}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <Activity size={32} />
            <span>MediVault</span>
          </Link>
        </div>
        <div className={styles.decorativeContent}>
          <h2>Secure. Immutable. Yours.</h2>
          <p>Join the future of digital health records in Nigeria.</p>
        </div>
        {/* Animated background blobs inside left pane */}
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>
      <div className={styles.rightPane}>
        <div className={styles.formWrapper}>
          {children}
        </div>
      </div>
    </div>
  );
}
