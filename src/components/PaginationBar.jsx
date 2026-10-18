import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

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

  const navButtonSx = {
    minWidth: 32,
    width: 32,
    height: 32,
    p: 0,
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    color: '#64748b',
    bgcolor: '#ffffff',
    fontSize: '0.82rem',
    fontWeight: 500,
    '&:hover': {
      bgcolor: '#f1f5f9',
      borderColor: '#cbd5e1',
    },
    '&:disabled': {
      color: '#cbd5e1',
      borderColor: '#f1f5f9',
    },
  };

  // Generate dynamic page list
  const renderPageNumbers = () => {
    if (safeTotalPages <= 5) {
      return Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((pg) => (
        <Button
          key={pg}
          onClick={() => onPageChange && onPageChange(pg)}
          sx={{
            ...navButtonSx,
            bgcolor: safeCurrentPage === pg ? '#1565c0' : '#ffffff',
            color: safeCurrentPage === pg ? '#ffffff' : '#64748b',
            borderColor: safeCurrentPage === pg ? '#1565c0' : '#e2e8f0',
            fontWeight: safeCurrentPage === pg ? 700 : 500,
            '&:hover': {
              bgcolor: safeCurrentPage === pg ? '#0d47a1' : '#f1f5f9',
            },
          }}
        >
          {pg}
        </Button>
      ));
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
            <Button
              onClick={() => onPageChange && onPageChange(1)}
              sx={{
                ...navButtonSx,
                bgcolor: safeCurrentPage === 1 ? '#1565c0' : '#ffffff',
                color: safeCurrentPage === 1 ? '#ffffff' : '#64748b',
                borderColor: safeCurrentPage === 1 ? '#1565c0' : '#e2e8f0',
              }}
            >
              1
            </Button>
            {pages[0] > 2 && (
              <Typography sx={{ color: '#94a3b8', px: 0.5, fontSize: '0.9rem' }}>
                ...
              </Typography>
            )}
          </>
        )}

        {pages.map((pg) => (
          <Button
            key={pg}
            onClick={() => onPageChange && onPageChange(pg)}
            sx={{
              ...navButtonSx,
              bgcolor: safeCurrentPage === pg ? '#1565c0' : '#ffffff',
              color: safeCurrentPage === pg ? '#ffffff' : '#64748b',
              borderColor: safeCurrentPage === pg ? '#1565c0' : '#e2e8f0',
              fontWeight: safeCurrentPage === pg ? 700 : 500,
              '&:hover': {
                bgcolor: safeCurrentPage === pg ? '#0d47a1' : '#f1f5f9',
              },
            }}
          >
            {pg}
          </Button>
        ))}

        {!pages.includes(safeTotalPages) && (
          <>
            {pages[pages.length - 1] < safeTotalPages - 1 && (
              <Typography sx={{ color: '#94a3b8', px: 0.5, fontSize: '0.9rem' }}>
                ...
              </Typography>
            )}
            <Button
              onClick={() => onPageChange && onPageChange(safeTotalPages)}
              sx={{
                ...navButtonSx,
                bgcolor: safeCurrentPage === safeTotalPages ? '#1565c0' : '#ffffff',
                color: safeCurrentPage === safeTotalPages ? '#ffffff' : '#64748b',
                borderColor: safeCurrentPage === safeTotalPages ? '#1565c0' : '#e2e8f0',
              }}
            >
              {safeTotalPages}
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mt: 4,
        mb: 6,
        pt: 1,
      }}
    >
      {/* Left: Trang [Select] Của [totalPages] */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ color: '#475569', fontSize: '0.85rem' }}>
          Trang
        </Typography>
        <Select
          size="small"
          value={safeCurrentPage}
          onChange={handleSelectChange}
          sx={{
            height: 32,
            minWidth: 54,
            fontSize: '0.85rem',
            color: '#1e293b',
            bgcolor: '#ffffff',
            borderRadius: '6px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e2e8f0',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#cbd5e1',
            },
            '& .MuiSelect-select': {
              py: '4px',
              pl: '10px',
              pr: '24px !important',
            },
          }}
        >
          {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((pg) => (
            <MenuItem key={pg} value={pg} sx={{ fontSize: '0.85rem' }}>
              {pg}
            </MenuItem>
          ))}
        </Select>
        <Typography sx={{ color: '#475569', fontSize: '0.85rem' }}>
          Của {safeTotalPages}
        </Typography>
      </Box>

      {/* Right: Navigation Page Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        {/* First */}
        <Button
          onClick={() => onPageChange && onPageChange(1)}
          disabled={safeCurrentPage === 1}
          sx={navButtonSx}
        >
          <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 16 }} />
        </Button>

        {/* Prev */}
        <Button
          onClick={() => onPageChange && onPageChange(Math.max(1, safeCurrentPage - 1))}
          disabled={safeCurrentPage === 1}
          sx={navButtonSx}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: 16 }} />
        </Button>

        {/* Dynamic Page Numbers */}
        {renderPageNumbers()}

        {/* Next */}
        <Button
          onClick={() => onPageChange && onPageChange(Math.min(safeTotalPages, safeCurrentPage + 1))}
          disabled={safeCurrentPage === safeTotalPages}
          sx={navButtonSx}
        >
          <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />
        </Button>

        {/* Last */}
        <Button
          onClick={() => onPageChange && onPageChange(safeTotalPages)}
          disabled={safeCurrentPage === safeTotalPages}
          sx={navButtonSx}
        >
          <KeyboardDoubleArrowRightIcon sx={{ fontSize: 16 }} />
        </Button>
      </Box>
    </Box>
  );
}
