import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class CombiningTest implements Operator {

    methodList: Map<string, any> = new Map<string, any>();

    constructor() {
        this.methodList.set('combineLatest', this.combineLatest);
        this.methodList.set('combineAll', this.combineAll);
        this.methodList.set('merge', this.merge);
        this.methodList.set('merge02', this.merge02);
        this.methodList.set('mergeAll', this.mergeAll);
        this.methodList.set('mergeAll02', this.mergeAll02);
        this.methodList.set('startWith', this.startWith);
        this.methodList.set('switch', this.switch);
        this.methodList.set('switchMap', this.switchMap);
        this.methodList.set('zip', this.zip);
        this.methodList.set('zipPromise', this.zipPromise);
    }

    combineLatest( logs:string[] ) {
        logs.push( '<div>combineLatest() </br></div>' );
        let weight = Observable.of(70, 72, 76, 79, 75);
        let height = Observable.of(1.76, 1.77, 1.78);
        let bmi = Observable.combineLatest( weight, height, (w, h) => w / (h * h) );
            bmi.subscribe( x => logs.push( 'BMI is ' + x ) );
    }

    combineAll( logs:string[] ) {
        logs.push( '<div>combineAll() </br></div>' );
        let clicks = Observable.fromEvent( document, 'click' );
        let higherOrder = clicks.map(ev =>
                                        Observable.interval( Math.random()*2000 ).take( 3 )
                                    ).take(2);
        let result = higherOrder.combineAll();
            result.subscribe( x => logs.push( 'Result : ' + x + '</br>' ) );
    }

    merge( logs:string[] ) {//Merge together two Observables: 1s interval and clicks
        logs.push( '<div>merge() </br>Merge together two Observables: 1s interval and clicks</div></br>' );
        let clicks = Observable.fromEvent( document, 'click' );
        let timer = Observable.interval( 1000 );
        let clicksOrTimer = Observable.merge( clicks, timer );
            clicksOrTimer.subscribe( x => logs.push( 'Result : ' + x + '</br>' ) );
    }

    merge02( logs:string[] ) {//Merge together two Observables: 1s interval and clicks
        logs.push( '<div>merge() </br>Merge together 3 Observables, but only 2 run concurrently</div></br>' );
        let timer1 = Observable.interval( 1000 ).take( 10 );
        let timer2 = Observable.interval( 2000 ).take( 6 );
        let timer3 = Observable.interval( 500 ).take( 10 );
        let concurrent = 2; // the argument
        let merged = Observable.merge( timer1, timer2, timer3, concurrent );
            merged.subscribe( x => logs.push( 'Result : ' + x + '</br>' ) );
    }

    mergeAll( logs:string[] ) {
        logs.push( '<div>mergeAll() </br>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</br></div>' );
        let clicks = Observable.fromEvent( document, 'click' );
        let higherOrder = clicks.map( (ev) => Observable.interval( 1000 ) );
        let firstOrder = higherOrder.mergeAll();
            firstOrder.subscribe( x => logs.push( 'Result : ' + x + '</br>' ) );
    }

    mergeAll02( logs:string[] ) {
        logs.push( '<div>mergeAll() </br>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</br></div>' );
        let clicks = Observable.fromEvent( document, 'click' );
        let higherOrder = clicks.map( (ev) => Observable.interval( 1000 ).take( 10 ) );
        let firstOrder = higherOrder.mergeAll( 2 );
            firstOrder.subscribe( x => logs.push( 'Result : ' + x + '</br>' ) );
    }

    startWith( logs:string[] ) {
        logs.push( '<div>startWith() </br></div>' );
        let source = Observable.range(0, 5)
            .startWith(3);

        let subscription = source.subscribe(
            function (x) { logs.push( 'Next: ' + x.toString()+ '</br>' ) },
            function (err) { logs.push( 'Error: ' + err ); },
            function () { logs.push( 'Completed' ); } );
    }

    switch( logs:string[] ) {
        logs.push( '<div>switch() </br></div>' );
        /*
        let source = Observable.range(0, 3)
            .map(function (x) { return Observable.range(x, 3); })
            .switch();

        let subscription = source.subscribe(
            function (x) { document.write( 'Next: ' + x.toString()+ '</br>' ) },
            function (err) { document.write( 'Error: ' + err ); },
            function () { document.write( 'Completed' ); } );
        */
        let clicks = Observable.fromEvent( document, 'click' );
        // Each click event is mapped to an Observable that ticks every second
        let higherOrder = clicks.map( (ev) => Observable.interval( 1000 ) );
        let switched = higherOrder.switch();
            switched.subscribe( x => logs.push( 'Result : ' + x + '</br>' ) );
    }

    switchMap( logs:string[] ) {
        logs.push( '<div>switchMap() </br></div>' );
        let clicks = Observable.fromEvent( document, 'click' );
        let result = clicks.switchMap( (ev) => Observable.interval( 1000 ) );
        result.subscribe( x => logs.push( 'Result : ' + x + '</br>' ) );
    }

    zip( logs:string[] ) {
        logs.push( '<div>zip() </br></div>' );
        let range = Observable.range( 0, 5 );

        let source = Observable.zip(
            range,
            range.skip( 1 ),
            range.skip( 2 ),
            function ( s1, s2, s3 ) {
                return s1 + ':' + s2 + ':' + s3;
            }
        );

        let subscription = source.subscribe(
            function ( x ) {
                logs.push( 'Next: ' + x + '</br>' );
            },
            function ( err ) {
                logs.push( 'Error: ' + err );
            },
            function () {
                logs.push( 'Completed' );
            });
    }

    zipPromise( logs:string[] ) {
        logs.push( '<div>zipPromise() </br></div>' );
        let range = Observable.range(0, 5);

        let source = Observable.zip(
            Promise.resolve(0),
            Promise.resolve(1),
            function (s1, s2) {
                return s1 + ':' + s2 ;
            }
        );

        let subscription = source.subscribe(
            function ( x ) {
                logs.push( 'Next: ' + x + '</br>' );
            },
            function ( err ) {
                logs.push( 'Error: ' + err );
            },
            function () {
                logs.push( 'Completed' );
            });
    }
}