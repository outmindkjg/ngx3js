import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglTiledForwardComponent } from './webgl-tiled-forward.component';

describe('WebglTiledForwardComponent', () => {
  let component: WebglTiledForwardComponent;
  let fixture: ComponentFixture<WebglTiledForwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglTiledForwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglTiledForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
