import {LoggingService} from './logging.service';
import {Injectable} from '@angular/core';

@Injectable() /*It means that something will be injected into the service (in our case "LogginService")*/
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private logginService: LoggingService){}

  addAccount(name: string, status: string){
    this.accounts.push({name: name, status: status});
    this.logginService.logStatusChange(status);
  }

  updateAccount(id: number, status: string){
    this.accounts[id].status = status;
    this.logginService.logStatusChange(status);
  }

}
