import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutComponent } from './doughnut.component';

describe('DoughnutComponent', () => {
  let component: DoughnutComponent;
  let fixture: ComponentFixture<DoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutComponent ]
    , providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
})
    .compileComponents();
  , providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }]
});

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutComponent);
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
