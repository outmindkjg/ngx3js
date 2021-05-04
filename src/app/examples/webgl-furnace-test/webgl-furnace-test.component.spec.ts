import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglFurnaceTestComponent } from './webgl-furnace-test.component';

describe('WebglFurnaceTestComponent', () => {
  let component: WebglFurnaceTestComponent;
  let fixture: ComponentFixture<WebglFurnaceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglFurnaceTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglFurnaceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
