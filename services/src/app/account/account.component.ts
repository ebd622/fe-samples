import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService] /*Inform Angular how to crete a service*/
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private logginService: LoggingService){} /*Create a service "logginService": dependency injection */

  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
    this.logginService.logStatusChange(status);
  }
}
