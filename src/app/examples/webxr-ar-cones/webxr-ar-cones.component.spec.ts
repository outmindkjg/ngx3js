import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrArConesComponent } from './webxr-ar-cones.component';

describe('WebxrArConesComponent', () => {
  let component: WebxrArConesComponent;
  let fixture: ComponentFixture<WebxrArConesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrArConesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrArConesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
