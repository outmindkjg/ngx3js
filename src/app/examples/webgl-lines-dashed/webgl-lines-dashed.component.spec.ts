import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLinesDashedComponent } from './webgl-lines-dashed.component';

describe('WebglLinesDashedComponent', () => {
  let component: WebglLinesDashedComponent;
  let fixture: ComponentFixture<WebglLinesDashedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLinesDashedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLinesDashedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
