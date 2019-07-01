import { TestBed } from '@angular/core/testing';

import { SteamApiService } from './steam-api.service';

describe('SteamApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SteamApiService = TestBed.get(SteamApiService);
    expect(service).toBeTruthy();
  });
});
