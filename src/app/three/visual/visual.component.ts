import { Component, ContentChildren, ElementRef, Input, OnInit, Output, QueryList, EventEmitter } from '@angular/core';
import { BackgroundComponent } from '../background/background.component';
import { HtmlComponent } from '../html/html.component';
import { CssStyle, ThreeUtil } from '../interface';
import { TransformComponent } from '../transform/transform.component';
import * as THREE from 'three';
import { ControllerComponent } from '../controller/controller.component';

export interface HtmlCollection {
  html : HTMLElement;
  name : string;
  component : VisualComponent | any;
  children : HtmlCollection[];
}

@Component({
  selector: 'three-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent implements OnInit {

  @Input() type: string = "div";
  @Input() name: string = null;
  @Input() childType: string = 'innerHTML';
  @Input() src: string = null;
  @Input() value: string | number = '';
  @Input() inputType: string | number = 'text';
  @Input() checked: string | number = 'false';

  @Input() radioValues: {
    value? : string;
    text? : string;
  }[] = null;

  @Input() selectOptions: {
    value? : string;
    text? : string;
  }[] = null;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() click: EventEmitter<any> = new EventEmitter<any>();
  @Output() dblclick: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  @Output() keyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() keydown: EventEmitter<any> = new EventEmitter<any>();
  @Output() load: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() mousedown: EventEmitter<any> = new EventEmitter<any>();
  @Output() mouseout: EventEmitter<any> = new EventEmitter<any>();
  @Output() mouseover: EventEmitter<any> = new EventEmitter<any>();
  @Output() mousemove: EventEmitter<any> = new EventEmitter<any>();
  @Output() mouseup: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(VisualComponent) children: QueryList<VisualComponent>;
  @ContentChildren(HtmlComponent) html: QueryList<HtmlComponent>;
  @ContentChildren(TransformComponent) transform: QueryList<TransformComponent>;
  @ContentChildren(BackgroundComponent) background: QueryList<BackgroundComponent>;
	@ContentChildren(ControllerComponent, { descendants: false }) controller: QueryList<ControllerComponent>;

  private collection : HtmlCollection = {
    html : null,
    name : null,
    component : this,
    children : []
  };

  constructor(private ele: ElementRef) { }

  ngOnInit(): void {
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
    this.controller.changes.subscribe(() => {
      this.synkObject2D(['controller']);
    });
  }

  private parentNode: HTMLElement = null;
  private parentSize: THREE.Vector2 = null;
  private eleSize: THREE.Vector2 = null;
  private parentCollection : HtmlCollection = null;

  setParentNode(parentNode: HTMLElement, parentSize: THREE.Vector2, parentCollection : HtmlCollection) {
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

  synkObject2D(synkTypes: string[]) {
    if (this.visual !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'children':
            this.children.forEach((child) => {
              child.setParentNode(this.visual, this.eleSize, this.collection);
            });
            break;
          case 'html':
            this.html.forEach((html) => {
              html.setParent(this.visual);
            });
            break;
          case 'transform':
            if (this.parentSize !== null) {
              this.transform.forEach((transform) => {
                transform.setParentNode(this.visual, this.parentSize, this.eleSize);
              });
            }
            break;
          case 'background':
            this.background.forEach((background) => {
              background.setParentNode(this.visual);
            });
            break;
            case 'controller':
              this.controller.forEach((controller) => {
                controller.setObject2D(this.collection);
              });
              break;
        }
      });
    }
  }

  getCollection():HtmlCollection {
    return this.collection;
  }

  getStyle(): CssStyle {
    const style: CssStyle = {
      width: '100%',
      height: '100%',
    }
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
        }
      }
      if (this.change.observers.length > 0) {
        style.change = (e) => {
          this.change.emit(e);
        }
      }
      if (this.dblclick.observers.length > 0) {
        style.dblclick = (e) => {
          this.dblclick.emit(e);
        }
      }
      if (this.focus.observers.length > 0) {
        style.focus = (e) => {
          this.focus.emit(e);
        }
      }
      if (this.keyup.observers.length > 0) {
        style.keyup = (e) => {
          this.keyup.emit(e);
        }
      }
      if (this.keydown.observers.length > 0) {
        style.keydown = (e) => {
          this.keydown.emit(e);
        }
      }
      if (this.load.observers.length > 0) {
        style.load = (e) => {
          this.load.emit(e);
        }
      }
      if (this.select.observers.length > 0) {
        style.select = (e) => {
          this.select.emit(e);
        }
      }
      if (this.mousedown.observers.length > 0) {
        style.mousedown = (e) => {
          this.mousedown.emit(e);
        }
      }
      if (this.mouseout.observers.length > 0) {
        style.mouseout = (e) => {
          this.mouseout.emit(e);
        }
      }
      if (this.mouseover.observers.length > 0) {
        style.mouseover = (e) => {
          this.mouseover.emit(e);
        }
      }
      if (this.mousemove.observers.length > 0) {
        style.mousemove = (e) => {
          this.mousemove.emit(e);
        }
      }
      if (this.mouseup.observers.length > 0) {
        style.mouseup = (e) => {
          this.mouseup.emit(e);
        }
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
      this.synkObject2D(['transform', 'background', 'children','controller']);
    }
  }

  private cssClazzName: string = null;

  private visual: HTMLElement = null;

  getVisual(): HTMLElement {
    if (this.visual === null) {
      let visual: HTMLElement = null;
      let texthold : HTMLElement = null;
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
          const textarea : HTMLTextAreaElement = document.createElement('textarea') ;
          textarea.name = "textarea";
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
              this.radioValues.forEach(radioValue => {
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
                radiotext.innerText = (radioValue.text || '');
                label.appendChild(radiotext);
                visual.appendChild(label);
              });
            }
            texthold = document.createElement('span');
            visual.appendChild(texthold);
            break;
        case 'button':
          visual = document.createElement("button");
          break;
        case 'div':
        default:
          visual = document.createElement("div");
          break;
      }
      if (visual.tagName !== 'IMG' && visual.tagName !== 'IFRAME') {
        switch (this.childType.toLowerCase()) {
          case 'innerhtml': {
            const ele: HTMLElement = ThreeUtil.getChildElementSave(this.ele.nativeElement);
            if (texthold !== null) {
              texthold.innerHTML = ele.innerHTML
            } else {
              visual.innerHTML = ele.innerHTML
            }
          }
            break;
          case 'innertext': {
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
    }
    if (this.parentNode !== null && this.visual.parentNode !== this.parentNode) {
      this.parentNode.appendChild(this.visual);
      this.applyHtmlStyle();
    }
    this.synkObject2D(['html', 'transform', 'background', 'children','controller']);
    return this.visual;
  }

}
