import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMultipleRenderersComponent } from './webgl-multiple-renderers.component';

describe('WebglMultipleRenderersComponent', () => {
  let component: WebglMultipleRenderersComponent;
  let fixture: ComponentFixture<WebglMultipleRenderersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMultipleRenderersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMultipleRenderersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
