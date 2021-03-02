import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMarchingcubesComponent } from './webgl-marchingcubes.component';

describe('WebglMarchingcubesComponent', () => {
  let component: WebglMarchingcubesComponent;
  let fixture: ComponentFixture<WebglMarchingcubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMarchingcubesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMarchingcubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
