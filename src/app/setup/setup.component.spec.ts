import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupComponent } from './setup.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
