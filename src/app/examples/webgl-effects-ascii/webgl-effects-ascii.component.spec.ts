import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglEffectsAsciiComponent } from './webgl-effects-ascii.component';

describe('WebglEffectsAsciiComponent', () => {
  let component: WebglEffectsAsciiComponent;
  let fixture: ComponentFixture<WebglEffectsAsciiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglEffectsAsciiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglEffectsAsciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
