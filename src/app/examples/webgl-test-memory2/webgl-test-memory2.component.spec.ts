import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglTestMemory2Component } from './webgl-test-memory2.component';

describe('WebglTestMemory2Component', () => {
  let component: WebglTestMemory2Component;
  let fixture: ComponentFixture<WebglTestMemory2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglTestMemory2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglTestMemory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
