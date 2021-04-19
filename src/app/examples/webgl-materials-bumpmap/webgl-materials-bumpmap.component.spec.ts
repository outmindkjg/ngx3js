import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsBumpmapComponent } from './webgl-materials-bumpmap.component';

describe('WebglMaterialsBumpmapComponent', () => {
  let component: WebglMaterialsBumpmapComponent;
  let fixture: ComponentFixture<WebglMaterialsBumpmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsBumpmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsBumpmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
