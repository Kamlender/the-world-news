import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export const metadata = {
  title: 'NGO - The World News',
  description: 'Support and discover NGOs making a difference. The World News highlights organizations working for social change.',
};

export default function NGOPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.5rem',
          fontWeight: 900,
          marginBottom: '1rem',
          color: 'var(--color-text-primary)',
        }}>
          NGO
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          maxWidth: '700px',
          marginBottom: '2rem',
        }}>
          We believe in the power of community and giving back. This section is dedicated to highlighting NGOs and social organizations making a real difference in India and around the world.
        </p>
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: 'var(--color-bg-secondary)',
          borderRadius: '16px',
          border: '1px solid var(--color-border-light)',
        }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
            Coming Soon
          </p>
          <p style={{ color: 'var(--color-text-tertiary)' }}>
            We are curating a list of verified NGOs. Stay tuned for updates.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
