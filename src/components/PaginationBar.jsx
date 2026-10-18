import React from 'react';

export default function PaginationBar({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const safeTotalPages = Math.max(1, totalPages || 1);
  const safeCurrentPage = Math.min(Math.max(1, currentPage || 1), safeTotalPages);

  const handleSelectChange = (e) => {
    if (onPageChange) {
      onPageChange(Number(e.target.value));
    }
  };

  const renderPageNumbers = () => {
    if (safeTotalPages <= 5) {
      return Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((pg) => {
        const isCurrent = safeCurrentPage === pg;
        return (
          <li key={pg} className={`page-item ${isCurrent ? 'active' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange && onPageChange(pg)}
              style={{
                backgroundColor: isCurrent ? '#1565c0' : '#ffffff',
                borderColor: isCurrent ? '#1565c0' : '#dee2e6',
                color: isCurrent ? '#ffffff' : '#64748b',
                fontWeight: isCurrent ? 700 : 500,
                minWidth: '34px',
                height: '34px',
                padding: '0 6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                margin: '0 2px',
              }}
            >
              {pg}
            </button>
          </li>
        );
      });
    }

    // Dynamic sliding window around current page
    let pages = [];
    if (safeCurrentPage <= 3) {
      pages = [1, 2, 3];
    } else if (safeCurrentPage >= safeTotalPages - 2) {
      pages = [safeTotalPages - 2, safeTotalPages - 1, safeTotalPages];
    } else {
      pages = [safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1];
    }

    return (
      <>
        {!pages.includes(1) && (
          <>
            <li className={`page-item ${safeCurrentPage === 1 ? 'active' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange && onPageChange(1)}
                style={{
                  backgroundColor: safeCurrentPage === 1 ? '#1565c0' : '#ffffff',
                  borderColor: safeCurrentPage === 1 ? '#1565c0' : '#dee2e6',
                  color: safeCurrentPage === 1 ? '#ffffff' : '#64748b',
                  minWidth: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  margin: '0 2px',
                }}
              >
                1
              </button>
            </li>
            {pages[0] > 2 && <li className="page-item disabled"><span className="page-link border-0">...</span></li>}
          </>
        )}

        {pages.map((pg) => {
          const isCurrent = safeCurrentPage === pg;
          return (
            <li key={pg} className={`page-item ${isCurrent ? 'active' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange && onPageChange(pg)}
                style={{
                  backgroundColor: isCurrent ? '#1565c0' : '#ffffff',
                  borderColor: isCurrent ? '#1565c0' : '#dee2e6',
                  color: isCurrent ? '#ffffff' : '#64748b',
                  fontWeight: isCurrent ? 700 : 500,
                  minWidth: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  margin: '0 2px',
                }}
              >
                {pg}
              </button>
            </li>
          );
        })}

        {!pages.includes(safeTotalPages) && (
          <>
            {pages[pages.length - 1] < safeTotalPages - 1 && (
              <li className="page-item disabled"><span className="page-link border-0">...</span></li>
            )}
            <li className={`page-item ${safeCurrentPage === safeTotalPages ? 'active' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => onPageChange && onPageChange(safeTotalPages)}
                style={{
                  backgroundColor: safeCurrentPage === safeTotalPages ? '#1565c0' : '#ffffff',
                  borderColor: safeCurrentPage === safeTotalPages ? '#1565c0' : '#dee2e6',
                  color: safeCurrentPage === safeTotalPages ? '#ffffff' : '#64748b',
                  minWidth: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  margin: '0 2px',
                }}
              >
                {safeTotalPages}
              </button>
            </li>
          </>
        )}
      </>
    );
  };

  const btnStyle = {
    minWidth: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    margin: '0 2px',
    color: '#64748b',
  };

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-4 mb-5 pt-2">
      {/* Left: Trang [Select] Của [totalPages] */}
      <div className="d-flex align-items-center gap-2">
        <span className="text-secondary small">Trang</span>
        <select
          value={safeCurrentPage}
          onChange={handleSelectChange}
          className="form-select form-select-sm"
          style={{ width: 'auto', minWidth: '60px' }}
        >
          {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((pg) => (
            <option key={pg} value={pg}>
              {pg}
            </option>
          ))}
        </select>
        <span className="text-secondary small">Của {safeTotalPages}</span>
      </div>

      {/* Right: Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="pagination pagination-sm mb-0 align-items-center">
          {/* First */}
          <li className={`page-item ${safeCurrentPage === 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange && onPageChange(1)}
              disabled={safeCurrentPage === 1}
              style={btnStyle}
            >
              <i className="bi bi-chevron-double-left" />
            </button>
          </li>

          {/* Prev */}
          <li className={`page-item ${safeCurrentPage === 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange && onPageChange(Math.max(1, safeCurrentPage - 1))}
              disabled={safeCurrentPage === 1}
              style={btnStyle}
            >
              <i className="bi bi-chevron-left" />
            </button>
          </li>

          {/* Dynamic Page Numbers */}
          {renderPageNumbers()}

          {/* Next */}
          <li className={`page-item ${safeCurrentPage === safeTotalPages ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange && onPageChange(Math.min(safeTotalPages, safeCurrentPage + 1))}
              disabled={safeCurrentPage === safeTotalPages}
              style={btnStyle}
            >
              <i className="bi bi-chevron-right" />
            </button>
          </li>

          {/* Last */}
          <li className={`page-item ${safeCurrentPage === safeTotalPages ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange && onPageChange(safeTotalPages)}
              disabled={safeCurrentPage === safeTotalPages}
              style={btnStyle}
            >
              <i className="bi bi-chevron-double-right" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
