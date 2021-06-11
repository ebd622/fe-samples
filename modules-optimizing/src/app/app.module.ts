import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {SharedModule} from './shared/shared.module';
import {CoreModules} from './core.modules';
import {AuthModul} from './auth/auth.modul';
import {LoggingService} from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // RecipesModule, // This will be "lazy" loaded in app-routing.module.ts
    // ShoppingListModule, will be "lazy" loaded in app-routing.module.ts
    SharedModule,
    CoreModules,
    // AuthModul will be "lazy" loaded in app-routing.module.ts
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
