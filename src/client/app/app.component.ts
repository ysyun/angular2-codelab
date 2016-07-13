import { Component } from '@angular/core';
import { Category } from './codelab/model/category.model';
import { FilterableProductTable } from './codelab/filterable-product-table.component';

@Component({
    selector: 'a3-app',
    template: `
        <filterable-product-table></filterable-product-table>
    `,
    directives: [FilterableProductTable]
})
export class AppComponent {

    constructor() {
        
    }
}