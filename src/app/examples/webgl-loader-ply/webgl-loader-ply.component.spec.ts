import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderPlyComponent } from './webgl-loader-ply.component';

describe('WebglLoaderPlyComponent', () => {
  let component: WebglLoaderPlyComponent;
  let fixture: ComponentFixture<WebglLoaderPlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderPlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderPlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
