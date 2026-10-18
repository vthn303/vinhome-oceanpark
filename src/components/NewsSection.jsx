import React, { useState, useEffect, useRef } from 'react';
import NewsCard from './NewsCard';
import PaginationBar from './PaginationBar';
import { searchNews, searchProjects } from '../api/newsApi';

export default function NewsSection() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 12;

  // Search & Filter State
  const [searchTitle, setSearchTitle] = useState('');
  const [debouncedTitle, setDebouncedTitle] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Project Dropdown State
  const [projectOptions, setProjectOptions] = useState([]);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectInput, setProjectInput] = useState('');
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  const projectTimerRef = useRef(null);
  const titleTimerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounce searchTitle
  useEffect(() => {
    if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    titleTimerRef.current = setTimeout(() => {
      setDebouncedTitle(searchTitle);
      setPage(1);
    }, 350);

    return () => {
      if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    };
  }, [searchTitle]);

  // Click outside to close project dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProjectDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initial load of projects list
  useEffect(() => {
    const fetchInitialProjects = async () => {
      setProjectLoading(true);
      try {
        const res = await searchProjects({ pageSize: 50 });
        const list = Array.isArray(res) ? res : res.data || [];
        setProjectOptions(list);
      } catch (err) {
        console.error('Failed to load initial projects:', err);
      } finally {
        setProjectLoading(false);
      }
    };
    fetchInitialProjects();
  }, []);

  // Handle typing in project input
  const handleProjectInputChange = (e) => {
    const val = e.target.value;
    setProjectInput(val);
    setProjectDropdownOpen(true);

    if (projectTimerRef.current) clearTimeout(projectTimerRef.current);

    projectTimerRef.current = setTimeout(async () => {
      setProjectLoading(true);
      try {
        const res = await searchProjects({
          name: val.trim() || undefined,
          pageSize: 30,
        });
        const list = Array.isArray(res) ? res : res.data || [];
        setProjectOptions(list);
      } catch (err) {
        console.error('Failed to search projects:', err);
      } finally {
        setProjectLoading(false);
      }
    }, 300);
  };

  // Select a project
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setProjectInput(project ? project.name : '');
    setProjectDropdownOpen(false);
    setPage(1);
  };

  // Fetch news data
  const fetchNewsData = async (pageIndex, titleQuery, project) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        pageNumber: pageIndex - 1,
        pageSize: pageSize,
        sort: 'createdAt:desc',
      };

      if (project && project.id) {
        params.projectId = project.id;
      }

      if (titleQuery && titleQuery.trim()) {
        params.title = titleQuery.trim();
      }

      const response = await searchNews(params);

      if (response && response.data) {
        setNewsList(response.data);
        const total = response.totalElements ?? response.data.length;
        setTotalElements(total);
        const calcTotalPages = response.totalPages || Math.ceil(total / pageSize) || 1;
        setTotalPages(Math.max(1, calcTotalPages));
      }
    } catch (err) {
      console.error('Failed to load news:', err);
      setError('Không thể tải dữ liệu tin tức. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData(page, debouncedTitle, selectedProject);
  }, [page, debouncedTitle, selectedProject]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: (document.getElementById('tin-tuc')?.offsetTop || 0) - 80,
      behavior: 'smooth',
    });
  };

  const handleClearFilters = () => {
    setSearchTitle('');
    setDebouncedTitle('');
    setSelectedProject(null);
    setProjectInput('');
    setPage(1);
  };

  const hasActiveFilters = Boolean(searchTitle.trim() || selectedProject);

  return (
    <div id="tin-tuc" className="w-100">
      {/* Header Row: Title & Total Count */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div className="d-flex align-items-center gap-2">
          <h2 className="fw-bold mb-0 text-uppercase" style={{ color: '#1555a6', fontSize: '1.4rem' }}>
            TIN TỨC
          </h2>
          {!loading && (
            <span
              className="badge rounded-pill fw-semibold"
              style={{ backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '0.78rem' }}
            >
              {totalElements} tin tức
            </span>
          )}
        </div>

        {loading && <span className="small text-primary fw-medium">Đang tải dữ liệu...</span>}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-3 p-md-4 rounded-3 border shadow-sm mb-4">
        <div className="row g-3 align-items-center">
          {/* Autocomplete Dự Án */}
          <div className="col-12 col-md-5" ref={dropdownRef}>
            <div className="position-relative">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-building text-primary" />
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="Gõ tên để tìm & chọn dự án..."
                  value={projectInput}
                  onChange={handleProjectInputChange}
                  onFocus={() => setProjectDropdownOpen(true)}
                  style={{ fontSize: '0.88rem' }}
                />
                {selectedProject && (
                  <button
                    className="btn btn-outline-secondary border-start-0 bg-light"
                    type="button"
                    onClick={() => handleSelectProject(null)}
                  >
                    <i className="bi bi-x-lg" style={{ fontSize: '12px' }} />
                  </button>
                )}
              </div>

              {/* Dropdown menu */}
              {projectDropdownOpen && (
                <div
                  className="dropdown-menu show w-100 shadow mt-1 p-0 overflow-auto"
                  style={{ maxHeight: '250px', zIndex: 1050 }}
                >
                  <button
                    type="button"
                    className={`dropdown-item py-2 text-primary fw-semibold ${!selectedProject ? 'active' : ''}`}
                    onClick={() => handleSelectProject(null)}
                  >
                    — Tất cả dự án —
                  </button>
                  {projectLoading ? (
                    <div className="p-3 text-center text-muted small">Đang tìm dự án...</div>
                  ) : projectOptions.length === 0 ? (
                    <div className="p-3 text-center text-muted small">Không tìm thấy dự án</div>
                  ) : (
                    projectOptions.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        className={`dropdown-item py-2 small ${selectedProject?.id === proj.id ? 'active' : ''}`}
                        onClick={() => handleSelectProject(proj)}
                      >
                        {proj.name}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Search by News Title */}
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-secondary" />
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Tìm kiếm tin tức theo tiêu đề..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                style={{ fontSize: '0.88rem' }}
              />
              {searchTitle && (
                <button
                  className="btn btn-outline-secondary border-start-0 bg-light"
                  type="button"
                  onClick={() => setSearchTitle('')}
                >
                  <i className="bi bi-x-lg" style={{ fontSize: '12px' }} />
                </button>
              )}
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="col-12 col-md-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-1"
              disabled={!hasActiveFilters}
              onClick={handleClearFilters}
              style={{ height: '38px', fontSize: '0.84rem' }}
            >
              <i className="bi bi-funnel" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-dark"
            onClick={() => fetchNewsData(page, debouncedTitle, selectedProject)}
          >
            Thử lại
          </button>
        </div>
      )}

      {/* News Grid or Empty State */}
      {loading ? (
        <div className="row g-3 g-md-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 p-2 border rounded-3 placeholder-glow">
                <div className="placeholder col-12 rounded-2 mb-2" style={{ height: '140px' }} />
                <span className="placeholder col-10 mb-1" />
                <span className="placeholder col-6 mb-2" />
                <span className="placeholder col-12" />
                <span className="placeholder col-8" />
              </div>
            </div>
          ))}
        </div>
      ) : newsList.length === 0 ? (
        <div className="py-5 px-3 text-center bg-white rounded-3 border border-dashed mb-4">
          <i className="bi bi-search text-muted" style={{ fontSize: '42px' }} />
          <h5 className="fw-semibold text-dark mt-2 mb-1">Không tìm thấy tin tức nào</h5>
          <p className="text-secondary small mb-3">Không có kết quả nào phù hợp với từ khóa hoặc dự án đã chọn.</p>
          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-pill px-4"
              onClick={handleClearFilters}
            >
              Xóa bộ lọc tìm kiếm
            </button>
          )}
        </div>
      ) : (
        <div className="row g-3 g-md-4">
          {newsList.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-3">
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {!loading && newsList.length > 0 && (
        <PaginationBar
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
