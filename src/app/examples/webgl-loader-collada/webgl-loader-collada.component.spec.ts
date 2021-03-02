import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderColladaComponent } from './webgl-loader-collada.component';

describe('WebglLoaderColladaComponent', () => {
  let component: WebglLoaderColladaComponent;
  let fixture: ComponentFixture<WebglLoaderColladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderColladaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderColladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
