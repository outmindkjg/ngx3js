import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweenComponent } from './tween.component';

describe('TweenComponent', () => {
  let component: TweenComponent;
  let fixture: ComponentFixture<TweenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
