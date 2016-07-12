import { Component, Input } from '@angular/core';
import { Category } from './model/category.model';
import { ProductRow } from './product-row.component';
import { Product } from './model/product.model';

@Component({
    selector: '[product-category-row]',
    template: `
        <tr><th colspan="2">{{ filterCategory?.name }}</th></tr>
        <tr product-row [product]="product" *ngFor="let product of filterCategory?.products"></tr>
    `,
    directives: [ProductRow]
})
export class ProductCategoryRow {
    // @Input() category: Category;
   
    filterCategory: Category;
    originCategory: Category;
    @Input() set category(value: Category) {
       this.filterCategory = value; 
       this.originCategory = value;
    }
    
    @Input() set isStockOnly(value: any) {
        console.log('--ProductCategoryRow isStockOnly', value);
        // if checked is true, product.stocked = false
        if(value && this.originCategory && this.originCategory.products) {
            let products = Object.assign([], this.originCategory.products);
            this.filterCategory.products = products
                .filter((product: Product) => {
                    if(!product.stocked) {
                        return true;
                    }
                    return false;
                });            
        } 
        // if checked is false, all products
        else {
            // set immutable object
            this.filterCategory = Object.assign({}, this.originCategory);
        }
    }
}