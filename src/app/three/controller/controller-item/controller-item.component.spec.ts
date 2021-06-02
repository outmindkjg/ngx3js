import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerItemComponent } from './controller-item.component';

describe('ControllerItemComponent', () => {
  let component: ControllerItemComponent;
  let fixture: ComponentFixture<ControllerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
