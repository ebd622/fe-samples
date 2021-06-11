import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'}) // Use this annotation when you need to create a singleton
export class LoggingService{
  lastLog: string;

  /**
   * This is just a demo of different instances.
   * It is not a real logging-example
   *
   * @param {string} message
   */
  printLog(message: string ){
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message;
  }
}
