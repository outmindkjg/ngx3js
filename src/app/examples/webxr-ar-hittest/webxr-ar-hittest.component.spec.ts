import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrArHittestComponent } from './webxr-ar-hittest.component';

describe('WebxrArHittestComponent', () => {
  let component: WebxrArHittestComponent;
  let fixture: ComponentFixture<WebxrArHittestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrArHittestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrArHittestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
