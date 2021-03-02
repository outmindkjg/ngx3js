import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderMmdComponent } from './webgl-loader-mmd.component';

describe('WebglLoaderMmdComponent', () => {
  let component: WebglLoaderMmdComponent;
  let fixture: ComponentFixture<WebglLoaderMmdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderMmdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderMmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
