import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglTrailsComponent } from './webgl-trails.component';

describe('WebglTrailsComponent', () => {
  let component: WebglTrailsComponent;
  let fixture: ComponentFixture<WebglTrailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglTrailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglTrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
