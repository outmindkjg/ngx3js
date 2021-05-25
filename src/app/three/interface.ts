import { AfterViewInit, OnInit, Component, Injectable, Input } from '@angular/core';
import { MeshComponent } from './mesh/mesh.component';
import * as CHROMA from 'chroma-js';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { CameraComponent } from './camera/camera.component';
import { RendererComponent } from './renderer/renderer.component';
import { SceneComponent } from './scene/scene.component';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';

export { THREE };

export interface ApplyMatrix4 {
  applyMatrix4(matrix: THREE.Matrix4): any;
}

export interface LoadedObject {
  object?: THREE.Object3D;
  material?: THREE.Material | any;
  geometry?: THREE.BufferGeometry;
  texture?: THREE.Texture;
  clips?: THREE.AnimationClip[] | any;
  morphTargets?: THREE.BufferAttribute[];
  source?: any;
}

export interface GuiBaseControl {
  meshShape?: {
    visible: boolean;
    helperVisible: boolean;
    wireframe: boolean;
  };
  meshRotateOrg?: {
    x: number;
    y: number;
    z: number;
  };
  meshRotate?: {
    x: number;
    y: number;
    z: number;
    autoRotate: boolean;
    speed: number;
    reset: () => void;
    applyAutoRotate: () => void;
    update: () => void;
  };
  meshPositionOrg?: {
    x: number;
    y: number;
    z: number;
  };
  meshPosition?: {
    x: number;
    y: number;
    z: number;
    reset: () => void;
    update: () => void;
  };
  meshScaleOrg?: {
    x: number;
    y: number;
    z: number;
  };
  meshScale?: {
    x: number;
    y: number;
    z: number;
    reset: () => void;
    update: () => void;
  };
}

export interface InterfaceEffectComposer {
  resetEffectComposer(): void;
}

export interface InterfaceGetGeometry {
  getGeometry(): THREE.BufferGeometry;
  resetGeometry(clearGeometry: boolean);
}

export interface InterfaceComposerComponent {
  getWriteBuffer(
    webGLRenderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ): THREE.WebGLRenderTarget;
  getReadBuffer(
    webGLRenderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ): THREE.WebGLRenderTarget;
  getRenderTarget1(
    webGLRenderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ): THREE.WebGLRenderTarget;
  getRenderTarget2(
    webGLRenderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ): THREE.WebGLRenderTarget;
}

export interface InterfaceSvgGeometry {
  meshPositions: THREE.Vector3[];
  meshRotations: THREE.Euler[];
  meshScales: THREE.Vector3[];
  meshTranslations: THREE.BufferGeometry[];
  meshMaterials: (THREE.Material | THREE.Material[])[];
}

export interface InterfaceMeshComponent {
  resetMesh(clearMesh: boolean): void;
}

export interface TagAttributes {
  tag: string;
  attributes: { name: string; value: any }[];
  children?: { getTagAttribute: (options?: any) => TagAttributes }[];
  options?: any;
}

export interface CssStyle {
  innerHTML?: string;
  content?: string;
  position?: string;
  pointerEvents?: string;
  overflow?: string;
  zIndex?: number;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  transition?: string | string[];
  backgroundColor?: string | number | THREE.Color | THREE.Vector4;
  backgroundImage?: string;
  backgroundRepeat?: string;
  backgroundRepeatX?: string;
  backgroundRepeatY?: string;
  backgroundPosition?: string;
  backgroundPositionX?: number | string;
  backgroundPositionY?: number | string;
  backgroundSize?: number | string;
  backgroundSizeX?: number | string;
  backgroundSizeY?: number | string;
  backgroundClip?: string;
  padding?: number | string;
  paddingLeft?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  margin?: number | string;
  marginLeft?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  border?: number | string;
  borderColor?: string | number | THREE.Color | THREE.Vector4;
  borderStyle?: string;
  borderWidth?: number | string;
  borderRadius?: number | string;
  borderLeft?: number | string;
  borderTop?: number | string;
  borderRight?: number | string;
  borderBottom?: number | string;
  borderImage?: string;
  borderImageSource?: string;
  borderImageSlice?: string | number;
  borderImageOutset?: string | number;
  borderImageRepeat?: string;
  borderImageWidth?: number | string;
  opacity?: number;
  color?: string | number | THREE.Color | THREE.Vector4;
  fontFamily?: string;
  fontSize?: number | string;
  fontStyle?: string;
  fontWeight?: number | string;
  textAlign?: string;
  textTransform?: string;
  textDecoration?: string;
  letterSpacing?: string;
  textIndent?: number | string;
  textJustify?: string;
  textSizeAdjust?: string;
  whiteSpace?: string;
  wordBreak?: string;
  wordSpacing?: string;
  change?: (e?: any) => void;
  click?: (e?: any) => void;
  dblclick?: (e?: any) => void;
  focus?: (e?: any) => void;
  keyup?: (e?: any) => void;
  keydown?: (e?: any) => void;
  load?: (e?: any) => void;
  select?: (e?: any) => void;
  mousedown?: (e?: any) => void;
  mouseout?: (e?: any) => void;
  mouseover?: (e?: any) => void;
  mousemove?: (e?: any) => void;
  mouseup?: (e?: any) => void;
  innerHtml?: string;
  innerText?: string;
  className?: string;
  transform?: string | string[];
  transformOrigin?: string;
}

@Injectable()
export abstract class BaseComponent<T> implements OnInit, AfterViewInit {
  controls: T & GuiBaseControl;
  controlsParams: GuiControlParam[];
  constructor(controls: T, controlsParams: GuiControlParam[] = []) {
    this.controls = ThreeUtil.getControls(controls, this);
    this.setControlsParams(controlsParams);
  }

  setControlsParams(controlsParams: GuiControlParam[] = []) {
    this.controlsParams = ThreeUtil.getControlsParams(controlsParams, this);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.controls.meshRotate.applyAutoRotate();
  }

  public renderer: RendererComponent = null;

  setRender(renderer: RendererComponent) {
    this.renderer = renderer;
  }

  public scene: SceneComponent = null;

  setScene(scene: SceneComponent) {
    this.scene = scene;
  }

  public camera: CameraComponent = null;

  setCamera(camera: CameraComponent) {
    this.camera = camera;
  }

  public mesh: MeshComponent = null;
  protected meshChildren: THREE.Object3D[] = null;

