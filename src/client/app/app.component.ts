import { Component, OnInit } from '@angular/core';
import { CreateTest } from './rxjs-codelab/create';
import { FilteringTest } from './rxjs-codelab/filtering';
import { CombiningTest } from './rxjs-codelab/combining';

@Component({
    selector: 'a3-app',
    template: `
        <div> A3 Application</div>
    `,
    providers: [CreateTest, CombiningTest, FilteringTest]
})
export class AppComponent implements OnInit {
    
    constructor(
        private _createTest: CreateTest,
        private _conbiningTest: CombiningTest,
        private _filteringTest: FilteringTest
    ) {}

    ngOnInit() {
        this._createTest.creat01();
        //this._filteringTest.debounce();
        //this._filteringTest.distinct();
        //this._filteringTest.filter();
        this._conbiningTest.zipPromise();
    }
}