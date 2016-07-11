import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-bar',
    template: `
        <form>
            <input type="text" placeholder="Search..."/>
            <p>
                <input type="checkbox" (change)="onChangeStock($event)"/>
                Only show products in stock
            </p>
        </form>
    `,
    styles: ['form { border: 1px solid blue; width: 230px; padding-left: 10px; padding-top: 10px; }']
})
export class SearchBar {
    @Output() stockChange: EventEmitter<any> = new EventEmitter();

    onChangeStock(e: any) {
        console.log('--SearchBar isStockOnly event', e);
        this.stockChange.emit(e.target.checked);
    }
}