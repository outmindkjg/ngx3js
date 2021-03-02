import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightsPhysicalComponent } from './webgl-lights-physical.component';

describe('WebglLightsPhysicalComponent', () => {
  let component: WebglLightsPhysicalComponent;
  let fixture: ComponentFixture<WebglLightsPhysicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightsPhysicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightsPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
