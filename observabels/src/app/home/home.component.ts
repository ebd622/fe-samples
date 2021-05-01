import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';

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
          count++;
        }, 1000);
      });
      this.firstObsSubscriprion = customIntervalObservable.subscribe(data => {
        console.log(data);
      })
  }
    ngOnDestroy(): void {
    this.firstObsSubscriprion.unsubscribe();
    }

}
