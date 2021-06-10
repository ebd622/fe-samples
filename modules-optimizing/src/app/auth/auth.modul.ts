import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: AuthComponent } // path 'auth' will be lazy loaded
    ]),
    SharedModule,
    FormsModule
  ]
})
export class AuthModul{}
