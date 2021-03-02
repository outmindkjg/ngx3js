import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLinesFatComponent } from './webgl-lines-fat.component';

describe('WebglLinesFatComponent', () => {
  let component: WebglLinesFatComponent;
  let fixture: ComponentFixture<WebglLinesFatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLinesFatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLinesFatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
