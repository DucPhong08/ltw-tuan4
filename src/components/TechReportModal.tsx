import React from 'react';
import { X, Check, Copy, BookOpen, Layers, Cpu } from 'lucide-react';

interface TechReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechReportModal: React.FC<TechReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const comparisonParagraph = `So với Redux Toolkit (RTK), Zustand có ưu thế vượt trội về tính tinh giản khi không yêu cầu bọc Provider lồng nhau, loại bỏ hoàn toàn boilerplate (actions, reducers, dispatch) và cho phép quản lý state chỉ với một custom hook duy nhất. Nhờ cơ chế subscriptions dựa trên selector, Zustand tối ưu hóa re-render hiệu quả hơn mà không cần viết các hàm memoization phức tạp. Ngoài ra, việc tích hợp middleware như persist để lưu LocalStorage cũng được cấu hình ngay lập tức chỉ với vài dòng lệnh. Tuy nhiên, nhược điểm của Zustand so với RTK là hệ sinh thái công cụ hỗ trợ chưa đồ sộ bằng, RTK Query xử lý caching server-state rất mạnh mẽ và Redux DevTools chuẩn mực hơn cho các dự án enterprise quy mô lớn.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(comparisonParagraph);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="modal-container">
        <div className="tech-modal-panel">
          <div className="tech-modal-header">
            <div className="tech-modal-title-wrap">
              <div className="tech-modal-badge">
                <BookOpen size={18} />
              </div>
              <div>
                <h2 className="tech-modal-title">Báo Cáo Bài Tập LTWNC - Tuần 4</h2>
                <span className="tech-modal-subtitle">Chủ đề: State Management với Zustand & Đánh giá so với Redux Toolkit</span>
              </div>
            </div>
            <button className="drawer-close-btn" onClick={onClose} aria-label="Đóng">
              <X size={20} />
            </button>
          </div>

          <div className="tech-modal-body">
            {/* Quick Summary Cards */}
            <div className="tech-modal-summary-grid">
              <div className="summary-stat-box">
                <div className="stat-box-icon"><Layers size={18} /></div>
                <div>
                  <div className="stat-box-title">Giải pháp chọn</div>
                  <div className="stat-box-val">Zustand Store riêng</div>
                </div>
              </div>

              <div className="summary-stat-box">
                <div className="stat-box-icon"><Cpu size={18} /></div>
                <div>
                  <div className="stat-box-title">Middleware</div>
                  <div className="stat-box-val">Persist (LocalStorage)</div>
                </div>
              </div>

              <div className="summary-stat-box">
                <div className="stat-box-icon"><Check size={18} /></div>
                <div>
                  <div className="stat-box-title">Tối ưu Re-render</div>
                  <div className="stat-box-val">Atomic Selector Hooks</div>
                </div>
              </div>
            </div>

            {/* 5-7 lines requirement */}
            <div className="tech-quote-box" style={{ margin: '1.25rem 0' }}>
              <div className="quote-header">
                <span className="quote-label">Đoạn nhận xét so sánh (Yêu cầu đề bài 5–7 dòng)</span>
                <button className="quote-copy-btn" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Đã chép!' : 'Sao chép đoạn văn'}</span>
                </button>
              </div>
              <p className="quote-text">{comparisonParagraph}</p>
            </div>

            {/* Implementation Details */}
            <div className="tech-code-overview">
              <h4>Kiến Trúc Store Đã Triển Khai (useFavoritesStore.ts)</h4>
              <ul>
                <li><strong>State:</strong> <code>favorites: Product[]</code> chứa danh sách các sản phẩm yêu thích đã chọn.</li>
                <li><strong>Hành động:</strong> <code>toggleFavorite(product)</code> (tự động đảo trạng thái thêm/xóa), <code>removeFavorite(id)</code>, <code>clearFavorites()</code>.</li>
                <li><strong>Selectors & Computed:</strong> <code>isFavorite(id)</code>, <code>getFavoriteCount()</code>, <code>getTotalFavoritesValue()</code>.</li>
                <li><strong>Tự động lưu:</strong> Đồng bộ dữ liệu qua <code>localStorage</code> với key <code>ltw-favorites-storage</code>.</li>
              </ul>
            </div>
          </div>

          <div className="tech-modal-footer">
            <button className="reset-filter-btn" onClick={onClose} style={{ marginLeft: 'auto' }}>
              Đóng cửa sổ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
