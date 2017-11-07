import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEmployeeListComponent } from './customer-employee-list.component';

describe('CustomerEmployeeListComponent', () => {
  let component: CustomerEmployeeListComponent;
  let fixture: ComponentFixture<CustomerEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
