import { useState, useMemo } from 'react';
import './App.css';
import { mockProducts } from './data/mockProducts';
import type { CategoryFilter } from './types/product';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { Toolbar } from './components/Toolbar';
import { ProductCard } from './components/ProductCard';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ComparisonSection } from './components/ComparisonSection';
import { TechReportModal } from './components/TechReportModal';
import { Toast, type ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { PackageOpen, Heart } from 'lucide-react';
import { useFavoritesStore } from './store/useFavoritesStore';

const CATEGORIES: CategoryFilter[] = [
  'Tất cả',
  'Điện thoại',
  'Laptop',
  'Âm thanh',
  'Phụ kiện',
  'Đồng hồ',
];

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Tất cả');
  const [sortBy, setSortBy] = useState('featured');
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Get current favorited IDs for filtering
  const favoriteItems = useFavoritesStore((state) => state.favorites);

  // Helper to add toast
  const addToast = (text: string, type: 'add' | 'remove') => {
    const newToast: ToastMessage = {
      id: Date.now() + Math.random(),
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  const handleToggleNotice = (productName: string, isAdded: boolean) => {
    if (isAdded) {
      addToast(`Đã lưu "${productName}" vào Yêu thích!`, 'add');
    } else {
      addToast(`Đã bỏ "${productName}" khỏi Yêu thích.`, 'remove');
    }
  };

  const handleAddToCartNotice = (productName: string) => {
    addToast(`Đã thêm "${productName}" vào giỏ hàng!`, 'add');
  };

  const handleItemRemoved = (productName: string) => {
    addToast(`Đã xóa "${productName}" khỏi Yêu thích.`, 'remove');
  };

  // Compute category counts
  const categoriesWithCount = useMemo(() => {
    return CATEGORIES.map((cat) => {
      if (cat === 'Tất cả') {
        return { name: cat, count: mockProducts.length };
      }
      return {
        name: cat,
        count: mockProducts.filter((p) => p.category === cat).length,
      };
    });
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((product) => {
        // Quick Favorites only filter
        if (showOnlyFavorites) {
          const isFavorited = favoriteItems.some((fav) => fav.id === product.id);
          if (!isFavorited) return false;
        }

        // Category filter
        if (activeCategory !== 'Tất cả' && product.category !== activeCategory) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchSpecs = product.specs.some((spec) => spec.toLowerCase().includes(query));
          return matchName || matchCategory || matchDesc || matchSpecs;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'featured' keeps original order
      });
  }, [searchQuery, activeCategory, sortBy, showOnlyFavorites, favoriteItems]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('Tất cả');
    setShowOnlyFavorites(false);
    setSortBy('featured');
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-layout">
      {/* Topbar & Sticky Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Container */}
      <main className="app-container">
        {/* Modern E-Commerce Hero Banner */}
        <HeroBanner
          onExploreClick={handleScrollToCatalog}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />

        {/* Catalog Toolbar & Category Tabs */}
        <Toolbar
          categoriesWithCount={categoriesWithCount}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filteredCount={filteredProducts.length}
          showOnlyFavorites={showOnlyFavorites}
          onToggleOnlyFavorites={() => setShowOnlyFavorites((prev) => !prev)}
        />

        {/* Product Catalog Grid */}
        <section className="product-grid-section">
          {filteredProducts.length === 0 ? (
            <div className="empty-catalog">
              <div className="empty-icon-circle">
                {showOnlyFavorites ? <Heart size={36} /> : <PackageOpen size={36} />}
              </div>
              <h3 className="empty-title">
                {showOnlyFavorites
                  ? 'Chưa có sản phẩm yêu thích nào'
                  : 'Không tìm thấy sản phẩm phù hợp'}
              </h3>
              <p className="empty-desc">
                {showOnlyFavorites
                  ? 'Bạn chưa lưu sản phẩm nào. Hãy bấm vào biểu tượng trái tim để lưu các sản phẩm ưng ý.'
                  : `Không có sản phẩm nào khớp với từ khóa "${searchQuery}" hoặc bộ lọc đã chọn.`}
              </p>
              <button className="reset-filter-btn" onClick={handleResetFilters}>
                {showOnlyFavorites ? 'Xem tất cả sản phẩm' : 'Đặt lại bộ lọc'}
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onToggleNotice={handleToggleNotice}
                  onAddToCartNotice={handleAddToCartNotice}
                />
              ))}
            </div>
          )}
        </section>

        {/* Architecture & Engineering Technical Section (Tuần 4) */}
        <ComparisonSection />
      </main>

      {/* Slide-over Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onItemRemoved={handleItemRemoved}
      />

      {/* Assignment Report Modal */}
      <TechReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Toast Feedback */}
      <Toast toasts={toasts} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
