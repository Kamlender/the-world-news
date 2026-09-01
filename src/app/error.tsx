'use client';

import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--font-serif)', color: 'var(--color-border)', lineHeight: 1 }}>
          Error
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem', color: 'var(--color-text-primary)' }}>
          Something went wrong
        </h1>
        <p style={{ color: 'var(--color-text-tertiary)', marginTop: '0.75rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          We encountered an unexpected error. Please try again.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={reset} className="btn btn-primary btn-lg">Try Again</button>
          <a href="/" className="btn btn-secondary btn-lg">Go to Homepage</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
