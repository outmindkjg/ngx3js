import { Component, ContentChildren, ElementRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { CssStyle, ThreeUtil } from '../interface';
import { AbstractTweenComponent } from '../tween.abstract';

@Component({
  selector: 'three-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent extends AbstractTweenComponent implements OnInit {

  @Input() type: string = 'div';
  @Input() childType: string = 'innerHTML';
  @Input() src: string = null;
  @Input() style: (string | CssStyle) = null;
  @Input() list: (string | CssStyle)[] = null;
  @Input() table: (string | CssStyle)[][] = null;
  @Input() tableHead: (string | CssStyle)[] = null;
  @Input() tableFoot: (string | CssStyle)[] = null;
  @Input() dlList: {
    dt?: (string | CssStyle);
    dd?: (string | CssStyle);
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
              child.setParent(this.html);
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

  setParent(refObject3d: THREE.Object3D | HTMLElement | any, isRestore: boolean = false) : boolean {
    if (super.setParent(refObject3d, isRestore)) {
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
      return true;
    }
    return false;
  }

  private applyHtmlStyle(ele: HTMLElement, style: string | CssStyle): void {
    this.cssClazzName = ThreeUtil.addCssStyle(ele, style, this.cssClazzName, 'html','inline');
  }

  private cssClazzName : string = null;

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
            const ele: HTMLElement = ThreeUtil.getChildElementSave(this.ele.nativeElement);
            html.innerHTML = ele.innerHTML;
          }
            break;
          case 'innertext': {
            const ele: HTMLElement = ThreeUtil.getChildElementSave(this.ele.nativeElement);
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
