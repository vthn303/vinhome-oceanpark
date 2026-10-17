import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import NewsCard from './NewsCard';
import PaginationBar from './PaginationBar';
import { newsData } from '../data/newsData';

export default function NewsSection() {
  const [page, setPage] = useState(1);

  return (
    <Box id="tin-tuc" sx={{ width: '100%' }}>
      {/* Section Title */}
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '1.25rem', sm: '1.45rem' },
          color: '#1555a6',
          letterSpacing: '-0.2px',
          mb: 2.5,
          textTransform: 'uppercase',
        }}
      >
        TIN TỨC
      </Typography>

      {/* 4 Columns x 3 Rows = 12 Cards Grid */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 2.5 }}>
        {newsData.map((item, index) => (
          <Grid key={`${item.id}-${index}`} size={{ xs: 12, sm: 6, md: 3 }}>
            <NewsCard item={item} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination Bar */}
      <PaginationBar
        currentPage={page}
        totalPages={20}
        onPageChange={(newPage) => {
          setPage(newPage);
          window.scrollTo({
            top: document.getElementById('tin-tuc')?.offsetTop - 80,
            behavior: 'smooth',
          });
        }}
      />
    </Box>
  );
}
