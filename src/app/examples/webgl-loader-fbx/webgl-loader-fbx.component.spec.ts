import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderFbxComponent } from './webgl-loader-fbx.component';

describe('WebglLoaderFbxComponent', () => {
  let component: WebglLoaderFbxComponent;
  let fixture: ComponentFixture<WebglLoaderFbxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderFbxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderFbxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
