import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderPdbComponent } from './webgl-loader-pdb.component';

describe('WebglLoaderPdbComponent', () => {
  let component: WebglLoaderPdbComponent;
  let fixture: ComponentFixture<WebglLoaderPdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderPdbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderPdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
