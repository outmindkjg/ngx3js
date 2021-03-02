import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglGeometryTextComponent } from './webgl-geometry-text.component';

describe('WebglGeometryTextComponent', () => {
  let component: WebglGeometryTextComponent;
  let fixture: ComponentFixture<WebglGeometryTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglGeometryTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglGeometryTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
