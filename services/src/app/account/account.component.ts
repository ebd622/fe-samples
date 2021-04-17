import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService] /*Inform Angular how to crete a service*/
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private logginService: LoggingService,
              private accountService: AccountService){} /*Create a service "logginService": dependency injection */

  onSetTo(status: string) {
    this.accountService.updateAccount(this.id, status);

    this.logginService.logStatusChange(status);
  }
}
