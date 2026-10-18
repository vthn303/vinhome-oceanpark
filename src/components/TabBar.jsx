import React from 'react';

export default function TabBar({ currentTab = 'tin-tuc', onTabChange }) {
  const tabs = [
    { id: 'tong-quan', label: 'Tổng quan', icon: 'bi-compass' },
    { id: 'vi-tri', label: 'Vị trí', icon: 'bi-geo-alt' },
    { id: 'phan-khu', label: 'Phân khu', icon: 'bi-pie-chart' },
    { id: 'mat-bang', label: 'Mặt bằng quỹ căn', icon: 'bi-layers' },
    { id: 'quy-can', label: 'Quỹ căn', icon: 'bi-building' },
    { id: 'chinh-sach', label: 'Chính sách bán hàng', icon: 'bi-receipt' },
    { id: 'tin-tuc', label: 'Tin tức', icon: 'bi-globe' },
  ];

  return (
    <div
      className="w-100 d-flex align-items-center justify-content-between rounded-4 shadow-sm mb-4"
      style={{
        background: 'linear-gradient(90deg, #2A52BE 0%, #00B4D8 100%)',
        padding: '10px 14px',
        gap: '10px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <div
            key={tab.id}
            style={{
              padding: isActive ? '2px' : '0px',
              borderRadius: '999px',
              background: isActive
                ? 'linear-gradient(135deg, #B8F4FF 0%, #4EDBFF 20%, #0A8CC7 50%, #28D4FF 80%, #B8F4FF 100%)'
                : 'transparent',
              boxShadow: isActive
                ? '0 0 8px rgba(120, 230, 255, 0.8), inset 0 0 4px rgba(200, 250, 255, 0.8)'
                : 'none',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => onTabChange && onTabChange(tab.id)}
              className="btn d-inline-flex align-items-center gap-2 border-0 text-white text-nowrap"
              style={{
                borderRadius: '999px',
                padding: isActive ? '10px 22px' : '10px 18px',
                fontSize: isActive ? '0.94rem' : '0.88rem',
                fontWeight: isActive ? 700 : 500,
                background: isActive
                  ? 'linear-gradient(135deg, #1AA7D8 0%, #0B98C8 100%)'
                  : 'transparent',
                boxShadow: isActive ? 'inset 0 1px 3px rgba(255, 255, 255, 0.25)' : 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <i className={`bi ${tab.icon}`} style={{ fontSize: isActive ? '18px' : '16px' }} />
              <span>{tab.label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
