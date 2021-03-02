import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglEffectsStereoComponent } from './webgl-effects-stereo.component';

describe('WebglEffectsStereoComponent', () => {
  let component: WebglEffectsStereoComponent;
  let fixture: ComponentFixture<WebglEffectsStereoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglEffectsStereoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglEffectsStereoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
