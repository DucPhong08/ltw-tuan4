import React, { useState } from 'react';
import { Layers, Copy, Check, ChevronDown, ChevronUp, Cpu, Sparkles } from 'lucide-react';

interface ComparisonSectionProps {
  id?: string;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ id = 'tech-report' }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const comparisonParagraph = `So với Redux Toolkit (RTK), Zustand có ưu thế vượt trội về tính tinh giản khi không yêu cầu bọc Provider lồng nhau, loại bỏ hoàn toàn boilerplate (actions, reducers, dispatch) và cho phép quản lý state chỉ với một custom hook duy nhất. Nhờ cơ chế subscriptions dựa trên selector, Zustand tối ưu hóa re-render hiệu quả hơn mà không cần viết các hàm memoization phức tạp. Ngoài ra, việc tích hợp middleware như persist để lưu LocalStorage cũng được cấu hình ngay lập tức chỉ với vài dòng lệnh. Tuy nhiên, nhược điểm của Zustand so với RTK là hệ sinh thái công cụ hỗ trợ chưa đồ sộ bằng, RTK Query xử lý caching server-state rất mạnh mẽ và Redux DevTools chuẩn mực hơn cho các dự án enterprise quy mô lớn.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(comparisonParagraph);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="tech-docs-section" id={id}>
      <div className="tech-docs-card">
        {/* Header with expand toggle */}
        <div className="tech-docs-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="tech-docs-title-group">
            <div className="tech-badge-icon">
              <Cpu size={20} />
            </div>
            <div>
              <div className="tech-docs-kicker">
                <Sparkles size={13} />
                <span>Báo Cáo Kiến Trúc • LTWNC Tuần 4</span>
              </div>
              <h3 className="tech-docs-title">Phân Tích State Management: Zustand vs Redux Toolkit</h3>
            </div>
          </div>

          <div className="tech-docs-header-actions">
            <span className="tech-docs-toggle-hint">
              {isExpanded ? 'Thu gọn' : 'Mở rộng bảng phân tích'}
            </span>
            <button className="tech-docs-toggle-btn" aria-label="Toggle details">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {/* Content body */}
        {isExpanded && (
          <div className="tech-docs-body">
            {/* 5-7 Lines Comparison Box */}
            <div className="tech-quote-box">
              <div className="quote-header">
                <span className="quote-label">Đoạn nhận xét so sánh (Yêu cầu đề bài 5–7 dòng)</span>
                <button className="quote-copy-btn" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Đã sao chép vào Clipboard!' : 'Sao chép nhận xét'}</span>
                </button>
              </div>

              <p className="quote-text">
                {comparisonParagraph}
              </p>
            </div>

            {/* Matrix Table */}
            <div className="tech-matrix-wrapper">
              <table className="tech-matrix-table">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Tiêu chí kỹ thuật</th>
                    <th style={{ width: '38%' }}>
                      <div className="table-header-chip active">
                        <Layers size={14} />
                        <span>Zustand (Giải pháp hiện tại)</span>
                      </div>
                    </th>
                    <th style={{ width: '37%' }}>
                      <div className="table-header-chip">
                        <span>Redux Toolkit (RTK)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Cấu hình & Boilerplate</strong></td>
                    <td>
                      <span className="tag-pro">Cực kỳ tinh gọn</span> Store tạo bằng hàm <code>create()</code>, dùng hook trực tiếp, <strong>không cần bọc Provider</strong>.
                    </td>
                    <td>
                      <span className="tag-neutral">Nhiều thủ tục</span> Bắt buộc cấu hình <code>createSlice</code>, <code>configureStore</code> và bọc <code>&lt;Provider&gt;</code> tại root.
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Kích thước thư viện</strong></td>
                    <td>
                      <span className="tag-pro">~1.2 kB minzipped</span> Siêu nhẹ, tải trang tức thì, phù hợp với mọi quy mô ứng dụng.
                    </td>
                    <td>
                      <span className="tag-neutral">~11 - 15 kB</span> Nặng hơn đáng kể do gộp chung Immer, Reselect, Redux Core.
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Tối ưu hóa Re-render</strong></td>
                    <td>
                      <span className="tag-pro">Selective Subscriptions</span> Chỉ component nào subscribe đúng selector mới render lại (ví dụ: <code>s =&gt; s.favorites.length</code>).
                    </td>
                    <td>
                      <span className="tag-neutral">useSelector</span> Cần kết hợp cẩn thận với <code>shallowEqual</code> hoặc <code>createSelector</code> để tránh re-render thừa.
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Lưu trữ LocalStorage</strong></td>
                    <td>
                      <span className="tag-pro">Tích hợp sẵn</span> Middleware <code>persist</code> cấu hình trong 2 dòng, tự động serialize/deserialize an toàn.
                    </td>
                    <td>
                      <span className="tag-neutral">Cần redux-persist</span> Thiết lập phức tạp hơn, dễ phát sinh warning hoặc lỗi Hydration trên Next.js/Vite.
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Server Cache & DevTools</strong></td>
                    <td>
                      <span className="tag-neutral">Gọn gàng</span> Tập trung hoàn hảo cho Client-state; Server-state thường kết hợp TanStack Query.
                    </td>
                    <td>
                      <span className="tag-pro">RTK Query toàn diện</span> Hỗ trợ data fetching, caching, invalidation cực mạnh cho hệ sinh thái Enterprise lớn.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
