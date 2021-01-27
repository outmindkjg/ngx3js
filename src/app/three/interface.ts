import { TweenComponent } from './tween/tween.component';
import { OnInit, SimpleChanges, OnChanges, AfterContentInit, OnDestroy, ContentChildren, QueryList, Injectable, Component } from '@angular/core';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as TWEEN from '@tweenjs/tween.js';

export interface ApplyMatrix4 {
  applyMatrix4(matrix: THREE.Matrix4): any;
}

export interface AbstractEffectComposer {
  resetEffectComposer(): void;
}

@Component({
  template: ''
})
export abstract class AbstractThreeComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy{

  @ContentChildren(TweenComponent, { descendants: false }) tween: QueryList<TweenComponent>;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterContentInit(): void {
    if (this.tween !== null && this.tween !== undefined) {
      this.tween.changes.subscribe((e) => {
        this.resetTween();
      });
    }
  }

  private tweenTarget : any  = null;
  private tweenTimer : TWEEN.Tween<any> = null;
  setTweenTarget( tweenTarget : any) {
    if (this.tweenTarget !== tweenTarget) {
      this.tweenTarget = tweenTarget;
      this.resetTween();
    }
  }

  resetTween() {
    if (this.tweenTarget !== null && this.tween !== null && this.tween.length > 0) {
      this.tweenTimer = new TWEEN.Tween(this.tweenTarget);
      this.tween.forEach(tween => {
        tween.getTween(this.tweenTimer);
      });
      this.tweenTimer.onUpdate(() => {

      }).onComplete(() => {
        console.log(this.tweenTarget);
      }).start();
    } else if (this.tweenTimer !== null) {
      this.tweenTimer.stop();
    }
  }

  ngOnDestroy(): void {

  }
}

export abstract class AbstractGetGeometry extends AbstractThreeComponent {
  abstract getGeometry(): THREE.Geometry | THREE.BufferGeometry;
  abstract resetGeometry(clearGeometry: boolean);
}


export abstract class AbstractSvgGeometry extends AbstractThreeComponent {
  meshPositions: THREE.Vector3[] = [];
  meshRotations: THREE.Euler[] = [];
  meshScales: THREE.Vector3[] = [];
  meshTranslations: (THREE.Geometry | THREE.BufferGeometry)[] = [];
  meshMaterials: (THREE.Material | THREE.Material[])[] = [];
}

export abstract class AbstractMeshComponent extends AbstractThreeComponent {
  abstract resetMesh(clearMesh: boolean): void;
}

export class ThreeUtil {

  private static renderTimer : RendererTimer;
  static render(renderTimer : RendererTimer) {
    if (this.renderTimer !== renderTimer) {
      this.renderTimer = renderTimer;
      TWEEN.update(renderTimer.elapsedTime * 1000);
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

  static getVector2Safe<T>(
    x: number,
    y: number,
    altValue?: THREE.Vector2
  ): THREE.Vector2 {
    const defValue =
      this.isNotNull(x) && this.isNotNull(y)
        ? new THREE.Vector2(x, y)
        : altValue;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    return undefined;
  }

  static getVector3Safe<T>(
    x: number,
    y: number,
    z: number,
    altValue?: THREE.Vector3
  ): THREE.Vector3 {
    const defValue =
      this.isNotNull(x) && this.isNotNull(y) && this.isNotNull(z)
        ? new THREE.Vector3(x, y, z)
        : altValue;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    return undefined;
  }

  static clock: ThreeClock = null;

  static getClock(autoStart?: boolean): ThreeClock {
    if (this.clock === null) {
      this.clock = new ThreeClock(autoStart);
    }
    return this.clock;
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
  ) {
    if (listen != null && listen) {
      control.listen();
    }
    if (onFinishChange != null) {
      control.onFinishChange(onFinishChange);
    }
    if (onChange != null) {
      control.onChange(onChange);
    }
  }

  static setupGui(control, gui: ThreeGuiController, params: GuiControlParam[]) {
    params.forEach((param) => {
      switch (param.type) {
        case 'color':
          this.setupGuiChange(
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
          this.setupGui(
            param.control ? control[param.control] : control,
            folder,
            param.children
          );
          if (param.isOpen) {
            folder.open();
          }

          break;
        case 'number':
          this.setupGuiChange(
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
          gui
            .add(param.control ? control[param.control] : control, param.name)
            .listen();
          break;
        case 'select':
          this.setupGuiChange(
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
          this.setupGuiChange(
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
}

export class ThreeGui implements ThreeGuiController {
  gui: GUI = null;
  domElement: HTMLElement;

  constructor(
    style?: object,
    pars?: {
      closeOnTop?: boolean;
      autoPlace?: boolean;
      width?: number;
    }
  ) {
    this.gui = new GUI(pars);
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
