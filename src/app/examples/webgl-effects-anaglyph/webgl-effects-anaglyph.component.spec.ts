import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglEffectsAnaglyphComponent } from './webgl-effects-anaglyph.component';

describe('WebglEffectsAnaglyphComponent', () => {
  let component: WebglEffectsAnaglyphComponent;
  let fixture: ComponentFixture<WebglEffectsAnaglyphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglEffectsAnaglyphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglEffectsAnaglyphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
