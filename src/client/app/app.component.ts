import { Component } from '@angular/core';
import { Category } from './codelab/model/category.model';
import { ProductTable } from './codelab/product-table.component';

@Component({
    selector: 'a3-app',
    template: `
        <table> 
            <thead> <tr><th>Name</th><th>price</th></tr> </thead>
            <tbody product-table [categories]="sample"></tbody>
        </table>
    `,
    directives: [ProductTable]
})
export class AppComponent {
    sample: Category;

    constructor() {
        this.sample = [
            {
                name: 'Sports Wears',
                products: [
                    { stocked: true, name: 'pants', price: 100 },
                    { stocked: false, name: 't-shirts', price: 300 },
                    { stocked: false, name: 'shoes', price: 450 }
                ]
            },
            {
                name: 'Electronics',
                products: [
                    { stocked: false, name: 'iphone', price: 10 },
                    { stocked: false, name: 'iwatch', price: 303 },
                    { stocked: true, name: 'imac', price: 5000 }
                ]
            }
        ];
    }
}