import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMirrorComponent } from './webgl-mirror.component';

describe('WebglMirrorComponent', () => {
  let component: WebglMirrorComponent;
  let fixture: ComponentFixture<WebglMirrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMirrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
