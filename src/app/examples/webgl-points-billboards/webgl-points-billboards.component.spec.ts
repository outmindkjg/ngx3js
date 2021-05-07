import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPointsBillboardsComponent } from './webgl-points-billboards.component';

describe('WebglPointsBillboardsComponent', () => {
  let component: WebglPointsBillboardsComponent;
  let fixture: ComponentFixture<WebglPointsBillboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPointsBillboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPointsBillboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
