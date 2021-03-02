import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderPrwmComponent } from './webgl-loader-prwm.component';

describe('WebglLoaderPrwmComponent', () => {
  let component: WebglLoaderPrwmComponent;
  let fixture: ComponentFixture<WebglLoaderPrwmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderPrwmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderPrwmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
