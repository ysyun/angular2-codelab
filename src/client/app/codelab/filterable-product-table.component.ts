import { Component } from '@angular/core';
import { SearchBar } from './search-bar.component';
import { Category } from './model/category.model';
import { ProductTable } from './product-table.component';

@Component({
    selector: 'filterable-product-table',
    template: `
       <search-bar (stockChange)="onChangeStock($event)">
       </search-bar> isChecked: {{ isStockOnly }}
       <table>
          <thead>
              <tr><th>Name</th><th>Price</th></tr>
          </thead>
          <tbody product-table [categories]="sample" [isStockOnly]="isStockOnly">
          </tbody>
       </table>
    `,
    directives: [SearchBar, ProductTable]
})
export class FilterableProductTable {

    isStockOnly: boolean = false;
    sample: Category[];

	constructor() {
		this.setSampleData();
	}

    onChangeStock(isChecked: boolean) {
        this.isStockOnly = isChecked;
    }

    setSampleData() {
        this.sample = [
            { 
                name: 'Electronics', 
                products: [
                    {stocked: true, name: 'LG Nexus', price: 30},
                    {stocked: false, name: 'iPhone 6', price: 20},
                    {stocked: false, name: 'SamSong', price: 900},
                ]
            },
            { 
                name: 'Sporting Goods', 
                products: [
                    {stocked: false, name: 'Cycling', price: 100},
                    {stocked: false, name: 'Football', price: 30},
                    {stocked: true, name: 'Swim', price: 20},
                ]
            },
        ];
    }
}