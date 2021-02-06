import { HtmlComponent } from './html/html.component';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import * as CHROMA from 'chroma-js';
import * as GSAP from 'gsap';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { TweenComponent } from './tween/tween.component';

// import { ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";

export interface ApplyMatrix4 {
  applyMatrix4(matrix: THREE.Matrix4): any;
}

export interface LoadedObject {
  object?: THREE.Object3D;
  material?: THREE.Material | any;
  geometry?: THREE.BufferGeometry;
  clips?: THREE.AnimationClip[];
}

export interface AbstractEffectComposer {
  resetEffectComposer(): void;
}

@Component({
  template: '',
})
export abstract class AbstractThreeComponent
  implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() tweenStart: boolean = true;

  @ContentChildren(TweenComponent, { descendants: false })
  tween: QueryList<TweenComponent>;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.tweenStart && this.tweenTarget) {
      this.resetTween();
    }
  }

  ngAfterContentInit(): void {
    if (this.tween !== null && this.tween !== undefined) {
      this.tween.changes.subscribe((e) => {
        this.resetTween();
      });
    }
  }

  private tweenTarget: any = null;
  private tweenTimer: GSAP.TimelineLite | GSAP.TimelineMax = null;
  setTweenTarget(tweenTarget: any) {
    if (this.tweenTarget !== tweenTarget) {
      this.tweenTarget = tweenTarget;
      this.resetTween();
    }
  }

  resetTween() {
    if (
      this.tweenTarget !== null &&
      this.tween !== null &&
      this.tween.length > 0 &&
      this.tweenStart
    ) {
      this.tweenTimer = new GSAP.TimelineLite();
      this.tween.forEach((tween) => {
        tween.getTween(this.tweenTimer, this.tweenTarget, this);
      });
      this.tweenTimer.play();
    } else if (this.tweenTimer !== null) {
      this.tweenTimer.kill();
      this.tweenTimer = null;
    }
  }

  ngOnDestroy(): void {}
}

export abstract class AbstractGetGeometry extends AbstractThreeComponent {
  abstract getGeometry(): THREE.BufferGeometry;
  abstract resetGeometry(clearGeometry: boolean);
}

export abstract class AbstractComposerComponent extends AbstractThreeComponent {
  abstract getWriteBuffer(
    webGLRenderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ): THREE.WebGLRenderTarget;
  abstract getReadBuffer(
    webGLRenderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ): THREE.WebGLRenderTarget;
  abstract getRenderTarget1(
    webGLRenderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ): THREE.WebGLRenderTarget;
  abstract getRenderTarget2(
    webGLRenderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ): THREE.WebGLRenderTarget;
}

export abstract class AbstractSvgGeometry extends AbstractThreeComponent {
  meshPositions: THREE.Vector3[] = [];
  meshRotations: THREE.Euler[] = [];
  meshScales: THREE.Vector3[] = [];
  meshTranslations: THREE.BufferGeometry[] = [];
  meshMaterials: (THREE.Material | THREE.Material[])[] = [];
}

export abstract class AbstractMeshComponent extends AbstractThreeComponent {
  abstract resetMesh(clearMesh: boolean): void;
}

export interface CssStyle {
  width?: number | string;
  height?: number | string;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
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
  border?: number | string;
  borderColor?: string | number | THREE.Color | THREE.Vector4;
  borderStyle?: string;
  borderWidth?: number | string;
  borderRadius?: number | string;
  borderLeft?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderImage?: string;
  borderImageSource?: string;
  borderImageSlice?: string;
  borderImageOutset?: string;
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
  transform? : string | string[],
  transformOrigin? : string
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

