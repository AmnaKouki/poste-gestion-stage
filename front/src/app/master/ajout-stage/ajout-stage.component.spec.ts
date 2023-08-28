import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutStageComponent } from './ajout-stage.component';

describe('AjoutStageComponent', () => {
  let component: AjoutStageComponent;
  let fixture: ComponentFixture<AjoutStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutStageComponent]
    });
    fixture = TestBed.createComponent(AjoutStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
