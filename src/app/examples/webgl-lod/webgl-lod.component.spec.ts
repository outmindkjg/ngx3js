import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLodComponent } from './webgl-lod.component';

describe('WebglLodComponent', () => {
  let component: WebglLodComponent;
  let fixture: ComponentFixture<WebglLodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
