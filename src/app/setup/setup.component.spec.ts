import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupService } from './setup.service';
import { SetupComponent } from './setup.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule, MatButtonModule, MatCheckboxModule, MatIconModule, 
  MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from '../app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReleaseRubricComponent } from '../release-rubric/release-rubric.component';
import { AppComponent } from '../app.component';
import { NavComponent } from '../nav/nav.component';
import { AboutComponent } from '../about/about.component';
import { ProfileComponent } from '../profile/profile.component';
import { NetworkComponent } from '../network/network.component';
import { ProfileService } from '../profile/profile.service';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';

export const firebaseConfig = environment.firebaseConfig;

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    let serviceStub: any;

    serviceStub = {
      getRegions: ()    => of(['test']),
      getDays: ()      => of(['test']),
      getPlatforms: () => of(['test']),
      getComms: ()     => of(['test']),
      getProfile:  () => of(['test']),
      getFireSteamGameList: () => of({appId: 1, name: 'test'}),
      saveProfile: () => of(['test'])
    };

    TestBed.configureTestingModule({
      imports      : [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        AngularFontAwesomeModule,
        AngularFireModule.initializeApp(firebaseConfig),
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
      ],
      declarations : [ 
        AppComponent,
        AppComponent,
        routingComponents,
        SetupComponent,
        NavComponent,
        AboutComponent,
        ReleaseRubricComponent,
        ProfileComponent,
        NetworkComponent ],
      providers    : [{provide: SetupService, useValue: serviceStub}],
      schemas      : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    de        = fixture.debugElement;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should have object content define from an observable', () => {
  //   component.days.subscribe(content => {
  //     expect(content).toBeDefined();
  //   });
  // });

});
