import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
    getProducts() {
        return Observable.create( (observer: any) => observer.next(this._samples()) );
    }

    _samples() {
        return [
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