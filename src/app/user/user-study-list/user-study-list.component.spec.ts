import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStudyListComponent } from './user-study-list.component';

describe('UserStudyListComponent', () => {
  let component: UserStudyListComponent;
  let fixture: ComponentFixture<UserStudyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStudyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
