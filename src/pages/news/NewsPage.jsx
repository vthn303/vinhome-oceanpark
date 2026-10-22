import React, { useState } from 'react';
import { Container } from '@mui/material';
import BreadcrumbsAndHeader from '../../components/BreadcrumbsAndHeader';
import HeroBanner from '../../components/HeroBanner';
import TabBar from '../../components/TabBar';
import NewsSection from '../../components/NewsSection';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('tin-tuc');

  return (
    <Container
      maxWidth="xl"
      sx={{
        flex: 1,
        px: { xs: 2, sm: 3, md: 4 },
        pb: 4,
      }}
    >
      {/* Breadcrumb, Page Title & Share Button */}
      <BreadcrumbsAndHeader />

      {/* Hero Banner Carousel */}
      <HeroBanner />

      {/* Navigation Action Pills Bar */}
      <TabBar currentTab={activeTab} onTabChange={setActiveTab} />

      {/* News Section (Grid of Cards & Pagination) */}
      <NewsSection />
    </Container>
  );
}

