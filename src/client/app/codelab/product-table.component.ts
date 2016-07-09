import { Component, Input } from '@angular/core';
import { Category } from './model/category.model';
import { ProductCategoryRow } from './product-category-row.component';

@Component({
    selector: '[product-table]',
    template: `
        <div product-category-row [category]="category" *ngFor="let category of categories"></div>
    `,
    directives: [ProductCategoryRow]
})
export class ProductTable {
    @Input() categories: Category[];
}
