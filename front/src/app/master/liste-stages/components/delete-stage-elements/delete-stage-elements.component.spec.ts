import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStageElementsComponent } from './delete-stage-elements.component';

describe('DeleteStageElementsComponent', () => {
  let component: DeleteStageElementsComponent;
  let fixture: ComponentFixture<DeleteStageElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteStageElementsComponent]
    });
    fixture = TestBed.createComponent(DeleteStageElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
