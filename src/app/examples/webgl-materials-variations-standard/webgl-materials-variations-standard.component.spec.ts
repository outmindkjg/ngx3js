import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsVariationsStandardComponent } from './webgl-materials-variations-standard.component';

describe('WebglMaterialsVariationsStandardComponent', () => {
  let component: WebglMaterialsVariationsStandardComponent;
  let fixture: ComponentFixture<WebglMaterialsVariationsStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsVariationsStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsVariationsStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
