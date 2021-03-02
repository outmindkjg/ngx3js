import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderVoxComponent } from './webgl-loader-vox.component';

describe('WebglLoaderVoxComponent', () => {
  let component: WebglLoaderVoxComponent;
  let fixture: ComponentFixture<WebglLoaderVoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderVoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderVoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
