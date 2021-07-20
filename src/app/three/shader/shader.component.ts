import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'ngx3js-shader',
  templateUrl: './shader.component.html',
  styleUrls: ['./shader.component.scss'],
})
export class ShaderComponent extends AbstractSubscribeComponent implements OnInit {

  /**
   * 
   */
  @Input() public type: string = 'x-shader/x-fragment';

  /**
   * 
   */
  @Input() private refShader: ShaderComponent = null;

  constructor(private ele: ElementRef) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('shader');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private shader: string = null;

  getShader(): string {
    if (this.shader === null || this._needUpdate) {
      this.needUpdate = false;
      if (this.refShader !== null) {
        this.shader = this.refShader.getShader();
      } else {
        this.shader = this.ele.nativeElement.innerText;
      }
      super.setObject(this.shader);
    }
    return this.shader;
  }
}
