import { Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { BackgroundComponent } from '../background/background.component';
import { HtmlComponent } from '../html/html.component';
import { CssStyle, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { TransformComponent } from '../transform/transform.component';
// import { ControllerComponent } from '../controller/controller.component';

export interface HtmlCollection {
  html: HTMLElement;
  name: string;
  component: VisualComponent | any;
  children: HtmlCollection[];
}

@Component({
  selector: 'three-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss'],
})
export class VisualComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public type: string = 'div';
  @Input() public name: string = null;
  @Input() private childType: string = 'innerHTML';
  @Input() private src: string = null;
  @Input() private value: string | number = '';
  @Input() private inputType: string | number = 'text';
  @Input() private checked: string | number = 'false';

  @Input() private radioValues: {
    value?: string;
    text?: string;
  }[] = null;

  @Input() private selectOptions: {
    value?: string;
    text?: string;
  }[] = null;

  @Output() private change: EventEmitter<any> = new EventEmitter<any>();
  @Output() private click: EventEmitter<any> = new EventEmitter<any>();
  @Output() private dblclick: EventEmitter<any> = new EventEmitter<any>();
  @Output() private focus: EventEmitter<any> = new EventEmitter<any>();
  @Output() private keyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() private keydown: EventEmitter<any> = new EventEmitter<any>();
  @Output() private load: EventEmitter<any> = new EventEmitter<any>();
  @Output() private select: EventEmitter<any> = new EventEmitter<any>();
  @Output() private mousedown: EventEmitter<any> = new EventEmitter<any>();
  @Output() private mouseout: EventEmitter<any> = new EventEmitter<any>();
  @Output() private mouseover: EventEmitter<any> = new EventEmitter<any>();
  @Output() private mousemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() private mouseup: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(VisualComponent) private childrenList: QueryList<VisualComponent>;
  @ContentChildren(HtmlComponent) private htmlList: QueryList<HtmlComponent>;
  @ContentChildren(TransformComponent) private transformList: QueryList<TransformComponent>;
  @ContentChildren(BackgroundComponent) private backgroundList: QueryList<BackgroundComponent>;
  // @ContentChildren(ControllerComponent, { descendants: false }) private controllerList: QueryList<ControllerComponent>;

  private collection: HtmlCollection = {
    html: null,
    name: null,
    component: this,
    children: [],
  };

  constructor(private ele: ElementRef) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('visual');
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.visual) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit() {
    this.subscribeListQuery(this.childrenList, 'childrenList', 'children');
    this.subscribeListQuery(this.htmlList, 'htmlList', 'html');
    this.subscribeListQuery(this.transformList, 'transformList', 'transform');
    this.subscribeListQuery(this.backgroundList, 'backgroundList', 'background');
    super.ngAfterContentInit();
  }

  private parentNode: HTMLElement = null;
  private parentSize: THREE.Vector2 = null;
  private eleSize: THREE.Vector2 = null;
  private parentCollection: HtmlCollection = null;

  setParentNode(parentNode: HTMLElement, parentSize: THREE.Vector2, parentCollection: HtmlCollection) {
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

  applyChanges2d(changes: string[]) {
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

  getCollection(): HtmlCollection {
    return this.collection;
  }

  getStyle(): CssStyle {
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

  applyHtmlStyle() {
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

  private cssClazzName: string = null;

  private visual: HTMLElement = null;

  getVisual(): HTMLElement {
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
      this.visual.classList.add('three-visual');
      super.setObject(this.visual);
    }
    if (this.parentNode !== null && this.visual.parentNode !== this.parentNode) {
      this.parentNode.appendChild(this.visual);
      this.applyHtmlStyle();
    }
    return this.visual;
  }
}
