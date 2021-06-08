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
  private tokenExpirationTimer: any;

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

  /**
   * Retrived authenticated user (if any) from a localstorage
   */
  autoLogin(){
    // 1. Fetch a user from localstorage
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')); // confert strin into JSON-object
    if(!userData){
      return;
    }

    // 2. Create a user from retrieved data
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // 3. Check if retrieved user has a valid token
    if(loadedUser.token){
      this.user.next(loadedUser);
      // Calculte remaining expitration time
      const exprirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      // call auto-logout
      this.autoLogout(exprirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    console.log("Log out");
  }

  autoLogout(expirationDuration: number){
    console.log('Autologout time: ' + expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      },
      expirationDuration);
      // 2000); // for debug only

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
    if(!expiresIn){
      expiresIn = '3600';
    }
    console.log('expiresIn: ' + expiresIn);
    const expitationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expitationDate);
    this.user.next(user); // emit the user as logged in
    this.autoLogout(+expiresIn * 1000); // set timer
    localStorage.setItem('userData', JSON.stringify(user));

  }
}
