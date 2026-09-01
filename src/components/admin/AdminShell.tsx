'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type AuthUser } from '@/lib/auth';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: 'grid' },
  { label: 'Articles', href: '/admin/articles', icon: 'file-text' },
  { label: 'Categories', href: '/admin/categories', icon: 'folder' },
  { label: 'Authors', href: '/admin/authors', icon: 'users' },
  { label: 'Homepage', href: '/admin/homepage', icon: 'layout' },
];

function NavIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    'file-text': <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    folder: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
    users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    layout: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  };
  return icons[icon] || null;
}

export default function AdminShell({ user, children }: { user: AuthUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/v1/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px', flexShrink: 0, background: '#0f172a', color: '#fff',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0,
        height: '100vh', zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)' }}>
              News<span style={{ color: '#fff' }}>Hub</span>
            </span>
          </Link>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Admin Panel
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.625rem 0.75rem', borderRadius: '8px', marginBottom: '2px',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                textDecoration: 'none', fontSize: '0.875rem', fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s ease',
              }}>
                <NavIcon icon={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{user.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>{user.email}</div>
          <button onClick={handleLogout} style={{
            width: '100%', padding: '0.5rem', fontSize: '0.8rem', fontWeight: 600,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)', borderRadius: '6px', cursor: 'pointer',
          }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
