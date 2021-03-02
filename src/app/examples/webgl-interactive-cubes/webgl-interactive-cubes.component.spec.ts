import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInteractiveCubesComponent } from './webgl-interactive-cubes.component';

describe('WebglInteractiveCubesComponent', () => {
  let component: WebglInteractiveCubesComponent;
  let fixture: ComponentFixture<WebglInteractiveCubesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInteractiveCubesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInteractiveCubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
