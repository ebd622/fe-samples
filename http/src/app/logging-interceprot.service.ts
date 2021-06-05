import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {logging} from 'selenium-webdriver';

export class LoggingInterceprotService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log(req);

    return next.handle(req);
  }
}
