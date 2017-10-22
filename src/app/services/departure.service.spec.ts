import { TestBed, inject } from '@angular/core/testing';

import { DepartureService } from './departure.service';

describe('DepartureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartureService]
    });
  });

  it('should be created', inject([DepartureService], (service: DepartureService) => {
    expect(service).toBeTruthy();
  }));
});
