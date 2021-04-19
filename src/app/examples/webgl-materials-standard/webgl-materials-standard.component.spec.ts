import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsStandardComponent } from './webgl-materials-standard.component';

describe('WebglMaterialsStandardComponent', () => {
  let component: WebglMaterialsStandardComponent;
  let fixture: ComponentFixture<WebglMaterialsStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
