import { TestBed, inject } from '@angular/core/testing';

import { SharedMemoryService } from './shared-memory.service';

describe('SharedMemoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedMemoryService]
    });
  });

  it('should be created', inject([SharedMemoryService], (service: SharedMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
