import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgLinesComponent } from './svg-lines.component';

describe('SvgLinesComponent', () => {
  let component: SvgLinesComponent;
  let fixture: ComponentFixture<SvgLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
