import { Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { BackgroundComponent } from '../background/background.component';
import { HtmlComponent } from '../html/html.component';
import { CssStyle, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { TransformComponent } from '../transform/transform.component';
// import { ControllerComponent } from '../controller/controller.component';

/**
 * Html collection
 */
export interface HtmlCollection {
  html: HTMLElement;
  name: string;
  component: VisualComponent | any;
  children: HtmlCollection[];
}

/**
 * VisualComponent
 */
@Component({
  selector: 'ngx3js-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss'],
})
export class VisualComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of visual component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() public type: string = 'div';

  /**
   * The name of the object (doesn't need to be unique). Default is an empty string.
   */
  @Input() public name: string = null;

  /**
   * Input  of visual component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private childType: string = 'innerHTML';

  /**
   * Input  of visual component
   */
  @Input() private src: string = null;

  /**
   * Input  of visual component
   */
  @Input() private value: string | number = '';

  /**
   * Input  of visual component
   */
  @Input() private inputType: string | number = 'text';

  /**
   * Input  of visual component
   */
  @Input() private checked: string | number = 'false';

  /**
   * Input  of visual component
   */
  @Input() private radioValues: {
    value?: string;
    text?: string;
  }[] = null;

  /**
   * Input  of visual component
   */
  @Input() private selectOptions: {
    value?: string;
    text?: string;
  }[] = null;

  /**
   * Output  of visual component
   */
  @Output() private change: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private click: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private dblclick: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private focus: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private keyup: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private keydown: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private load: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private select: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private mousedown: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private mouseout: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private mouseover: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private mousemove: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Output  of visual component
   */
  @Output() private mouseup: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Content children of visual component
   */
  @ContentChildren(VisualComponent) private childrenList: QueryList<VisualComponent>;

  /**
   * Content children of visual component
   */
  @ContentChildren(HtmlComponent) private htmlList: QueryList<HtmlComponent>;

  /**
   * Content children of visual component
   */
  @ContentChildren(TransformComponent) private transformList: QueryList<TransformComponent>;

  /**
   * Content children of visual component
   */
  @ContentChildren(BackgroundComponent) private backgroundList: QueryList<BackgroundComponent>;

  /**
   * Content children of visual component
   */
  // @ContentChildren(ControllerComponent, { descendants: false }) private controllerList: QueryList<ControllerComponent>;

  /**
   * Collection  of visual component
   */
  private collection: HtmlCollection = {
    html: null,
    name: null,
    component: this,
    children: [],
  };

  /**
   * Creates an instance of visual component.
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
    super.ngOnInit('visual');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.visual !== null) {
      if (ThreeUtil.isNotNull(this.visual.parentNode)) {
        this.visual.parentNode.removeChild(this.visual);
      }
      if (ThreeUtil.isNotNull(this.cssClazzName)) {
        ThreeUtil.removeCssStyle(this.visual, this.cssClazzName);
        this.cssClazzName = null;
      }
      this.visual = null;
    }
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
    if (changes && this.visual) {
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
    this.subscribeListQueryChange(this.childrenList, 'childrenList', 'children');
    this.subscribeListQueryChange(this.htmlList, 'htmlList', 'html');
    this.subscribeListQueryChange(this.transformList, 'transformList', 'transform');
    this.subscribeListQueryChange(this.backgroundList, 'backgroundList', 'background');
    super.ngAfterContentInit();
  }

  /**
   * Parent node of visual component
   */
  private parentNode: HTMLElement = null;

  /**
   * Parent size of visual component
   */
  private parentSize: THREE.Vector2 = null;

  /**
   * Ele size of visual component
   */
  private eleSize: THREE.Vector2 = null;

  /**
   * Parent collection of visual component
   */
  private parentCollection: HtmlCollection = null;

  /**
   * Sets parent node
   * @param parentNode
   * @param parentSize
   * @param parentCollection
   */
  public setParentNode(parentNode: HTMLElement, parentSize: THREE.Vector2, parentCollection: HtmlCollection) {
    if (this.parentNode !== parentNode) {
      this.parentNode = parentNode;
    }
    if (this.parentCollection !== parentCollection) {
      if (this.parentCollection !== null) {
        const idx = this.parentCollection.children.indexOf(this.collection);
        if (idx > -1) this.parentCollection.children.splice(idx, 1);
      }
      this.parentCollection = parentCollection;
    }
    if (this.parentCollection !== null && this.parentCollection.children.indexOf(this.collection) === -1) {
      this.parentCollection.children.push(this.collection);
    }
    this.parentSize = parentSize;
    this.eleSize = new THREE.Vector2(this.parentSize.x, this.parentSize.y);
    this.getVisual();
  }

  /**
   * Applys changes2d
   * @param changes
   */
  public applyChanges2d(changes: string[]) {
    if (this.visual !== null) {
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['html', 'transform', 'background', 'children', 'controller']);
      }
      changes.forEach((change) => {
        switch (change) {
          case 'children':
            this.childrenList.forEach((child) => {
              child.setParentNode(this.visual, this.eleSize, this.collection);
            });
            break;
          case 'html':
            this.htmlList.forEach((html) => {
              html.setParent(this.visual);
            });
            break;
          case 'transform':
            if (this.parentSize !== null) {
              this.transformList.forEach((transform) => {
                transform.setParentNode(this.visual, this.parentSize, this.eleSize);
              });
            }
            break;
          case 'background':
            this.backgroundList.forEach((background) => {
              background.setParentNode(this.visual);
            });
            break;
          case 'controller':
            // this.controller.forEach((controller) => {
            //   controller.setObject2d(this.collection);
            // });
            break;
        }
      });
    }
  }

  /**
   * Gets collection
   * @returns collection
   */
  public getCollection(): HtmlCollection {
    return this.collection;
  }

  /**
   * Gets style
   * @returns style
   */
  public getStyle(): CssStyle {
    const style: CssStyle = {
      width: '100%',
      height: '100%',
    };
    if (this.parentSize !== null) {
      style.width = this.parentSize.x;
      style.height = this.parentSize.y;
    }
    return style;
  }

  /**
   * Applys html style
   */
  public applyHtmlStyle() {
    if (this.visual !== null) {
      const style: CssStyle = this.getStyle();
      if (this.click.observers.length > 0) {
        style.click = (e) => {
          this.click.emit(e);
        };
      }
      if (this.change.observers.length > 0) {
        style.change = (e) => {
          this.change.emit(e);
        };
      }
      if (this.dblclick.observers.length > 0) {
        style.dblclick = (e) => {
          this.dblclick.emit(e);
        };
      }
      if (this.focus.observers.length > 0) {
        style.focus = (e) => {
          this.focus.emit(e);
        };
      }
      if (this.keyup.observers.length > 0) {
        style.keyup = (e) => {
          this.keyup.emit(e);
        };
      }
      if (this.keydown.observers.length > 0) {
        style.keydown = (e) => {
          this.keydown.emit(e);
        };
      }
      if (this.load.observers.length > 0) {
        style.load = (e) => {
          this.load.emit(e);
        };
      }
      if (this.select.observers.length > 0) {
        style.select = (e) => {
          this.select.emit(e);
        };
      }
      if (this.mousedown.observers.length > 0) {
        style.mousedown = (e) => {
          this.mousedown.emit(e);
        };
      }
      if (this.mouseout.observers.length > 0) {
        style.mouseout = (e) => {
          this.mouseout.emit(e);
        };
      }
      if (this.mouseover.observers.length > 0) {
        style.mouseover = (e) => {
          this.mouseover.emit(e);
        };
      }
      if (this.mousemove.observers.length > 0) {
        style.mousemove = (e) => {
          this.mousemove.emit(e);
        };
      }
      if (this.mouseup.observers.length > 0) {
        style.mouseup = (e) => {
          this.mouseup.emit(e);
        };
      }
      switch (this.visual.tagName) {
        case 'FORM':
        case 'INPUT':
        case 'TEXTAREA':
        case 'BUTTON':
          style.pointerEvents = 'auto';
          style.zIndex = 1000;
          break;
        default:
          if (
            ThreeUtil.isNotNull('change') ||
            ThreeUtil.isNotNull('click') ||
            ThreeUtil.isNotNull('dblclick') ||
            ThreeUtil.isNotNull('focus') ||
            ThreeUtil.isNotNull('keyup') ||
            ThreeUtil.isNotNull('keydown') ||
            ThreeUtil.isNotNull('load') ||
            ThreeUtil.isNotNull('select') ||
            ThreeUtil.isNotNull('mousedown') ||
            ThreeUtil.isNotNull('mouseout') ||
            ThreeUtil.isNotNull('mouseover') ||
            ThreeUtil.isNotNull('mouseover') ||
            ThreeUtil.isNotNull('mousemove') ||
            ThreeUtil.isNotNull('mouseup')
          ) {
            style.pointerEvents = 'auto';
          }
      }
      this.cssClazzName = ThreeUtil.addCssStyle(this.visual, style, this.cssClazzName, 'visual');
      this.applyChanges2d(['init']);
    }
  }

  /**
   * Css clazz name of visual component
   */
  private cssClazzName: string = null;

  /**
   * Visual  of visual component
   */
  private visual: HTMLElement = null;

  /**
   * Gets visual
   * @returns visual
   */
  public getVisual(): HTMLElement {
    if (this.visual === null || this._needUpdate) {
      this.needUpdate = false;
      let visual: HTMLElement = null;
      let texthold: HTMLElement = null;
      switch (this.type.toLowerCase()) {
        case 'img':
        case 'iframe':
          visual = document.createElement(this.type);
          visual.setAttribute('src', this.src);
          break;
        case 'input':
          visual = document.createElement(this.type);
          visual.setAttribute('type', (this.inputType || 'text').toString());
          visual.setAttribute('value', (this.value || '').toString());
          break;
        case 'textarea':
          const textarea: HTMLTextAreaElement = document.createElement('textarea');
          textarea.name = 'textarea';
          textarea.value = (this.value || '').toString();
          visual = textarea;
          break;
        case 'checkbox':
          visual = document.createElement('label');
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('value', (this.value || '').toString());
          checkbox.setAttribute('checked', (this.checked || 'false').toString());
          visual.appendChild(checkbox);
          texthold = document.createElement('span');
          visual.appendChild(texthold);
          break;
        case 'radio':
          visual = document.createElement('form');
          if (ThreeUtil.isNotNull(this.radioValues) && this.radioValues.length > 0) {
            this.radioValues.forEach((radioValue) => {
              const label = document.createElement('label');
              const radio = document.createElement('input');
              radio.setAttribute('type', 'radio');
              radio.setAttribute('name', 'radio');
              radio.setAttribute('value', (radioValue.value || '').toString());
              if (this.value !== null && radioValue.value == this.value) {
                radio.setAttribute('checked', 'checked');
              }
              label.appendChild(radio);
              const radiotext = document.createElement('span');
              radiotext.innerText = radioValue.text || '';
              label.appendChild(radiotext);
              visual.appendChild(label);
            });
          }
          texthold = document.createElement('span');
          visual.appendChild(texthold);
          break;
        case 'button':
          visual = document.createElement('button');
          break;
        case 'div':
        default:
          visual = document.createElement('div');
          break;
      }
      if (visual.tagName !== 'IMG' && visual.tagName !== 'IFRAME') {
        switch (this.childType.toLowerCase()) {
          case 'innerhtml':
            {
              const ele: HTMLElement = ThreeUtil.getChildElementSave(this.ele.nativeElement);
              if (texthold !== null) {
                texthold.innerHTML = ele.innerHTML;
              } else {
                visual.innerHTML = ele.innerHTML;
              }
            }
            break;
          case 'innertext':
            {
              const ele: HTMLElement = ThreeUtil.getChildElementSave(this.ele.nativeElement);
              if (texthold !== null) {
                texthold.innerText = ele.innerText;
              } else {
                visual.innerText = ele.innerText;
              }
            }
            break;
        }
      }
      if (this.visual !== null && this.visual.parentNode !== null) {
        this.visual.parentNode.removeChild(this.visual);
      }
      this.visual = visual;
      this.collection.component = this;
      this.collection.html = this.visual;
      this.collection.name = this.name;
      this.collection.children = [];
      this.visual.classList.add('ngx3js-visual');
      super.setObject(this.visual);
    }
    if (this.parentNode !== null && this.visual.parentNode !== this.parentNode) {
      this.parentNode.appendChild(this.visual);
      this.applyHtmlStyle();
    }
    return this.visual;
  }
}
