import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Skeleton,
  Alert,
  Button,
  TextField,
  Autocomplete,
  InputAdornment,
  IconButton,
  CircularProgress,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
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

  // Project Autocomplete State
  const [projectOptions, setProjectOptions] = useState([]);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectInput, setProjectInput] = useState('');
  const projectTimerRef = useRef(null);
  const titleTimerRef = useRef(null);

  // Debounce searchTitle changes
  useEffect(() => {
    if (titleTimerRef.current) {
      clearTimeout(titleTimerRef.current);
    }
    titleTimerRef.current = setTimeout(() => {
      setDebouncedTitle(searchTitle);
      setPage(1); // Reset to page 1 on search change
    }, 350);

    return () => {
      if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    };
  }, [searchTitle]);

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

  // Handle typing in project autocomplete with debounce
  const handleProjectInputChange = (event, newInputValue) => {
    setProjectInput(newInputValue);

    if (projectTimerRef.current) {
      clearTimeout(projectTimerRef.current);
    }

    projectTimerRef.current = setTimeout(async () => {
      if (!newInputValue.trim()) {
        const res = await searchProjects({ pageSize: 50 });
        const list = Array.isArray(res) ? res : res.data || [];
        setProjectOptions(list);
        return;
      }

      setProjectLoading(true);
      try {
        const res = await searchProjects({
          name: newInputValue.trim(),
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

  // Fetch news data whenever page, debouncedTitle, or selectedProject changes
  const fetchNewsData = async (pageIndex, titleQuery, project) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        pageNumber: pageIndex - 1, // 0-indexed
        pageSize: pageSize, // 12 items per page
        sort: 'createdAt:desc', // Sắp xếp theo ngày tạo mới nhất
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
    setPage(1);
  };

  const hasActiveFilters = Boolean(searchTitle.trim() || selectedProject);

  return (
    <Box id="tin-tuc" sx={{ width: '100%' }}>
      {/* Header Row: Title & Indicator */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.25rem', sm: '1.45rem' },
              color: '#1555a6',
              letterSpacing: '-0.2px',
              textTransform: 'uppercase',
            }}
          >
            TIN TỨC
          </Typography>

          {/* {!loading && (
            <Chip
              label={`${totalElements} tin tức`}
              size="small"
              sx={{
                bgcolor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          )} */}
        </Box>

        {loading && (
          <Typography variant="caption" sx={{ color: '#0288d1', fontWeight: 500 }}>
            Đang tải dữ liệu...
          </Typography>
        )}
      </Box>

      {/* Search & Filter Bar */}
      <Box
        sx={{
          bgcolor: '#ffffff',
          p: { xs: 2, sm: 2.5 },
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
          mb: 3,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Autocomplete Dự Án */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Autocomplete
              value={selectedProject}
              onChange={(event, newValue) => {
                setSelectedProject(newValue);
                setPage(1); // Reset page on project change
              }}
              inputValue={projectInput}
              onInputChange={handleProjectInputChange}
              options={projectOptions}
              getOptionLabel={(option) => option.name || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              loading={projectLoading}
              noOptionsText="Không tìm thấy dự án"
              renderInput={(params) => {
                const inputSlot = params.slotProps?.input || params.InputProps || {};
                return (
                  <TextField
                    {...params}
                    placeholder="Gõ tên để tìm & chọn dự án..."
                    size="small"
                    slotProps={{
                      ...params.slotProps,
                      input: {
                        ...inputSlot,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <ApartmentIcon sx={{ color: '#0288d1', fontSize: 20 }} />
                            </InputAdornment>
                            {inputSlot.startAdornment}
                          </>
                        ),
                        endAdornment: (
                          <>
                            {projectLoading ? <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} /> : null}
                            {inputSlot.endAdornment}
                          </>
                        ),
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        bgcolor: '#f8fafc',
                        '&:hover': { bgcolor: '#ffffff' },
                        '&.Mui-focused': { bgcolor: '#ffffff' },
                      },
                    }}
                  />
                );
              }}
            />
          </Grid>

          {/* Search by News Title */}
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm tin tức theo tiêu đề..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#64748b', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTitle ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchTitle('')}
                        edge="end"
                      >
                        <ClearIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  bgcolor: '#f8fafc',
                  '&:hover': { bgcolor: '#ffffff' },
                  '&.Mui-focused': { bgcolor: '#ffffff' },
                },
              }}
            />
          </Grid>

          {/* Reset Filters Button */}
          {/* <Grid size={{ xs: 12, md: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              size="medium"
              disabled={!hasActiveFilters}
              onClick={handleClearFilters}
              startIcon={<FilterListOffIcon />}
              sx={{
                height: 40,
                borderRadius: '8px',
                borderColor: '#cbd5e1',
                color: '#475569',
                fontSize: '0.84rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#0288d1',
                  color: '#0288d1',
                  bgcolor: '#f0f9ff',
                },
              }}
            >
              Xóa bộ lọc
            </Button>
          </Grid> */}
        </Grid>
      </Box>

      {/* Error Banner with Retry */}
      {error && (
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={() => fetchNewsData(page, debouncedTitle, selectedProject)}
            >
              Thử lại
            </Button>
          }
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Cards Grid or Empty State */}
      {loading ? (
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 2.5 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid key={`skeleton-${index}`} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                sx={{
                  borderRadius: '10px',
                  border: '1px solid #eaedf3',
                  p: 1.5,
                  bgcolor: '#ffffff',
                }}
              >
                <Skeleton variant="rounded" height={140} sx={{ borderRadius: '8px', mb: 1.5 }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 0.5 }} />
                <Skeleton variant="text" width="60%" sx={{ fontSize: '0.8rem', mb: 1 }} />
                <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} />
                <Skeleton variant="text" width="80%" sx={{ fontSize: '0.75rem' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : newsList.length === 0 ? (
        <Box
          sx={{
            py: 8,
            px: 3,
            textAlign: 'center',
            bgcolor: '#ffffff',
            borderRadius: '12px',
            border: '1px dashed #cbd5e1',
            mb: 4,
          }}
        >
          <SearchIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 1.5 }} />
          <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600, mb: 1 }}>
            Không tìm thấy tin tức nào
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5 }}>
            Không có kết quả nào phù hợp với từ khóa hoặc dự án đã chọn.
          </Typography>
          {hasActiveFilters && (
            <Button
              variant="contained"
              onClick={handleClearFilters}
              sx={{ bgcolor: '#0288d1', borderRadius: '8px' }}
            >
              Xóa bộ lọc tìm kiếm
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 2.5 }}>
          {newsList.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <NewsCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination Bar */}
      {!loading && newsList.length > 0 && (
        <PaginationBar
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
}
