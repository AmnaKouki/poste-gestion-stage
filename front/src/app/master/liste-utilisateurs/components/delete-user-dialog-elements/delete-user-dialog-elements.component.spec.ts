import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserDialogElementsComponent } from './delete-user-dialog-elements.component';

describe('DeleteUserDialogElementsComponent', () => {
  let component: DeleteUserDialogElementsComponent;
  let fixture: ComponentFixture<DeleteUserDialogElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserDialogElementsComponent]
    });
    fixture = TestBed.createComponent(DeleteUserDialogElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
