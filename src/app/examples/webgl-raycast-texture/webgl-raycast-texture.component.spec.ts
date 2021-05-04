import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglRaycastTextureComponent } from './webgl-raycast-texture.component';

describe('WebglRaycastTextureComponent', () => {
  let component: WebglRaycastTextureComponent;
  let fixture: ComponentFixture<WebglRaycastTextureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglRaycastTextureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglRaycastTextureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
