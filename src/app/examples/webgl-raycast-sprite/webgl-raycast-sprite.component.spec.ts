import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglRaycastSpriteComponent } from './webgl-raycast-sprite.component';

describe('WebglRaycastSpriteComponent', () => {
  let component: WebglRaycastSpriteComponent;
  let fixture: ComponentFixture<WebglRaycastSpriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglRaycastSpriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglRaycastSpriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
