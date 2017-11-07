import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeConsultancyListComponent } from './employee-consultancy-list.component';

describe('EmployeeConsultancyListComponent', () => {
  let component: EmployeeConsultancyListComponent;
  let fixture: ComponentFixture<EmployeeConsultancyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeConsultancyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeConsultancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