  setMesh(mesh: MeshComponent) {
    this.mesh = mesh;
    if (this.mesh !== null) {
      const position = this.mesh.getPosition();
      this.controls.meshPositionOrg = {
        x: position.x,
        y: position.y,
        z: position.z,
      };
      this.controls.meshPosition.x = this.controls.meshPositionOrg.x;
      this.controls.meshPosition.y = this.controls.meshPositionOrg.y;
      this.controls.meshPosition.z = this.controls.meshPositionOrg.z;
      const scale = this.mesh.getScale();
      this.controls.meshScaleOrg = {
        x: scale.x,
        y: scale.y,
        z: scale.z,
      };
      this.controls.meshScale.x = this.controls.meshScaleOrg.x;
      this.controls.meshScale.y = this.controls.meshScaleOrg.y;
      this.controls.meshScale.z = this.controls.meshScaleOrg.z;
      const rotation = this.mesh.getRotation();
      this.controls.meshRotateOrg = {
        x: (rotation.x / Math.PI) * 180,
        y: (rotation.y / Math.PI) * 180,
        z: (rotation.z / Math.PI) * 180,
      };
      this.controls.meshRotate.x = this.controls.meshRotateOrg.x;
      this.controls.meshRotate.y = this.controls.meshRotateOrg.y;
      this.controls.meshRotate.z = this.controls.meshRotateOrg.z;
      if (this.controls.meshScale.x !== 1) {
        const controlsParams = ThreeUtil.getGuiControlParam(
          this.controlsParams,
          'Mesh Scale'
        );
        const minScale = this.controls.meshScale.x * 0.01;
        const maxScale = this.controls.meshScale.x * 1.5;
        const stepScale = (maxScale - minScale) / 30;
        controlsParams.children.forEach((child) => {
          if (ThreeUtil.isNotNull(child.controler['min'])) {
            child.controler['min'](minScale);
          }
          if (ThreeUtil.isNotNull(child.controler['max'])) {
            child.controler['max'](maxScale);
          }
          if (ThreeUtil.isNotNull(child.controler['step'])) {
            child.controler['step'](stepScale);
          }
        });
      }
      const controlsParams = ThreeUtil.getGuiControlParam(
        this.controlsParams,
        'Mesh Visible'
      );
      if (
        ThreeUtil.isNotNull(controlsParams) &&
        ThreeUtil.isNotNull(this.controls.meshShape)
      ) {
        this.controls.meshShape.visible = this.mesh.getMesh().visible;
        const helperParams = ThreeUtil.getGuiControlParam(
          controlsParams.children,
          'helperVisible'
        );
        const helper = this.mesh.helper;
        if (ThreeUtil.isNotNull(helper)) {
          if (helper instanceof THREE.SkeletonHelper) {
            helperParams.controler.name('Skeleton');
          } else {
            helperParams.controler.name('Helper');
          }
          this.controls.meshShape.helperVisible = helper.visible;
          ThreeUtil.setGuiEnabled(helperParams.controler, true);
        } else {
          this.controls.meshShape.helperVisible = false;
          helperParams.controler.name('Not Supported');
          ThreeUtil.setGuiEnabled(helperParams.controler, false);
        }
      }
      this.meshChildren = this.mesh.getMesh().children;
    }
  }

  onRender(timer: RendererTimer) {
    ThreeUtil.getControlsOnRender(timer, this);
  }
}

export class ThreeUtil {
  static cssInject(cssContent: string, id?: string, indoc?: any): boolean {
    const doc: Document = indoc || document;
    let cssParent: HTMLElement = doc.getElementsByTagName('head')[0];
    if (cssParent === null || cssParent == undefined) {
      cssParent = doc.getElementsByTagName('body')[0];
    }
    if (cssParent !== null && cssParent !== undefined) {
      if (id !== null && id !== undefined) {
        const oldcss = doc.getElementById(id);
        if (oldcss !== null && oldcss !== undefined) {
          oldcss.parentElement.removeChild(oldcss);
        }
      } else {
      }
      try {
        const injected = document.createElement('style');
        injected.type = 'text/css';
        if (id !== null && id !== undefined) {
          injected.id = id;
        }
        injected.innerHTML = cssContent;
        cssParent.appendChild(injected);
        return true;
      } catch (e) {}
    }
    return false;
  }

  static cssEject(id: string, indoc?: any): boolean {
    const doc: Document = indoc || document;
    const oldcss = doc.getElementById(id);
    if (oldcss !== null && oldcss !== undefined) {
      oldcss.parentElement.removeChild(oldcss);
      return true;
    } else {
      return false;
    }
  }

