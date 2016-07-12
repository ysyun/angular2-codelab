import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

    getProducts() {
        return Observable.create((observer: any) => {
            observer.next(this._samples());
        });
    }

    _samples() {
        return [
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