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
import { config } from 'process';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { SetupComponent } from './setup/setup.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ReleaseRubricComponent } from './release-rubric/release-rubric.component';
import { ProfileComponent } from './profile/profile.component';
import { NetworkComponent } from './network/network.component';
import { BehaviorSubject } from 'rxjs';

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
        }
        )
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

  it(`should have as title 'HashMap Web App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('HashMap Web App');
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