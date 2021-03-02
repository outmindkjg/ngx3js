import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLinesSphereComponent } from './webgl-lines-sphere.component';

describe('WebglLinesSphereComponent', () => {
  let component: WebglLinesSphereComponent;
  let fixture: ComponentFixture<WebglLinesSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLinesSphereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLinesSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
