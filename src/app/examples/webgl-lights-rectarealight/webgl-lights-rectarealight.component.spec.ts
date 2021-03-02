import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightsRectarealightComponent } from './webgl-lights-rectarealight.component';

describe('WebglLightsRectarealightComponent', () => {
  let component: WebglLightsRectarealightComponent;
  let fixture: ComponentFixture<WebglLightsRectarealightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightsRectarealightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightsRectarealightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
