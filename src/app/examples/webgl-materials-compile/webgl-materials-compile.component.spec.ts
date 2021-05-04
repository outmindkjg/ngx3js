import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsCompileComponent } from './webgl-materials-compile.component';

describe('WebglMaterialsCompileComponent', () => {
  let component: WebglMaterialsCompileComponent;
  let fixture: ComponentFixture<WebglMaterialsCompileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsCompileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsCompileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
