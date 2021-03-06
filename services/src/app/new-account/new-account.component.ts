import { Component, EventEmitter, Output } from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  //providers: [LoggingService] /*Inform Angular how to crete a service*/
})
export class NewAccountComponent {


  constructor(//private logginService: LoggingService, /*Create a service "logginService": dependency injection */
              private accountService: AccountService){
    this.accountService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountStatus, accountName);
    //this.logginService.logStatusChange(accountStatus);
  }
}
