import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import type { Product } from '../types/product';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onToggleNotice: (productName: string, isAdded: boolean) => void;
  onAddToCartNotice?: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleNotice,
  onAddToCartNotice,
}) => {
  const isFav = useFavoritesStore((state) =>
    state.favorites.some((item) => item.id === product.id)
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [isBouncing, setIsBouncing] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    const isAdded = toggleFavorite(product);
    onToggleNotice(product.name, isAdded);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddedToCart(true);
    if (onAddToCartNotice) {
      onAddToCartNotice(product.name);
    }
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  // Calculate discount percentage if originalPrice exists
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Product Image Section */}
      <div className="card-media">
        <img
          src={product.image}
          alt={product.name}
          className="card-img"
          loading="lazy"
        />

        {/* Promo badges */}
        <div className="card-badges-wrapper">
          {product.badge && (
            <span className="card-badge primary-badge">{product.badge}</span>
          )}
          {discountPercent > 0 && (
            <span className="card-badge discount-badge">-{discountPercent}%</span>
          )}
        </div>

        {/* Floating Heart Button */}
        <button
          className={`card-fav-btn ${isFav ? 'is-active' : ''} ${isBouncing ? 'animate-heart-beat' : ''}`}
          onClick={handleToggleFav}
          title={isFav ? 'Bỏ khỏi danh sách yêu thích' : 'Lưu vào danh sách yêu thích'}
          aria-label={isFav ? 'Bỏ yêu thích' : 'Yêu thích'}
        >
          <Heart size={19} className={isFav ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Product Details */}
      <div className="card-body">
        <div className="card-header-meta">
          <span className="card-category">{product.category}</span>
          <div className="card-rating">
            <Star size={13} className="star-icon" />
            <span className="rating-score">{product.rating}</span>
            <span className="rating-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Highlighted Specs */}
        <div className="card-specs">
          {product.specs.slice(0, 3).map((spec, idx) => (
            <span key={idx} className="spec-chip">
              {spec}
            </span>
          ))}
        </div>

        {/* Price & Action Button */}
        <div className="card-footer">
          <div className="card-price-group">
            <span className="current-price">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          <div className="card-actions-group">
            <button
              className={`add-cart-btn ${isAddedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              title="Thêm vào giỏ hàng"
            >
              {isAddedToCart ? (
                <>
                  <Check size={15} />
                  <span>Đã thêm</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={15} />
                  <span>Mua</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
