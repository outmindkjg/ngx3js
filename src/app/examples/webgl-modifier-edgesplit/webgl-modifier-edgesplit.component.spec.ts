import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglModifierEdgesplitComponent } from './webgl-modifier-edgesplit.component';

describe('WebglModifierEdgesplitComponent', () => {
  let component: WebglModifierEdgesplitComponent;
  let fixture: ComponentFixture<WebglModifierEdgesplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglModifierEdgesplitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglModifierEdgesplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
