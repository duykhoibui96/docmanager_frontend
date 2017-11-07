import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagerListComponent } from './document-manager-list.component';

describe('DocumentManagerListComponent', () => {
  let component: DocumentManagerListComponent;
  let fixture: ComponentFixture<DocumentManagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentManagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
