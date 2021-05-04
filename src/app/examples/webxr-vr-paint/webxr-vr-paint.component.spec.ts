import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrPaintComponent } from './webxr-vr-paint.component';

describe('WebxrVrPaintComponent', () => {
  let component: WebxrVrPaintComponent;
  let fixture: ComponentFixture<WebxrVrPaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrPaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
