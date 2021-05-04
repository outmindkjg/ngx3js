import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebaudioVisualizerComponent } from './webaudio-visualizer.component';

describe('WebaudioVisualizerComponent', () => {
  let component: WebaudioVisualizerComponent;
  let fixture: ComponentFixture<WebaudioVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebaudioVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebaudioVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
