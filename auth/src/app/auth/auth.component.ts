import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(protected authService: AuthService){}
  onSwitchMode(){
    // reverse value
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    const email = form.value.email;
    const pass = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email,pass);
    } else {
      authObs = this.authService.signup(email, pass);
    }
    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    )


    form.reset();
  }
}
