import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteListeStagiaireElementsComponent } from './delete-liste-stagiaire-elements.component';

describe('DeleteListeStagiaireElementsComponent', () => {
  let component: DeleteListeStagiaireElementsComponent;
  let fixture: ComponentFixture<DeleteListeStagiaireElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteListeStagiaireElementsComponent]
    });
    fixture = TestBed.createComponent(DeleteListeStagiaireElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
