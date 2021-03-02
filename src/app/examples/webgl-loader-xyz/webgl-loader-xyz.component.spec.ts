import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderXyzComponent } from './webgl-loader-xyz.component';

describe('WebglLoaderXyzComponent', () => {
  let component: WebglLoaderXyzComponent;
  let fixture: ComponentFixture<WebglLoaderXyzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderXyzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderXyzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
