import { BrowserModule }     from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA }          from '@angular/core';
import { AppRoutingModule, routingComponents }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SetupComponent } from './setup/setup.component';
import { NavComponent } from './nav/nav.component';

var config = {
  apiKey            : "AIzaSyDDpHaPU_JxdJF62QK4aZvGol1kxUVsKTg",
  authDomain        : "hashmaporbyt.firebaseapp.com",
  databaseURL       : "https://hashmaporbyt.firebaseio.com",
  projectId         : "hashmaporbyt",
  storageBucket     : "hashmaporbyt.appspot.com",
  messagingSenderId : "988913741592",
  appId             : "1:988913741592:web:7044428c9379127f"
};

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SetupComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
