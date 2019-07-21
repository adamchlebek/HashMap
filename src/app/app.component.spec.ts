import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { MatChipsModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatTabsModule } from '@angular/material';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SetupComponent } from './setup/setup.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ReleaseRubricComponent } from './release-rubric/release-rubric.component';
import { ProfileComponent } from './profile/profile.component';
import { NetworkComponent } from './network/network.component';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';

var config = {
  apiKey            : "AIzaSyDDpHaPU_JxdJF62QK4aZvGol1kxUVsKTg",
  authDomain        : "hashmaporbyt.firebaseapp.com",
  databaseURL       : "https://hashmaporbyt.firebaseio.com",
  projectId         : "hashmaporbyt",
  storageBucket     : "hashmaporbyt.appspot.com",
  messagingSenderId : "988913741592",
  appId             : "1:988913741592:web:7044428c9379127f"
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
      ],
      imports: [
        RouterTestingModule,
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
        MatFormFieldModule,
        MatTabsModule,
        ToastrModule.forRoot({
          maxOpened: 1,
          autoDismiss: true
        }),
        RouterModule.forRoot([]),
      ],
      declarations: [
        AppComponent,
        AppComponent,
        routingComponents,
        SetupComponent,
        NavComponent,
        AboutComponent,
        ReleaseRubricComponent,
        ProfileComponent,
        NetworkComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'HashMap'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('HashMap');
  });
});

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};