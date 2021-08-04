import { Component, ContentChildren, ElementRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CssStyle, ThreeUtil } from '../interface';
import { AbstractTweenComponent } from '../tween.abstract';

/**
 * HtmlComponent
 */
@Component({
  selector: 'ngx3js-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
})
export class HtmlComponent extends AbstractTweenComponent implements OnInit {
  /**
   * The html tag.
   *
   * Notice - case insensitive.
   * 
   * @see HTMLDivElement - div
   * @see HTMLSpanElement - span
   */
  @Input() public type: string = 'div';

  /**
   * The child append method.
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private childType: string = 'innerHTML';

  /**
   * The src of image or iframe
   */
  @Input() private src: string = null;

  /**
   * The Style
   */
  @Input() private style: string | CssStyle = null;

  /**
   * Input  of html component
   */
  @Input() private list: (string | CssStyle)[] = null;

  /**
   * Input  of html component
   */
  @Input() private table: (string | CssStyle)[][] = null;

  /**
   * Input  of html component
   */
  @Input() private tableHead: (string | CssStyle)[] = null;

  /**
   * Input  of html component
   */
  @Input() private tableFoot: (string | CssStyle)[] = null;

  /**
   * Input  of html component
   */
  @Input() private dlList: {
    dt?: string | CssStyle;
    dd?: string | CssStyle;
  }[] = null;

  /**
   * Content children of html component
   */
  @ContentChildren(HtmlComponent, { descendants: false }) private childrenList: QueryList<HtmlComponent>;

  /**
   * Creates an instance of html component.
   * @param ele
   */
  constructor(private ele: ElementRef) {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('html');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   *
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.html !== null) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.childrenList, 'childrenList', 'html');
    super.ngAfterContentInit();
  }

  /**
   * Applys changes2d
   * @param changes
   */
  public applyChanges2d(changes: string[]) {
    if (this.html !== null) {
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['html', 'tween']);
      }
      changes.forEach((change) => {
        switch (change) {
          case 'html':
            this.unSubscribeReferList('childrenList');
            if (ThreeUtil.isNotNull(this.childrenList)) {
              this.childrenList.forEach((child) => {
                child.setParent(this.html);
              });
              this.subscribeListQuery(this.childrenList, 'childrenList', 'html');
            }
            break;
          case 'tween':
            super.setTweenTarget(this.html);
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  /**
   * Parent element of html component
   */
  private parentElement: HTMLElement = null;

  /**
   * Sets parent
   * @param refObject3d
   * @returns true if parent
   */
  public setParent(refObject3d: THREE.Object3D | HTMLElement): boolean {
    if (super.setParent(refObject3d)) {
      let parentElement: HTMLElement = null;
      if (refObject3d instanceof CSS3DObject || refObject3d instanceof CSS2DObject) {
        parentElement = refObject3d.element;
      } else if (refObject3d instanceof THREE.Mesh) {
        refObject3d.children.forEach((child) => {
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

  /**
   * Applys html style
   * @param ele
   * @param style
   */
  private applyHtmlStyle(ele: HTMLElement, style: string | CssStyle): void {
    this.cssClazzName = ThreeUtil.addCssStyle(ele, style, this.cssClazzName, 'html', 'inline');
  }

  /**
   * Css clazz name of html component
   */
  private cssClazzName: string = null;

  /**
   * Html  of html component
   */
  private html: HTMLElement = null;

  /**
   * Gets html
   * @returns html
   */
  public getHtml(): HTMLElement {
    if (this.html === null || this._needUpdate) {
      this.needUpdate = false;
      let html: HTMLElement = null;
      switch (this.type.toLowerCase()) {
        case 'ul':
        case 'ol':
          html = document.createElement(this.type);
          if (ThreeUtil.isNotNull(this.list) && this.list.length > 0) {
            this.list.forEach((list) => {
              const li = document.createElement('li');
              this.applyHtmlStyle(li, list);
              html.appendChild(li);
            });
          }
          break;
        case 'dl':
          html = document.createElement(this.type);
          if (ThreeUtil.isNotNull(this.dlList) && this.dlList.length > 0) {
            this.dlList.forEach((dlList) => {
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
            });
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
            this.tableHead.forEach((tdHtml) => {
              const td = document.createElement('td');
              this.applyHtmlStyle(td, tdHtml);
              tableHeadTr.appendChild(td);
            });
            html.appendChild(tableHead);
          }
          if (ThreeUtil.isNotNull(this.table) && this.table.length > 0) {
            const tableBody = document.createElement('tbody');
            this.table.forEach((rowData) => {
              if (ThreeUtil.isNotNull(rowData) && rowData.length > 0) {
                const tableBodyTr = document.createElement('tr');
                rowData.forEach((tdHtml) => {
                  const td = document.createElement('td');
                  this.applyHtmlStyle(td, tdHtml);
                  tableBodyTr.appendChild(td);
                });
                tableBody.appendChild(tableBodyTr);
              }
            });
            html.appendChild(tableBody);
          }
          if (ThreeUtil.isNotNull(this.tableFoot) && this.tableFoot.length > 0) {
            const tableFoot = document.createElement('tfoot');
            const tableFootTr = document.createElement('tr');
            tableFoot.appendChild(tableFootTr);
            this.tableFoot.forEach((tdHtml) => {
              const td = document.createElement('td');
              this.applyHtmlStyle(td, tdHtml);
              tableFootTr.appendChild(td);
            });
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
          case 'innerhtml':
            {
              const ele: HTMLElement = ThreeUtil.getChildElementSave(this.ele.nativeElement);
              html.innerHTML = ele.innerHTML;
            }
            break;
          case 'innertext':
            {
              const ele: HTMLElement = ThreeUtil.getChildElementSave(this.ele.nativeElement);
              html.innerText = ele.innerText;
            }
            break;
        }
      }
      if (this.html !== null && this.parentElement !== null && this.parentElement.childNodes) {
        this.parentElement.childNodes.forEach((ele) => {
          if (ele == this.html) {
            this.parentElement.insertBefore(html, ele);
            this.parentElement.removeChild(ele);
          }
        });
      }
      if (this.html !== null && this.html.parentNode !== null) {
        this.html.parentNode.removeChild(this.html);
      }
      this.html = html;
      super.setObject(this.html);
    }
    if (this.html !== null && this.parentElement !== null) {
      if (ThreeUtil.isNotNull(this.html.parentNode) || this.html.parentNode !== this.parentElement) {
        this.parentElement.appendChild(this.html);
      }
    }
    return this.html;
  }
}
