import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyAddComponent } from './consultancy-add.component';

describe('ConsultancyAddComponent', () => {
  let component: ConsultancyAddComponent;
  let fixture: ComponentFixture<ConsultancyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultancyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
