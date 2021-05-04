import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPointsWavesComponent } from './webgl-points-waves.component';

describe('WebglPointsWavesComponent', () => {
  let component: WebglPointsWavesComponent;
  let fixture: ComponentFixture<WebglPointsWavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPointsWavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPointsWavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
