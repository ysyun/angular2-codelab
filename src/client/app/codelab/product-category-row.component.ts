import { Component, Input } from '@angular/core';
import { ProductRow } from './product-row.component';
import { Category } from './model/category.model';

@Component({
    selector: '[product-category-row]',
    template: `
         <tr><th colspan="2">{{ category?.name }}</th></tr>
         <tr product-row [product]="product" *ngFor="let product of category?.products">
         </tr>
    `,
    directives: [ProductRow]
})
export class ProductCategoryRow {
    @Input() category: Category;
}