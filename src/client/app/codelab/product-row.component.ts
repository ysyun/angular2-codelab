import { Component, Input, OnInit } from '@angular/core';
import { Product } from './model/product.model';

@Component({
    selector: '[product-row]',
    template: `
            <td>
                <span [style.color]="product?.stocked ? 'red' : 'black'">
                    {{ product?.name }}
                </span>
            </td>
            <td>{{ product?.price }}</td>
    `
})
export class ProductRow {
    @Input() product: Product;
}