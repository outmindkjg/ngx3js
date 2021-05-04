import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglModifierSimplifierComponent } from './webgl-modifier-simplifier.component';

describe('WebglModifierSimplifierComponent', () => {
  let component: WebglModifierSimplifierComponent;
  let fixture: ComponentFixture<WebglModifierSimplifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglModifierSimplifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglModifierSimplifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
