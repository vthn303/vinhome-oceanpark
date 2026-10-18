import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import BreadcrumbsAndHeader from './components/BreadcrumbsAndHeader';
import HeroBanner from './components/HeroBanner';
import TabBar from './components/TabBar';
import NewsSection from './components/NewsSection';
import NewsDetail from './components/NewsDetail';
import Footer from './components/Footer';

function HomePage() {
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
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

          {/* Routing View */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<HomePage />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Box>

          {/* Footer */}
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
