import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTtfComponent } from './webgl-loader-ttf.component';

describe('WebglLoaderTtfComponent', () => {
  let component: WebglLoaderTtfComponent;
  let fixture: ComponentFixture<WebglLoaderTtfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTtfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTtfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
