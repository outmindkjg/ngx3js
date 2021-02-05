import { Component, ContentChildren, ElementRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { AbstractThreeComponent, ThreeUtil } from '../interface';
import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


export interface HtmlObject {
  [key: string]: string | number | Function;
}

@Component({
  selector: 'three-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent extends AbstractThreeComponent implements OnInit {

  @Input() type: string = 'div';
  @Input() childType: string = 'innerHTML';
  @Input() src: string = null;
  @Input() style: (string | HtmlObject) = null;
  @Input() list: (string | HtmlObject)[] = null;
  @Input() table: (string | HtmlObject)[][] = null;
  @Input() tableHead: (string | HtmlObject)[] = null;
  @Input() tableFoot: (string | HtmlObject)[] = null;
  @Input() dlList: {
    dt?: (string | HtmlObject);
    dd?: (string | HtmlObject);
  }[] = null;

  @ContentChildren(HtmlComponent, { descendants: false }) children: QueryList<HtmlComponent>;

  constructor(private ele: ElementRef) { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.parentElement !== null) {
      this.needUpdate = true;
      this.getHtml();
    }
    super.ngOnChanges(changes);
  }

  ngAfterContentInit(): void {
    this.children.changes.subscribe(() => {
      this.synkObject3D(['children']);
    });
    super.ngAfterContentInit();
  }

  synkObject3D(synkTypes: string[]) {
    if (this.html !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'children':
            this.children.forEach((child) => {
              child.setObject3D(this.html);
            });
            break;
          case 'tween' :
            super.setTweenTarget(this.html);
            break;
        }
      })
    }
  }

  private parentElement: HTMLElement = null;

  setObject3D(refObject3d: THREE.Object3D | HTMLElement) {
    let parentElement: HTMLElement = null;
    if (refObject3d instanceof CSS3DObject || refObject3d instanceof CSS2DObject) {
      parentElement = refObject3d.element;
    } else if (refObject3d instanceof THREE.Mesh) {
      refObject3d.children.forEach(child => {
        if (child instanceof CSS3DObject || child instanceof CSS2DObject) {
          parentElement = child.element;
        }
      });
    } else if (refObject3d instanceof HTMLElement) {
      parentElement = refObject3d;
    }
    if (this.parentElement !== parentElement) {
      if (this.parentElement !== null && this.html !== null && this.html.parentNode !== null) {
        this.html.parentNode.removeChild(this.html);
      }
      this.parentElement = parentElement;
      if (this.parentElement !== null) {
        this.getHtml();
      }
    }
  }

  private applyHtmlStyle(ele: HTMLElement, style: string | HtmlObject): HTMLElement {
    return HtmlComponent.applyHtmlStyle(ele, style);
  }

  static applyHtmlStyle(ele: HTMLElement, style: string | HtmlObject): HTMLElement {
    if (ThreeUtil.isNull(style) || typeof (style) === 'string' || ThreeUtil.isNull(style['click'])) {
      ele.style.pointerEvents ='none'; 
    } else {
      ele.style.pointerEvents ='auto'; 
    }

    if (ThreeUtil.isNull(style)) {
      ele.innerHTML = 'error';
    } else if (typeof (style) === 'string') {
      ele.innerHTML = style;
    } else {
      Object.entries(style).forEach(([key, value]) => {
        switch (key.toLowerCase()) {
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
            if (typeof (value) === 'function') {
              ele.addEventListener(key, (e) => {
                value(e, ele);
              }, false);
            }
            break;
          case 'innerhtml':
            ele.innerHTML = value.toString();
            break;
          case 'innertext':
            ele.innerText = value.toString();
            break;
          case 'class':
          case 'classname':
            ele.className = value.toString();
            break;
          case 'color':
          case 'background':
          case 'backgroundcolor':
          case 'bordercolor':
            if (typeof (value) === 'number' || typeof (value) === 'string') {
              ele.style[key] = ThreeUtil.getColorSafe(value, 0x000000).getStyle();
            }
            break;
          default:
            if (typeof (value) === 'string') {
              ele.style[key] = value;
            } else if (typeof (value) === 'number') {
              ele.style[key] = value + 'px';
            }
            break;
        }
      });
    }
    return ele;
  }

  private html: HTMLElement = null;
  private needUpdate: boolean = false;

  getHtml(): HTMLElement {
    if (this.html === null || this.needUpdate) {
      this.needUpdate = false;
      let html: HTMLElement = null;
      switch (this.type.toLowerCase()) {
        case 'ul':
        case 'ol':
          html = document.createElement(this.type);
          if (ThreeUtil.isNotNull(this.list) && this.list.length > 0) {
            this.list.forEach(list => {
              const li = document.createElement('li');
              this.applyHtmlStyle(li, list);
              html.appendChild(li);
            })
          }
          break;
        case 'dl':
          html = document.createElement(this.type);
          if (ThreeUtil.isNotNull(this.dlList) && this.dlList.length > 0) {
            this.dlList.forEach(dlList => {
              const dl = document.createElement('dl');
              if (ThreeUtil.isNotNull(dlList.dt)) {
                const dt = document.createElement('dt');
                this.applyHtmlStyle(dt, dlList.dt);
                dl.appendChild(dt);
              }
              if (ThreeUtil.isNotNull(dlList.dd)) {
                const dt = document.createElement('dd');
                this.applyHtmlStyle(dt, dlList.dd);
                dl.appendChild(dt);
              }
              html.appendChild(dl);
            })
          }
          break;
        case 'img':
        case 'iframe':
          html = document.createElement(this.type);
          html.setAttribute('src', this.src);
          break;
        case 'table':
          html = document.createElement(this.type);
          if (ThreeUtil.isNotNull(this.tableHead) && this.tableHead.length > 0) {
            const tableHead = document.createElement('thead');
            const tableHeadTr = document.createElement('tr');
            tableHead.appendChild(tableHeadTr);
            this.tableHead.forEach(tdHtml => {
              const td = document.createElement('td');
              this.applyHtmlStyle(td, tdHtml);
              tableHeadTr.appendChild(td);
            })
            html.appendChild(tableHead);
          }
          if (ThreeUtil.isNotNull(this.table) && this.table.length > 0) {
            const tableBody = document.createElement('tbody');
            this.table.forEach(rowData => {
              if (ThreeUtil.isNotNull(rowData) && rowData.length > 0) {
                const tableBodyTr = document.createElement('tr');
                rowData.forEach(tdHtml => {
                  const td = document.createElement('td');
                  this.applyHtmlStyle(td, tdHtml);
                  tableBodyTr.appendChild(td);
                })
                tableBody.appendChild(tableBodyTr);
              }
            })
            html.appendChild(tableBody);
          }
          if (ThreeUtil.isNotNull(this.tableFoot) && this.tableFoot.length > 0) {
            const tableFoot = document.createElement('tfoot');
            const tableFootTr = document.createElement('tr');
            tableFoot.appendChild(tableFootTr);
            this.tableFoot.forEach(tdHtml => {
              const td = document.createElement('td');
              this.applyHtmlStyle(td, tdHtml);
              tableFootTr.appendChild(td);
            })
            html.appendChild(tableFoot);
          }
          break;
        default:
          html = document.createElement(this.type);
          break;
      }
      if (ThreeUtil.isNotNull(this.style)) {
        this.applyHtmlStyle(html, this.style);
      }
      if (html.tagName !== 'IMG' && html.tagName !== 'IFRAME' && html.innerHTML == '') {
        switch (this.childType.toLowerCase()) {
          case 'innerhtml': {
            const ele: HTMLElement = this.ele.nativeElement.cloneNode(true);
            ele.childNodes.forEach(child => {
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
                      childEle.parentNode.removeChild(childEle);
                      break;
                  }
                  break;
                default:
                  break;
              }
            })
            html.innerHTML = ele.innerHTML;
          }
            break;
          case 'innertext': {
            const ele: HTMLElement = this.ele.nativeElement;
            html.innerText = ele.innerText;
          }
            break;
        }
      }
      if (this.html !== null && this.parentElement !== null && this.parentElement.childNodes) {
        this.parentElement.childNodes.forEach(ele => {
          if (ele == this.html) {
            this.parentElement.insertBefore(html, ele);
            this.parentElement.removeChild(ele);
          }
        })
      }
      if (this.html !== null && this.html.parentNode !== null) {
        this.html.parentNode.removeChild(this.html);
      }

      this.html = html;
      this.synkObject3D(['children', 'tween']);
    }
    if (this.html !== null && this.parentElement !== null) {
      if (ThreeUtil.isNotNull(this.html.parentNode) || this.html.parentNode !== this.parentElement) {
        this.parentElement.appendChild(this.html);
      }
    }
    return this.html;
  }

}
