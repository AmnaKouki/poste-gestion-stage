import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeStagiairesComponent } from './liste-stagiaires.component';

describe('ListeStagiairesComponent', () => {
  let component: ListeStagiairesComponent;
  let fixture: ComponentFixture<ListeStagiairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeStagiairesComponent]
    });
    fixture = TestBed.createComponent(ListeStagiairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
