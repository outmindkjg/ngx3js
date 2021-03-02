import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsComponent } from './webgl-materials.component';

describe('WebglMaterialsComponent', () => {
  let component: WebglMaterialsComponent;
  let fixture: ComponentFixture<WebglMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
