import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-bar',
    template: `
        <form style="border: 1px solid blue; padding: 10px; width: 240px;">
            <input type="text" placeholder="Search..."/>
            <p>
                <input type="checkbox" (change)="onChangeStock($event)">Only show products in stock
            </p>
        </form>
    `
})
export class SearchBar {
    @Output() stockChange: EventEmitter<any> = new EventEmitter();  

    onChangeStock(e: any) {
        console.log('--searchbar event', e.target.checked);
        this.stockChange.emit(e.target.checked);
    }
}