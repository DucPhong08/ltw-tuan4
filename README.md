# LTWNC - Bài Tập Tuần 4: Quản Lý Sản Phẩm Yêu Thích Với Zustand

Dự án bài tập môn **Lập Trình Web Nâng Cao (LTWNC) - Tuần 4**. Ứng dụng xây dựng tính năng **"Sản phẩm yêu thích" (Wishlist)** với kiến trúc **Zustand Store riêng biệt (`useFavoritesStore`)** và giao diện hiện đại, tối ưu cho màn hình Desktop lẫn thiết bị di động.

---

## 🎯 Yêu Cầu Đề Bài & Mức Độ Đáp Ứng

1. **Tính năng "Sản phẩm yêu thích":**
   - Thêm/bớt sản phẩm vào danh sách yêu thích thông qua icon Trái tim trên từng card sản phẩm.
   - Drawer trượt (Slide-over panel) hiển thị danh sách đã thích, cho phép xóa từng món hoặc xóa tất cả.
   - Badge đếm số lượng realtime trên thanh Header.
   - Tính tổng giá trị các sản phẩm đang được yêu thích.
   - Tự động đồng bộ hóa vào `localStorage` qua middleware `persist` của Zustand (reload trang không mất dữ liệu).
2. **Cách cài đặt được lựa chọn:**
   - **Zustand store riêng biệt (`src/store/useFavoritesStore.ts`)**.
3. **Đoạn nhận xét so sánh với Redux Toolkit (5–7 dòng):**
   - Đã tích hợp trực tiếp trên giao diện web (mục Báo cáo nhận xét) và trong tài liệu này.

---

## 📝 Đoạn Nhận Xét So Sánh: Zustand vs Redux Toolkit (5–7 Dòng)

> *"So với Redux Toolkit (RTK), Zustand có ưu thế vượt trội về tính tinh giản khi không yêu cầu bọc Provider lồng nhau, loại bỏ hoàn toàn boilerplate (actions, reducers, dispatch) và cho phép quản lý state chỉ với một custom hook duy nhất. Nhờ cơ chế subscriptions dựa trên selector, Zustand tối ưu hóa re-render hiệu quả hơn mà không cần viết các hàm memoization phức tạp. Ngoài ra, việc tích hợp middleware như persist để lưu LocalStorage cũng được cấu hình ngay lập tức chỉ với vài dòng lệnh. Tuy nhiên, nhược điểm của Zustand so với RTK là hệ sinh thái công cụ hỗ trợ chưa đồ sộ bằng, RTK Query xử lý caching server-state rất mạnh mẽ và Redux DevTools chuẩn mực hơn cho các dự án enterprise quy mô lớn."*

### Bảng đối sánh tóm tắt

| Tiêu chí | Zustand (Lựa chọn dự án) | Redux Toolkit (RTK) |
| :--- | :--- | :--- |
| **Boilerplate** | Cực ít, khởi tạo và dùng ngay qua 1 Hook | Cần `configureStore`, `createSlice`, `Provider` |
| **Bundle Size** | ~1.2 kB | ~11 - 15 kB |
| **Re-render** | Tự động tối ưu qua selector: `useFavoritesStore(s => s.favorites.length)` | Cần `useSelector` kết hợp memoized selector |
| **LocalStorage** | Sẵn có middleware `persist` chỉ với 2 dòng | Cần thêm thư viện `redux-persist` rườm rà |
| **Use case** | Phù hợp từ dự án vừa/nhỏ đến phức tạp | Dự án Enterprise quy mô lớn, nhiều team phát triển |

---

## 💻 Thiết Kế UI/UX: Rộng Rãi, Chuẩn Màn Hình Desktop

* **Khắc phục lỗi "giao diện bé và hẹp":**
  - Chiều rộng nội dung `max-width: 1440px` linh hoạt, không bị bóp nghẹt trong container 400px - 600px.
  - Grid 4 cột đều đặn trên màn hình máy tính (`xl:grid-cols-4`, `lg:grid-cols-3`).
  - Hình ảnh sản phẩm tỉ lệ 4:3 sắc nét với hiệu ứng phóng to nhẹ khi hover.
  - Drawer danh sách yêu thích trượt từ bên phải với nền mờ cao cấp (`backdrop-filter: blur(4px)`).
  - Micro-interactions: Trái tim nảy hoạt họa khi bấm (Bounce animation), badge đếm số nhảy số tức thì, thông báo Toast góc màn hình.

---

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Cài đặt thư viện:
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev server):
```bash
npm run dev
```
Truy cập: `http://localhost:5173`

### 3. Build kiểm tra sản phẩm:
```bash
npm run build
```

---

## 📂 Cấu Trúc Mã Nguồn

```
ltw-tuan4/
├── src/
│   ├── components/
│   │   ├── ComparisonSection.tsx   # Card báo cáo nhận xét 5-7 dòng và bảng so sánh
│   │   ├── FavoritesDrawer.tsx     # Bảng trượt xem và quản lý sản phẩm yêu thích
│   │   ├── Footer.tsx              # Chân trang thông tin
│   │   ├── HeroBanner.tsx          # Banner giới thiệu bài tập và thông số
│   │   ├── Navbar.tsx              # Header gắn cố định, tìm kiếm và nút Wishlist
│   │   ├── ProductCard.tsx         # Thẻ sản phẩm với nút tim tương tác
│   │   ├── Toast.tsx               # Thông báo nổi khi thêm/bớt yêu thích
│   │   └── Toolbar.tsx             # Bộ lọc danh mục và sắp xếp giá/đánh giá
│   ├── data/
│   │   └── mockProducts.ts         # 12 sản phẩm công nghệ thực tế
│   ├── store/
│   │   └── useFavoritesStore.ts    # Zustand store kèm persist middleware
│   ├── types/
│   │   └── product.ts              # Định nghĩa kiểu dữ liệu TypeScript
│   ├── utils/
│   │   └── formatCurrency.ts       # Định dạng tiền tệ VNĐ
│   ├── App.css                     # Bố cục giao diện rộng rãi, hiện đại
│   ├── App.tsx                     # Component chính
│   ├── index.css                   # Design tokens và reset CSS
│   └── main.tsx                    # Entry point của ứng dụng
├── package.json
└── README.md
```
