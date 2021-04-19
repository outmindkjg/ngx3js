import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsMatcapComponent } from './webgl-materials-matcap.component';

describe('WebglMaterialsMatcapComponent', () => {
  let component: WebglMaterialsMatcapComponent;
  let fixture: ComponentFixture<WebglMaterialsMatcapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsMatcapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsMatcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
