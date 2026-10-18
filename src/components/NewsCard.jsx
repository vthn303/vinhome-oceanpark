import React, { useState } from 'react';
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
    <div
      onClick={handleClick}
      className="card h-100 shadow-sm border rounded-3 overflow-hidden text-start"
      style={{
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        backgroundColor: '#ffffff',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.08)';
        const titleEl = e.currentTarget.querySelector('.news-card-title');
        if (titleEl) titleEl.style.color = '#0288d1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
        const titleEl = e.currentTarget.querySelector('.news-card-title');
        if (titleEl) titleEl.style.color = '#1a365d';
      }}
    >
      {/* Thumbnail Aspect Ratio Container */}
      <div className="position-relative w-100 bg-light overflow-hidden" style={{ paddingTop: '58%' }}>
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImgError(true)}
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          style={{ transition: 'transform 0.4s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      {/* Card Body */}
      <div className="card-body p-3 d-flex flex-column">
        {/* Title: 2 lines max with ellipsis */}
        <h5
          className="news-card-title fw-bold mb-2"
          style={{
            fontSize: '0.92rem',
            lineHeight: 1.35,
            color: '#1a365d',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'color 0.2s ease',
          }}
        >
          {title}
        </h5>

        {/* Date */}
        <div className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>
          {dateFormatted}
        </div>

        {/* Short Content: 3 lines max with ellipsis */}
        <p
          className="text-secondary mb-0"
          style={{
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
        </p>
      </div>
    </div>
  );
}
