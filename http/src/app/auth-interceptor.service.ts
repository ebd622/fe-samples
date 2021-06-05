import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

/*
Here we intercept all requests before they will leave the application
See also app.modules.ts
 */
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Request on its way')
    return next.handle(req);
  }
}
