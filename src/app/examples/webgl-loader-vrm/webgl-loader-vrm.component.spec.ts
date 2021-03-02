import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderVrmComponent } from './webgl-loader-vrm.component';

describe('WebglLoaderVrmComponent', () => {
  let component: WebglLoaderVrmComponent;
  let fixture: ComponentFixture<WebglLoaderVrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderVrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderVrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
