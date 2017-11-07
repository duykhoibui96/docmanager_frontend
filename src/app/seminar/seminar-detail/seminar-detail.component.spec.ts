import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarDetailComponent } from './seminar-detail.component';

describe('SeminarDetailComponent', () => {
  let component: SeminarDetailComponent;
  let fixture: ComponentFixture<SeminarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeminarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
