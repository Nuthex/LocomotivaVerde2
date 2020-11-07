import { TestBed } from '@angular/core/testing';

import { UtentiRestService } from './utenti-rest.service';

describe('UtentiRestService', () => {
  let service: UtentiRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtentiRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
