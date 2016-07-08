import { Component, Input, OnInit } from '@angular/core';
import { Product } from './model/product.model';

@Component({
    selector: 'product-row',
    template: `
        <tr>
            <td>
                <span [style.color]="this.color">
                    {{this.product?.name}}
                </span>
            </td>
            <td>{{this.product?.price}}</td>
        </tr>
    `
})
export class ProductRow implements OnInit {
    color: string = 'black';
    @Input() product: Product;

    ngOnInit() {
        if(this.product && this.product.stocked) {
            this.color = 'red';
        }
    }
}