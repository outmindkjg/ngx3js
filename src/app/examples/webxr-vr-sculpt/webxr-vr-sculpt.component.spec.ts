import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrSculptComponent } from './webxr-vr-sculpt.component';

describe('WebxrVrSculptComponent', () => {
  let component: WebxrVrSculptComponent;
  let fixture: ComponentFixture<WebxrVrSculptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrSculptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrSculptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
