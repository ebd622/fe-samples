import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  private httpAuth = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('admin:secret')
  }) ;

  // ************** Just another option ****
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Authorization': 'Basic ' + btoa('admin:secret')
  //   })
  // };
  // getAuthHeaders() {
  //   return this.httpOptions;
  // }
  // ***********************************

  getAuthHeaders() {
    return {
      headers: this.httpAuth
    }
  }

  // This is just an example on how to create params
  getAuthHeadersAndParams() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('key1', 'value1');
    searchParams = searchParams.append('key2', 'value2');
    return {
      headers: this.httpAuth,
      params: searchParams
    }
  }

}
