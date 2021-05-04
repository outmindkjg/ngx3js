import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dOrthographicComponent } from './css3d-orthographic.component';

describe('Css3dOrthographicComponent', () => {
  let component: Css3dOrthographicComponent;
  let fixture: ComponentFixture<Css3dOrthographicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css3dOrthographicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dOrthographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
