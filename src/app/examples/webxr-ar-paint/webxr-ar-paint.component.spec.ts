import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrArPaintComponent } from './webxr-ar-paint.component';

describe('WebxrArPaintComponent', () => {
  let component: WebxrArPaintComponent;
  let fixture: ComponentFixture<WebxrArPaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrArPaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrArPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
