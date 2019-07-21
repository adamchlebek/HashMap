import { TestBed, async } from '@angular/core/testing';
import { ProfileService } from './profile.service';
// /import { of } from 'rxjs/observable/of';

describe('ProfileService', () => {
  let serviceStub: any;
  beforeEach(async(() => {
    serviceStub = {
      getRegion: () => ('test')
    };

    TestBed.configureTestingModule({
      declarations: [],
      providers: [{provide: ProfileService, useValue: serviceStub}]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});
