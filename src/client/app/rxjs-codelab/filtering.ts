import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/elementAt';

@Injectable()
export class FilteringTest implements Operator {

    methodList: Map<string, any> = new Map<string, any>();

    constructor() {
        this.methodList.set('debounce', this.debounce);
        this.methodList.set('distinct', this.distinct);
        this.methodList.set('elementAt', this.elementAt);
        this.methodList.set('filter', this.filter);
        this.methodList.set('first', this.first);
        this.methodList.set('first01', this.first01);
        this.methodList.set('ignoreElements', this.ignoreElements);
        this.methodList.set('last', this.last);
        this.methodList.set('sample', this.sample);
        this.methodList.set('skip', this.skip);
        this.methodList.set('take', this.take);
        this.methodList.set('takeLast', this.takeLast);
        this.methodList.set('takeUntil', this.takeUntil);
        this.methodList.set('takeWhile', this.takeWhile);
    }
    
    debounce( logs:string[] ) {//debounce test
        logs.push( 'debounce()</br>' );
        let clicks = Observable.fromEvent( document, 'click' );
        //2초 안에 클릭을 여러번 해도 인터벌 2초 안에 한번만 호출이 된다. 2초 지나서 클릭하면 2번의 호출이 일어남.
        let result = clicks.debounce( () => Observable.interval( 2000 ) );
        result.subscribe( x => { console.log('x : ',x); logs.push('Result: ' + x.toString()); } );      
    }

    distinct( logs:string[] ) {//distinct test
        logs.push( 'distinct()</br>source = [42, 24, 42, 24]</br>' );
        let source = Observable.from( [
                42, 24, 42, 24
            ] ).distinct();

        let subscription = source.subscribe(
            function ( x ) {
                logs.push( 'Next: ' + x.toString()+'</br>' );
                //document.write( 'Next: ' + x.toString()+'</br>' );
                //console.log('Next: ' + x.toString()); 
            },
            function ( err ) { console.log( 'Error: ' + err ); },
            function () { console.log( 'Completed' ); });
        
    }

    elementAt( logs:string[] ) {//ElementAt test
        logs.push( '<div>elementAt()</br>source = [42, 24, 42, 24] for elementAt( 1 )<div>' );
        //let clicks = Observable.fromEvent( document, 'click' );
        let source = Observable.from( [
                42, 24, 42, 24
            ] );
        let result = source.elementAt( 1 );
            result.subscribe( x => logs.push( 'Result: ' + x.toString() ) );
    }

    filter( logs:string[] ) {
        logs.push( '<div>filter()</br></div></br><span>Span</span></br>' );
        let clicks = Observable.fromEvent( document, 'click' );
        //let clicksOnDivs = clicks.filter( ev => ev.target.tagName === 'DIV' );
        let clicksOnSpan = clicks.filter( ev => ev.clientX > 200 );
        clicksOnSpan.subscribe( x => logs.push( 'Result: ' + x.toString() ) );
    }

    first( logs:string[] ) {//dom happens
        logs.push( '<div>first()</br>source = [42, 24, 34, 28]</div></br>' );
        let clicks = Observable.fromEvent(document, 'click');
        let source = Observable.from( [
                42, 24, 34, 28
            ] );
        let result = source.first();
        result.subscribe( x => { console.log(x); logs.push( 'Result: ' + x.toString() ); } );
    }

    first01( logs:string[] ) {
        logs.push( '<div>first() source = [1, 2, 3, 4] 조건 : 2보다 큰 것 </div></br>' );
        let source = Observable.from( [
                1, 2, 3, 4
            ] );
        let result = source.first(ev => ev > 2);//2이상 것의 첫번째.
        result.subscribe( x => logs.push( 'Result: ' + x.toString() ) );
    }

    ignoreElements( logs:string[] ) {
        logs.push( '<div>ignoreElements() </br> let source = Observable.range(0, 10).ignoreElements() </div></br>' );
        let source = Observable.range(0, 10)
            .ignoreElements();

        let subscription = source.subscribe(
            function (x) { logs.push( 'Next: ' + x.toString() ) },
            function (err) { logs.push( 'Error: ' + err ); },
            function () { logs.push( 'Completed' ); });
    }

    last( logs:string[] ) {
        logs.push( '<div>last() </br> let source = Observable.range(0, 10).last( function (x, idx, obs) { return x % 2 === 1; } )</div></br>' );
        let source = Observable.range(0, 10)
            .last( function (x, idx, obs) { return x % 2 === 1; } );

        let subscription = source.subscribe(
            function (x) { logs.push( 'Next: ' + x.toString()+ '</br>' ) },
            function (err) { logs.push( 'Error: ' + err ); },
            function () { logs.push( 'Completed' ); } );
    }

    sample(  logs:string[]  ) {
        logs.push( '<div>sample() </br></div>' );
        let seconds = Observable.interval( 1000 );
            //seconds.subscribe( x => document.write( 'interval: ' + x.toString() ) );
        let clicks = Observable.fromEvent( document, 'click' );
        let result = seconds.sample( clicks );
        //1초간격으로 동작할 때 클릭 시 가장 최근에 발생 했던 시간을 기준으로 결과를 가져옴.
        result.subscribe( x => logs.push( 'Result: ' + x.toString() ) );
    }

    skip( logs:string[] ) {
        logs.push( '<div>skip() </br> Observable.range(0, 5).skip(3)</div></br>' );
        let source = Observable.range(0, 5)
            .skip(3);

        let subscription = source.subscribe(
            function (x) { logs.push( 'Next: ' + x.toString()+ '</br>' ) },
            function (err) { logs.push( 'Error: ' + err ); },
            function () { logs.push( 'Completed' ); } );
    }

    take( logs:string[] ) {
        logs.push( '<div>take() </br></div>' );
        let interval = Observable.interval( 1000 );
        let five = interval.take( 5 );
        five.subscribe( x => logs.push( 'Result: ' + x.toString() ) );
    }

    takeLast( logs:string[] ) {
        logs.push( '<div>takeLast() </br> Observable.range( 1, 100 ).takeLast( 2 ) </br></div>' );
        let many = Observable.range( 1, 100 );
        let lastThree = many.takeLast( 2 );
        lastThree.subscribe( x => logs.push( 'Result: ' + x.toString() ) );
    }

    takeUntil( logs:string[] ) {
        logs.push( '<div>takeUntil() </br></div>' );
        let interval = Observable.interval( 1000 );
        let clicks = Observable.fromEvent( document, 'click' );
        let result = interval.takeUntil( clicks );
        result.subscribe( x => logs.push( 'Result: ' + x.toString() ) );
    }

    takeWhile( logs:string[] ) {
        logs.push( '<div>takeWhile() </br></div>' );
        let clicks = Observable.fromEvent(document, 'click');
        let result = clicks.takeWhile( ev => ev.clientX > 200 );
        result.subscribe( x => logs.push( 'Result: ' + x.toString() ) );
    }

}