import { Product } from './product.model';

export interface Category {
    name: string;
    products: Product[];
}
