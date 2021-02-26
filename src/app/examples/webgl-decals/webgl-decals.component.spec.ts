import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglDecalsComponent } from './webgl-decals.component';

describe('WebglDecalsComponent', () => {
  let component: WebglDecalsComponent;
  let fixture: ComponentFixture<WebglDecalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglDecalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglDecalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
