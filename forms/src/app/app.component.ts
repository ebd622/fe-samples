import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion = 'pet';
  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // Option 1
  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  // Option 2
  onSubmit(){
    console.log(this.signupForm);
  }
}
