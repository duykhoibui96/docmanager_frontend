import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeminarListComponent } from './user-seminar-list.component';

describe('UserSeminarListComponent', () => {
  let component: UserSeminarListComponent;
  let fixture: ComponentFixture<UserSeminarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSeminarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSeminarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
