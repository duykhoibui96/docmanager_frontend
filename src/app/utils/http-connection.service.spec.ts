import { TestBed, inject } from '@angular/core/testing';

import { HttpConnectionService } from './http-connection.service';

describe('HttpConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpConnectionService]
    });
  });

  it('should be created', inject([HttpConnectionService], (service: HttpConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