  static makeUUID(len: number, pre?: string) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var maxLen = characters.length;
    for (var i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * maxLen));
    }
    return (pre ? pre : 'tmp') + '_' + result;
  }

  static camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  static removeCssStyle(ele: HTMLElement, clazzName?: string): boolean {
    if (this.isNotNull(clazzName)) {
      this.cssEject(clazzName);
      if (ele.classList.contains(clazzName)) {
        ele.classList.remove(clazzName);
      }
      if (this.isNotNull(this._elementEvents[clazzName])) {
        const eleEvents = this._elementEvents[clazzName];
        Object.entries(eleEvents).forEach(([key, value]) => {
          ele.removeEventListener(key, value, false);
        });
        delete this._elementEvents[clazzName];
      }
    }
    return true;
  }
  static toggleCssStyle(
    ele: HTMLElement,
    clazzName?: string,
    isActive?: boolean
  ): boolean {
    if (this.isNotNull(clazzName)) {
      if (!isActive) {
        if (ele.classList.contains(clazzName)) {
          ele.classList.remove(clazzName);
        }
        if (this.isNotNull(this._elementEvents[clazzName])) {
          const eleEvents = this._elementEvents[clazzName];
          Object.entries(eleEvents).forEach(([key, value]) => {
            ele.removeEventListener(key, value, false);
          });
        }
      } else {
        if (!ele.classList.contains(clazzName)) {
          ele.classList.add(clazzName);
        }
        if (this.isNotNull(this._elementEvents[clazzName])) {
          const eleEvents = this._elementEvents[clazzName];
          Object.entries(eleEvents).forEach(([key, value]) => {
            ele.addEventListener(key, value, false);
          });
        }
      }
    }
    return true;
  }

  static getChildElementSave(parentEle: HTMLElement): HTMLElement {
    const ele: Node = parentEle.cloneNode(true);
    const childNodes: Node[] = [];
    ele.childNodes.forEach((child) => {
      childNodes.push(child);
    });
    childNodes.forEach((child) => {
      switch (child.nodeType) {
        case Node.ELEMENT_NODE:
          const childEle: HTMLElement = child as HTMLElement;
          switch (childEle.tagName) {
            case 'P':
            case 'DIV':
            case 'FONT':
            case 'SPAN':
            case 'IMG':
            case 'I':
            case 'B':
            case 'STRONG':
            case 'IFRAME':
            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
              break;
            default:
              ele.removeChild(childEle);
              break;
          }
          break;
        default:
          break;
      }
    });
    return ele as HTMLElement;
  }

  static addCssStyle(
    ele: HTMLElement,
    styles: string | CssStyle,
    clazzName?: string,
    classPrefix?: string,
    vertualClass?: string
  ): string {
    if (clazzName == null || clazzName == undefined) {
      clazzName = this.makeUUID(15, classPrefix);
    }
    if (typeof styles == 'string') {
      styles = {
        innerHtml: styles,
      };
    }
    if (styles === null || styles === undefined) {
      styles = {};
    }

    const eventList: { [key: string]: (e?: any) => void } = {};
    const styleList: { [key: string]: string } = {};

    Object.entries(styles).forEach(([key, value]) => {
      if (this.isNotNull(value)) {
        switch (key) {
          case 'change':
          case 'click':
          case 'dblclick':
          case 'focus':
          case 'keyup':
          case 'keydown':
          case 'load':
          case 'select':
          case 'mousedown':
          case 'mouseout':
          case 'mouseover':
          case 'mousemove':
          case 'mouseup':
            if (typeof value === 'function') {
              eventList[key] = value;
            } else {
              eventList[key] = null;
            }
            break;
          case 'innerHTML':
            ele.innerHTML = value;
            break;
          case 'innerText':
            ele.innerText = value;
            break;
          case 'textContent':
            ele.textContent = value;
            break;
          case 'zIndex':
          case 'opacity':
          case 'borderImageSlice':
            if (typeof value == 'number') {
              styleList[key] = value.toString();
            } else if (typeof value == 'string') {
              styleList[key] = parseFloat(value).toString();
            }
            break;
          case 'transition':
            if (typeof value === 'string' && value != '') {
              styleList[key] = value;
            } else if (value instanceof Array && value.length > 0) {
              styleList[key] = value.join(', ');
            }
            break;
          case 'color':
          case 'backgroundColor':
          case 'borderColor':
            if (typeof value == 'number' || typeof value == 'string') {
              styleList[key] = this.getColorSafe(value).getStyle();
            } else if (value instanceof THREE.Color) {
              styleList[key] = value.getStyle();
            } else if (value instanceof THREE.Vector4) {
              styleList[key] =
                'rgba(' +
                value.x * 255 +
                ',' +
                value.y * 255 +
                ',' +
                value.z * 255 +
                ',' +
                value.w +
                ')';
            }
            break;
          case 'transform':
            if (value instanceof Array) {
              if (value.length > 0) {
                styleList[key] = value.join(' ');
              }
            } else if (typeof value == 'string' && value !== '') {
              styleList[key] = value;
            }
            break;
          case 'backgroundImage':
          case 'borderImageSource':
            styleList[key] = 'url(' + value + ')';
            break;
          case 'content':
            if (typeof value == 'string' && value !== '') {
              styleList[key] = "'" + value + "'";
            }
            break;
          case 'position':
          case 'pointerEvents':
          case 'overflow':
          case 'width':
          case 'height':
          case 'minWidth':
          case 'minHeight':
          case 'maxWidth':
          case 'maxHeight':
          case 'left':
          case 'right':
          case 'top':
          case 'bottom':
          case 'borderWidth':
          case 'borderRadius':
          case 'backgroundRepeat':
          case 'backgroundRepeatX':
          case 'backgroundRepeatY':
          case 'backgroundPosition':
          case 'backgroundPositionX':
          case 'backgroundPositionY':
          case 'backgroundSize':
          case 'backgroundSizeX':
          case 'backgroundSizeY':
          case 'backgroundClip':
          case 'padding':
          case 'paddingLeft':
          case 'paddingTop':
          case 'paddingRight':
          case 'paddingBottom':
          case 'margin':
          case 'marginLeft':
          case 'marginTop':
          case 'marginRight':
          case 'marginBottom':
          case 'border':
          case 'borderStyle':
          case 'borderLeft':
          case 'borderTop':
          case 'borderRight':
          case 'borderBottom':
          case 'borderImage':
          case 'borderImageOutset':
          case 'borderImageRepeat':
          case 'borderImageWidth':
          case 'fontFamily':
          case 'fontSize':
          case 'fontStyle':
          case 'fontWeight':
          case 'textAlign':
          case 'textTransform':
          case 'textDecoration':
          case 'letterSpacing':
          case 'textIndent':
          case 'textJustify':
          case 'textSizeAdjust':
          case 'whiteSpace':
          case 'wordBreak':
          case 'wordSpacing':
          case 'transformOrigin':
            if (typeof value == 'number') {
              styleList[key] = value + 'px';
            } else if (typeof value == 'string') {
              styleList[key] = value;
            }
            break;
        }
      }
    });
    switch (vertualClass) {
      case 'inline':
        // ele.removeAttribute('style');
        Object.entries(styleList).forEach(([key, value]) => {
          ele.style[key] = value;
        });
        break;
      default:
        const cssStyleList: string[] = [];
        Object.entries(styleList).forEach(([key, value]) => {
          cssStyleList.push(this.camelCaseToDash(key) + ': ' + value);
        });
        this.cssInject(
          '.' +
            clazzName +
            (vertualClass ? ':' + vertualClass : '') +
            '{' +
            cssStyleList.join(';') +
            '}',
          clazzName
        );
        if (!ele.classList.contains(clazzName)) {
          ele.classList.add(clazzName);
        }
        break;
    }
    if (eventList != {}) {
      let eleEvents: { [key: string]: any } = null;
      if (this.isNotNull(this._elementEvents[clazzName])) {
        eleEvents = this._elementEvents[clazzName];
      } else {
        eleEvents = this._elementEvents[clazzName] = {};
      }
      Object.entries(eventList).forEach(([key, value]) => {
        const oldEvent = eleEvents[key];
        if (this.isNotNull(value) && oldEvent !== value) {
          if (this.isNotNull(oldEvent)) {
            ele.removeEventListener(key, oldEvent, false);
          }
          ele.addEventListener(key, value, false);
          eleEvents[key] = value;
        } else if (this.isNull(value) && this.isNotNull(oldEvent)) {
          ele.removeEventListener(key, oldEvent, false);
          delete eleEvents[key];
        }
      });
      this._elementEvents[clazzName] = eleEvents;
    }
    return clazzName;
  }

  private static _elementEvents: { [key: string]: { [key: string]: any } } = {};

  static getChromaScale(...scales): CHROMA.Scale {
    return CHROMA.scale(scales);
  }

  private static lastRenderer: THREE.Renderer;

  static setRenderer(lastRenderer: THREE.Renderer) {
    this.lastRenderer = lastRenderer;
  }

  static getRenderer(): THREE.Renderer {
    return this.lastRenderer;
  }

  private static renderTimer: RendererTimer;

  static render(renderTimer: RendererTimer) {
    if (this.renderTimer !== renderTimer) {
      this.renderTimer = renderTimer;
      // GSAP.update(renderTimer.elapsedTime * 1000);
      // TWEEN.update();
    }
  }
  static isNull(value: any): boolean {
    return value === null || value === undefined;
  }

  static isNotNull(value: any): boolean {
    return !this.isNull(value);
  }

  static getStoreUrl(url: string) {
    if (
      url.startsWith('/') ||
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url;
    } else {
      return '/assets/examples/' + url;
    }
  }

  private static _manager: THREE.LoadingManager = null;

  static getLoadingManager(): THREE.LoadingManager {
    if (this._manager === null) {
      this._manager = new THREE.LoadingManager(
        () => {
          console.log('loaded');
        },
        (url: string, loaded: number, total: number) => {
          console.log(url, loaded, total);
        },
        (url: string) => {
          console.error(url);
        }
      );
      this._manager.addHandler(/\.dds$/i, new DDSLoader());
    }
    return this._manager;
  }

  static getHtmlCode(info: TagAttributes, preTab: string = ''): string {
    const tag = info.tag;
    const attributes = info.attributes;
    const tags: string[] = [];
    tags.push(preTab + '<' + tag);
    attributes.forEach((attr) => {
      const key = attr.name;
      const value = attr.value;
      if (this.isNotNull(value)) {
        if (value instanceof THREE.Color) {
          tags.push(
            preTab + '\t[' + key + ']="\'#' + value.getHexString() + '\'"'
          );
        } else if (typeof value == 'number') {
          if (Math.round(value) !== value) {
            tags.push(
              preTab + '\t[' + key + ']="' + parseFloat(value.toFixed(4)) + '"'
            );
          } else {
            tags.push(preTab + '\t[' + key + ']="' + value + '"');
          }
        } else if (typeof value == 'string') {
          tags.push(preTab + '\t[' + key + ']="\'' + value + '\'"');
        }
      }
    });
    tags.push(preTab + '>');
    if (info.children && info.children.length > 0) {
      info.children.forEach((child) => {
        tags.push(
          this.getHtmlCode(child.getTagAttribute(info.options), preTab + '\t')
        );
      });
    }
    tags.push(preTab + '</' + tag + '>');
    return tags.join('\n');
  }

  static getColor(color: string | number | THREE.Color): THREE.Color {
    if (this.isNotNull(color)) {
      const colorStr = color.toString();
      if (colorStr.startsWith('0x')) {
        return new THREE.Color(parseInt(colorStr, 16));
      } else {
        return new THREE.Color(color);
      }
    }
    return undefined;
  }

  static getColorRGB(
    r: number,
    g: number,
    b: number,
    color?: string | number | THREE.Color
  ): THREE.Color {
    const colorObj = this.isNotNull(color)
      ? this.getColor(color)
      : new THREE.Color(0x000000);
    if (this.isNotNull(colorObj)) {
      return colorObj.setRGB(
        this.isNotNull(r) ? r : colorObj.r,
        this.isNotNull(g) ? g : colorObj.g,
        this.isNotNull(b) ? b : colorObj.b
      );
    }
    return undefined;
  }

  static getColorHSL(
    h?: number,
    s?: number,
    l?: number,
    color?: string | number | THREE.Color
  ): THREE.Color {
    const colorObj = this.isNotNull(color)
      ? this.getColor(color)
      : new THREE.Color(0x000000);
    if (this.isNotNull(colorObj)) {
      const hsl = colorObj.getHSL({ h: 0, s: 0, l: 0 });
      return colorObj.setHSL(
        this.isNotNull(h) ? h : hsl.h,
        this.isNotNull(s) ? s : hsl.s,
        this.isNotNull(l) ? l : hsl.l
      );
    }
    return undefined;
  }

  static getColorHex(color?: string | number | THREE.Color): number {
    const colorObj = this.getColor(color);
    if (this.isNotNull(colorObj)) {
      return colorObj.getHex();
    }
    return undefined;
  }

  static getColorHexString(color?: string | number | THREE.Color): string {
    const colorObj = this.getColor(color);
    if (this.isNotNull(colorObj)) {
      return colorObj.getHexString();
    }
    return undefined;
  }

  static getColorStyle(color?: string | number | THREE.Color): string {
    const colorObj = this.getColor(color);
    if (this.isNotNull(colorObj)) {
      return colorObj.getStyle();
    }
    return undefined;
  }

  static getColorMultiplySafe(
    color: string | number | THREE.Color,
    altColor?: string | number | THREE.Color,
    multiply?: number
  ): THREE.Color {
    const safeColor = this.getColorSafe(color, altColor);
    if (this.isNotNull(safeColor) && this.isNotNull(multiply)) {
      safeColor.multiplyScalar(multiply);
      if (safeColor.r < 0 || safeColor.r > 1) {
        safeColor.r = Math.min(1, Math.max(0, safeColor.r));
      }
      if (safeColor.g < 0 || safeColor.g > 1) {
        safeColor.g = Math.min(1, Math.max(0, safeColor.g));
      }
      if (safeColor.b < 0 || safeColor.b > 1) {
        safeColor.b = Math.min(1, Math.max(0, safeColor.b));
      }
    }
    return safeColor;
  }

  static getColorSafe(
    color: string | number | THREE.Color,
    altColor?: string | number | THREE.Color,
    nullColor?: string | number | THREE.Color
  ): THREE.Color {
    const defColor = this.isNotNull(color)
      ? color
      : this.isNotNull(altColor)
      ? altColor
      : nullColor;
    if (this.isNotNull(defColor)) {
      if (defColor instanceof THREE.Color) {
        return defColor;
      } else if (typeof defColor === 'string') {
        const colorStr: string = defColor;
        if (colorStr.startsWith('0x')) {
          return new THREE.Color(parseInt(colorStr, 16));
        } else if (colorStr.indexOf(':') > 0 || colorStr.indexOf('(') > 0) {
          let [type, val1, val2, val3] = (colorStr + ',,,')
            .replace('(', ',')
            .replace(')', ',')
            .replace(':', ',')
            .replace(/[^A-Za-z\-0-9\.,]/g, '')
            .split(',');
          switch (type.toLowerCase()) {
            case 'hsl':
              const h =
                this.isNotNull(val1) && val1 !== ''
                  ? parseFloat(val1)
                  : Math.random();
              const s =
                this.isNotNull(val2) && val2 !== ''
                  ? parseFloat(val2)
                  : Math.random();
              const l =
                this.isNotNull(val3) && val3 !== ''
                  ? parseFloat(val3)
                  : Math.random();
              return new THREE.Color().setHSL(h, s, l);
            case 'rgb':
              const r =
                this.isNotNull(val1) && val1 !== ''
                  ? parseFloat(val1)
                  : Math.random() * 255;
              const g =
                this.isNotNull(val2) && val2 !== ''
                  ? parseFloat(val2)
                  : Math.random() * 255;
              const b =
                this.isNotNull(val3) && val3 !== ''
                  ? parseFloat(val3)
                  : Math.random() * 255;
              return new THREE.Color(r / 255, g / 255, b / 255);
          }
        }
      }
      return new THREE.Color(defColor);
    }
    return undefined;
  }

  static getColorAlphaSafe(
    color: string | number | THREE.Color,
    alpha: number,
    altColor?: string | number | THREE.Color
  ): THREE.Color | THREE.Vector4 {
    const defColor = this.getColorSafe(color, altColor);
    if (this.isNotNull(defColor)) {
      if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
        return new THREE.Vector4(defColor.r, defColor.g, defColor.b, alpha);
      } else {
        return defColor;
      }
    } else if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
      return new THREE.Vector4(0, 0, 0, alpha);
    }
    return undefined;
  }

  static getTypeSafe<T>(value: T, altValue?: T, nullValue?: T): T {
    const defValue = this.isNotNull(value) ? value : altValue;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    if (this.isNotNull(nullValue)) {
      return nullValue;
    } else {
      return undefined;
    }
  }

  static getAngleSafe(angle: number | string, altangle?: number): number {
    const defValue = this.getTypeSafe(angle, altangle);
    if (this.isNotNull(defValue)) {
      if (typeof angle === 'string') {
        return Math.random() * 2 * Math.PI;
      } else {
        return ((defValue as number) / 180) * Math.PI;
      }
    }
    return undefined;
  }

  static getAngle2RadianSafe(angle: number, altangle?: number): number {
    const defValue = this.getTypeSafe(angle, altangle);
    if (this.isNotNull(defValue)) {
      return (defValue / 180) * Math.PI;
    }
    return undefined;
  }

  static getRadian2AngleSafe(angle: number, altangle?: number): number {
    const defValue = this.getTypeSafe(angle, altangle);
    if (this.isNotNull(defValue)) {
      return (defValue / Math.PI) * 180;
    }
    return undefined;
  }

  static getVector2VSafe(
    v2: number[] | THREE.Vector2,
    altValue?: THREE.Vector2
  ): THREE.Vector2 {
    if (v2 instanceof THREE.Vector2) {
      return v2;
    } else if (this.isNotNull(v2) && v2.length >= 2) {
      return this.getVector2Safe(v2[0], v2[1], altValue);
    }
    return undefined;
  }

  static getVector2Safe(
    x: number,
    y: number,
    altValue?: THREE.Vector2,
    v2?: number[] | THREE.Vector2
  ): THREE.Vector2 {
    const defValue =
      this.isNotNull(x) || this.isNotNull(y)
        ? new THREE.Vector2(this.getTypeSafe(x, y), this.getTypeSafe(y, x))
        : null;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    if (this.isNotNull(v2)) {
      return this.getVector2VSafe(v2, altValue);
    }
    if (this.isNotNull(altValue)) {
      return altValue;
    }
    return undefined;
  }

  static getVector3VSafe(
    v3: number[] | THREE.Vector3,
    altValue?: THREE.Vector3
  ): THREE.Vector3 {
    if (v3 instanceof THREE.Vector3) {
      return v3;
    } else if (this.isNotNull(v3) && v3.length >= 3) {
      return this.getVector3Safe(v3[0], v3[1], v3[2], altValue);
    }
    return undefined;
  }

  static getVector3Safe(
    x: number,
    y: number,
    z: number,
    altValue?: THREE.Vector3,
    v3?: number[] | THREE.Vector3
  ): THREE.Vector3 {
    const defValue =
      this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z)
        ? new THREE.Vector3(
            this.getTypeSafe(x, y, z),
            this.getTypeSafe(y, z, x),
            this.getTypeSafe(z, x, y)
          )
        : null;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    if (this.isNotNull(v3)) {
      return this.getVector3VSafe(v3, altValue);
    }
    if (this.isNotNull(altValue)) {
      return altValue;
    }
    return undefined;
  }

  static getEulerSafe(
    x: number | string,
    y: number | string,
    z: number | string,
    altValue?: THREE.Euler
  ): THREE.Euler {
    const defValue =
      this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z)
        ? new THREE.Euler(
            this.getAngleSafe(this.getTypeSafe(x, y, z), 0),
            this.getAngleSafe(this.getTypeSafe(y, x, z), 0),
            this.getAngleSafe(this.getTypeSafe(z, x, y), 0)
          )
        : altValue;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    return undefined;
  }

  static getWrappingSafe(
    baseWrap: string,
    altWrap?: string,
    def?: string
  ): THREE.Wrapping {
    const wrap = this.getTypeSafe(baseWrap, altWrap, def || '');
    switch (wrap.toLowerCase()) {
      case 'repeatwrapping':
      case 'repeat':
        return THREE.RepeatWrapping;
      case 'mirroredrepeatwrapping':
      case 'mirroredrepeat':
        return THREE.MirroredRepeatWrapping;
      case 'clamptoedgewrapping':
      case 'clamptoedge':
      default:
        return THREE.ClampToEdgeWrapping;
    }
  }

  static getTextureFilterSafe(
    baseFilter: string,
    altFilter?: string,
    def?: string
  ): THREE.TextureFilter {
    const filter = this.getTypeSafe(baseFilter, altFilter, def || '');
    switch (filter.toLowerCase()) {
      case 'nearestfilter':
      case 'nearest':
        return THREE.NearestFilter;
      case 'nearestmipmapnearestfilter':
      case 'nearestmipmapnearest':
        return THREE.NearestMipmapNearestFilter;
      case 'nearestmipmaplinearfilter':
      case 'nearestmipmaplinear':
        return THREE.NearestMipmapLinearFilter;
      case 'linearmipmapnearestfilter':
      case 'linearmipmapnearest':
        return THREE.LinearMipmapNearestFilter;
      case 'linearmipmaplinearfilter':
      case 'linearmipmaplinear':
        return THREE.LinearMipmapLinearFilter;
      case 'linearfilter':
      case 'linear':
      default:
        return THREE.LinearFilter;
    }
  }

  static getBlendingSafe(
    baseBlending: string,
    altBlending?: string,
    def?: string
  ): THREE.Blending {
    const blending = this.getTypeSafe(baseBlending, altBlending, def || '');
    switch (blending.toLowerCase()) {
      case 'noblending':
      case 'no':
        return THREE.NoBlending;
      case 'normalblending':
      case 'normal':
        return THREE.NormalBlending;
      case 'additiveblending':
      case 'additive':
        return THREE.AdditiveBlending;
      case 'subtractiveblending':
      case 'subtractive':
        return THREE.SubtractiveBlending;
      case 'multiplyblending':
      case 'multiply':
        return THREE.MultiplyBlending;
      case 'customblending':
      case 'custom':
        return THREE.CustomBlending;
    }
    return undefined;
  }

  static getPixelFormatSafe(
    baseFormat: string,
    altFormat?: string,
    def?: string
  ): THREE.PixelFormat {
    const format = this.getTypeSafe(baseFormat, altFormat, def || '');
    switch (format.toLowerCase()) {
      case 'alphaformat':
      case 'alpha':
        return THREE.AlphaFormat;
      case 'redformat':
      case 'red':
        return THREE.RedFormat;
      case 'redintegerformat':
      case 'redinteger':
        return THREE.RedIntegerFormat;
      case 'rgformat':
      case 'rg':
        return THREE.RGFormat;
      case 'rgintegerformat':
      case 'rginteger':
        return THREE.RGIntegerFormat;
      case 'rgbformat':
      case 'rgb':
        return THREE.RGBFormat;
      case 'rgbintegerformat':
      case 'rgbinteger':
        return THREE.RGBIntegerFormat;
      case 'rgbaintegerformat':
      case 'rgbainteger':
        return THREE.RGBAIntegerFormat;
      case 'luminanceformat':
      case 'luminance':
        return THREE.LuminanceFormat;
      case 'luminancealphaformat':
      case 'luminancealpha':
        return THREE.LuminanceAlphaFormat;
      case 'rgbeformat':
      case 'rgbe':
        return THREE.RGBEFormat;
      case 'depthformat':
      case 'depth':
        return THREE.DepthFormat;
      case 'depthstencilformat':
      case 'depthstencil':
        return THREE.DepthStencilFormat;
      case 'rgbaformat':
      case 'rgba':
        return THREE.RGBAFormat;
      default:
        break;
    }
    return undefined;
  }

  static getTextureDataTypeSafe(
    baseFormat: string,
    altFormat?: string,
    def?: string
  ): THREE.TextureDataType {
    const type = this.getTypeSafe(baseFormat, altFormat, def || '');
    switch (type.toLowerCase()) {
      case 'bytetype':
      case 'byte':
        return THREE.ByteType;
      case 'shorttype':
      case 'short':
        return THREE.ShortType;
      case 'unsignedshorttype':
      case 'unsignedshort':
        return THREE.UnsignedShortType;
      case 'inttype':
      case 'int':
        return THREE.IntType;
      case 'unsignedinttype':
      case 'unsignedint':
        return THREE.UnsignedIntType;
      case 'floattype':
      case 'float':
        return THREE.FloatType;
      case 'halffloattype':
      case 'halffloat':
        return THREE.HalfFloatType;
      case 'unsignedshort4444type':
      case 'unsignedshort4444':
        return THREE.UnsignedShort4444Type;
      case 'unsignedshort5551type':
      case 'unsignedshort5551':
        return THREE.UnsignedShort5551Type;
      case 'unsignedshort565type':
      case 'unsignedshort565':
        return THREE.UnsignedShort565Type;
      case 'unsignedint248type':
      case 'unsignedint248':
        return THREE.UnsignedInt248Type;
      case 'unsignedbytetype':
      case 'unsignedbyte':
      default:
        return THREE.UnsignedByteType;
    }
  }

  static getTextureEncodingSafe(
    baseEncoding: string,
    altEncoding?: string,
    def?: string
  ): THREE.TextureEncoding {
    const encoding = this.getTypeSafe(baseEncoding, altEncoding, def || '');
    switch (encoding.toLowerCase()) {
      case 'srgbencoding':
      case 'srgb':
        return THREE.sRGBEncoding;
      case 'gammaencoding':
      case 'gamma':
        return THREE.GammaEncoding;
      case 'rgbeencoding':
      case 'rgbe':
        return THREE.RGBEEncoding;
      case 'logluvencoding':
      case 'logluv':
        return THREE.LogLuvEncoding;
      case 'rgbm7encoding':
      case 'rgbm7':
        return THREE.RGBM7Encoding;
      case 'rgbm16encoding':
      case 'rgbm16':
        return THREE.RGBM16Encoding;
      case 'rgbdencoding':
      case 'rgbd':
        return THREE.RGBDEncoding;
      case 'linearencoding':
      case 'linear':
        return THREE.LinearEncoding;
      default:
        break;
    }
    return undefined;
  }

  static getMappingSafe(
    baseMapping: string,
    altMapping?: string,
    def?: string
  ): THREE.Mapping {
    const mapping = this.getTypeSafe(baseMapping, altMapping, def || '');
    switch (mapping.toLowerCase()) {
      case 'uvmapping':
      case 'uv':
        return THREE.UVMapping;
      case 'cubereflectionmapping':
      case 'cubereflection':
        return THREE.CubeReflectionMapping;
      case 'cuberefractionmapping':
      case 'cuberefraction':
        return THREE.CubeRefractionMapping;
      case 'equirectangularreflectionmapping':
      case 'equirectangularreflection':
        return THREE.EquirectangularReflectionMapping;
      case 'equirectangularrefractionmapping':
      case 'equirectangularrefraction':
        return THREE.EquirectangularRefractionMapping;
      case 'cubeuvreflectionmapping':
      case 'cubeuvreflection':
        return THREE.CubeUVReflectionMapping;
      case 'cubeuvrefractionmapping':
      case 'cubeuvrefraction':
        return THREE.CubeUVRefractionMapping;
      default:
        return THREE.Texture.DEFAULT_MAPPING;
    }
  }

  static getCubeImage(cubeImage: string[]): string[] {
    if (
      ThreeUtil.isNotNull(cubeImage) &&
      cubeImage.length !== 6 &&
      cubeImage.length >= 1
    ) {
      const prefix = cubeImage[0];
      const postfix = cubeImage[1] || 'png';
      const prefix1 = cubeImage[2] || 'p';
      const prefix2 = cubeImage[3] || 'n';
      return [
        prefix + prefix1 + 'x.' + postfix,
        prefix + prefix2 + 'x.' + postfix,
        prefix + prefix1 + 'y.' + postfix,
        prefix + prefix2 + 'y.' + postfix,
        prefix + prefix1 + 'z.' + postfix,
        prefix + prefix2 + 'z.' + postfix,
      ];
    } else {
      return cubeImage;
    }
  }

  static getClock(autoStart?: boolean): ThreeClock {
    return new ThreeClock(autoStart);
  }

  static stats: ThreeStats = null;

  static getStats(style?: object): ThreeStats {
    return new ThreeStats(style);
  }

  static getControls<T>(
    param: T,
    component: { mesh?: MeshComponent; controls?: any; controlsParams?: any }
  ): T & GuiBaseControl {
    const baseControl: GuiBaseControl = {
      meshShape: {
        visible: true,
        helperVisible: false,
        wireframe: false,
      },
      meshRotate: {
        x: 0,
        y: 0,
        z: 0,
        autoRotate: false,
        speed: 10,
        reset: () => {
          if (
            this.isNotNull(component.controls) &&
            this.isNotNull(component.controls.meshRotate) &&
            this.isNotNull(component.controls.meshRotateOrg)
          ) {
            component.controls.meshRotate.x =
              component.controls.meshRotateOrg.x;
            component.controls.meshRotate.y =
              component.controls.meshRotateOrg.y;
            component.controls.meshRotate.z =
              component.controls.meshRotateOrg.z;
            component.controls.meshRotate.autoRotate = true;
            component.controls.meshRotate.applyAutoRotate();
            component.controls.meshRotate.update();
          }
        },
        applyAutoRotate: () => {
          if (this.isNotNull(component.controlsParams)) {
            const controlsParams = this.getGuiControlParam(
              component.controlsParams,
              'Mesh Rotation'
            );
            if (this.isNotNull(controlsParams)) {
              if (component.controls.meshRotate.autoRotate) {
                this.setGuiEnabled(controlsParams.children[1].controler, false);
                this.setGuiEnabled(controlsParams.children[4].controler, true);
              } else {
                if (this.isNotNull(component.mesh)) {
                  const meshRotate = component.mesh.getRotation();
                  component.controls.meshRotate.x =
                    ((meshRotate.x / Math.PI) * 180) % 360;
                  component.controls.meshRotate.y =
                    ((meshRotate.y / Math.PI) * 180) % 360;
                  component.controls.meshRotate.z =
                    ((meshRotate.z / Math.PI) * 180) % 360;
                }
                this.setGuiEnabled(controlsParams.children[1].controler, true);
                this.setGuiEnabled(controlsParams.children[4].controler, false);
              }
            }
          }
        },
        update: () => {
          if (
            this.isNotNull(component.mesh) &&
            this.isNotNull(component.controls.meshRotate)
          ) {
            component.mesh.setRotation(
              component.controls.meshRotate.x,
              component.controls.meshRotate.autoRotate
                ? null
                : component.controls.meshRotate.y,
              component.controls.meshRotate.z
            );
          }
        },
      },
      meshPosition: {
        x: 0,
        y: 0,
        z: 0,
        reset: () => {
          if (
            this.isNotNull(component.controls) &&
            this.isNotNull(component.controls.meshPosition) &&
            this.isNotNull(component.controls.meshPositionOrg)
          ) {
            component.controls.meshPosition.x =
              component.controls.meshPositionOrg.x;
            component.controls.meshPosition.y =
              component.controls.meshPositionOrg.y;
            component.controls.meshPosition.z =
              component.controls.meshPositionOrg.z;
            component.controls.meshPosition.update();
          }
        },
        update: () => {
          if (
            this.isNotNull(component.mesh) &&
            this.isNotNull(component.controls.meshPosition)
          ) {
            component.mesh.setPosition(
              component.controls.meshPosition.x,
              component.controls.meshPosition.y,
              component.controls.meshPosition.z
            );
          }
        },
      },
      meshScale: {
        x: 1,
        y: 1,
        z: 1,
        reset: () => {
          if (
            this.isNotNull(component.controls) &&
            this.isNotNull(component.controls.meshScale) &&
            this.isNotNull(component.controls.meshScaleOrg)
          ) {
            component.controls.meshScale.x = component.controls.meshScaleOrg.x;
            component.controls.meshScale.y = component.controls.meshScaleOrg.y;
            component.controls.meshScale.z = component.controls.meshScaleOrg.z;
            component.controls.meshScale.update();
          }
        },
        update: () => {
          if (
            this.isNotNull(component.mesh) &&
            this.isNotNull(component.controls.meshScale)
          ) {
            component.mesh.setScale(
              component.controls.meshScale.x,
              component.controls.meshScale.y,
              component.controls.meshScale.z
            );
          }
        },
      },
    };
    return Object.assign(param, baseControl);
  }

  static getControlsParams(
    params: GuiControlParam[],
    component: { mesh?: MeshComponent; controls?: any; controlsParams?: any }
  ): GuiControlParam[] {
    params.push({
      name: 'Mesh Visible',
      type: 'folder',
      control: 'meshShape',
      children: [
        {
          name: 'visible',
          type: 'checkbox',
          listen: true,
          change: () => {
            if (this.isNotNull(component.mesh)) {
              component.mesh.setVisible(
                component.controls.meshShape.visible,
                null
              );
            }
          },
        },
        {
          name: 'helperVisible',
          type: 'checkbox',
          listen: true,
          change: () => {
            if (this.isNotNull(component.mesh)) {
              component.mesh.setVisible(
                null,
                component.controls.meshShape.helperVisible
              );
            }
          },
        },
        {
          name: 'wireframe',
          type: 'checkbox',
          listen: true,
          change: () => {
            if (this.isNotNull(component.mesh)) {
              component.mesh.setWireFrame(
                component.controls.meshShape.wireframe
              );
            }
          },
        },
      ],
      isOpen: false,
    });
    params.push({
      name: 'Mesh Rotation',
      type: 'folder',
      control: 'meshRotate',
      children: [
        {
          name: 'x',
          type: 'number',
          min: -360,
          max: 360,
          step: 5,
          listen: true,
          change: () => {
            component.controls.meshRotate.update();
          },
        },
        {
          name: 'y',
          type: 'number',
          min: -360,
          max: 360,
          step: 5,
          listen: true,
          change: () => {
            component.controls.meshRotate.update();
          },
        },
        {
          name: 'z',
          type: 'number',
          min: -360,
          max: 360,
          step: 5,
          listen: true,
          change: () => {
            component.controls.meshRotate.update();
          },
        },
        {
          name: 'autoRotate',
          type: 'checkbox',
          title: 'Auto Rotation',
          listen: true,
          change: () => {
            component.controls.meshRotate.applyAutoRotate();
          },
        },
        {
          name: 'speed',
          type: 'number',
          min: -90,
          max: 90,
          step: 1,
          listen: true,
          title: 'Auto DegPSec',
        },
        { name: 'reset', type: 'button', title: 'Reset Rotation' },
      ],
      isOpen: false,
    });
    params.push({
      name: 'Mesh Position',
      type: 'folder',
      control: 'meshPosition',
      children: [
        {
          name: 'x',
          type: 'number',
          min: -3,
          max: 3,
          step: 0.01,
          listen: true,
          change: () => {
            component.controls.meshPosition.update();
          },
        },
        {
          name: 'y',
          type: 'number',
          min: -3,
          max: 3,
          step: 0.01,
          listen: true,
          change: () => {
            component.controls.meshPosition.update();
          },
        },
        {
          name: 'z',
          type: 'number',
          min: -3,
          max: 3,
          step: 0.01,
          listen: true,
          change: () => {
            component.controls.meshPosition.update();
          },
        },
        { name: 'reset', type: 'button', title: 'Reset Position' },
      ],
      isOpen: false,
    });
    params.push({
      name: 'Mesh Scale',
      type: 'folder',
      control: 'meshScale',
      children: [
        {
          name: 'x',
          type: 'number',
          min: 0.001,
          max: 5,
          step: 0.001,
          listen: true,
          change: () => {
            component.controls.meshScale.update();
          },
        },
        {
          name: 'y',
          type: 'number',
          min: 0.001,
          max: 5,
          step: 0.001,
          listen: true,
          change: () => {
            component.controls.meshScale.update();
          },
        },
        {
          name: 'z',
          type: 'number',
          min: 0.001,
          max: 5,
          step: 0.001,
          listen: true,
          change: () => {
            component.controls.meshScale.update();
          },
        },
        { name: 'reset', type: 'button', title: 'Reset Scale' },
      ],
      isOpen: false,
    });
    return params;
  }

  static getControlsOnRender(
    timer: RendererTimer,
    component: {
      mesh?: MeshComponent;
      controls?: GuiBaseControl;
      controlsParams?: any;
    }
  ) {
    if (this.isNotNull(component.controls) && this.isNotNull(component.mesh)) {
      if (
        component.controls.meshRotate.autoRotate &&
        component.controls.meshRotate.speed !== 0
      ) {
        component.mesh.addRotation(
          0,
          component.controls.meshRotate.speed * timer.delta,
          0
        );
      }
    }
  }

  static setupGuiChange(
    control: ThreeGuiController,
    onFinishChange?: (value?: any) => void,
    onChange?: (value?: any) => void,
    listen?: boolean,
    title?: string
  ): ThreeGuiController {
    if (listen != null && listen !== undefined && listen) {
      control.listen();
    }
    if (onFinishChange != null && onFinishChange !== undefined) {
      control.onFinishChange(onFinishChange);
    }
    if (onChange != null && onChange !== undefined) {
      control.onChange(onChange);
    }
    if (title != null && title !== undefined) {
      control.name(title);
    }

    return control;
  }

  static setGuiEnabled(control: ThreeGuiController, isEnable: boolean = true) {
    if (control !== null && control !== undefined && control.domElement) {
      const parentElement = control.domElement.parentElement.parentElement;
      const previousElementSibling = control.domElement.previousElementSibling;
      if (isEnable) {
        if (parentElement) {
          parentElement.classList.remove('no-pointer-events');
        }
        if (previousElementSibling) {
          previousElementSibling.classList.remove('control-disabled');
        }
      } else {
        if (parentElement) {
          parentElement.classList.add('no-pointer-events');
        }
        if (previousElementSibling) {
          previousElementSibling.classList.add('control-disabled');
        }
      }
    } else {
      console.log('error', control);
    }
  }

  static getGuiControlParam(
    children: GuiControlParam[],
    name: string
  ): GuiControlParam {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.name === name) {
        return child;
      }
      if (
        child.type === 'folder' &&
        child.children &&
        child.children.length > 0
      ) {
        const foundChild = this.getGuiControlParam(child.children, name);
        if (foundChild !== null) {
          return foundChild;
        }
      }
    }
    return null;
  }

  static setupGui(
    control,
    gui: ThreeGuiController,
    params: GuiControlParam[]
  ): ThreeGuiController {
    params.forEach((param) => {
      switch (param.type) {
        case 'color':
          param.controler = this.setupGuiChange(
            gui.addColor(
              param.control ? control[param.control] : control,
              param.name
            ),
            param.finishChange,
            param.change,
            param.listen,
            param.title
          );
          break;
        case 'folder':
          const folder = gui.addFolder(param.name);
          param.controler = this.setupGui(
            param.control ? control[param.control] : control,
            folder,
            param.children
          );
          if (param.isOpen) {
            folder.open();
          }
          break;
        case 'number':
          param.controler = this.setupGuiChange(
            gui.add(
              param.control ? control[param.control] : control,
              param.name,
              param.min,
              param.max,
              param.step
            ),
            param.finishChange,
            param.change,
            param.listen,
            param.title
          );
          break;
        case 'listen':
          param.controler = gui
            .add(param.control ? control[param.control] : control, param.name)
            .listen();
          break;
        case 'select':
          param.controler = this.setupGuiChange(
            gui.add(
              param.control ? control[param.control] : control,
              param.name,
              param.select
            ),
            param.finishChange,
            param.change,
            param.listen,
            param.title
          );
          break;
        case 'button':
        default:
          param.controler = this.setupGuiChange(
            gui.add(
              param.control ? control[param.control] : control,
              param.name
            ),
            param.finishChange,
            param.change,
            param.listen,
            param.title
          );
          break;
      }
    });
    return gui;
  }
}

