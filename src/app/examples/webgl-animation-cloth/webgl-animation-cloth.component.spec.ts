import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglAnimationClothComponent } from './webgl-animation-cloth.component';

describe('WebglAnimationClothComponent', () => {
  let component: WebglAnimationClothComponent;
  let fixture: ComponentFixture<WebglAnimationClothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglAnimationClothComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglAnimationClothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
