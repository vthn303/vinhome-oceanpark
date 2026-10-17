import React from 'react';
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
import Logo from './Logo';

export default function Navbar() {
  const [mobileAnchor, setMobileAnchor] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'GIỚI THIỆU', href: '#gioi-thieu' },
    { label: 'DỰ ÁN', href: '#du-an' },
    { label: 'TIN TỨC', href: '#tin-tuc' },
  ];

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
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              gap: 1,
            }}
          >
            <Logo size={32} />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: '#475569',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    '&:hover': {
                      color: '#0288d1',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
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
                bgcolor: '#0288d1',
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
                  {navItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={() => setMobileAnchor(null)}
                      component="a"
                      href={item.href}
                      sx={{ fontWeight: 600, fontSize: '0.85rem' }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