export interface RendererTimer {
  delta: number;
  elapsedTime: number;
}

export interface RendererInfo {
  timer: RendererTimer;
  innerWidth: number;
  innerHeight: number;
  renderer: THREE.Renderer;
  cssRenderer: any;
  cameras: THREE.Camera[];
  scenes: THREE.Scene[];
}

export interface RendererEvent {
  type: string;
  clientX?: number;
  clientY?: number;
  offsetX?: number;
  offsetY?: number;
  rateX?: number;
  rateY?: number;
  width?: number;
  height?: number;
  mouse?: THREE.Vector2;
  event: any;
}

export class ThreeClock extends THREE.Clock {
  getTimer(): RendererTimer {
    const delta = this.getDelta();
    const elapsedTime = this.getElapsedTime();
    return {
      delta: delta,
      elapsedTime: elapsedTime,
    };
  }
}

export class ThreeStats implements Stats {
  REVISION: number;
  stats: Stats = null;
  dom: HTMLDivElement;
  domElement: HTMLDivElement;
  constructor(style?: object) {
    this.stats = Stats();
    this.domElement = this.dom = this.stats.dom;
    this.REVISION = this.stats.REVISION;
    this.setStyle(style);
  }

  setStyle(style: object) {
    if (style !== null && style !== undefined) {
      Object.entries(style).forEach(([key, value]) => {
        this.stats.dom.style[key] = value;
      });
    }
  }

