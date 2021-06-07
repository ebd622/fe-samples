import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {throwError} from 'rxjs';

// Check for details how to authenticate: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
export interface AuthResponseData{
  idToken:	string;	    // A Firebase Auth ID token for the newly created user.
  email:	string;       // 	The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string;    //	The number of seconds in which the ID token expires.
  localId: string;      //  The uid of the newly created user
  registered? : boolean;
}
@Injectable({providedIn: 'root'})
export class AuthService {
  API_KEY = '';

  constructor(private http: HttpClient){}
  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      // [API_KEY] needs to be retrieved from Firebase-account
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
    {
      email: email,
      password: password,
      returnSecurityToken: true
    }).pipe(
      // Here we process error and return it as obserwable (uins pipe)
      catchError(errorRes => {
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || ! errorRes.error.error){
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message){
          case 'EMAIL_EXISTS': errorMessage = 'This email exists already';
        }
        return throwError(errorMessage);
      })

    );
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecurityToken: true
      }
    );
  }
}
