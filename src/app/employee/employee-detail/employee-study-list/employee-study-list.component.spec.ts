import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStudyListComponent } from './employee-study-list.component';

describe('EmployeeStudyListComponent', () => {
  let component: EmployeeStudyListComponent;
  let fixture: ComponentFixture<EmployeeStudyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeStudyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
