import { BrowserModule }     from '@angular/platform-browser';
import { NgModule }          from '@angular/core';
import { AppRoutingModule, routingComponents }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
