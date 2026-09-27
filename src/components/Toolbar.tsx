import React from 'react';
import { Search, X, SlidersHorizontal, Heart } from 'lucide-react';
import type { CategoryFilter } from '../types/product';
import { useFavoritesStore } from '../store/useFavoritesStore';

interface CategoryWithCount {
  name: CategoryFilter;
  count: number;
}

interface ToolbarProps {
  categoriesWithCount: CategoryWithCount[];
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  filteredCount: number;
  showOnlyFavorites: boolean;
  onToggleOnlyFavorites: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  categoriesWithCount,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filteredCount,
  showOnlyFavorites,
  onToggleOnlyFavorites,
}) => {
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <section className="catalog-toolbar-section" id="product-catalog">
      {/* Mobile Search Bar */}
      <div className="mobile-search-bar">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Tìm sản phẩm theo tên, danh mục..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Xóa tìm kiếm"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="catalog-toolbar-header">
        {/* Category Filter Tabs */}
        <div className="category-scroll-container">
          <div className="category-tabs">
            {categoriesWithCount.map((cat) => (
              <button
                key={cat.name}
                className={`category-tab ${activeCategory === cat.name && !showOnlyFavorites ? 'active' : ''}`}
                onClick={() => {
                  if (showOnlyFavorites) onToggleOnlyFavorites();
                  onSelectCategory(cat.name);
                }}
              >
                <span>{cat.name}</span>
                <span className="tab-count">{cat.count}</span>
              </button>
            ))}

            {/* Quick Favorites Only Toggle */}
            <button
              className={`category-tab fav-filter-tab ${showOnlyFavorites ? 'active-fav' : ''}`}
              onClick={onToggleOnlyFavorites}
              title="Chỉ hiển thị sản phẩm bạn đã bấm thích"
            >
              <Heart
                size={14}
                className={showOnlyFavorites || favoritesCount > 0 ? 'fill-current' : ''}
              />
              <span>Đã thích</span>
              <span className="tab-count fav-count">{favoritesCount}</span>
            </button>
          </div>
        </div>

        {/* Right side: Sorting controls */}
        <div className="toolbar-controls">
          <div className="sort-wrapper">
            <SlidersHorizontal size={15} className="sort-icon" />
            <select
              id="sort-select"
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sắp xếp danh sách sản phẩm"
            >
              <option value="featured">✨ Nổi bật nhất</option>
              <option value="price-asc">💵 Giá: Thấp đến Cao</option>
              <option value="price-desc">💎 Giá: Cao đến Thấp</option>
              <option value="rating">⭐ Đánh giá cao nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results status indicator */}
      <div className="catalog-status-bar">
        <div className="status-indicator">
          <span>Tìm thấy <strong>{filteredCount}</strong> sản phẩm</span>
          {showOnlyFavorites && (
            <span className="active-filter-badge">
              Chỉ hiển thị sản phẩm yêu thích ({favoritesCount})
              <button onClick={onToggleOnlyFavorites} title="Hủy lọc">×</button>
            </span>
          )}
          {activeCategory !== 'Tất cả' && !showOnlyFavorites && (
            <span className="active-filter-badge">
              Danh mục: {activeCategory}
              <button onClick={() => onSelectCategory('Tất cả')} title="Hủy lọc">×</button>
            </span>
          )}
          {searchQuery && (
            <span className="active-filter-badge">
              Khớp: "{searchQuery}"
              <button onClick={() => onSearchChange('')} title="Hủy tìm kiếm">×</button>
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
