import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAddExistedFilesComponent } from './document-add-existed-files.component';

describe('DocumentAddExistedFilesComponent', () => {
  let component: DocumentAddExistedFilesComponent;
  let fixture: ComponentFixture<DocumentAddExistedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentAddExistedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentAddExistedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
