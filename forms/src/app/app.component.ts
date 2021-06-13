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
  answer = '';
  genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
    // Option1: overwrite all fields in the form
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    // Option2: overwrite only required field
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

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
