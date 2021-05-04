import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglSpritesComponent } from './webgl-sprites.component';

describe('WebglSpritesComponent', () => {
  let component: WebglSpritesComponent;
  let fixture: ComponentFixture<WebglSpritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglSpritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglSpritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
