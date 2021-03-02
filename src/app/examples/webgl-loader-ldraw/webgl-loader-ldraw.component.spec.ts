import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderLdrawComponent } from './webgl-loader-ldraw.component';

describe('WebglLoaderLdrawComponent', () => {
  let component: WebglLoaderLdrawComponent;
  let fixture: ComponentFixture<WebglLoaderLdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderLdrawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderLdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
