import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { MatChipsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const firebaseConfig = environment.firebaseConfig;

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
      AngularFireModule.initializeApp(firebaseConfig), HttpClientModule],
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
