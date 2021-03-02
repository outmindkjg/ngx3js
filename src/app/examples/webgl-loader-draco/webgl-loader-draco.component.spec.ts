import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderDracoComponent } from './webgl-loader-draco.component';

describe('WebglLoaderDracoComponent', () => {
  let component: WebglLoaderDracoComponent;
  let fixture: ComponentFixture<WebglLoaderDracoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderDracoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderDracoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
