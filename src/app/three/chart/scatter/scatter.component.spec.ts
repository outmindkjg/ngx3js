import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterComponent } from './scatter.component';

describe('ScatterComponent', () => {
  let component: ScatterComponent;
  let fixture: ComponentFixture<ScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterComponent ]
    , providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
})
    .compileComponents();
  , providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
});

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  , providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
});

  it('should create', () => {
    expect(component).toBeTruthy();
  , providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
});
, providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
});
