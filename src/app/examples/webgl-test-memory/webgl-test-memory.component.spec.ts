import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglTestMemoryComponent } from './webgl-test-memory.component';

describe('WebglTestMemoryComponent', () => {
  let component: WebglTestMemoryComponent;
  let fixture: ComponentFixture<WebglTestMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglTestMemoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglTestMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
