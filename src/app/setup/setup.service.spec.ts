import { TestBed, async, inject } from '@angular/core/testing';
import { SetupService } from './setup.service';
import { of, Observable } from 'rxjs';
import { Region } from './models/region.model';
import { Day } from './models/days.model';
import { CommunicationPlatform } from './models/communication-platform.model';
import { Platform } from './models/platform.model';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

const fixtureRegions: Region[] = [
  { id: 1, name: 'North America' },
  { id: 2, name: 'Europe' }
];

const days: Day[] = [
  { id: 1, name: 'Mon' },
  { id: 2, name: 'Tue' },
  { id: 3, name: 'Wed' },
  { id: 4, name: 'Thu' },
  { id: 5, name: 'Fri' },
  { id: 6, name: 'Sat' },
  { id: 7, name: 'Sun' }
];

const platforms: Platform[] = [
  { id: 1, name: 'Xbox' },
  { id: 2, name: 'PlayStation' },
  { id: 3, name: 'PC' },
];

const comms : CommunicationPlatform[] = [
  { id: 1, name: 'Discord' },
  { id: 2, name: 'TeamSpeak' },
  { id: 3, name: 'Skype' },
];

const angularFireDatabaseStub = {
  getRegions: () => of(fixtureRegions),
  getDays: () => {},
  getPlatforms: () => {},
  getComms: () => {},
  getProfile: () => {}
};

const mockRegions$ = of(fixtureRegions);

describe('SetupService', () => {
  // let serviceStub: any;

  beforeEach(async(() => {
    spyOn(angularFireDatabaseStub, 'getRegions').and.returnValue(mockRegions$);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFirestoreModule
      ],
      declarations: [],
      providers: [
        SetupService,
        {provide: AngularFirestore, useValue: angularFireDatabaseStub}]
    }).compileComponents();

  }));

  it('should be created', () => {
    const service: SetupService = TestBed.get(SetupService);
    expect(service).toBeTruthy();
  });

  it('#getRegions', inject([SetupService], (service: SetupService) => {
    let regions$ = service.getRegions();
    regions$.subscribe(regions => {
      expect(regions[0].id).toEqual(fixtureRegions[0].id);
      // expect(regions[0]).toEqual(jasmine.any(Region));
    });
  }));

}); // end of describe
