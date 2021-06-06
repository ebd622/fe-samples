import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;

  constructor(protected authService: AuthService){}
  onSwitchMode(){
    // reverse value
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    const email = form.value.email;
    const pass = form.value.password;

    if(this.isLoginMode){
      // DO nothing, already authenticated
    } else {
      this.authService.signup(email, pass).subscribe(responseData => {
        console.log(responseData);
      }, error => {
        console.log(error);
      });
    }


    form.reset();
  }
}
