import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import BreadcrumbsAndHeader from './components/BreadcrumbsAndHeader';
import HeroBanner from './components/HeroBanner';
import TabBar from './components/TabBar';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('tin-tuc');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#ffffff',
        }}
      >
        {/* Top Sticky Navbar */}
        <Navbar />

        {/* Main Content Area */}
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

          {/* News Section (Grid of 12 Cards & Pagination) */}
          <NewsSection />
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
