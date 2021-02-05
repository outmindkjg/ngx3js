import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { HtmlComponent } from '../html/html.component';

@Component({
  selector: 'three-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit {

  @ContentChildren(VisualComponent) children : QueryList<VisualComponent>;
  @ContentChildren(HtmlComponent) html : QueryList<HtmlComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  private parentNode : HTMLElement = null;
  setParentNode(parentNode : HTMLElement) {
    if (this.parentNode !== parentNode) {
      this.parentNode = parentNode;
      this.getVisual();
    }
  }

  synkObject2D(synkTypes: string[]) {
    if (this.visual !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'children':
            this.children.forEach((child) => {
              child.setParentNode(this.visual);
            });
            break;
          case 'html':
            this.html.forEach((html) => {
              html.setObject3D(this.visual);
            });
            break;
          }
      });
    }
  }

  applyHtmlStyle() {
    HtmlComponent.applyHtmlStyle(this.visual, {
      width : '100px',
      height : '100px',
      position : 'absolute',
      left : '0',
      right : '0',
      top : '0',
      bottom : '0',
      pointerEvents : 'none',
      backgroundColor : 'red',
      opacity : '0.1'
    });
  }

  private visual : HTMLElement = null;

  getVisual():HTMLElement {
    if (this.visual === null) {
      const visual = document.createElement("div");
      if (this.visual !== null && this.visual.parentNode !== null) {
        this.visual.parentNode.removeChild(this.visual);
      }
      this.visual = visual;
      this.synkObject2D(['html','children']);
    }
    if (this.parentNode !== null && this.visual.parentNode !== this.parentNode) {
      this.parentNode.appendChild(this.visual);
      this.applyHtmlStyle();
    }
    return this.visual;
  }

}
