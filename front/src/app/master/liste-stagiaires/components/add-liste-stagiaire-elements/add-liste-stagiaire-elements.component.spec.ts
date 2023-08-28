import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListeStagiaireElementsComponent } from './add-liste-stagiaire-elements.component';

describe('AddListeStagiaireElementsComponent', () => {
  let component: AddListeStagiaireElementsComponent;
  let fixture: ComponentFixture<AddListeStagiaireElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddListeStagiaireElementsComponent]
    });
    fixture = TestBed.createComponent(AddListeStagiaireElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
