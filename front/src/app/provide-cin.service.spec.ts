import { TestBed } from '@angular/core/testing';

import { ProvideCinService } from './provide-cin.service';

describe('ProvideCinService', () => {
  let service: ProvideCinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvideCinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
