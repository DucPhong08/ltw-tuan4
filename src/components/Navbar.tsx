import React from 'react';
import { Heart, Search, X, Sparkles, FileText, ShoppingBag } from 'lucide-react';
import { useFavoritesStore } from '../store/useFavoritesStore';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenWishlist: () => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenWishlist,
  onOpenReport,
}) => {
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <header className="navbar-wrapper">
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="app-container top-announcement-inner">
          <div className="announcement-text">
            <span className="announcement-pill">HOT</span>
            <span>Ưu đãi thành viên: Giảm thêm 1.000.000₫ khi mua Laptop & Điện thoại • Miễn phí vận chuyển toàn quốc</span>
          </div>
          <div className="announcement-links">
            <button className="top-link-btn" onClick={onOpenReport}>
              <FileText size={13} />
              <span>Báo cáo bài tập Tuần 4 (Zustand vs RTK)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar">
        <div className="app-container">
          <div className="navbar-inner">
            {/* Brand Logo */}
            <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="brand-icon-wrapper">
                <ShoppingBag size={22} />
              </div>
              <div className="brand-info">
                <span className="brand-name">NOVATECH</span>
                <span className="brand-tagline">Premium Tech Store</span>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="nav-search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Tìm iPhone 16 Pro, MacBook M3, tai nghe Sony..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  title="Xóa tìm kiếm"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Nav Actions */}
            <div className="nav-actions">
              <button
                className="nav-report-btn"
                onClick={onOpenReport}
                title="Xem phân tích kỹ thuật Zustand vs RTK"
              >
                <Sparkles size={16} />
                <span>Báo cáo Tuần 4</span>
              </button>

              <button
                className={`wishlist-btn ${favoritesCount > 0 ? 'has-items' : ''}`}
                onClick={onOpenWishlist}
                title="Xem danh sách yêu thích"
              >
                <Heart
                  size={19}
                  className={favoritesCount > 0 ? 'fill-current' : ''}
                />
                <span className="wishlist-btn-text">Yêu thích</span>
                <span className={`wishlist-badge ${favoritesCount > 0 ? 'animate-badge-pop' : ''}`}>
                  {favoritesCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
