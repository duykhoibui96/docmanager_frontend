import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerListComponent } from './user-customer-list.component';

describe('UserCustomerListComponent', () => {
  let component: UserCustomerListComponent;
  let fixture: ComponentFixture<UserCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
