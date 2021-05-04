import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrLorenzattractorComponent } from './webxr-vr-lorenzattractor.component';

describe('WebxrVrLorenzattractorComponent', () => {
  let component: WebxrVrLorenzattractorComponent;
  let fixture: ComponentFixture<WebxrVrLorenzattractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrLorenzattractorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrLorenzattractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
