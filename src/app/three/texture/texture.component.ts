import { Component, forwardRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { Lut } from 'three/examples/jsm/math/Lut';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';
import { ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { AbstractTextureComponent } from '../texture.abstract';
import { CanvasFunctionType } from './textureUtils';

@Component({
  selector: 'ngx3js-texture',
  templateUrl: './texture.component.html',
  styleUrls: ['./texture.component.scss'],
  providers: [{provide: AbstractTextureComponent, useExisting: forwardRef(() => TextureComponent) }]
})
export class TextureComponent extends AbstractTextureComponent implements OnInit, OnDestroy {

  /**
   * 
   */
  @Input() private refer: any = null;

  /**
   * 
   */
  @Input() private image: string = null;

  /**
   * 
   */
  @Input() private cubeImage: string[] = null;

  /**
   * 
   */
  @Input() private storageName: string = null;

  /**
   * 
   */
  @Input() private storageOption: any = null;

  /**
   * 
   */
  @Input() private program: CanvasFunctionType | string = null;

  /**
   * 
   */
  @Input() private canvas: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap | string = null;

  /**
   * 
   */
  @Input() private perlin: any = null;

  /**
   * 
   */
  @Input() private sunX: number = null;

  /**
   * 
   */
  @Input() private sunY: number = null;

  /**
   * 
   */
  @Input() private sunZ: number = null;

  /**
   * 
   */
  @Input() private useDropImage: boolean = false;

  /**
   * 
   */
  @Input() private color: number | string = null;

  /**
   * 
   */
  @Input() private add: number | string = null;

  private getImage(def?: string): string {
    return ThreeUtil.getTypeSafe(this.image, def);
  }

  private getCubeImage(def?: string[]): string[] {
    return ThreeUtil.getTypeSafe(this.cubeImage, def);
  }

  private getProgram(def?: CanvasFunctionType | string): CanvasFunctionType | string {
    return ThreeUtil.getTypeSafe(this.program, def);
  }

  private getCanvas(def?: string): HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | ImageBitmap {
    if (ThreeUtil.isNull(this.canvas) || typeof this.canvas === 'string') {
      const canvas = (ThreeUtil.getTypeSafe(this.canvas, def, '') as string).toLowerCase().replace(/[^a-z0-9]/gi,'');
      switch (canvas) {
        case 'flakes' :
        case 'flakestexture' :
          return new FlakesTexture();
        case 'lutrainbow' :
        case 'lutcooltowarm' :
        case 'lutblackbody' :
        case 'lutgrayscale' :
          return new Lut(canvas.toLowerCase().substr(3)).createCanvas();
        case 'lut':
        default:
          return new Lut().createCanvas();
      }
    } else {
      return this.canvas;
    }
  }

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('texture');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes) {
      if (changes.useDropImage) {
        this.setUseDropImage(this.useDropImage);   
        delete changes.useDropImage;
      }
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private setUseDropImage(useDropImage: boolean) {
    if (useDropImage) {
      if (this._dragOverHandler === null) {
        this._dragOverHandler = (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
        };
        document.addEventListener('dragover', this._dragOverHandler);
      }
      if (this._dragEnterHandler === null) {
        this._dragEnterHandler = () => {
          document.body.style.opacity = (0.5).toString();
        };
        document.addEventListener('dragenter', this._dragEnterHandler);
      }
      if (this._dragLeaveHandler === null) {
        this._dragLeaveHandler = () => {
          document.body.style.opacity = (1).toString();
        };
        document.addEventListener('dragleave', this._dragLeaveHandler);
      }
      if (this._dropHandler === null) {
        this._dropHandler = (event) => {
          event.preventDefault();
          if (this.texture !== null) {
            const texture = this.texture;
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
              texture.image.src = event.target.result;
              texture.needsUpdate = true;
              this.applyMaterial();
            });
            reader.readAsDataURL(event.dataTransfer.files[0]);
          }
          document.body.style.opacity = (1).toString();
        };
        document.addEventListener('drop', this._dropHandler);
      }
    } else {
      if (this._dragOverHandler !== null) {
        document.removeEventListener('dragover', this._dragOverHandler);
        this._dragOverHandler = null;
      }
      if (this._dragEnterHandler !== null) {
        document.removeEventListener('dragenter', this._dragEnterHandler);
        this._dragEnterHandler = null;
      }
      if (this._dragLeaveHandler !== null) {
        document.removeEventListener('dragleave', this._dragLeaveHandler);
        this._dragLeaveHandler = null;
      }
      if (this._dropHandler !== null) {
        document.removeEventListener('drop', this._dropHandler);
        this._dropHandler = null;
      }
    }
  }

  private _dragOverHandler = null;
  private _dragEnterHandler = null;
  private _dragLeaveHandler = null;
  private _dropHandler = null;

  protected applyChanges(changes: string[]) {
    if (this.texture !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getTexture();
        return;
      }
      if (ThreeUtil.isIndexOf(changes, ['image','storagename','storageoption','cubeimage','loadertype', 'canvas'])) {
        this.needUpdate = true;
        return;
      }
      AbstractTextureComponent.setTextureOptions(this.texture, this.getTextureOptions());
      if (ThreeUtil.isTextureLoaded(this.texture)) {
        this.texture.needsUpdate = true;
      }
      super.applyChanges(changes);
    }
  }

  public getTexture<T extends THREE.Texture>(): T {
    if (this.texture === null || this._needUpdate) {
      this.needUpdate = false;
      this.unSubscribeRefer('referTexture');
      if (this.refer !== null) {
        if (this.refer instanceof TextureComponent) {
          this.texture = this.getTextureImage(this.refer.getImage(null), this.refer.getCubeImage(null), this.refer.getProgram(null));
          this.texture.repeat.copy(this.refer.getRepeat(1, 1));
          this.texture.offset.copy(this.refer.getOffset(0, 0));
        } else if (this.refer.getTexture && this.refer.textureSubscribe) {
          this.setReferTexture(this.refer.getTexture());
          this.subscribeRefer(
            'referTexture',
            this.refer.textureSubscribe().subscribe((texture) => {
              if (texture instanceof THREE.Texture) {
                this.setReferTexture(texture);
              } else {
                this.setReferTexture(this.refer.getTexture());
              }
            })
          );
        } else {
          this.texture = new THREE.Texture();
        }
      } else if (ThreeUtil.isNotNull(this.storageName)) {
        if (this.storageName.endsWith('.hdr') || this.storageName.endsWith('.exr')) {
          this.texture = new THREE.DataTexture(new Uint8Array( 6 ), 1, 1);
        } else if (this.storageName.endsWith('.ktx') || this.storageName.endsWith('.ktx2') || this.storageName.endsWith('.dds')) {
          this.texture = new THREE.CompressedTexture(null, 1, 1);
        } else {
          this.texture = new THREE.Texture();
        }
        this.localStorageService.getTexture(
          this.storageName,
          (texture) => {
            this.setTextureLoaded(texture);
          },
          this.storageOption
        );
      } else {
        if (ThreeUtil.isNotNull(this.canvas)) {
          const canvas = this.getCanvas();
          this.texture = new THREE.CanvasTexture(canvas);
          if (canvas instanceof HTMLCanvasElement) {
            canvas.addEventListener('needupdate', () => {
              this.texture.needsUpdate = true;
            })
          }
        } else if (ThreeUtil.isNotNull(this.perlin) && this.perlin.getPerlinGeometry) {
          this.texture = new THREE.CanvasTexture(this.perlin.getPerlinGeometry().getTexture(ThreeUtil.getVector3Safe(this.sunX, this.sunY, this.sunZ, new THREE.Vector3(1, 1, 1)), ThreeUtil.getColorSafe(this.color, 0x602000), ThreeUtil.getColorSafe(this.add, 0xe08060)));
        } else {
          this.texture = this.getTextureImage(this.getImage(null), this.getCubeImage(null), this.getProgram(null), () => {
            this.setTextureLoaded(this.texture);
          });
        }
        if (ThreeUtil.isNotNull(this.mapping)) {
          this.texture.mapping = ThreeUtil.getMappingSafe(this.mapping);
        }
      }
      this.applyMaterial();
      super.setObject(this.texture);
    }
    return this.texture as T;
  }
}
