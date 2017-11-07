import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyListComponent } from './consultancy-list.component';

describe('ConsultancyListComponent', () => {
  let component: ConsultancyListComponent;
  let fixture: ComponentFixture<ConsultancyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultancyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
