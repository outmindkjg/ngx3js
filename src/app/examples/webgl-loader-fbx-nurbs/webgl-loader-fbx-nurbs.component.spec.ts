import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderFbxNurbsComponent } from './webgl-loader-fbx-nurbs.component';

describe('WebglLoaderFbxNurbsComponent', () => {
  let component: WebglLoaderFbxNurbsComponent;
  let fixture: ComponentFixture<WebglLoaderFbxNurbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderFbxNurbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderFbxNurbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
