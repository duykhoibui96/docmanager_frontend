import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCustomerListComponent } from './employee-customer-list.component';

describe('EmployeeCustomerListComponent', () => {
  let component: EmployeeCustomerListComponent;
  let fixture: ComponentFixture<EmployeeCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
