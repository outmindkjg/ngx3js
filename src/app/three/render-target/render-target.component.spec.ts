import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTargetComponent } from './render-target.component';

describe('RenderTargetComponent', () => {
  let component: RenderTargetComponent;
  let fixture: ComponentFixture<RenderTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
