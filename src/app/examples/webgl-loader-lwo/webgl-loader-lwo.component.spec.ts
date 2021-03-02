import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderLwoComponent } from './webgl-loader-lwo.component';

describe('WebglLoaderLwoComponent', () => {
  let component: WebglLoaderLwoComponent;
  let fixture: ComponentFixture<WebglLoaderLwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderLwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderLwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
