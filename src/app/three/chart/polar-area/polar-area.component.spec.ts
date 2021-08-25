import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarAreaComponent } from './polar-area.component';

describe('PolarAreaComponent', () => {
  let component: PolarAreaComponent;
  let fixture: ComponentFixture<PolarAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarAreaComponent ]
    , providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
})
    .compileComponents();
  , providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
});

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarAreaComponent);
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
