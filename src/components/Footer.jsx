import React from 'react';
import Logo from './Logo';

export default function Footer() {
  const socialIcons = [
    { icon: 'bi-facebook', href: '#' },
    { icon: 'bi-youtube', href: '#' },
    { icon: 'bi-tiktok', href: '#' },
    { icon: 'bi-globe', href: '#' },
  ];

  return (
    <footer className="w-100 mt-auto">
      {/* Upper Footer Bar */}
      <div
        className="py-5 px-3 px-md-4 text-white"
        style={{ backgroundColor: '#009cdb' }}
      >
        <div className="container-xl">
          <div className="row g-4 align-items-start">
            {/* Col 1: Brand & Contact */}
            <div className="col-12 col-md-5">
              <div className="mb-3">
                <Logo size={36} monochrome />
              </div>

              <p
                className="text-white mb-4"
                style={{ fontSize: '0.85rem', lineHeight: 1.5, maxWidth: '360px' }}
              >
                Nền tảng công nghệ tiên phong & dẫn đầu lĩnh vực kinh doanh bất động sản tại Việt Nam
              </p>

              {/* Contact list */}
              <div className="d-flex flex-column gap-2" style={{ fontSize: '0.82rem' }}>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-telephone" style={{ fontSize: '15px' }} />
                  <span className="fw-medium">0972 72 9090</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-envelope" style={{ fontSize: '15px' }} />
                  <span className="fw-medium">Contact@gmail.com</span>
                </div>

                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-geo-alt mt-1" style={{ fontSize: '16px' }} />
                  <span style={{ lineHeight: 1.45, maxWidth: '360px' }}>
                    S024-06, Sao Biển 24, KĐT Vinhomes Ocean Park, Xã Gia Lâm, TP Hà Nội, Việt Nam
                  </span>
                </div>
              </div>
            </div>

            {/* Col 2: Danh mục & Kết nối */}
            <div className="col-12 col-sm-6 col-md-3">
              {/* Danh mục */}
              <h6 className="fw-bold mb-3 text-white">Danh mục</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
                {['Giới thiệu', 'Dự án', 'Liên hệ'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white text-decoration-none d-inline-flex align-items-center gap-2 opacity-75"
                      style={{ fontSize: '0.82rem' }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
                    >
                      <span>•</span> {item}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Kết nối */}
              <h6 className="fw-bold mb-3 text-white">Kết nối</h6>
              <div className="d-flex gap-2">
                {socialIcons.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    className="btn btn-outline-light rounded-circle p-0 d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px' }}
                  >
                    <i className={`bi ${s.icon}`} style={{ fontSize: '14px' }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 3: Map Preview Card */}
            <div className="col-12 col-sm-6 col-md-4">
              <div
                className="ms-md-auto rounded-3 overflow-hidden shadow-sm border border-white border-opacity-25 bg-white"
                style={{ maxWidth: '340px' }}
              >
                <img
                  src="/assets/footer-map.png"
                  alt="Vinhomes Ocean Park Map"
                  className="w-100 d-block object-fit-cover"
                  style={{ height: '180px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div
        className="py-3 px-3 text-center text-white-50"
        style={{ backgroundColor: '#144686', fontSize: '0.8rem' }}
      >
        <span>© 2026 - Realestate. All rights reserved.</span>
      </div>
    </footer>
  );
}
