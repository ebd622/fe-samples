import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/internal/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.module';
import {Router} from '@angular/router';

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

  user = new BehaviorSubject<User>(null); // use this instead of: user = new Subject<User>();

  constructor(private http: HttpClient, private router: Router){}
  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      // [API_KEY] needs to be retrieved from Firebase-account
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
    {
      email: email,
      password: password,
      returnSecurityToken: true
    }).pipe(
      /*
          1. Here we process an error and return it as an observable ("pipe" returns observable)
          This is the same as:
          catchError(errorRes => {...})
       */
      catchError(this.handleError),

      /*
          2. Here we create a user from a data returned by a server
       */
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          resData.expiresIn
        );
      })
    );
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth'])
    console.log("Log out");
  }
  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecurityToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          resData.expiresIn
        );
      })
    );
  }

  /**
   * Centrilize method to handle errors
   * @param {HttpErrorResponse} errorRes
   * @returns {Observable<never>}
   */
  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || ! errorRes.error.error){
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS': errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND': errorMessage = 'This email is not found';
        break;
      case 'INVALID_PASSWORD': errorMessage = 'The password is not valid';
        break;

    }
    return throwError(errorMessage);
  }

  private handleAuthentication( email: string, userId: string, token: string, expiresIn: string) {
    const expitationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expitationDate);
    this.user.next(user); // emit the user as logged in

  }
}
