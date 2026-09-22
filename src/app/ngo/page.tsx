import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export const metadata = {
  title: 'NGO Directory — Verified Social Organizations & Charities',
  description: 'Discover verified NGOs and social organizations making a real difference in India and around the world. The World News highlights charities, nonprofits, and community initiatives working for positive social change.',
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
          NGO Directory
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          maxWidth: '700px',
          marginBottom: '1.5rem',
        }}>
          We believe in the power of community and giving back. This section is dedicated to highlighting NGOs and social organizations making a real difference in India and around the world. From education and healthcare to environmental conservation and disaster relief, these organizations represent the best of human compassion and collective action.
        </p>
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          maxWidth: '700px',
          marginBottom: '1.5rem',
        }}>
          The World News is committed to shining a spotlight on nonprofits, charities, and grassroots initiatives that drive meaningful social impact. Our editorial team carefully verifies each organization before featuring them, ensuring transparency, accountability, and genuine community benefit. Whether you are looking to volunteer, donate, or simply learn about the incredible work being done by civil society, this directory is your trusted starting point.
        </p>
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          maxWidth: '700px',
          marginBottom: '2rem',
        }}>
          If you represent an NGO and would like to be featured, please reach out through our contact page. We welcome applications from organizations working in fields such as women&apos;s empowerment, child welfare, rural development, clean water access, mental health awareness, disability rights, animal welfare, and sustainable agriculture.
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
            We are curating a list of verified NGOs and social organizations. Stay tuned for updates.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

