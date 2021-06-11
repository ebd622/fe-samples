import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {LoggingService} from '../logging.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent } // path 'shopping-list' will be lazy loaded
    ]),
    SharedModule
  ],
  // providers: [LoggingService] // Use this when you need a specific instance of LoggingService in shopping-list module
})
export class ShoppingListModule{}