  static removeCssStyle(
    ele: HTMLElement,
    clazzName?: string
  ): boolean {
    if (this.isNotNull(clazzName)) {
      this.cssEject(clazzName);
      if (ele.classList.contains(clazzName)) {
        ele.classList.remove(clazzName);
      }
      if (this.isNotNull(this._elementEvents[clazzName])) {
        const eleEvents = this._elementEvents[clazzName];
        Object.entries(eleEvents).forEach(([key, value]) => {
          ele.removeEventListener(key, value, false);
        })
        delete this._elementEvents[clazzName];
      }
    }
    return true;
  }
  static toggleCssStyle(
    ele: HTMLElement,
    clazzName?: string,
    isActive ?: boolean
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
          })
        }
      } else {
        if (!ele.classList.contains(clazzName)) {
          ele.classList.add(clazzName);
        }
        if (this.isNotNull(this._elementEvents[clazzName])) {
          const eleEvents = this._elementEvents[clazzName];
          Object.entries(eleEvents).forEach(([key, value]) => {
            ele.addEventListener(key, value, false);
          })
        }
      }
    }
    return true;
  }

  static addCssStyle(
    ele: HTMLElement,
    styles: CssStyle,
    clazzName?: string,
    classPrefix?: string,
    vertualClass?: string
  ): string {
    if (clazzName == null || clazzName == undefined) {
      clazzName = this.makeUUID(15, classPrefix);
    }

    const eventList: { [key: string]: (e?: any) => void } = {};
    const styleList: string[] = [];

    Object.entries(styles).forEach(([key, value]) => {
      if (this.isNotNull(value)) {
        switch (key) {
          case 'change':
          case 'click':
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
          case 'opacity':
            if (typeof value == 'number') {
              styleList.push(this.camelCaseToDash(key) + ': ' + value + '');
            } else if (typeof value == 'string') {
              styleList.push(
                this.camelCaseToDash(key) + ': ' + parseFloat(value) + ''
              );
            }
            break;
          case 'color':
          case 'backgroundColor':
          case 'borderColor':
            if (typeof value == 'number' || typeof value == 'string') {
              styleList.push(
                this.camelCaseToDash(key) +
                  ': ' +
                  this.getColorSafe(value).getStyle() +
                  ''
              );
            } else if (value instanceof THREE.Color) {
              styleList.push(
                this.camelCaseToDash(key) + ': ' + value.getStyle() + ''
              );
            } else if (value instanceof THREE.Vector4) {
              styleList.push(
                this.camelCaseToDash(key) +
                  ': rgba(' +
                  value.x +
                  ',' +
                  value.y +
                  ',' +
                  value.z +
                  ',' +
                  value.w +
                  ')'
              );
            }
            break;
          case 'transform' :
            if (value instanceof Array) {
              if (value.length > 0) {
                styleList.push(
                  this.camelCaseToDash(key) + ': ' + value.join(' ') + ''
                );
              }
            } else if (typeof(value) == 'string' && value !== ''){
              styleList.push(
                this.camelCaseToDash(key) + ': ' + value + ''
              );
            }
            break;
          case 'backgroundImage':
          case 'borderImageSource':
            break;
          case 'width':
          case 'height':
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
          case 'border':
          case 'borderStyle':
          case 'borderLeft':
          case 'borderTop':
          case 'borderRight':
          case 'borderBottom':
          case 'borderImage':
          case 'borderImageSlice':
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
          case 'transformOrigin' :
            if (typeof value == 'number') {
              styleList.push(this.camelCaseToDash(key) + ': ' + value + 'px');
            } else if (typeof value == 'string') {
              styleList.push(this.camelCaseToDash(key) + ': ' + value + '');
            }
            break;
        }
      }
    });
    this.cssInject('.' + clazzName + (vertualClass ? (':' + vertualClass) : '') + '{' + styleList.join(';') + '}',clazzName);
    if (!ele.classList.contains(clazzName)) {
      ele.classList.add(clazzName);
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

  static getRenderer() {
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

  static getColorSafe(
    color: string | number | THREE.Color,
    altColor?: string | number | THREE.Color
  ): THREE.Color {
    const defColor = this.isNotNull(color) ? color : altColor;
    if (this.isNotNull(defColor)) {
      if (defColor instanceof THREE.Color) {
        return defColor;
      } else if (typeof defColor === 'string') {
        const colorStr: string = defColor;
        if (colorStr.startsWith('0x')) {
          return new THREE.Color(parseInt(colorStr, 16));
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
        return new THREE.Vector4(defColor.r,defColor.g,defColor.b,alpha);
      } else {
        return defColor;
      }
    } else if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
      return new THREE.Vector4(0,0,0,alpha);
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

  static getAngleSafe(angle: number, altangle?: number): number {
    const defValue = this.getTypeSafe(angle, altangle);
    if (this.isNotNull(defValue)) {
      return (defValue / 180) * Math.PI;
    }
    return undefined;
  }

  static getVector2Safe(
    x: number,
    y: number,
    altValue?: THREE.Vector2
  ): THREE.Vector2 {
    const defValue =
      this.isNotNull(x) || this.isNotNull(y)
        ? new THREE.Vector2(this.getTypeSafe(x, y), this.getTypeSafe(y, x))
        : altValue;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    return undefined;
  }

  static getVector3Safe(
    x: number,
    y: number,
    z: number,
    altValue?: THREE.Vector3
  ): THREE.Vector3 {
    const defValue =
      this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z)
        ? new THREE.Vector3(
            this.getTypeSafe(x, y, z),
            this.getTypeSafe(y, x, z),
            this.getTypeSafe(z, x, y)
          )
        : altValue;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    return undefined;
  }

  static getEulerSafe(
    x: number,
    y: number,
    z: number,
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

  static getClock(autoStart?: boolean): ThreeClock {
    return new ThreeClock(autoStart);
  }

  static stats: ThreeStats = null;

  static getStats(style?: object): ThreeStats {
    return new ThreeStats(style);
  }

  static setupGuiChange(
    control: ThreeGuiController,
    onFinishChange?: (value?: any) => void,
    onChange?: (value?: any) => void,
    listen?: boolean
  ): ThreeGuiController {
    if (listen != null && listen) {
      control.listen();
    }
    if (onFinishChange != null) {
      control.onFinishChange(onFinishChange);
    }
    if (onChange != null) {
      control.onChange(onChange);
    }
    return control;
  }

  static setGuiEnabled(
    params: GuiControlParam[],
    names: string[],
    isEnable: boolean = true
  ) {
    const control: ThreeGuiController = this.getGuiController(params, names);
    if (control !== null && control !== undefined && control.domElement) {
      console.log(control.domElement.classList);
      if (isEnable) {
        control.domElement.classList.add('no-pointer-events');
        control.domElement.classList.add('control-disabled');
      } else {
        control.domElement.classList.remove('no-pointer-events');
        control.domElement.classList.remove('control-disabled');
      }
    }
  }

  static getGuiController(params: GuiControlParam[], names: string[]) {
    const name = names.shift().toLowerCase();
    const param: GuiControlParam = params.find((param) => {
      return name == param.name.toLowerCase();
    });
    if (
      names.length > 0 &&
      param &&
      param.children &&
      param.children.length > 0
    ) {
      return this.getGuiController(param.children, names);
    } else {
      return param.controler;
    }
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
            param.listen
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
            param.listen
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
            param.listen
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
            param.listen
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
  select?: any[];
  control?: string;
  listen?: boolean;
  isOpen?: boolean;
  change?: (value?: any) => void;
  finishChange?: (value?: any) => void;
  children?: GuiControlParam[];
  controler?: ThreeGuiController;
}

export class ThreeGui implements ThreeGuiController {
  gui: GUI = null;
  domElement: HTMLElement;
  static customCss: string = null;

  constructor(
    style?: object,
    pars?: {
      closeOnTop?: boolean;
      autoPlace?: boolean;
      width?: number;
    }
  ) {
    this.gui = new GUI(pars);
    console.log();
    this.domElement = this.gui.domElement;
    this.setStyle(style);
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
    return this.gui.destroy();
  }

  removeFolder(folder) {
    return this.gui.removeFolder(folder);
  }

  listen(): this {
    return this.gui.listen();
  }

  onFinishChange(callBack: (e: any) => void): this {
    return this.gui.onFinishChange(callBack);
  }

  onChange(callBack: (e: any) => void): this {
    return this.gui.onChange(callBack);
  }

  open(): void {
    return this.gui.open();
  }

  close(): void {
    return this.gui.close();
  }

  hide(): void {
    return this.gui.hide();
  }

  show(): void {
    return this.gui.show();
  }

  remove(controller): void {
    return this.gui.remove(controller);
  }
}

export interface ThreeGuiController {
  domElement?: HTMLElement;
  add(object, property: string, min?: any, max?, step?): ThreeGuiController;
  addColor(object, property: string): ThreeGuiController;
  remove(controller): void;
  destroy(): void;
  addFolder(name: string): ThreeGuiController;
  removeFolder(folder): void;
  listen(): this;
  onFinishChange(callBack: (e: any) => void): this;
  onChange(callBack: (e: any) => void): this;
  open(): void;
  close(): void;
  hide(): void;
  show(): void;
}
