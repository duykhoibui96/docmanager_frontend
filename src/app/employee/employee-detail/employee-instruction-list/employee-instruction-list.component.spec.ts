import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInstructionListComponent } from './employee-instruction-list.component';

describe('EmployeeInstructionListComponent', () => {
  let component: EmployeeInstructionListComponent;
  let fixture: ComponentFixture<EmployeeInstructionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeInstructionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInstructionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
