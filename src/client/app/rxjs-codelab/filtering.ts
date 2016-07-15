import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/elementAt';

@Injectable()
export class FilteringTest {
    
    debounce() {//debounce test
        document.write( 'debounce()</br>' );
        let clicks = Observable.fromEvent( document, 'click' );
        let result = clicks.debounce( () => Observable.interval( 1000 ) );
        result.subscribe( x => document.write( 'Result: ' + x.toString() ) );      
    }

    distinct() {//distinct test
        document.write( 'distinct()</br>' );
        let source = Observable.from( [
                42, 24, 42, 24
            ] ).distinct();

        let subscription = source.subscribe(
            function ( x ) {
                document.write( 'Next: ' + x.toString()+'</br>' );
                //console.log('Next: ' + x.toString()); 
            },
            function ( err ) { console.log( 'Error: ' + err ); },
            function () { console.log( 'Completed' ); });
        
    }

    elementAt() {//ElementAt test
        document.write( '<div>elementAt()</br><div><div>Test</div>' );
        let clicks = Observable.fromEvent( document, 'click' );
        let result = clicks.elementAt( 2 );
            result.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

    filter() {
        document.write( '<div>filter()</br></div>' );
        let clicks = Observable.fromEvent( document, 'click' );
        let clicksOnDivs = clicks.filter( ev => ev.target.tagName === 'DIV' );
        clicksOnDivs.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

    first() {//dom happens
        document.write( '<div>first()</br></div>' );
        let clicks = Observable.fromEvent(document, 'click');
        let result = clicks.first();
        result.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

    first01() {//div happens
        document.write( '<div>first() DIV </br></div>' );
        let clicks = Observable.fromEvent(document, 'click');
        let result = clicks.first(ev => ev.target.tagName === 'DIV');
        result.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

    ignoreElements() {
        document.write( '<div>ignoreElements() </br></div>' );
        let source = Observable.range(0, 10)
            .ignoreElements();

        let subscription = source.subscribe(
            function (x) { document.write( 'Next: ' + x.toString() ) },
            function (err) { document.write( 'Error: ' + err ); },
            function () { document.write( 'Completed' ); });
    }

    last() {
        document.write( '<div>last() </br></div>' );
        let source = Observable.range(0, 10)
            .last(function (x, idx, obs) { return x % 2 === 1; });

        let subscription = source.subscribe(
            function (x) { document.write( 'Next: ' + x.toString()+ '</br>' ) },
            function (err) { document.write( 'Error: ' + err ); },
            function () { document.write( 'Completed' ); } );
    }

    sample() {
        document.write( '<div>sample() </br></div>' );
        let seconds = Observable.interval( 1000 );
        let clicks = Observable.fromEvent( document, 'click' );
        let result = seconds.sample( clicks );
        result.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

    skip() {
        document.write( '<div>skip() </br></div>' );
        let source = Observable.range(0, 5)
            .skip(3);

        let subscription = source.subscribe(
            function (x) { document.write( 'Next: ' + x.toString()+ '</br>' ) },
            function (err) { document.write( 'Error: ' + err ); },
            function () { document.write( 'Completed' ); } );
    }

    take() {
        document.write( '<div>take() </br></div>' );
        let interval = Observable.interval( 1000 );
        let five = interval.take( 5 );
        five.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

    takeLast() {
        document.write( '<div>takeLast() </br></div>' );
        let many = Observable.range( 1, 100 );
        let lastThree = many.takeLast( 2 );
        lastThree.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

    takeUntil() {
        document.write( '<div>takeUntil() </br></div>' );
        var interval = Observable.interval( 1000 );
        var clicks = Observable.fromEvent( document, 'click' );
        var result = interval.takeUntil( clicks );
        result.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

    takeWhile() {
        document.write( '<div>takeWhile() </br></div>' );
        var clicks = Observable.fromEvent(document, 'click');
        var result = clicks.takeWhile( ev => ev.clientX > 20 );
        result.subscribe( x => document.write( 'Result: ' + x.toString() ) );
    }

}