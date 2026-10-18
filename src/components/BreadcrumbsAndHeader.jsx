import React, { useState } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function BreadcrumbsAndHeader() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    }
  };

  return (
    <Box sx={{ pt: 2.5, pb: 2 }}>
      {/* Breadcrumb */}
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{
          mb: 1.5,
          fontSize: '0.85rem',
          '& .MuiBreadcrumbs-separator': {
            color: '#94a3b8',
            mx: 0.8,
          },
        }}
      >
        <Link
          underline="hover"
          href="#"
          sx={{
            color: '#1565c0',
            fontWeight: 500,
            fontSize: '0.85rem',
          }}
        >
          Dự án
        </Link>
        <Typography
          sx={{
            color: '#1e293b',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          Vinhomes Ocean Park 3
        </Typography>
      </Breadcrumbs>

      {/* Main Title Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem' },
              color: '#1555a6',
              letterSpacing: '-0.3px',
              mb: 0.5,
            }}
          >
            VINHOMES OCEAN PARK 3
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontSize: { xs: '0.82rem', sm: '0.9rem' },
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.
          </Typography>
        </Box>

        {/* Share Button */}
        <Button
          variant="contained"
          onClick={handleShare}
          endIcon={<OpenInNewIcon sx={{ fontSize: '18px !important' }} />}
          sx={{
            background: 'linear-gradient(90deg, #2A52BE 0%, #00B4D8 100%)',
            color: '#ffffff',
            px: 2.5,
            py: 0.9,
            borderRadius: '6px',
            fontSize: '0.88rem',
            fontWeight: 600,
            boxShadow: 'none',
            whiteSpace: 'nowrap',
            '&:hover': {
              bgcolor: '#0277bd',
              boxShadow: '0 2px 8px rgba(2, 136, 209, 0.3)',
              transition: 'all 0.1s ease-in-out',
            },
          }}
        >
          Chia sẻ
        </Button>
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Đã sao chép liên kết chia sẻ!
        </Alert>
      </Snackbar>
    </Box>
  );
}

