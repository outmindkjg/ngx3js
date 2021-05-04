import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglWaterComponent } from './webgl-water.component';

describe('WebglWaterComponent', () => {
  let component: WebglWaterComponent;
  let fixture: ComponentFixture<WebglWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
