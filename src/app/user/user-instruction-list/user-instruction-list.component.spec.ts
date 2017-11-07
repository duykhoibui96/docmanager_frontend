import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInstructionListComponent } from './user-instruction-list.component';

describe('UserInstructionListComponent', () => {
  let component: UserInstructionListComponent;
  let fixture: ComponentFixture<UserInstructionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInstructionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInstructionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
