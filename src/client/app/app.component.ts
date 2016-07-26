import { Component, OnInit } from '@angular/core';
import { UrlResolver } from '@angular/compiler';

import { CreateTest } from './rxjs-codelab/create';
import { FilteringTest } from './rxjs-codelab/filtering';
import { CombiningTest } from './rxjs-codelab/combining';
import { ErrorHandlerTest } from './rxjs-codelab/error';

@Component({
    moduleId: module.id,
    selector: 'a3-app',
    template: `
        <div> Observable Operator </div>
        <br>
        <form action="">
	        <input type="radio" name="operatorType" #filter value="filter" checked (click)="onChangeOperator(filter.value)">filter&nbsp;
            <input type="radio" name="operatorType" #combining value="combining" (click)="onChangeOperator(combining.value)">combining&nbsp;
            <input type="radio" name="operatorType" #error value="error" (click)="onChangeOperator(error.value)">errorHandler
        </form>
        <img [src]="urlVariable" width="500" height="250" />
        <br>
        <div style="width:100%;">
            <div style="float: left; width: 40%; padding:0px 10px 0px 10px;"> Operators {{operatorType}} </div>
            <div style="float: left; width: 56%; padding:0px 10px 0px 10px;"> <p><button (click)="reset()">Reset</button></p> </div>
        <div>
        
        <div style="width:100%;height:100%;">
            <div style="border: 1px solid gold; float: left; width: 40%; height:100%; padding:0px 10px 0px 10px;">
                <div *ngFor="let method of methodList" (click)="execFilterOperatorMethod( $event, method )">
                    <h5 style="text-decoration: underline; cursor: pointer; cursor: hand;"> method: {{ method }}</h5>
                </div>
            </div>
            <div style="float: left; width: 56%; height:100%;">
                <div style="border: 1px solid blue; padding:10px 10px 10px 10px;">
                    <div *ngFor="let msg of logs">{{msg}}</div>
                </div>
            </div>
        </div>
    `,
    providers: [CreateTest, CombiningTest, ErrorHandlerTest, FilteringTest]
})
export class AppComponent implements OnInit {

    private _operator:Operator;                     //operator interface
    private _prefix: string = 'rxjs-codelab/image/';//image 경로
    private _img: string = 'debounce.png';          //image 명칭

    operatorType: string = 'filter';                //operator 종류
    urlVariable: string = '';                       //출력할 image 경로
    methodList: Array<string>;                      //operator의 method 리스트
    logs: string[] = [];                            //log 출력할 내용
    
    constructor(
        private _urlResolver: UrlResolver,
        private _createTest: CreateTest,
        private _conbiningTest: CombiningTest,
        private _errorHandlerTest: ErrorHandlerTest,
        private _filteringTest: FilteringTest
    ) {}

    ngOnInit() {
        this._createTest.creat01();
        this.methodList = [ 'debounce', 'distinct', 'elementAt', 'filter', 'first', 'first01', 'ignoreElements', 'last',
                            'sample', 'skip', 'take', 'takeLast', 'takeUntil', 'takeWhile' ];
        this._operator = this._filteringTest;
        this.setImg();
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
        let method: string = this.methodList[0];
        this._img = method+'.png';
        this.setImg();
        this.reset();
    }

    reset() {
        this.logs.length = 0;
    }

    setImg() {
        this.urlVariable = this._urlResolver.resolve(module.id, this._prefix+this._img);
    }

    execFilterOperatorMethod( event:any, filter: string ) {
        this._operator.methodList.get(filter)( this.logs );
        this._img = filter+'.png';
        this.setImg();
    }

}