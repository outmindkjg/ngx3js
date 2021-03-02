import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglEffectsPeppersghostComponent } from './webgl-effects-peppersghost.component';

describe('WebglEffectsPeppersghostComponent', () => {
  let component: WebglEffectsPeppersghostComponent;
  let fixture: ComponentFixture<WebglEffectsPeppersghostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglEffectsPeppersghostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglEffectsPeppersghostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
