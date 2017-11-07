import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSeminarListComponent } from './employee-seminar-list.component';

describe('EmployeeSeminarListComponent', () => {
  let component: EmployeeSeminarListComponent;
  let fixture: ComponentFixture<EmployeeSeminarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSeminarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSeminarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
