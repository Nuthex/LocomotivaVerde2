import { TestBed } from '@angular/core/testing';

import { PrenotazioniRestService } from './prenotazioni-rest.service';

describe('PrenotazioniRestService', () => {
  let service: PrenotazioniRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrenotazioniRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
