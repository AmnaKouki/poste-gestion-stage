import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWidgetComponent } from './top-widget.component';

describe('TopWidgetComponent', () => {
  let component: TopWidgetComponent;
  let fixture: ComponentFixture<TopWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopWidgetComponent]
    });
    fixture = TestBed.createComponent(TopWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
