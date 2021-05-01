import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated  = false;
  private activatesSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatesSub = this.userService.activatedEmmiter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
  }
    ngOnDestroy(): void {
    this.activatesSub.unsubscribe();
    }

}
