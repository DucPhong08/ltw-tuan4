import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="app-container">
        <div className="footer-inner">
          <div>
            <strong>LTWNC - Bài tập tuần 4</strong> • Quản lý sản phẩm yêu thích (Zustand Store)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Phát triển với</span>
            <Heart size={14} style={{ color: 'var(--accent-heart)', fill: 'var(--accent-heart)' }} />
            <span>và Zustand State Management</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
