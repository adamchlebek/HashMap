import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseRubricComponent } from './release-rubric.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatTabsModule } from '@angular/material';

describe('ReleaseRubricComponent', () => {
  let component: ReleaseRubricComponent;
  let fixture: ComponentFixture<ReleaseRubricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseRubricComponent ],
      imports: [ AngularFontAwesomeModule, MatTabsModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseRubricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
