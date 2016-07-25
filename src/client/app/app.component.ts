import { Component, OnInit } from '@angular/core';
import { CreateTest } from './rxjs-codelab/create';
import { FilteringTest } from './rxjs-codelab/filtering';
import { CombiningTest } from './rxjs-codelab/combining';
import { ErrorHandlerTest } from './rxjs-codelab/error';

@Component({
    selector: 'a3-app',
    template: `
        <div> A3 Application</div>
        <form action="">
	        <input type="radio" name="operatorType" #filter value="filter" checked (click)="onChangeOperator(filter.value)">filter&nbsp;
            <input type="radio" name="operatorType" #combining value="combining" (click)="onChangeOperator(combining.value)">combining&nbsp;
            <input type="radio" name="operatorType" #error value="error" (click)="onChangeOperator(error.value)">errorHandler
        </form>
        <div> Operators {{operatorType}} </div>
        <div *ngFor="let method of methodList" (click)="execFilterOperatorMethod( $event, method )">
            <h4>{{operatorType}} method: {{ method }}</h4>
        </div>
        <p><button (click)="reset()">Reset</button></p>
        <div *ngFor="let msg of logs">{{msg}}</div>
    `,
    providers: [CreateTest, CombiningTest, ErrorHandlerTest, FilteringTest]
})
export class AppComponent implements OnInit {
    
    constructor(
        private _createTest: CreateTest,
        private _conbiningTest: CombiningTest,
        private _errorHandlerTest: ErrorHandlerTest,
        private _filteringTest: FilteringTest
    ) {}

    operatorType: string = 'filter';

    methodList: Array<string>;

    logs: string[] = [];

    private _operator:Operator;

    ngOnInit() {
        this._createTest.creat01();
        this.methodList = [ 'debounce', 'distinct', 'elementAt', 'filter', 'first', 'first01', 'ignoreElements', 'last',
                            'sample', 'skip', 'take', 'takeLast', 'takeUntil', 'takeWhile' ];
    }

    onChangeOperator( type: string ) {
        this.operatorType = type;
        if ( this.operatorType === 'filter' ) {
            this.methodList = [ 'debounce', 'distinct', 'elementAt', 'filter', 'first', 'first01', 'ignoreElements', 'last',
                                'sample', 'skip', 'take', 'takeLast', 'takeUntil', 'takeWhile' ];
            this._operator = this._filteringTest;                 
        } else if ( this.operatorType === 'combining' ) {
            this.methodList = [ 'combineLatest', 'combineAll', 'merge', 'merge02', 'mergeAll', 'mergeAll02', 'startWith',
                                'switch', 'switchMap', 'zip', 'zipPromise' ];
            this._operator = this._conbiningTest;
        } else {
            this.methodList = [ 'throw', 'throw02', 'retry' ];
            this._operator = this._errorHandlerTest;
        }
        this.reset();
    }

    reset() {
        this.logs.length = 0;
    }

    execFilterOperatorMethod( event:any, filter: string ) {
        this._operator.methodList.get(filter)( this.logs );
    }

}