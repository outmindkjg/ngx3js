import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderTextureBasisComponent } from './webgl-loader-texture-basis.component';

describe('WebglLoaderTextureBasisComponent', () => {
  let component: WebglLoaderTextureBasisComponent;
  let fixture: ComponentFixture<WebglLoaderTextureBasisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderTextureBasisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderTextureBasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
