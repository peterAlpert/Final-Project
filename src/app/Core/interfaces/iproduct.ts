export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  brandId: number;
  brand: Object;
  categoryId: number;
  category: object;

  images: string[];
}
