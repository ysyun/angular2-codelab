import { Component, OnInit } from '@angular/core';
import { CreateTest } from './rxjs-codelab/create';

@Component({
    selector: 'a3-app',
    template: `
        <div> A3 Application</div>
    `,
    providers: [CreateTest]
})
export class AppComponent implements OnInit {
    
    constructor(
        private _createTest: CreateTest
    ) {}

    ngOnInit() {
        this._createTest.creat01();
    }
}