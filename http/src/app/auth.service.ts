import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('admin:secret')
    })
  };
  getAuthHeaders() {
    return this.httpOptions;
  }
}
