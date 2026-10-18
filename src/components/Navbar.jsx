import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CircleIcon from '@mui/icons-material/Circle';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [mobileAnchor, setMobileAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
    { label: 'GIỚI THIỆU', href: '/gioi-thieu' },
    { label: 'DỰ ÁN', href: '/du-an' },
    { label: 'TIN TỨC', href: '/news' },
  ];

  // Check if window.location matches item href
  const isItemActive = (href) => {
    if (!href) return false;
    const currentPath = location.pathname || window.location.pathname;
    const activeHash = location.hash || currentHash || window.location.hash;
    const fullPathWithHash = currentPath + activeHash;

    // Exact match with path + hash or end of URL
    if (fullPathWithHash === href || window.location.href.endsWith(href)) {
      return true;
    }

    // Hash link matching (e.g. #gioi-thieu, #du-an)
    if (href.startsWith('#')) {
      return activeHash === href;
    }

    // Path matching (e.g. /news matches /news and /news/76)
    if (href.startsWith('/')) {
      if (href === '/') {
        return currentPath === '/' && !activeHash;
      }
      return currentPath === href || currentPath.startsWith(href);
    }

    return false;
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      // If currently on another page (e.g. /news/76), navigate to home with hash
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/' + href);
      }
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #edf2f7',
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Toolbar
          disableGutters
          sx={{
            height: 64,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Box
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            sx={{
              width: 242,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Box
              component="img"
              src="/src/assets/Logo.svg"
              alt="Logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
              sx={{ maxHeight: 32 }}
            />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3.5, height: '100%' }}>
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <Button
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    sx={{
                      color: active ? '#0288d1' : '#475569',
                      fontSize: '0.85rem',
                      fontWeight: active ? 700 : 600,
                      letterSpacing: '0.5px',
                      height: '100%',
                      py: 2.2,
                      px: 1.5,
                      borderRadius: 0,
                      position: 'relative',
                      // borderBottom: active ? '3px solid #0288d1' : '3px solid transparent',
                      textDecoration: active ? 'underline' : 'none',
                      textUnderlineOffset: '6px',
                      textDecorationThickness: '2px',
                      transition: 'all 0.2s ease',
                      // '&:hover': {
                      //   color: '#0288d1',
                      //   backgroundColor: 'transparent',
                      // },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          ) : null}

          {/* Right side: Online Status & User Avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 } }}>
            {/* Online Indicator */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.8,
                bgcolor: '#f8fafc',
                border: '1px solid #e2e8f0',
                py: 0.5,
                px: 1.5,
                borderRadius: '16px',
              }}
            >
              <CircleIcon
                sx={{
                  color: '#10b981',
                  fontSize: '8px',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.4 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#475569',
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  fontWeight: 500,
                }}
              >
                120 người đang Online
              </Typography>
            </Box>

            {/* Profile Avatar Button */}
            <IconButton
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(90deg, #2A52BE 0%, #00B4D8 100%)',
                color: '#ffffff',
                '&:hover': {
                  bgcolor: '#0277bd',
                },
              }}
            >
              <PersonIcon sx={{ fontSize: 22 }} />
            </IconButton>

            {/* Mobile Hamburger Menu */}
            {isMobile && (
              <>
                <IconButton
                  onClick={(e) => setMobileAnchor(e.currentTarget)}
                  sx={{ color: '#475569' }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={mobileAnchor}
                  open={Boolean(mobileAnchor)}
                  onClose={() => setMobileAnchor(null)}
                >
                  {navItems.map((item) => {
                    const active = isItemActive(item.href);
                    return (
                      <MenuItem
                        key={item.label}
                        onClick={(e) => {
                          setMobileAnchor(null);
                          handleNavClick(e, item.href);
                        }}
                        component="a"
                        href={item.href}
                        sx={{
                          fontWeight: active ? 700 : 600,
                          fontSize: '0.85rem',
                          color: active ? '#0288d1' : '#475569',
                          textDecoration: active ? 'underline' : 'none',
                          textUnderlineOffset: '4px',
                          borderLeft: active ? '3px solid #0288d1' : 'none',
                          pl: active ? 1.5 : 2,
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
