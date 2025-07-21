import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // On mount, check localStorage or system preference
    const saved = typeof window !== 'undefined' && localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.body.classList.add('is_dark');
    } else {
      setTheme('light');
      document.body.classList.remove('is_dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('is_dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('is_dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return [theme, toggleTheme];
}

export default function Layout({ children }) {
  const [theme, toggleTheme] = useTheme();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <header className="header">
        <div className="container-fluid ">
          <div className="row align-items-center">
            <div className="col-md-3">
              <Link href="/" className="main-logo d-flex align-items-center">
                {/* <Image src="/assets/images/logo/logo_dark.png" alt="ArtExchange Logo" width={120} height={40} /> */}
                <h3>ArtExchange</h3>
              </Link>
            </div>
            <div className="col-md-6">
              <nav className="main-nav">
                <ul className="nav justify-content-center">
                  <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
                  <li className="nav-item"><Link href="/market" className="nav-link">Market</Link></li>
                  <li className="nav-item"><Link href="/artworks" className="nav-link">Artworks</Link></li>
                  {session && (
                    <>
                      <li className="nav-item"><Link href="/portfolio" className="nav-link">Portfolio</Link></li>
                      <li className="nav-item"><Link href="/wallet" className="nav-link">Wallet</Link></li>
                      <li className="nav-item"><Link href="/dashboard" className="nav-link">Dashboard</Link></li>
                    </>
                  )}
                  <li className="nav-item"><Link href="/help" className="nav-link">Help</Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-md-3 text-end d-flex align-items-center justify-content-end gap-2">
              <button
                aria-label="Toggle theme"
                onClick={toggleTheme}
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 12 }}
              >
                {theme === 'dark' ? (
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="#3749E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="#3749E9" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#3749E9" strokeWidth="2" strokeLinecap="round"/></svg>
                )}
              </button>
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : session ? (
                <>
                  <div className="d-flex align-items-center me-3">
                    {session.user.image && (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-circle me-2"
                      />
                    )}
                    <span className="text-truncate" style={{maxWidth: "100px"}}>{session.user.name}</span>
                  </div>
                  <button onClick={() => signOut()} className="btn btn-outline-primary">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn btn-outline-primary me-2">Sign In</Link>
                  <Link href="/register" className="btn btn-primary">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="container-fluid min-vh-100 py-4 my-5">{children}</main>
      <footer className="footer bg-dark text-light py-4 mt-5">
        <div className="container text-center">
          <p className="mb-1">&copy; {new Date().getFullYear()} Art Exchange Platform. All rights reserved.</p>
          <div>
            <Link href="/privacy" className="text-light me-3">Privacy Policy</Link>
            <Link href="/terms" className="text-light">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </>
  );
}