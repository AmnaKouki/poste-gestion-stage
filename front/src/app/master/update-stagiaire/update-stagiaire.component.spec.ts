import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStagiaireComponent } from './update-stagiaire.component';

describe('UpdateStagiaireComponent', () => {
  let component: UpdateStagiaireComponent;
  let fixture: ComponentFixture<UpdateStagiaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStagiaireComponent]
    });
    fixture = TestBed.createComponent(UpdateStagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
