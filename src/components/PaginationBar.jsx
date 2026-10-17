import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export default function PaginationBar({
  currentPage = 1,
  totalPages = 20,
  onPageChange,
}) {
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
    '&.disabled': {
      color: '#cbd5e1',
      borderColor: '#f1f5f9',
    },
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
      {/* Left: Trang [Select] Của 20 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ color: '#475569', fontSize: '0.85rem' }}>
          Trang
        </Typography>
        <Select
          size="small"
          value={currentPage}
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <MenuItem key={pg} value={pg} sx={{ fontSize: '0.85rem' }}>
              {pg}
            </MenuItem>
          ))}
        </Select>
        <Typography sx={{ color: '#475569', fontSize: '0.85rem' }}>
          Của {totalPages}
        </Typography>
      </Box>

      {/* Right: Page Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        {/* First */}
        <Button
          onClick={() => onPageChange && onPageChange(1)}
          disabled={currentPage === 1}
          sx={navButtonSx}
        >
          <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 16 }} />
        </Button>

        {/* Prev */}
        <Button
          onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          sx={navButtonSx}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: 16 }} />
        </Button>

        {/* Page 1 */}
        <Button
          onClick={() => onPageChange && onPageChange(1)}
          sx={{
            ...navButtonSx,
            bgcolor: currentPage === 1 ? '#1565c0' : '#ffffff',
            color: currentPage === 1 ? '#ffffff' : '#64748b',
            borderColor: currentPage === 1 ? '#1565c0' : '#e2e8f0',
            fontWeight: currentPage === 1 ? 700 : 500,
            '&:hover': {
              bgcolor: currentPage === 1 ? '#0d47a1' : '#f1f5f9',
            },
          }}
        >
          1
        </Button>

        {/* Page 2 */}
        <Button
          onClick={() => onPageChange && onPageChange(2)}
          sx={{
            ...navButtonSx,
            bgcolor: currentPage === 2 ? '#1565c0' : '#ffffff',
            color: currentPage === 2 ? '#ffffff' : '#64748b',
            borderColor: currentPage === 2 ? '#1565c0' : '#e2e8f0',
            fontWeight: currentPage === 2 ? 700 : 500,
            '&:hover': {
              bgcolor: currentPage === 2 ? '#0d47a1' : '#f1f5f9',
            },
          }}
        >
          2
        </Button>

        {/* Page 3 */}
        <Button
          onClick={() => onPageChange && onPageChange(3)}
          sx={{
            ...navButtonSx,
            bgcolor: currentPage === 3 ? '#1565c0' : '#ffffff',
            color: currentPage === 3 ? '#ffffff' : '#64748b',
            borderColor: currentPage === 3 ? '#1565c0' : '#e2e8f0',
            fontWeight: currentPage === 3 ? 700 : 500,
            '&:hover': {
              bgcolor: currentPage === 3 ? '#0d47a1' : '#f1f5f9',
            },
          }}
        >
          3
        </Button>

        {/* Ellipsis */}
        <Typography sx={{ color: '#94a3b8', px: 0.5, fontSize: '0.9rem' }}>
          ...
        </Typography>

        {/* Page 10 */}
        <Button
          onClick={() => onPageChange && onPageChange(10)}
          sx={{
            ...navButtonSx,
            bgcolor: currentPage === 10 ? '#1565c0' : '#ffffff',
            color: currentPage === 10 ? '#ffffff' : '#64748b',
            borderColor: currentPage === 10 ? '#1565c0' : '#e2e8f0',
            fontWeight: currentPage === 10 ? 700 : 500,
            '&:hover': {
              bgcolor: currentPage === 10 ? '#0d47a1' : '#f1f5f9',
            },
          }}
        >
          10
        </Button>

        {/* Next */}
        <Button
          onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          sx={navButtonSx}
        >
          <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />
        </Button>

        {/* Last */}
        <Button
          onClick={() => onPageChange && onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          sx={navButtonSx}
        >
          <KeyboardDoubleArrowRightIcon sx={{ fontSize: 16 }} />
        </Button>
      </Box>
    </Box>
  );
}

