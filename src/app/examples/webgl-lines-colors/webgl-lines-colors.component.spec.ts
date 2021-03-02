import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLinesColorsComponent } from './webgl-lines-colors.component';

describe('WebglLinesColorsComponent', () => {
  let component: WebglLinesColorsComponent;
  let fixture: ComponentFixture<WebglLinesColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLinesColorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLinesColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
