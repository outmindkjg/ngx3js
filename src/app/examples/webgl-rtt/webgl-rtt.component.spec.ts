import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglRttComponent } from './webgl-rtt.component';

describe('WebglRttComponent', () => {
  let component: WebglRttComponent;
  let fixture: ComponentFixture<WebglRttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglRttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglRttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
