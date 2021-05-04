import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglReadFloatBufferComponent } from './webgl-read-float-buffer.component';

describe('WebglReadFloatBufferComponent', () => {
  let component: WebglReadFloatBufferComponent;
  let fixture: ComponentFixture<WebglReadFloatBufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglReadFloatBufferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglReadFloatBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
