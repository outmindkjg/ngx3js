import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMultipleElementsComponent } from './webgl-multiple-elements.component';

describe('WebglMultipleElementsComponent', () => {
  let component: WebglMultipleElementsComponent;
  let fixture: ComponentFixture<WebglMultipleElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMultipleElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMultipleElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
