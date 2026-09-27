import React from 'react';
import { ArrowRight, Heart, ShieldCheck, Zap, CreditCard, RotateCcw } from 'lucide-react';
import { useFavoritesStore } from '../store/useFavoritesStore';

interface HeroBannerProps {
  onExploreClick: () => void;
  onOpenWishlist: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onOpenWishlist,
}) => {
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <section className="hero-section">
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            <span>Bộ sưu tập công nghệ mới 2026</span>
          </div>

          <h1 className="hero-title">
            Nâng Tầm Không Gian Sống Với <span>Thiết Bị Đỉnh Cao</span>
          </h1>

          <p className="hero-subtitle">
            Trải nghiệm các sản phẩm công nghệ hàng đầu thế giới từ Apple, Sony, Samsung đến Keychron.
            Lưu lại sản phẩm bạn quan tâm vào danh sách yêu thích chỉ với một chạm.
          </p>

          <div className="hero-cta-group">
            <button className="hero-btn-primary" onClick={onExploreClick}>
              <span>Khám phá sản phẩm</span>
              <ArrowRight size={18} />
            </button>

            <button className="hero-btn-secondary" onClick={onOpenWishlist}>
              <Heart
                size={18}
                className={favoritesCount > 0 ? 'fill-current text-rose-500' : ''}
              />
              <span>
                {favoritesCount > 0
                  ? `Xem yêu thích (${favoritesCount} món)`
                  : 'Mục yêu thích'}
              </span>
            </button>
          </div>
        </div>

        {/* E-commerce Store Highlights & Guarantees */}
        <div className="hero-perks-grid">
          <div className="perk-card">
            <div className="perk-icon-wrap">
              <ShieldCheck size={20} />
            </div>
            <div className="perk-text">
              <h4>100% Chính Hãng</h4>
              <p>Bảo hành điện tử 12-24 tháng</p>
            </div>
          </div>

          <div className="perk-card">
            <div className="perk-icon-wrap">
              <Zap size={20} />
            </div>
            <div className="perk-text">
              <h4>Giao Nhanh 2 Giờ</h4>
              <p>Miễn phí toàn bộ đơn từ 1.000.000₫</p>
            </div>
          </div>

          <div className="perk-card">
            <div className="perk-icon-wrap">
              <CreditCard size={20} />
            </div>
            <div className="perk-text">
              <h4>Trả Góp 0%</h4>
              <p>Hỗ trợ đa dạng thẻ ngân hàng</p>
            </div>
          </div>

          <div className="perk-card">
            <div className="perk-icon-wrap">
              <RotateCcw size={20} />
            </div>
            <div className="perk-text">
              <h4>Đổi Trả 30 Ngày</h4>
              <p>Lỗi 1 đổi 1 tận nơi tiện lợi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
