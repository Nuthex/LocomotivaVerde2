import { TestBed } from '@angular/core/testing';

import { TreniRestService } from './treni-rest.service';

describe('TreniRestService', () => {
  let service: TreniRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreniRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
