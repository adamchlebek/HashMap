import { TestBed } from '@angular/core/testing';

import { ChatModalService } from './chat-modal.service';

describe('ChatModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatModalService = TestBed.get(ChatModalService);
    expect(service).toBeTruthy();
  });
});
