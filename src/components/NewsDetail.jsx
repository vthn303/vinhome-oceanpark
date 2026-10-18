import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Container,
  Grid,
  Skeleton,
  Alert,
  Snackbar,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
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

        // Fetch related news (TIN LIÊN QUAN: danh sách 4 tin tức cùng dự án sắp xếp theo ngày tạo mới nhất)
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
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
        <Skeleton variant="text" width="280px" height={28} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={50} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="40%" height={24} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" width="100%" height={400} sx={{ borderRadius: '14px', mb: 4 }} />
        <Skeleton variant="text" sx={{ mb: 1.5 }} />
        <Skeleton variant="text" sx={{ mb: 1.5 }} />
        <Skeleton variant="text" width="85%" sx={{ mb: 1.5 }} />
      </Container>
    );
  }

  if (error || !news) {
    return (
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 6 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Không tìm thấy nội dung bài viết.'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Quay lại trang chủ
        </Button>
      </Container>
    );
  }

  const formattedDate = formatDate(news.createdAt);
  const authorName = news.updatedByName || 'Vinhomes.biz.vn';
  const projectName = news.projectName || 'Vinhomes Ocean Park 3';

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{
          mb: 2,
          fontSize: '0.85rem',
          '& .MuiBreadcrumbs-separator': {
            color: '#94a3b8',
            mx: 0.8,
          },
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{ color: '#1565c0', fontWeight: 500 }}
        >
          Dự án
        </Link>
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{ color: '#1565c0', fontWeight: 500 }}
        >
          {projectName}
        </Link>
        <Typography sx={{ color: '#475569', fontWeight: 500 }}>
          Tin tức
        </Typography>
      </Breadcrumbs>

      {/* Main Title & Share Row */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.1rem' },
            color: '#1555a6',
            letterSpacing: '-0.3px',
            lineHeight: 1.3,
            mb: 1.5,
            textTransform: 'uppercase',
          }}
        >
          {news.title}
        </Typography>

        {/* Meta Info Bar: Date, Author, Share Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            pt: 0.5,
            pb: 1,
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Date */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: '#8c9ba5' }} />
              <Typography sx={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                {formattedDate}
              </Typography>
            </Box>

            {/* Author */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: 18, color: '#8c9ba5' }} />
              <Typography sx={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                {authorName}
              </Typography>
            </Box>
          </Box>

          {/* Share Button */}
          <Button
            variant="contained"
            onClick={handleShare}
            endIcon={<OpenInNewIcon sx={{ fontSize: '18px !important' }} />}
            sx={{
              bgcolor: '#0288d1',
              color: '#ffffff',
              px: 2.5,
              py: 0.8,
              borderRadius: '6px',
              fontSize: '0.88rem',
              fontWeight: 600,
              boxShadow: 'none',
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: '#0277bd',
                boxShadow: '0 2px 8px rgba(2, 136, 209, 0.3)',
              },
            }}
          >
            Chia sẻ
          </Button>
        </Box>
      </Box>

      {/* Hero / Cover Image if available */}
      {news.fileInfo?.fullLink && (
        <Box
          sx={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            mb: 3.5,
            bgcolor: '#f8fafc',
          }}
        >
          <Box
            component="img"
            src={news.fileInfo.fullLink}
            alt={news.title}
            sx={{
              width: '100%',
              maxHeight: { xs: 260, sm: 420, md: 520 },
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
      )}

      {/* Short Content / Lead Paragraph */}
      {news.shortContent && (
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.05rem',
            fontWeight: 500,
            lineHeight: 1.75,
            color: '#334155',
            mb: 3,
            fontStyle: 'italic',
            borderLeft: '4px solid #0288d1',
            pl: 2,
            py: 0.5,
            bgcolor: '#f8fafc',
            borderRadius: '0 8px 8px 0',
          }}
        >
          {news.shortContent}
        </Typography>
      )}

      {/* Main HTML Content */}
      <Box
        sx={{
          color: '#334155',
          fontSize: '0.98rem',
          lineHeight: 1.85,
          mb: 6,
          '& p': {
            mb: 2.2,
            lineHeight: 1.85,
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto !important',
            borderRadius: '12px',
            margin: '20px auto',
            display: 'block',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.08)',
          },
          '& h2, & h3, & h4': {
            color: '#1555a6',
            fontWeight: 700,
            mt: 3,
            mb: 1.5,
          },
          '& ul, & ol': {
            pl: 3,
            mb: 2.2,
          },
          '& li': {
            mb: 0.8,
          },
        }}
        dangerouslySetInnerHTML={{ __html: news.content || '' }}
      />

      {/* Related News Section ("TIN LIÊN QUAN") */}
      <Box sx={{ mt: 6, pt: 4, borderTop: '2px solid #edf2f7' }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.25rem', sm: '1.45rem' },
            color: '#1555a6',
            letterSpacing: '-0.2px',
            textTransform: 'uppercase',
            mb: 3,
          }}
        >
          TIN LIÊN QUAN
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 2.5 }}>
          {relatedNews.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <NewsCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Share Toast */}
      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Đã sao chép liên kết bài viết!
        </Alert>
      </Snackbar>
    </Container>
  );
}

