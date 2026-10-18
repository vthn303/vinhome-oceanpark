import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Helper to format ISO date to DD/MM/YYYY
function formatDate(dateInput) {
  if (!dateInput) return '12/02/2026';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return dateInput;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateInput;
  }
}

export default function NewsCard({ item }) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  // Extract fields whether from API or legacy mock format
  const title = item.title || 'Dự án Vinhomes';
  const excerpt = item.shortContent || item.excerpt || '';
  const dateFormatted = item.createdAt ? formatDate(item.createdAt) : (item.date || '12/02/2026');
  const imageUrl = !imgError && item.fileInfo?.fullLink ? item.fileInfo.fullLink : (item.image || '/assets/news-thumb.png');

  const handleClick = () => {
    if (item.id) {
      navigate(`/news/${item.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Card
      elevation={0}
      onClick={handleClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        border: '1px solid #eaedf3',
        bgcolor: '#ffffff',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
          borderColor: '#cbd5e1',
          '& .news-title': {
            color: '#0288d1',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: '58%', overflow: 'hidden', bgcolor: '#f1f5f9' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          onError={() => setImgError(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            '&:hover': {
              transform: 'scale(1.04)',
            },
          }}
        />
      </Box>

      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': { pb: 2 },
        }}
      >
        <Typography
          className="news-title"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '0.92rem',
            lineHeight: 1.35,
            color: '#1a365d',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mb: 0.8,
            transition: 'color 0.2s ease',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: '#94a3b8',
            fontSize: '0.75rem',
            fontWeight: 400,
            mb: 1,
            display: 'block',
          }}
        >
          {dateFormatted}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            fontSize: '0.8rem',
            lineHeight: 1.45,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {excerpt}
        </Typography>
      </CardContent>
    </Card>
  );
}
