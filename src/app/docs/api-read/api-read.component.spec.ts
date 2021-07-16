import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiReadComponent } from './api-read.component';

describe('ApiReadComponent', () => {
  let component: ApiReadComponent;
  let fixture: ComponentFixture<ApiReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
