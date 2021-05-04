import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebgpuRttComponent } from './webgpu-rtt.component';

describe('WebgpuRttComponent', () => {
  let component: WebgpuRttComponent;
  let fixture: ComponentFixture<WebgpuRttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebgpuRttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebgpuRttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
