import Link from 'next/link';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '6rem', fontWeight: 900, fontFamily: 'var(--font-serif)', color: 'var(--color-border)', lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem', color: 'var(--color-text-primary)' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--color-text-tertiary)', marginTop: '0.75rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          The page you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary btn-lg">Go to Homepage</Link>
          <Link href="/search" className="btn btn-secondary btn-lg">Search Articles</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
