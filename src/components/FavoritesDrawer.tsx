import React from 'react';
import { X, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { formatCurrency } from '../utils/formatCurrency';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onItemRemoved: (productName: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  onItemRemoved,
}) => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const totalValue = useFavoritesStore((state) => state.getTotalFavoritesValue());

  if (!isOpen) return null;

  const handleRemove = (id: string, name: string) => {
    removeFavorite(id);
    onItemRemoved(name);
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ sản phẩm khỏi danh sách yêu thích?')) {
      clearFavorites();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={onClose} />

      {/* Drawer Panel */}
      <aside className="drawer-panel" aria-label="Danh sách sản phẩm yêu thích">
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h2 className="drawer-title">Sản phẩm yêu thích</h2>
            <span className="drawer-count-chip">{favorites.length} món</span>
          </div>

          <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Đóng bảng yêu thích"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {favorites.length === 0 ? (
            <div className="drawer-empty">
              <div className="drawer-empty-icon">
                <Heart size={32} />
              </div>
              <h3 className="drawer-empty-title">Chưa có sản phẩm nào</h3>
              <p className="drawer-empty-desc">
                Nhấn vào biểu tượng trái tim trên các sản phẩm bạn quan tâm để lưu lại vào đây.
              </p>
              <button className="reset-filter-btn" onClick={onClose}>
                Tiếp tục khám phá
              </button>
            </div>
          ) : (
            favorites.map((product) => (
              <div key={product.id} className="fav-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="fav-item-thumb"
                />

                <div className="fav-item-info">
                  <span className="fav-item-category">{product.category}</span>
                  <h4 className="fav-item-title" title={product.name}>
                    {product.name}
                  </h4>
                  <span className="fav-item-price">
                    {formatCurrency(product.price)}
                  </span>
                </div>

                <button
                  className="fav-item-remove-btn"
                  onClick={() => handleRemove(product.id, product.name)}
                  title="Bỏ yêu thích"
                  aria-label={`Bỏ yêu thích ${product.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {favorites.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-row">
              <span className="summary-label">Tổng giá trị ước tính:</span>
              <span className="summary-value">{formatCurrency(totalValue)}</span>
            </div>

            <div className="drawer-action-row">
              <button
                className="clear-all-btn"
                onClick={handleClearAll}
                title="Xóa toàn bộ"
              >
                Xóa tất cả
              </button>

              <button
                className="checkout-btn"
                onClick={() => alert(`Đã chuyển ${favorites.length} sản phẩm yêu thích sang đơn hàng nháp!`)}
              >
                <ShoppingBag size={18} />
                <span>Đặt mua ngay</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
