import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInteractiveLinesComponent } from './webgl-interactive-lines.component';

describe('WebglInteractiveLinesComponent', () => {
  let component: WebglInteractiveLinesComponent;
  let fixture: ComponentFixture<WebglInteractiveLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInteractiveLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInteractiveLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