  addPanel(panel: Stats.Panel): Stats.Panel {
    return this.stats.addPanel(panel);
  }

  showPanel(id: number): void {
    this.stats.showPanel(id);
  }

  begin(): void {
    this.stats.begin();
  }

  end(): void {
    this.stats.end();
  }

  update(): void {
    this.stats.update();
  }

  setMode(id: number): void {
    this.stats.setMode(id);
  }
}

export interface GuiControlParam {
  name: string;
  type?:
    | 'number'
    | 'folder'
    | 'select'
    | 'folder'
    | 'button'
    | 'color'
    | 'checkbox'
    | 'input'
    | 'listen'
    | 'auto';
  min?: number;
  max?: number;
  step?: number;
  select?: string[] | { [key: string]: any };
  control?: string;
  listen?: boolean;
  isOpen?: boolean;
  title?: string;
  change?: (value?: any) => void;
  finishChange?: (value?: any) => void;
  children?: GuiControlParam[];
  controler?: ThreeGuiController;
}

@Component({
	template: '',
})
export abstract class ThreeGeometryCustom  {

  @Input() scale : number = null;

  protected geometry : THREE.BufferGeometry = null;

  initGeometry():THREE.BufferGeometry {
    return new THREE.BufferGeometry();
  }

  setGeometry(geometry : THREE.BufferGeometry) {
    if (ThreeUtil.isNotNull(this.scale)) {
      const scale = ThreeUtil.getTypeSafe(this.scale,1);
      geometry.scale(scale,scale,scale);
    }
    this.geometry = geometry;
  }

