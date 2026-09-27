export interface Product {
  id: string;
  name: string;
  category: 'Điện thoại' | 'Laptop' | 'Âm thanh' | 'Phụ kiện' | 'Đồng hồ';
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  specs: string[];
  inStock: boolean;
}

export type CategoryFilter = 'Tất cả' | 'Điện thoại' | 'Laptop' | 'Âm thanh' | 'Phụ kiện' | 'Đồng hồ';
