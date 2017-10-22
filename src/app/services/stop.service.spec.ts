import { TestBed, inject } from '@angular/core/testing';

import { StopService } from './stop.service';

describe('StopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopService]
    });
  });

  it('should be created', inject([StopService], (service: StopService) => {
    expect(service).toBeTruthy();
  }));
});
