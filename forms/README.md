# Forms in Angular: Template-Driven approach

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Built-in Validators & Using HTML5 Validation

Which Validators do ship with Angular? 

Check out the Validators class: https://angular.io/api/forms/Validators - these are all built-in validators, though that are the methods which actually get executed (and which you later can add when using the reactive approach).

For the template-driven approach, you need the directives. You can find out their names, by searching for "validator" in the official docs: https://angular.io/api?type=directive - everything marked with "D" is a directive and can be added to your template.

Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding the `ngNativeValidate`  to a control in your template.
