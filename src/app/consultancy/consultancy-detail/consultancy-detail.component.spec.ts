import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyDetailComponent } from './consultancy-detail.component';

describe('ConsultancyDetailComponent', () => {
  let component: ConsultancyDetailComponent;
  let fixture: ComponentFixture<ConsultancyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultancyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
