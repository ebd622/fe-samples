import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/internal/operators';

/*
Here we intercept all requests before they will leave the application
See also app.modules.ts
 */
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Request on its way')

    // ******************************************************************
    // Here we can modify an original request. We can not change it, because it is imputable. We need to clone it.
    // This is a better way how to implement Authentication!!!
    // const modifiedRequest = req.clone({
    //   headers: req.headers
    //      .append('Content-Type',  'application/json')
    //      .append('Authorization', 'Basic ' + btoa('admin:secret'))
    // });
    // return next.handle(modifiedRequest);
    // ******************************************************************

    return next.handle(req).pipe(
      tap(event => {
        console.log(event);
        console.log('Response arrivied!');
      })
    );
  }
}
