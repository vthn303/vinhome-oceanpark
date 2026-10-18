import React, { useState } from 'react';

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  return (
    <div className="position-relative w-100 rounded-3 overflow-hidden shadow-sm mb-3 bg-light">
      {/* Banner Image */}
      <img
        src="/assets/hero-banner.png"
        alt="Siêu quần thể đô thị biển VINHOMES OCEAN PARK 2 & 3"
        className="w-100 d-block object-fit-cover"
        style={{
          minHeight: '200px',
          maxHeight: '460px',
        }}
      />

      {/* Carousel Dots */}
      <div
        className="position-absolute start-50 translate-middle-x d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
        style={{
          bottom: '14px',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(4px)',
          zIndex: 2,
        }}
      >
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className="cursor-pointer"
            style={{
              width: activeSlide === idx ? '18px' : '7px',
              height: '7px',
              borderRadius: '4px',
              backgroundColor: activeSlide === idx ? '#38bdf8' : 'rgba(255, 255, 255, 0.65)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
