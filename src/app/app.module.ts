<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

=======
import { BrowserModule }     from '@angular/platform-browser';
import { NgModule }          from '@angular/core';
import { AppRoutingModule, routingComponents }  from './app-routing.module';
import { AppComponent }      from './app.component';
>>>>>>> bdb736dd4eb8feb02ca17478869aaea0df995316
@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    AngularFontAwesomeModule
=======
>>>>>>> bdb736dd4eb8feb02ca17478869aaea0df995316
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
