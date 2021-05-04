import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglSimpleGiComponent } from './webgl-simple-gi.component';

describe('WebglSimpleGiComponent', () => {
  let component: WebglSimpleGiComponent;
  let fixture: ComponentFixture<WebglSimpleGiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglSimpleGiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglSimpleGiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
