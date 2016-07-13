import { Component } from '@angular/core';
import { Category } from './model/category.model';
import { SearchBar } from './search-bar.component';
import { ProductTable } from './product-table.component';
import { ProductService } from './product.service';

@Component({
    selector: 'filterable-product-table',
    template: `
        <search-bar (stockChange)="onChangeStack($event)"></search-bar>
        <table> 
            <thead> <tr><th>Name</th><th>price</th></tr> </thead>
            <tbody product-table [categories]="sample" [isStockOnly]="isStockOnly"></tbody>
        </table>
    `,
    directives: [SearchBar, ProductTable],
    providers: [ProductService]
})
export class FilterableProductTable {
    sample: Category[];
    isStockOnly: boolean;

    constructor(private _productService: ProductService) {
        this._productService.getProducts().subscribe(
            (data: any) => {
                this.sample = data;
            }
        )
    }

    // _productService: ProductService
    // constructor(_productService: ProductService) {
    //     this._productService = _productService;
    // }

    onChangeStack(ischecked: boolean) {
        console.log('--filterable product table event', ischecked);
        this.isStockOnly = ischecked;
    }
}