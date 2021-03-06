import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SetupComponent } from './setup/setup.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReleaseRubricComponent } from './release-rubric/release-rubric.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { NetworkComponent } from './network/network.component';
import { MatChipsModule, MatIconModule, MatTabsModule,
        MatAutocompleteModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatCheckboxModule,
        MatTableModule, MatSelectModule, MatDialogModule, MatExpansionModule } from '@angular/material';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { FriendCardComponent } from './friend-card/friend-card.component';
import { ChatButtonComponent } from './chat-button/chat-button.component';

/** Google Firebase configuration */
const config = {
  apiKey            : 'AIzaSyDDpHaPU_JxdJF62QK4aZvGol1kxUVsKTg',
  authDomain        : 'hashmaporbyt.firebaseapp.com',
  databaseURL       : 'https://hashmaporbyt.firebaseio.com',
  projectId         : 'hashmaporbyt',
  storageBucket     : 'hashmaporbyt.appspot.com',
  messagingSenderId : '988913741592',
  appId             : '1:988913741592:web:7044428c9379127f'
};

/***********************************************
 * Ng module declarions, imports, and providers
 **********************************************/
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SetupComponent,
    NavComponent,
    AboutComponent,
    ReleaseRubricComponent,
    ProfileComponent,
    NetworkComponent,
    FriendCardComponent,
    ChatButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,       // firestore
    AngularFireAuthModule,        // auth
    AngularFireStorageModule,     // storage
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    NgxUsefulSwiperModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})

/** Created AppModule class */
export class AppModule { }
