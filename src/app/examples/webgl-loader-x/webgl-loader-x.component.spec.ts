import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderXComponent } from './webgl-loader-x.component';

describe('WebglLoaderXComponent', () => {
  let component: WebglLoaderXComponent;
  let fixture: ComponentFixture<WebglLoaderXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
