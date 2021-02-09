import { CssStyle, ThreeUtil } from './../interface';
import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { HtmlComponent } from '../html/html.component';
import { HtmlCollection, VisualComponent } from '../visual/visual.component';
import * as THREE from 'three';
import { TransformComponent } from '../transform/transform.component';
import { BackgroundComponent } from '../background/background.component';
import { ControllerComponent } from '../controller/controller.component';

@Component({
  selector: 'three-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @Input() name: string = null;
  @ContentChildren(VisualComponent) children: QueryList<VisualComponent>;
  @ContentChildren(HtmlComponent) html: QueryList<HtmlComponent>;
  @ContentChildren(TransformComponent) transform: QueryList<TransformComponent>;
  @ContentChildren(BackgroundComponent) background: QueryList<BackgroundComponent>;
	@ContentChildren(ControllerComponent, { descendants: true }) controller: QueryList<ControllerComponent>;

  private collection : HtmlCollection = {
    html : null,
    name : null,
    component : this,
    children : []
  };

  constructor() { }


  ngOnInit(): void {
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
  }

  ngAfterContentInit() {
    this.children.changes.subscribe(() => {
      this.synkObject2D(['children']);
    });
    this.html.changes.subscribe(() => {
      this.synkObject2D(['html']);
    });
    this.transform.changes.subscribe(() => {
      this.synkObject2D(['transform']);
    });
    this.background.changes.subscribe(() => {
      this.synkObject2D(['background']);
    });
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

  synkObject2D(synkTypes: string[]) {
    if (this.canvas !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'children':
            if (this.eleSize !== null) {
              this.children.forEach((child) => {
                child.setParentNode(this.canvas, this.eleSize, this.collection);
              });
            }
            break;
          case 'html':
            this.html.forEach((html) => {
              html.setObject3D(this.canvas);
            });
            break;
          case 'transform':
            if (this.canvasSize !== null) {
              this.transform.forEach((transform) => {
                transform.setParentNode(this.canvas, this.canvasSize, this.eleSize);
              });
            }
            break;
          case 'background':
            this.background.forEach((background) => {
              background.setParentNode(this.canvas);
            });
            break;
          case 'controller':
            this.controller.forEach((controller) => {
              controller.setCanvas(this.collection);
            });
            break;
        }
      });
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
      this.synkObject2D(['transform', 'background', 'children']);
    }
  }

  private cssClazzName : string = null;

  getCanvas(): HTMLElement {
    if (this.canvas === null) {
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
      this.synkObject2D(['html', 'transform', 'background', 'children' ]);
    }
    if (this.parentNode !== null && this.canvas.parentNode !== this.parentNode) {
      this.parentNode.appendChild(this.canvas);
      this.applyHtmlStyle();
    }
    return this.canvas;
  }
}
