import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreateTest {
    
    creat01() {
        let source = Observable.create(function (observer: any) {
            observer.next(42);
            observer.complete();
            //observer.error();

            // Note that this is optional, you do not have to return this if you require no cleanup
            return () => { console.log('disposed'); };
        });

        let subscription = source.subscribe(
            (x: any) => { console.log('Next: ' + x); },
            (err: any) => { console.log('Error: ' + err); },
            () => { console.log('Completed'); });        
    }

}