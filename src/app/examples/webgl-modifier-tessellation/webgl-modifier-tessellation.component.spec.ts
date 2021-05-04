import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglModifierTessellationComponent } from './webgl-modifier-tessellation.component';

describe('WebglModifierTessellationComponent', () => {
  let component: WebglModifierTessellationComponent;
  let fixture: ComponentFixture<WebglModifierTessellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglModifierTessellationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglModifierTessellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
