import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInstancingDynamicComponent } from './webgl-instancing-dynamic.component';

describe('WebglInstancingDynamicComponent', () => {
  let component: WebglInstancingDynamicComponent;
  let fixture: ComponentFixture<WebglInstancingDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInstancingDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInstancingDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
