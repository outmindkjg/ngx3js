import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightningstrikeComponent } from './webgl-lightningstrike.component';

describe('WebglLightningstrikeComponent', () => {
  let component: WebglLightningstrikeComponent;
  let fixture: ComponentFixture<WebglLightningstrikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightningstrikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightningstrikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
