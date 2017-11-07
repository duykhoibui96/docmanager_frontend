import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConsultancyListComponent } from './customer-consultancy-list.component';

describe('CustomerConsultancyListComponent', () => {
  let component: CustomerConsultancyListComponent;
  let fixture: ComponentFixture<CustomerConsultancyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerConsultancyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerConsultancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
