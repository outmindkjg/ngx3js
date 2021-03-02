import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderColladaSkinningComponent } from './webgl-loader-collada-skinning.component';

describe('WebglLoaderColladaSkinningComponent', () => {
  let component: WebglLoaderColladaSkinningComponent;
  let fixture: ComponentFixture<WebglLoaderColladaSkinningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderColladaSkinningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderColladaSkinningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
