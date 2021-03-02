import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInstancingScatterComponent } from './webgl-instancing-scatter.component';

describe('WebglInstancingScatterComponent', () => {
  let component: WebglInstancingScatterComponent;
  let fixture: ComponentFixture<WebglInstancingScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInstancingScatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInstancingScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
