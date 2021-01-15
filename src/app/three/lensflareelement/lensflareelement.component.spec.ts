import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LensflareelementComponent } from './lensflareelement.component';

describe('LensflareelementComponent', () => {
  let component: LensflareelementComponent;
  let fixture: ComponentFixture<LensflareelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LensflareelementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LensflareelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
