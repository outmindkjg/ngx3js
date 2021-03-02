import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderKmzComponent } from './webgl-loader-kmz.component';

describe('WebglLoaderKmzComponent', () => {
  let component: WebglLoaderKmzComponent;
  let fixture: ComponentFixture<WebglLoaderKmzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderKmzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderKmzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
