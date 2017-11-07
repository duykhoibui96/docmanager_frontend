import { TestBed, inject } from '@angular/core/testing';

import { EmployeeCustomerService } from './employee-customer.service';

describe('EmployeeCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeCustomerService]
    });
  });

  it('should be created', inject([EmployeeCustomerService], (service: EmployeeCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
