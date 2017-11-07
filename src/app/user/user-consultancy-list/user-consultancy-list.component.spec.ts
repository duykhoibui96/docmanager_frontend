import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConsultancyListComponent } from './user-consultancy-list.component';

describe('UserConsultancyListComponent', () => {
  let component: UserConsultancyListComponent;
  let fixture: ComponentFixture<UserConsultancyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConsultancyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConsultancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
