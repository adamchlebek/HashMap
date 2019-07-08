import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseRubricComponent } from './release-rubric.component';

describe('ReleaseRubricComponent', () => {
  let component: ReleaseRubricComponent;
  let fixture: ComponentFixture<ReleaseRubricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseRubricComponent ]
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
