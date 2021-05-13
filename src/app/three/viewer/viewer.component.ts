import {
  Component,
  EventEmitter, Input,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { ShadowMapViewer } from 'three/examples/jsm/utils/ShadowMapViewer';
import { RendererTimer, ThreeUtil } from '../interface';
import { LightComponent } from '../light/light.component';
import { MeshComponent } from '../mesh/mesh.component';

@Component({
  selector: 'three-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  @Input() private type: string = "";
  @Input() private light : LightComponent | MeshComponent | THREE.Light = null;
  @Input() private x: number | string = 0;
  @Input() private y: number | string = 0;
  @Input() private width: number | string = '50%';
  @Input() private height: number | string = '50%';
  @Input() private enabled : boolean = true;
  @Output() private onLoad: EventEmitter<ViewerComponent> = new EventEmitter<ViewerComponent>();

  _refTargetSubscription : Subscription = null;

  private getLight() {
    let light : THREE.Light = null;
    if (ThreeUtil.isNotNull(this.light)) {
      if (this.light instanceof THREE.Light) {
        return this.light;
      } else if (this.light instanceof LightComponent) {
        light = this.light.getLight();
        this._refTargetSubscription = this.light.lightSubscribe().subscribe(() => {
          this.resetViewer();
        });
      } else if (this.light instanceof MeshComponent) {
        const mesh = this.light.getMesh();
        if (mesh instanceof THREE.Light) {
          light = mesh;
        }
        this._refTargetSubscription = this.light.meshSubscribe().subscribe(() => {
          this.resetViewer();
        });
      }
    }
    if (light !== null) {
      return light;
    } else {
      return new THREE.PointLight();
    }
  }

  private getX(def?: number | string): number {
    const x = this.getViewPortSize(this.x, this.rendererWidth, def);
    if (x < 0) {
      return this.rendererWidth - this.getWidth() + x;
    } else {
      return x;
    }
  }

  private getY(def?: number | string): number {
    const y = this.getViewPortSize(this.y, this.rendererHeight, def);
    if (y < 0) {
      return this.rendererHeight - this.getHeight() + y;
    } else {
      return y;
    }
  }

  private getWidth(def?: number | string): number {
    return this.getViewPortSize(this.width, this.rendererWidth, def);
  }

  private getHeight(def?: number | string): number {
    return this.getViewPortSize(this.height, this.rendererHeight, def);
  }

  private getViewPortSize(
    size: number | string,
    cameraSize: number,
    def?: number | string
  ): number {
    const baseSize = ThreeUtil.getTypeSafe(size, def);
    if (ThreeUtil.isNotNull(baseSize)) {
      let resultSize : number = 0;
      if (typeof baseSize == 'string') {
        if (baseSize.endsWith('%')) {
          resultSize = Math.ceil(
            (cameraSize * parseFloat(baseSize.slice(0, -1))) / 100
          );
        } else {
          switch (baseSize) {
            case 'x':
              resultSize = this.getX(def);
              break;
            case 'y':
              resultSize = this.getY(def);
              break;
            case 'width':
              resultSize = this.getWidth(def);
              break;
            case 'height':
              resultSize = this.getHeight(def);
              break;
            default:
              resultSize = parseFloat(baseSize);
              break;
          }
        }
      } else {
        resultSize = baseSize;
      }
      return resultSize;
    }
    return 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.viewer !== null) {
      if (changes.type) {
        this.resetViewer();
      } else {
        if (changes.x || changes.y || changes.width || changes.height || changes.enabled) {
          this.resizeViewer();
        }
      }
    }
  }

  private viewer : any = null;
  private rendererWidth: number = 0;
  private rendererHeight: number = 0;

  setViewerSize(width: number, height: number) {
    this.rendererWidth = width;
    this.rendererHeight = height;
  }

  resizeViewer() {
    if (this.viewer !== null) {
      switch(this.type.toLowerCase()) {
        case "shadowmapviewer" :
        case "shadowmap" :
        default :
          this.viewer.position.x = this.getX();
          this.viewer.position.y = this.getY();
          this.viewer.size.width = this.getWidth();
          this.viewer.size.height = this.getHeight();
          this.viewer.enabled = this.enabled;
          this.viewer.updateForWindowResize();
          break;
      }
    }
  }
  
  resetViewer() {
    if (this.viewer !== null) {
      this.viewer = null;
      this.getViewer();
    }
  }
  
  getViewer() {
    if (this.viewer === null) {
      if (this._refTargetSubscription !== null) {
        this._refTargetSubscription.unsubscribe();
        this._refTargetSubscription = null;
      }
      switch(this.type.toLowerCase()) {
        case "shadowmapviewer" :
        case "shadowmap" :
        default :
          this.viewer = new ShadowMapViewer(this.getLight());
          this.resizeViewer();
          break;
      }
      if (this.viewer !== null) {
        this.onLoad.emit(this);
      }
    }
    return this.viewer;
  }

  render(
    renderer: THREE.Renderer,
    renderTimer?: RendererTimer
  ) {
    if (this.viewer !== null) {
      switch(this.type.toLowerCase()) {
        case "shadowmapviewer" :
        case "shadowmap" :
        default :
          this.viewer.render(renderer);
          break;
      }
    }
  }
}
