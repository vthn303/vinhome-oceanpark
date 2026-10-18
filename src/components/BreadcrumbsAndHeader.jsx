import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BreadcrumbsAndHeader() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="pt-3 pb-2">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb mb-0" style={{ fontSize: '0.85rem' }}>
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none fw-medium" style={{ color: '#1565c0' }}>
              Dự án
            </Link>
          </li>
          <li className="breadcrumb-item active text-dark fw-medium" aria-current="page">
            Vinhomes Ocean Park 3
          </li>
        </ol>
      </nav>

      {/* Main Title Row */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
        <div>
          <h1
            className="fw-bold mb-1"
            style={{
              color: '#1555a6',
              fontSize: 'calc(1.4rem + 1vw)',
              letterSpacing: '-0.3px',
            }}
          >
            VINHOMES OCEAN PARK 3
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
            Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.
          </p>
        </div>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="btn text-white fw-semibold d-inline-flex align-items-center gap-2 px-3 py-2 text-nowrap align-self-start align-self-sm-auto"
          style={{
            backgroundColor: '#0288d1',
            borderRadius: '6px',
            fontSize: '0.88rem',
            border: 'none',
            boxShadow: '0 2px 6px rgba(2, 136, 209, 0.25)',
          }}
        >
          <span>Chia sẻ</span>
          <i className="bi bi-box-arrow-up-right" style={{ fontSize: '14px' }} />
        </button>
      </div>

      {/* Copied Toast Alert */}
      {copied && (
        <div
          className="alert alert-success alert-dismissible fade show mt-3 py-2 px-3 d-flex align-items-center gap-2 mb-0"
          role="alert"
          style={{ fontSize: '0.85rem' }}
        >
          <i className="bi bi-check-circle-fill text-success" />
          <span>Đã sao chép liên kết chia sẻ!</span>
          <button
            type="button"
            className="btn-close py-2 px-3"
            onClick={() => setCopied(false)}
            aria-label="Close"
          />
        </div>
      )}
    </div>
  );
}
