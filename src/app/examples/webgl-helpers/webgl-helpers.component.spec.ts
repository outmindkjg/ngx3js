import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglHelpersComponent } from './webgl-helpers.component';

describe('WebglHelpersComponent', () => {
  let component: WebglHelpersComponent;
  let fixture: ComponentFixture<WebglHelpersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglHelpersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglHelpersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
