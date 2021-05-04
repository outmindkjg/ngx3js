import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMorphtargetsSphereComponent } from './webgl-morphtargets-sphere.component';

describe('WebglMorphtargetsSphereComponent', () => {
  let component: WebglMorphtargetsSphereComponent;
  let fixture: ComponentFixture<WebglMorphtargetsSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMorphtargetsSphereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMorphtargetsSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
