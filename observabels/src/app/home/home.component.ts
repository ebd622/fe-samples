import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscriprion: Subscription;

  constructor() { }

  ngOnInit() {
    // Option 1: create an observable
    // this.firstObsSubscriprion = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

      // Option 2: create a custom observable
      const customIntervalObservable = Observable.create(observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if(count === 2) {
            // Complete a subscription
            observer.complete();
          };
          if(count > 3){
            // Generate an error
            observer.error(new Error('Count is greater 3!'))
          }
          count++;
        }, 1000);
      });

      // Use operators (filters and map) to process data
      const observableWithOperator = customIntervalObservable.pipe(
          filter((data: number) => {
            return data > 0;
      }),
          map((data: number) => {
        return 'Round ' + (data + 1);
      }));

      this.firstObsSubscriprion = observableWithOperator.subscribe(data => {
        console.log(data);
      }, error => {
        // Error handler: This is a plase where you can process an error: send something to back-end and so on
        console.log(error);
        alert(error.message);
      }, () => {
        // Completion handler (no need to unsubscribe in a case of completion)
          console.log('Completed!')
      })
  }
    ngOnDestroy(): void {
    this.firstObsSubscriprion.unsubscribe();
    }

}
