import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <div className="container-xl px-3 px-md-4 pb-4 flex-grow-1">
      {/* Breadcrumb, Page Title & Share Button */}
      <BreadcrumbsAndHeader />

      {/* Hero Banner Carousel */}
      <HeroBanner />

      {/* Navigation Action Pills Bar */}
      <TabBar currentTab={activeTab} onTabChange={setActiveTab} />

      {/* News Section (Grid of Cards & Pagination) */}
      <NewsSection />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column bg-white">
        {/* Top Sticky Navbar */}
        <Navbar />

        {/* Routing View */}
        <main className="flex-grow-1 d-flex flex-column">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<HomePage />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
