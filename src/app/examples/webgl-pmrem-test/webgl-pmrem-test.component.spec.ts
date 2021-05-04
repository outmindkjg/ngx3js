import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPmremTestComponent } from './webgl-pmrem-test.component';

describe('WebglPmremTestComponent', () => {
  let component: WebglPmremTestComponent;
  let fixture: ComponentFixture<WebglPmremTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPmremTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPmremTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
