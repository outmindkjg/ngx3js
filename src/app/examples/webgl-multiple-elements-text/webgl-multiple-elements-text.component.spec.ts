import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMultipleElementsTextComponent } from './webgl-multiple-elements-text.component';

describe('WebglMultipleElementsTextComponent', () => {
  let component: WebglMultipleElementsTextComponent;
  let fixture: ComponentFixture<WebglMultipleElementsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMultipleElementsTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMultipleElementsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
