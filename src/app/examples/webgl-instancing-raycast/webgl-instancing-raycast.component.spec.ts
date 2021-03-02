import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInstancingRaycastComponent } from './webgl-instancing-raycast.component';

describe('WebglInstancingRaycastComponent', () => {
  let component: WebglInstancingRaycastComponent;
  let fixture: ComponentFixture<WebglInstancingRaycastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInstancingRaycastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInstancingRaycastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
