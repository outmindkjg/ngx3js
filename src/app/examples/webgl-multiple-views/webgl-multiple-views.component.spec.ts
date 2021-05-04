import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMultipleViewsComponent } from './webgl-multiple-views.component';

describe('WebglMultipleViewsComponent', () => {
  let component: WebglMultipleViewsComponent;
  let fixture: ComponentFixture<WebglMultipleViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMultipleViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMultipleViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
