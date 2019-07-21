import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { MatChipsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';

var config = {
  apiKey            : "AIzaSyDDpHaPU_JxdJF62QK4aZvGol1kxUVsKTg",
  authDomain        : "hashmaporbyt.firebaseapp.com",
  databaseURL       : "https://hashmaporbyt.firebaseio.com",
  projectId         : "hashmaporbyt",
  storageBucket     : "hashmaporbyt.appspot.com",
  messagingSenderId : "988913741592",
  appId             : "1:988913741592:web:7044428c9379127f"
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [ ProfileComponent ],
      imports      : [ MatChipsModule, RouterModule.forRoot([]), ToastrModule.forRoot({
        maxOpened: 1,
        autoDismiss: true
      }), 
      AngularFireModule.initializeApp(config), HttpClientModule],
      providers    : [AngularFirestore, AngularFireAuth]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