  getGeometry():THREE.BufferGeometry {
    if (this.geometry == null) {
      this.setGeometry(this.initGeometry());
    }
    return this.geometry;
  }


}


export class ThreeGui implements ThreeGuiController {
  gui: GUI = null;
  domElement: HTMLElement;
  static customCss: string =
    '.no-pointer-events {pointer-events: none;}.control-disabled {color: #888;text-decoration: line-through;}';

  constructor(
    style?: any,
    pars?: {
      closeOnTop?: boolean;
      autoPlace?: boolean;
      width?: number;
    }
  ) {
    if (style instanceof GUI) {
      this.gui = style;
      this.domElement = this.gui.domElement;
    } else {
      this.gui = new GUI(pars);
      this.domElement = this.gui.domElement;
      this.setStyle(style);
    }
  }

  setStyle(style: object): this {
    if (style !== null && style !== undefined) {
      const domElement = this.domElement;
      Object.entries(style).forEach(([key, value]) => {
        domElement.style[key] = value;
      });
    }
    if (ThreeGui.customCss !== null) {
      ThreeUtil.cssInject(ThreeGui.customCss);
      ThreeGui.customCss = null;
    }
    return this;
  }

  addColor(object: any, property: string): ThreeGuiController {
    return this.gui.addColor(object, property);
  }

