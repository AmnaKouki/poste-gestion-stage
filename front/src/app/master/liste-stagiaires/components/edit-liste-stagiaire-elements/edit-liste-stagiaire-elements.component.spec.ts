import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListeStagiaireElementsComponent } from './edit-liste-stagiaire-elements.component';

describe('EditListeStagiaireElementsComponent', () => {
  let component: EditListeStagiaireElementsComponent;
  let fixture: ComponentFixture<EditListeStagiaireElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditListeStagiaireElementsComponent]
    });
    fixture = TestBed.createComponent(EditListeStagiaireElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
