import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowContactComponent } from './webgl-shadow-contact.component';

describe('WebglShadowContactComponent', () => {
  let component: WebglShadowContactComponent;
  let fixture: ComponentFixture<WebglShadowContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
