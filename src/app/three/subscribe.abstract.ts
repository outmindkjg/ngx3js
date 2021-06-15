import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ThreeUtil } from './interface';

@Component({
  template: '',
})
export abstract class AbstractSubscribeComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  @Input() protected debug: boolean = false;
  @Input() protected windowExport: string = null;
  @Input() public enabled: boolean = true;
  @Input() private overrideParams: { [key: string]: any } = null;
  @Input() private userData: any = null;
  @Input() private tween: { [key: string]: any } = null;

  @Output() private onLoad: EventEmitter<this> = new EventEmitter<this>();
  @Output() private onDestory: EventEmitter<this> = new EventEmitter<this>();

  protected OBJECT_ATTR: string[] = ['init', 'debug', 'enabled', 'userdata', 'overrideparams', 'windowexport', 'tween'];

  constructor() {}

  protected id: string = '';

  ngOnInit(subscribeType?: string): void {
    this.id = subscribeType + '_' + Math.round(10000 + Math.random() * 10000) + '_' + Math.round(10000 + Math.random() * 10000);
    this.setSubscribeType(subscribeType);
    ThreeUtil.setThreeComponent(this.id, this);
    this._userData.component = this.id;
  }

  ngOnDestroy(): void {
    if (this._subscribe !== null) {
      for (let key in this._subscribe) {
        this._subscribe[key].unsubscribe();
      }
      this._subscribe = {};
    }
    if (this._subscribeList !== null) {
      for (let key in this._subscribeList) {
        this._subscribeList[key].forEach((subscribe) => {
          subscribe.unsubscribe();
        });
      }
      this._subscribeList = {};
    }
    this.dispose();
    ThreeUtil.setThreeComponent(this.id, null);
    this.onDestory.emit(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tween) {
      this.setTween(this.tween);
      delete changes.tween;
    }
    if (changes.overrideParams) {
      this.updateInputParams(this.overrideParams, false, changes);
      delete changes.overrideParams;
    }
  }

  ngAfterContentInit(): void {}

  setTween(tweenData  : { [key : string ] : any}) {
    if (ThreeUtil.isNotNull(tweenData)) {
      const tween: { [key: string]: any } = {
        elapsedTime: 0,
        elapsedAlpha : 0
      };
      let tweenLength = 0;
      Object.entries(tweenData).forEach(([key, value]) => {
        if (ThreeUtil.isNotNull(value)) {
          switch (key.toLowerCase()) {
            case 'position':
              tween.position = ThreeUtil.getPosition(value);
              tweenLength++;
              break;
            case 'scale':
              tween.scale = ThreeUtil.getScale(value);
              tweenLength++;
              break;
            case 'lookat':
              tween.lookat = ThreeUtil.getLookAt(value);
              tweenLength++;
              break;
            case 'rotation':
              tween.rotation = ThreeUtil.getRotation(value);
              tweenLength++;
              break;
            case 'specular':
            case 'emissive':
            case 'sheen':
            case 'specular':
            case 'specular':
            case 'color':
              tween[key] = ThreeUtil.getColor(value);
              tweenLength++;
              break;
            default:
              tween[key] = value;
              tweenLength++;
              break;
          }
        }
      });
      if (tweenLength > 0) {
        this.setUserData('tween', tween);
      } else {
        this.setUserData('tween', null);
      }
      console.log(this._userData);
    } else {
      this.setUserData('tween', null);
    }    
  }

  dispose() {}

  setSubscribeType(subscribeType: string) {
    this.subscribeType = subscribeType || 'nonamed';
  }

  protected isIdEuals(id: string): boolean {
    if (id === undefined || id === null || id === '' || id === this.id) {
      return true;
    } else {
      return false;
    }
  }

  protected callOnLoad() {
    this.onLoad.emit(this);
    this.setSubscribeNext(this.subscribeType);
  }

  protected _needUpdate: boolean = true;

  protected set needUpdate(value: boolean) {
    if (value && !this._needUpdate) {
      this._needUpdate = true;
      this.clearChanges();
      this.addChanges('clearinit');
    } else if (!value && this._needUpdate) {
      this._needUpdate = false;
      this.clearChanges();
    }
  }

  private _changeList: string[] = null;

  protected checkChanges(changes: SimpleChanges): SimpleChanges {
    return changes;
  }

  private _logTimeSeqn: number = 0;
  protected consoleLogTime(key: string, object: any, repeat: number = 300): void {
    this._logTimeSeqn++;
    if (this._logTimeSeqn % repeat === 0) {
      this.consoleLog(key, object, 'info');
    }
  }

  protected consoleLog(key: string, object: any, level: string = 'log'): void {
    switch (level) {
      case 'error':
        console.error(this.subscribeType, key, object);
        break;
      case 'info':
        console.info(this.subscribeType, key, object);
        break;
      case 'trace':
        console.trace(this.subscribeType, key, object);
        break;
      case 'log':
      default:
        // console.log(this.subscribeType ,key, object);
        break;
    }
  }

  private _applyChangeBind: any = null;

  public addChanges(key: string | string[] | SimpleChanges) {
    if (this._changeList === null) {
      this._changeList = [];
    }
    if (typeof key === 'string') {
      if (this._changeList.indexOf(key) === -1) {
        this._changeList.push(key);
      }
    } else if (Array.isArray(key)) {
      key.forEach((subKey) => {
        if (this._changeList.indexOf(subKey) === -1) {
          this._changeList.push(subKey);
        }
      });
    } else {
      Object.entries(key).forEach(([subKey, _]) => {
        if (this._changeList.indexOf(subKey) === -1) {
          this._changeList.push(subKey);
        }
      });
    }
    if (this._applyChangeBind === null && this._changeList.length > 0) {
      this._applyChangeBind = setTimeout(() => {
        this._applyChangeBind = null;
        if (this._changeList !== null && this._changeList.length > 0) {
          this.applyChanges(this.getChanges());
        }
      }, 5);
    }
  }

  protected getChanges(): string[] {
    const changes: string[] = [];
    (this._changeList || []).forEach((change) => {
      changes.push(change.toLowerCase());
    });
    if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
      this._needUpdate = true;
    }
    this._changeList = [];
    return changes;
  }

  protected clearChanges() {
    this._changeList = null;
  }

  protected applyChanges(changes: string[]) {
    if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
      return;
    }
    if (ThreeUtil.isIndexOf(changes, ['init'])) {
      changes = ThreeUtil.pushUniq(changes, ['userdata']);
    }
    changes.forEach((change) => {
      switch (change.toLowerCase()) {
        case 'userdata':
          if (ThreeUtil.isNotNull(this.userData)) {
            Object.entries(this.userData).forEach(([key, value]) => {
              switch (key) {
                case 'position':
                case 'positionUp':
                case 'positionLookat':
                case 'initPosition':
                case 'rotation':
                case 'scale':
                case 'lookat':
                case 'customDepthMaterial':
                case 'customDistanceMaterial':
                case 'material':
                case 'geometry':
                  this.consoleLog('userData Error', key, 'error');
                  break;
                default:
                  this._userData[key] = value;
                  break;
              }
            });
          }
          break;
      }
    });
    this.clearChanges();
  }

  private _cashedObj: any = null;

  protected getObject(): any {
    return this._cashedObj;
  }

  private _userData: { [key: string]: any } = {};

  setUserData(key: string, value: any) {
    if (ThreeUtil.isNotNull(value)) {
      this._userData[key] = value;
    } else if (ThreeUtil.isNotNull(this._userData[key])) {
      delete this._userData[key];
    }
  }

  protected setObject(obj: any) {
    if (this._cashedObj !== obj) {
      this._cashedObj = obj;
      this.needUpdate = false;
      if (ThreeUtil.isNotNull(this._cashedObj)) {
        if (ThreeUtil.isNotNull(this._cashedObj.userData)) {
          Object.entries(this._userData).forEach(([key, value]) => {
            switch (key) {
              case 'position':
              case 'positionUp':
              case 'positionLookat':
              case 'initPosition':
              case 'rotation':
              case 'scale':
              case 'lookat':
              case 'customDepthMaterial':
              case 'customDistanceMaterial':
              case 'material':
              case 'geometry':
                delete this._userData[key];
                break;
            }
          });
          this._cashedObj.userData = this._userData;
        }
        if (this.debug) {
          this.consoleLog(this.subscribeType, this._cashedObj);
        }
        this.applyChanges(['init']);
        this.callOnLoad();
        if (ThreeUtil.isNotNull(this.windowExport) && this.windowExport != '') {
          window[this.windowExport] = this._cashedObj;
        }
      }
    }
  }

  private _subject: Subject<string[]> = new Subject<string[]>();

  public getSubscribe(): Observable<string[]> {
    return this._subject.asObservable();
  }

  private _subscribeNext: string[] = [];

  private _subscribeTimeout: any = null;

  public setSubscribeNext(key: string | string[]) {
    if (key !== null && key !== '') {
      if (Array.isArray(key)) {
        key.forEach((subKey) => {
          subKey = subKey.toLowerCase();
          if (this._subscribeNext.indexOf(subKey) === -1) {
            this._subscribeNext.push(subKey);
          }
        });
      } else {
        key = key.toLowerCase();
        if (this._subscribeNext.indexOf(key) === -1) {
          this._subscribeNext.push(key);
        }
        switch (key) {
          case 'scene':
          case 'camera':
          case 'ligher':
          case 'mesh':
          case 'helper':
          case 'audio':
            if (this._subscribeNext.indexOf('object3d') === -1) {
              this._subscribeNext.push('object3d');
            }
            break;
        }
      }
      if (this._subscribeTimeout === null && this._subscribeNext.length > 0) {
        this._subscribeTimeout = setTimeout(() => {
          this._subscribeTimeout = null;
          if (this._subscribeNext.length > 0) {
            // this.consoleLog('subscribeNext',this._subscribeNext, 'info');
            const subscribeNext: string[] = [];
            this._subscribeNext.forEach((text) => {
              subscribeNext.push(text);
            });
            this._subscribeNext = [];
            this._subject.next(subscribeNext);
          }
        }, 30);
      }
    } else {
      console.trace(this);
    }
  }

  protected unSubscription(subscriptions: Subscription[]): Subscription[] {
    if (subscriptions !== null && subscriptions.length > 0) {
      subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
    return [];
  }

  private _subscribe: { [key: string]: Subscription } = {};

  protected unSubscribeRefer(key: string) {
    if (ThreeUtil.isNotNull(this._subscribe[key])) {
      this._subscribe[key].unsubscribe();
      delete this._subscribe[key];
    }
  }

  protected subscribeRefer(key: string, subscription: Subscription) {
    if (ThreeUtil.isNotNull(this._subscribe[key])) {
      this.unSubscribeRefer(key);
    }
    if (ThreeUtil.isNotNull(subscription)) {
      this._subscribe[key] = subscription;
    }
  }

  protected subscribeType: string = null;

  private _localComponents: { [key: string]: OnInit & OnDestroy } = {};

  private _subscribeList: { [key: string]: Subscription[] } = {};

  protected destroyLocalComponent(key: string) {
    if (ThreeUtil.isNotNull(this._localComponents[key])) {
      this._localComponents[key].ngOnDestroy();
      delete this._localComponents[key];
    }
  }

  protected initLocalComponent<T extends OnInit & OnDestroy>(key: string, component: T): T {
    if (ThreeUtil.isNotNull(this._localComponents[key])) {
      this.destroyLocalComponent(key);
    }
    if (ThreeUtil.isNotNull(component)) {
      component.ngOnInit();
      this._localComponents[key] = component;
    }
    return component;
  }

  public updateInputParams(params: { [key: string]: any }, firstChange: boolean = true, changes: SimpleChanges = {}, type: string = null) {
    if (ThreeUtil.isNotNull(params)) {
      Object.entries(params).forEach(([key, value]) => {
        if (this[key] !== undefined && this[key] !== value && ThreeUtil.isNotNull(value)) {
          changes[key] = new SimpleChange(this[key], value, firstChange);
          this[key] = value;
        }
      });
    }
    if (ThreeUtil.isNotNull(type)) {
      if (this['type'] !== undefined) {
        if (this['type'] !== type) {
          changes.type = new SimpleChange(this['type'], type, firstChange);
          this['type'] = type;
        }
      }
    }
    if (firstChange) {
      this.ngAfterContentInit();
      this.ngOnChanges(changes);
    }
  }

  protected unSubscribeReferList(key: string) {
    if (ThreeUtil.isNotNull(this._subscribeList[key])) {
      this._subscribeList[key].forEach((subscribe) => {
        subscribe.unsubscribe();
      });
      delete this._subscribeList[key];
    }
  }

  protected subscribeReferList(key: string, subscription: Subscription) {
    if (ThreeUtil.isNull(this._subscribeList[key])) {
      this._subscribeList[key] = [];
    }
    if (ThreeUtil.isNotNull(subscription)) {
      this._subscribeList[key].push(subscription);
    }
  }

  protected subscribeListQueryChange(queryList: QueryList<any>, subscribeKey: string, changeKey: string) {
    if (ThreeUtil.isNotNull(queryList)) {
      this.unSubscribeRefer(subscribeKey + 'Changes');
      this.subscribeRefer(
        subscribeKey,
        queryList.changes.subscribe(() => {
          this.addChanges(changeKey.toLowerCase());
        })
      );
    }
  }

  protected subscribeListQuery(queryList: QueryList<any>, subscribeKey: string, changeKey: string) {
    if (ThreeUtil.isNotNull(queryList)) {
      this.unSubscribeReferList(subscribeKey);
      queryList.forEach((query) => {
        this.subscribeReferList(
          subscribeKey,
          ThreeUtil.getSubscribe(
            query,
            (event) => {
              this.addChanges(event);
            },
            changeKey.toLowerCase()
          )
        );
      });
    }
  }

  protected parent: any = null;

  setParent(parent: any): boolean {
    if (this.parent !== parent) {
      this.parent = parent;
      return true;
    } else {
      return false;
    }
  }
}
