import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderPcdComponent } from './webgl-loader-pcd.component';

describe('WebglLoaderPcdComponent', () => {
  let component: WebglLoaderPcdComponent;
  let fixture: ComponentFixture<WebglLoaderPcdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderPcdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderPcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
