import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsGrassComponent } from './webgl-materials-grass.component';

describe('WebglMaterialsGrassComponent', () => {
  let component: WebglMaterialsGrassComponent;
  let fixture: ComponentFixture<WebglMaterialsGrassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsGrassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsGrassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