  addFolder(name: string): ThreeGuiController {
    return this.gui.addFolder(name);
  }

  add(
    object: any,
    property: string,
    option1?: any,
    options2?: any,
    options3?: any
  ): ThreeGuiController {
    return this.gui.add(object, property, option1, options2, options3);
  }

  destroy() {
    this.gui.destroy();
    return this;
  }

  removeFolder(folder): this {
    this.gui.removeFolder(folder);
    return this;
  }

  listen(): this {
    this.gui.listen();
    return this;
  }

  name(name: string): this {
    this.gui.name(name);
    return this;
  }

  onFinishChange(callBack: (e: any) => void): this {
    this.gui.onFinishChange(callBack);
    return this;
  }

  onChange(callBack: (e: any) => void): this {
    this.gui.onChange(callBack);
    return this;
  }

  open(): this {
    this.gui.open();
    return this;
  }

  close(): this {
    this.gui.close();
    return this;
  }

  hide(): this {
    this.gui.hide();
    return this;
  }

  show(): this {
    this.gui.show();
    return this;
  }

  remove(controller): this {
    this.gui.remove(controller);
    return this;
  }
}

export interface ThreeGuiController {
  domElement?: HTMLElement;
  add(object, property: string, min?: any, max?, step?): ThreeGuiController;
  addColor(object, property: string): ThreeGuiController;
  remove(controller): this;
  destroy(): this;
  addFolder(name: string): ThreeGuiController;
  removeFolder(folder): this;
  listen(): this;
  onFinishChange(callBack: (e: any) => void): this;
  onChange(callBack: (e: any) => void): this;
  name(name: string): this;
  open(): this;
  close(): this;
  hide(): this;
  show(): this;
}
