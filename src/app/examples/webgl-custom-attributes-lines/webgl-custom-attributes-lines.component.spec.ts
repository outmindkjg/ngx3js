import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCustomAttributesLinesComponent } from './webgl-custom-attributes-lines.component';

describe('WebglCustomAttributesLinesComponent', () => {
  let component: WebglCustomAttributesLinesComponent;
  let fixture: ComponentFixture<WebglCustomAttributesLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCustomAttributesLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCustomAttributesLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
