import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNewsDetail, searchNews } from '../api/newsApi';
import NewsCard from './NewsCard';

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

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentId = id || 76;
        const detailData = await getNewsDetail(currentId);
        if (detailData) {
          setNews(detailData);
        } else {
          setError('Không tìm thấy bài viết');
        }

        // Fetch related news (TIN LIÊN QUAN: 4 tin cùng dự án sắp xếp theo ngày tạo mới nhất)
        const relatedParams = {
          pageSize: 4,
          sort: 'createdAt:desc',
        };
        if (detailData?.projectId) {
          relatedParams.projectId = detailData.projectId;
        }

        const listData = await searchNews(relatedParams);
        if (listData && listData.data) {
          setRelatedNews(listData.data);
        }
      } catch (err) {
        console.error('Failed to load news detail:', err);
        setError('Có lỗi xảy ra khi tải bài viết.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="container-xl px-3 px-md-4 py-4 placeholder-glow">
        <span className="placeholder col-3 mb-3 d-block" />
        <span className="placeholder col-8 mb-2 d-block" style={{ height: '36px' }} />
        <span className="placeholder col-4 mb-4 d-block" />
        <div className="placeholder col-12 rounded-3 mb-4" style={{ height: '380px' }} />
        <span className="placeholder col-12 mb-2 d-block" />
        <span className="placeholder col-12 mb-2 d-block" />
        <span className="placeholder col-9 mb-2 d-block" />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container-xl px-3 px-md-4 py-5 text-center">
        <div className="alert alert-danger mb-4">{error || 'Không tìm thấy nội dung bài viết.'}</div>
        <button
          type="button"
          className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
          onClick={() => navigate('/')}
        >
          <i className="bi bi-arrow-left" />
          <span>Quay lại trang chủ</span>
        </button>
      </div>
    );
  }

  const formattedDate = formatDate(news.createdAt);
  const authorName = news.updatedByName || 'Admin';
  const projectName = news.projectName || 'Vinhomes Ocean Park 3';

  return (
    <div className="container-xl px-3 px-md-4 py-3">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb mb-0" style={{ fontSize: '0.85rem' }}>
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none fw-medium" style={{ color: '#1565c0' }}>
              Dự án
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none fw-medium" style={{ color: '#1565c0' }}>
              {projectName}
            </Link>
          </li>
          <li className="breadcrumb-item active text-secondary fw-medium" aria-current="page">
            Tin tức
          </li>
        </ol>
      </nav>

      {/* Main Title & Share Row */}
      <div className="mb-3">
        <h1
          className="fw-bold mb-2 text-uppercase"
          style={{
            color: '#1555a6',
            fontSize: 'calc(1.3rem + 0.9vw)',
            letterSpacing: '-0.3px',
            lineHeight: 1.3,
          }}
        >
          {news.title}
        </h1>

        {/* Meta Info Bar: Date, Author, Share Button */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pt-2 pb-2 border-bottom">
          <div className="d-flex align-items-center gap-4">
            {/* Date */}
            <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '0.85rem' }}>
              <i className="bi bi-calendar3" />
              <span>{formattedDate}</span>
            </div>

            {/* Author */}
            <div className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: '0.85rem' }}>
              <i className="bi bi-person" />
              <span>{authorName}</span>
            </div>
          </div>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="btn text-white fw-semibold d-inline-flex align-items-center gap-2 px-3 py-1 text-nowrap"
            style={{
              backgroundColor: '#0288d1',
              borderRadius: '6px',
              fontSize: '0.88rem',
              border: 'none',
            }}
          >
            <span>Chia sẻ</span>
            <i className="bi bi-box-arrow-up-right" style={{ fontSize: '13px' }} />
          </button>
        </div>
      </div>

      {/* Hero / Cover Image if available */}
      {news.fileInfo?.fullLink && (
        <div className="w-100 rounded-3 overflow-hidden shadow-sm mb-4 bg-light">
          <img
            src={news.fileInfo.fullLink}
            alt={news.title}
            className="w-100 d-block object-fit-cover"
            style={{ maxHeight: '520px' }}
          />
        </div>
      )}

      {/* Short Content / Lead Paragraph */}
      {news.shortContent && (
        <div
          className="p-3 mb-4 bg-light rounded-end border-start border-4 border-info"
          style={{
            fontSize: '1.02rem',
            fontStyle: 'italic',
            lineHeight: 1.75,
            color: '#334155',
          }}
        >
          {news.shortContent}
        </div>
      )}

      {/* Main HTML Content */}
      <div
        className="news-article-content mb-5"
        style={{
          color: '#334155',
          fontSize: '0.98rem',
          lineHeight: 1.85,
        }}
        dangerouslySetInnerHTML={{ __html: news.content || '' }}
      />

      {/* Related News Section ("TIN LIÊN QUAN") */}
      <div className="mt-5 pt-4 border-top">
        <h3
          className="fw-bold mb-4 text-uppercase"
          style={{
            color: '#1555a6',
            fontSize: '1.35rem',
            letterSpacing: '-0.2px',
          }}
        >
          TIN LIÊN QUAN
        </h3>

        <div className="row g-3 g-md-4">
          {relatedNews.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-3">
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Share Toast */}
      {copied && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x mb-4 alert alert-success d-flex align-items-center gap-2 shadow"
          role="alert"
          style={{ zIndex: 1200 }}
        >
          <i className="bi bi-check-circle-fill text-success" />
          <span>Đã sao chép liên kết bài viết!</span>
        </div>
      )}
    </div>
  );
}
