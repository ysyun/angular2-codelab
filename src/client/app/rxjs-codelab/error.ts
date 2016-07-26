import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ErrorHandlerTest implements Operator {

    methodList: Map<string, any> = new Map<string, any>();

    constructor() {
        this.methodList.set('throw', this.throw);
        this.methodList.set('throw02', this.throw02);
        this.methodList.set('retry', this.retry);
    }

    throw( logs:string[] ) {
        logs.push( '<div>throw() Emit the number 7, then emit an error. </br></div>' );
        let result = Observable.throw( new Error('oops!') ).startWith( 7 );
        result.subscribe( x => logs.push( 'Result : ' + x + '</br>' ), e => { console.error( e ); logs.push( e ) } );
    }

    throw02( logs:string[] ) {
        logs.push( '<div>throw() Map and flattens numbers to the sequence a, b, c, but throw an error for 13. </br></div>' );
        let interval = Observable.interval(1000);
        let result = interval.mergeMap(x =>
                                        x === 13 ?
                                        Observable.throw('Thirteens are bad!') :
                                        Observable.of('a', 'b', 'c')
                                        );
        result.subscribe( x => logs.push( 'Result : ' + x + '</br>' ), e => { console.error( e ); logs.push( e ) } );
    }

    retry( logs:string[] ) {
        logs.push( '<div>retry() </br></div>' );
        let count = 0;

        let source = Observable.interval(1000)
            .mergeMap(function () {
                logs.push( 'retry call count: ' + count );
                if (++count < 3) {//retry 수치보다 작아야 함. error 수치 5부터
                    return Observable.throw(new Error('oops!'));
                }
                return Promise.resolve(11);
            })
            .retry(3)//count 수치보다 retry 수치가 커야 에러가 발생하지 않음.
            .take(1);

        let subscription = source.subscribe(
            function ( x ) {
                logs.push( 'Next: ' + x );
            },
            function ( err ) {
                logs.push( 'Error: ' + err );
            },
            function () {
                logs.push( 'Completed' );
            });
        //result.retry( 2 ).subscribe( x => document.write( 'Result : ' + x + '</br>' ), e => { console.error( e ); document.write( e ) } );
    }
}