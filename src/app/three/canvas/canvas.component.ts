import { CssStyle, ThreeUtil } from './../interface';
import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { HtmlComponent } from '../html/html.component';
import { HtmlCollection, VisualComponent } from '../visual/visual.component';
import * as THREE from 'three';
import { TransformComponent } from '../transform/transform.component';
import { BackgroundComponent } from '../background/background.component';
import { ControllerComponent } from '../controller/controller.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent extends AbstractSubscribeComponent implements OnInit {
  
  @Input() public name:string = null;

  @ContentChildren(VisualComponent) private childrenList: QueryList<VisualComponent>;
  @ContentChildren(HtmlComponent) private htmlList: QueryList<HtmlComponent>;
  @ContentChildren(TransformComponent) private transformList: QueryList<TransformComponent>;
  @ContentChildren(BackgroundComponent) private backgroundList: QueryList<BackgroundComponent>;
	@ContentChildren(ControllerComponent, { descendants: true }) private controllerList: QueryList<ControllerComponent>;

  private collection : HtmlCollection = {
    html : null,
    name : null,
    component : this,
    children : []
  };

  constructor() { 
    super();
  }


  ngOnInit(): void {
    super.ngOnInit('canvas');
  }

  ngOnDestroy(): void {
    if (this.canvas !== null) {
      if (ThreeUtil.isNotNull(this.canvas.parentNode)) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      if (ThreeUtil.isNotNull(this.cssClazzName)) {
        ThreeUtil.removeCssStyle(this.canvas, this.cssClazzName);
        this.cssClazzName = null;
      }
      this.canvas = null;
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.canvas) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit() {
    this.subscribeListQuery(this.childrenList, 'childrenList', 'children');
    this.subscribeListQuery(this.htmlList, 'htmlList', 'html');
    this.subscribeListQuery(this.transformList, 'transformList', 'transform');
    this.subscribeListQuery(this.backgroundList, 'backgroundList', 'background');
    this.subscribeListQuery(this.controllerList, 'controllerList', 'controller');
    super.ngAfterContentInit();
  }

  private canvas: HTMLElement = null;
  private parentNode: HTMLElement = null;
  private canvasSize: THREE.Vector2 = null;
  private eleSize: THREE.Vector2 = null;

  setSize(size: THREE.Vector2) {
    this.canvasSize = size;
    this.eleSize = new THREE.Vector2(this.canvasSize.x, this.canvasSize.y);
    this.applyHtmlStyle();
  }

  setParentNode(parentNode: HTMLElement) {
    if (this.parentNode !== parentNode) {
      this.parentNode = parentNode;
      this.getCanvas();
    }
  }

  synkObject2d(synkTypes: string[]) {
    if (this.canvas !== null) {
      if (ThreeUtil.isIndexOf(synkTypes, 'init')) {
        synkTypes = ThreeUtil.pushUniq(synkTypes, ['children','html', 'transform', 'background', 'controller']);
      }
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'children':
            if (this.eleSize !== null) {
              this.childrenList.forEach((child) => {
                child.setParentNode(this.canvas, this.eleSize, this.collection);
              });
            }
            break;
          case 'html':
            this.htmlList.forEach((html) => {
              html.setParent(this.canvas);
            });
            break;
          case 'transform':
            if (this.canvasSize !== null) {
              this.transformList.forEach((transform) => {
                transform.setParentNode(this.canvas, this.canvasSize, this.eleSize);
              });
            }
            break;
          case 'background':
            this.backgroundList.forEach((background) => {
              background.setParentNode(this.canvas);
            });
            break;
          case 'controller':
            this.controllerList.forEach((controller) => {
              controller.setCanvas(this.collection);
            });
            break;
        }
      });
      super.synkObject(synkTypes);
    }
  }

  getCollection():HtmlCollection {
    return this.collection;
  }

  getStyle() : CssStyle {
    const style: CssStyle = {
      width: '100%',
      height: '100%',
    }
    if (this.canvasSize !== null) {
      style.width = this.canvasSize.x;
      style.height = this.canvasSize.y;
    }
    return style;
  }

  applyHtmlStyle() {
    if (this.canvas !== null) {
      const style: CssStyle= this.getStyle();
      this.cssClazzName = ThreeUtil.addCssStyle(this.canvas, style, this.cssClazzName, 'canvas');
      this.synkObject2d(['transform', 'background', 'children']);
    }
  }

  private cssClazzName : string = null;

  getCanvas(): HTMLElement {
    if (this.canvas === null || this._needUpdate) {
      this.needUpdate = false;
      const canvas = document.createElement("div");
      canvas.classList.add('three-canvas');
      if (this.canvas !== null && this.canvas.parentNode !== null) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      this.canvas = canvas;
      this.collection.html = this.canvas;
      this.collection.children = [];
      this.collection.component = this;
      this.collection.name = this.name;
      super.setObject(this.collection);
    }
    if (this.parentNode !== null && this.canvas.parentNode !== this.parentNode) {
      this.parentNode.appendChild(this.canvas);
      this.applyHtmlStyle();
    }
    return this.canvas;
  }
}
