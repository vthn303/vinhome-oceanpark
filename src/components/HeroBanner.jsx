import React, { useState } from 'react';
import { Box } from '@mui/material';
export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        mb: 2.5,
        bgcolor: '#f1f5f9',
      }}
    >
      {/* Banner Image */}
      <Box
        component="img"
        src="src/assets/banner.jpg"
        alt="Siêu quần thể đô thị biển VINHOMES OCEAN PARK 2 & 3"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          minHeight: { xs: 180, sm: 260, md: 360, lg: 420 },
        }}
      />

      {/* Carousel Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 0.8,
          zIndex: 2,
          bgcolor: 'rgba(0, 0, 0, 0.25)',
          px: 1.2,
          py: 0.6,
          borderRadius: '12px',
          backdropFilter: 'blur(4px)',
        }}
      >
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setActiveSlide(idx)}
            sx={{
              width: activeSlide === idx ? 18 : 7,
              height: 7,
              borderRadius: '4px',
              bgcolor: activeSlide === idx ? '#38bdf8' : 'rgba(255, 255, 255, 0.65)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ffffff',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

