import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { HtmlComponent } from '../html/html.component';
import { VisualComponent } from '../visual/visual.component';
import * as THREE from 'three';
import { TransformComponent } from '../transform/transform.component';
import { BackgroundComponent } from '../background/background.component';

@Component({
  selector: 'three-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ContentChildren(VisualComponent) children: QueryList<VisualComponent>;
  @ContentChildren(HtmlComponent) html: QueryList<HtmlComponent>;
  @ContentChildren(TransformComponent) transform: QueryList<TransformComponent>;
  @ContentChildren(BackgroundComponent) background: QueryList<BackgroundComponent>;

  constructor() { }


  ngOnInit(): void {
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
  setSize(size: THREE.Vector2) {
    this.canvasSize = size;
    console.log(this.canvasSize);
    this.applyHtmlStyle();
  }

  setParentNode(parentNode: HTMLElement) {
    if (this.parentNode !== parentNode) {
      this.parentNode = parentNode;
      console.log(this.parentNode);
      this.getCanvas();
    }
  }

  synkObject2D(synkTypes: string[]) {
    if (this.canvas !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'children':
            this.children.forEach((child) => {
              child.setParentNode(this.canvas);
            });
            break;
          case 'html':
            this.html.forEach((html) => {
              html.setObject3D(this.canvas);
            });
            break;
          case 'transform':
            if (this.canvasSize !== null) {
              this.transform.forEach((transform) => {
                transform.setParentNode(this.canvas, this.canvasSize);
              });
            }
            break;
          case 'background':
            this.background.forEach((background) => {
              background.setParentNode(this.canvas);
            });
            break;

        }
      });
    }
  }

  applyHtmlStyle() {
    if (this.canvas !== null) {
      const style: { [key: string]: string } = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '0',
        top: '0',
        right: 'auto',
        bottom: 'auto',
        pointerEvents: 'none',
        backgroundColor: 'red',
        opacity: '0.5'
      }
      if (this.canvasSize !== null) {
        style.width = this.canvasSize.x + 'px';
        style.height = this.canvasSize.y + 'px';
      }
      HtmlComponent.applyHtmlStyle(this.canvas, style);
      this.synkObject2D(['transform', 'background']);
    }
  }

  getCanvas(): HTMLElement {
    if (this.canvas === null) {
      const canvas = document.createElement("div");
      if (this.canvas !== null && this.canvas.parentNode !== null) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      this.canvas = canvas;
      this.synkObject2D(['html', 'children', 'transform', 'background']);
    }
    if (this.parentNode !== null && this.canvas.parentNode !== this.parentNode) {
      this.parentNode.appendChild(this.canvas);
      this.applyHtmlStyle();
    }
    return this.canvas;
  }
}
