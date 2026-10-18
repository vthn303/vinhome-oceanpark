import React from 'react';
import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';

export default function TabBar({ currentTab = 'tin-tuc', onTabChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tabs = [
    { id: 'tong-quan', label: 'Tổng quan', icon: <ExploreOutlinedIcon sx={{ fontSize: 18 }} /> },
    { id: 'vi-tri', label: 'Vị trí', icon: <PlaceOutlinedIcon sx={{ fontSize: 18 }} /> },
    { id: 'phan-khu', label: 'Phân khu', icon: <PieChartOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
    { id: 'mat-bang', label: 'Mặt bằng quỹ căn', icon: <LayersOutlinedIcon sx={{ fontSize: 18 }} /> },
    { id: 'quy-can', label: 'Quỹ căn', icon: <ApartmentOutlinedIcon sx={{ fontSize: 18 }} /> },
    { id: 'chinh-sach', label: 'Chính sách bán hàng', icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 18 }} /> },
    { id: 'tin-tuc', label: 'Tin tức', icon: <FeedOutlinedIcon sx={{ fontSize: 18 }} /> },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        background: 'linear-gradient(90deg, #2A52BE 0%, #00B4D8 100%)',
        borderRadius: '16px',
        p: { xs: 1, sm: 2 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: 1, sm: 3 },
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        boxShadow: '0 4px 12px rgba(43, 85, 211, 0.15)',
        mb: 3.5,
      }}
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <Button
            key={tab.id}
            onClick={() => onTabChange && onTabChange(tab.id)}
            startIcon={tab.icon}
            sx={{
              flex: { xs: 'none', md: 1 },
              minWidth: 'fit-content',
              py: { xs: 0.7, sm: 2 },
              px: { xs: 1.5, sm: 3   },
              borderRadius: '32px',
              fontSize: { xs: '0.78rem', sm: '0.84rem' },
              fontWeight: isActive ? 700 : 500,
              color: '#ffffff',
              bgcolor: isActive ? '#00a3db' : 'transparent',
              boxShadow: isActive ? '0 2px 6px rgba(0, 0, 0, 0.15)' : 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: isActive ? '#0096cc' : 'rgba(255, 255, 255, 0.15)',
              },
              '& .MuiButton-startIcon': {
                mr: 0.8,
                color: '#ffffff',
              },
            }}
          >
            {tab.label}
          </Button>
        );
      })}
    </Box>
  );
}

