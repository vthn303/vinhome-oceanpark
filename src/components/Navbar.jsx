import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Track hash changes in window.location
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navItems = [
    { label: 'GIỚI THIỆU', href: '#gioi-thieu' },
    { label: 'DỰ ÁN', href: '#du-an' },
    { label: 'TIN TỨC', href: '/news' },
  ];

  // Check if window.location matches item href
  const isItemActive = (href) => {
    if (!href) return false;
    const currentPath = location.pathname || window.location.pathname;
    const activeHash = location.hash || currentHash || window.location.hash;
    const fullPathWithHash = currentPath + activeHash;

    if (fullPathWithHash === href || window.location.href.endsWith(href)) {
      return true;
    }

    if (href.startsWith('#')) {
      return activeHash === href;
    }

    if (href.startsWith('/')) {
      if (href === '/') {
        return currentPath === '/' && !activeHash;
      }
      return currentPath === href || currentPath.startsWith(href);
    }

    return false;
  };

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/' + href);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top border-bottom py-2" style={{ zIndex: 1100 }}>
      <div className="container-xl px-3 px-md-4">
        {/* Brand Logo */}
        <div
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="navbar-brand d-flex align-items-center cursor-pointer m-0"
          style={{ cursor: 'pointer', width: '242px', height: '36px' }}
        >
          <img
            src="/src/assets/Logo.svg"
            alt="Logo"
            style={{ maxHeight: '32px' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Desktop Nav Items */}
        <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex">
          <ul className="navbar-nav gap-4">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <li key={item.label} className="nav-item">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="nav-link px-2 py-2 fw-semibold text-uppercase"
                    style={{
                      color: active ? '#0288d1' : '#475569',
                      fontSize: '0.85rem',
                      letterSpacing: '0.5px',
                      borderBottom: active ? '3px solid #0288d1' : '3px solid transparent',
                      textDecoration: active ? 'underline' : 'none',
                      textUnderlineOffset: '6px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right side: Online Status & User Profile Avatar */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* Online badge */}
          <div
            className="d-flex align-items-center gap-2 bg-light border px-3 py-1 rounded-pill"
            style={{ fontSize: '0.8rem' }}
          >
            <i
              className="bi bi-circle-fill text-success"
              style={{
                fontSize: '8px',
                animation: 'pulse 2s infinite',
              }}
            />
            <span className="text-secondary fw-medium">120 người đang Online</span>
          </div>

          {/* User profile avatar button */}
          <button
            type="button"
            className="btn rounded-circle d-flex align-items-center justify-content-center p-0 border-0"
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(90deg, #2A52BE 0%, #00B4D8 100%)',
              color: '#ffffff',
            }}
          >
            <i className="bi bi-person-fill" style={{ fontSize: '18px' }} />
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            className="btn btn-link text-dark d-lg-none p-1 border-0"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`} style={{ fontSize: '24px' }} />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="w-100 d-lg-none mt-2 pt-2 border-top">
            <ul className="navbar-nav gap-2">
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <li key={item.label} className="nav-item">
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="nav-link px-3 py-2 fw-semibold"
                      style={{
                        color: active ? '#0288d1' : '#475569',
                        textDecoration: active ? 'underline' : 'none',
                        textUnderlineOffset: '4px',
                        borderLeft: active ? '3px solid #0288d1' : 'none',
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
