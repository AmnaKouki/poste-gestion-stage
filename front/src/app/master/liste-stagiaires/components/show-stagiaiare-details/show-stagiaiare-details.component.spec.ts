import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStagiaiareDetailsComponent } from './show-stagiaiare-details.component';

describe('ShowStagiaiareDetailsComponent', () => {
  let component: ShowStagiaiareDetailsComponent;
  let fixture: ComponentFixture<ShowStagiaiareDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStagiaiareDetailsComponent]
    });
    fixture = TestBed.createComponent(ShowStagiaiareDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
