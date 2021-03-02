import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInteractiveCubesOrthoComponent } from './webgl-interactive-cubes-ortho.component';

describe('WebglInteractiveCubesOrthoComponent', () => {
  let component: WebglInteractiveCubesOrthoComponent;
  let fixture: ComponentFixture<WebglInteractiveCubesOrthoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInteractiveCubesOrthoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInteractiveCubesOrthoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
