import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPointsSpritesComponent } from './webgl-points-sprites.component';

describe('WebglPointsSpritesComponent', () => {
  let component: WebglPointsSpritesComponent;
  let fixture: ComponentFixture<WebglPointsSpritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPointsSpritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPointsSpritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
