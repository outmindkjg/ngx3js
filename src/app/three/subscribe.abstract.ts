import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ThreeUtil } from './interface';

@Component({
  template: '',
})
export abstract class AbstractSubscribeComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {

  @Input() protected debug: boolean = false;
  @Input() private overrideParams: {[key : string] : any } = null;

  @Output() private onLoad: EventEmitter<this> = new EventEmitter<this>();
  @Output() private onDestory: EventEmitter<this> = new EventEmitter<this>();

  constructor() {}
  

  ngOnInit(subscribeType?: string): void {
    this.setSubscribeType(subscribeType);
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
    this.onDestory.emit(this);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.overrideParams) {
      this.updateInputParams(this.overrideParams, false, changes);
      delete changes.overrideParams;
    }
  }

  ngAfterContentInit(): void {}

  setSubscribeType(subscribeType: string) {
    this.subscribeType = subscribeType || 'nonamed';
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

  private _logTimeSeqn : number = 0;
  protected consoleLogTime(key: string, object: any, repeat : number = 300): void {
    this._logTimeSeqn ++; 
    if (this._logTimeSeqn % repeat === 0) {
      console.log(key, object);
    }
  }

  protected consoleLog(key: string, object: any, level : string = 'log'): void {
    switch(level) {
      case 'error' :
        console.error(this.subscribeType ,key, object);
        break;
      case 'info' :
        console.info(this.subscribeType ,key, object);
        break;
      case 'trace' :
        console.trace(this.subscribeType ,key, object);
        break;
      case 'log' :
      default :
        // console.log(this.subscribeType ,key, object);
        break;
      
    }
  }

  private _applychangeBind: any = null;

  public addChanges(key: string | SimpleChanges) {
    if (this._changeList === null) {
      this._changeList = [];
    }
    if (typeof key === 'string') {
      if (this._changeList.indexOf(key) === -1) {
        this._changeList.push(key);
      }
    } else {
      Object.entries(key).forEach(([subKey, _]) => {
        if (this._changeList.indexOf(subKey) === -1) {
          this._changeList.push(subKey);
        }
      });
    }
    if (this._applychangeBind === null && this._changeList.length > 0) {
      this._applychangeBind = setTimeout(() => {
        this._applychangeBind = null;
        if (this._changeList !== null && this._changeList.length > 0) {
          this.applyChanges();
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

  protected applyChanges() {
    this.synkObject(this.getChanges());
  }

  private _cashedObj : any = null;

  protected setObject(obj : any) {
    if (this._cashedObj !== obj) {
      this._cashedObj = obj;
      this.needUpdate = false;
      if (ThreeUtil.isNotNull(this._cashedObj)) {
        if (this.debug) {
          this.consoleLog(this.subscribeType, this._cashedObj);
        }
        this.synkObject(['init'])
        this.callOnLoad();
      }
    }
  }
  
  protected synkObject(synkTypes: string[]) {
    this.consoleLog('synkTypes', synkTypes);
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
      }
      if (this._subscribeTimeout === null && this._subscribeNext.length > 0) {
        this._subscribeTimeout = setTimeout(() => {
          this._subscribeTimeout = null;
          if (this._subscribeNext.length > 0) {
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

  private _localComponents : { [key : string] : OnInit & OnDestroy} = {};

  private _subscribeList: { [key: string]: Subscription[] } = {};

  protected destroyLocalComponent(key: string) {
    if (ThreeUtil.isNotNull(this._localComponents[key])) {
      this._localComponents[key].ngOnDestroy();
      delete this._localComponents[key];
    }
  }

  protected initLocalComponent<T extends OnInit & OnDestroy>(key: string, component: T):T {
    if (ThreeUtil.isNotNull(this._localComponents[key])) {
      this.destroyLocalComponent(key);
    }
    if (ThreeUtil.isNotNull(component)) {
      component.ngOnInit();
      this._localComponents[key] = component;
    }
    return component;
  }

  public updateInputParams(params : { [key : string] : any } , firstChange : boolean = true, changes : SimpleChanges = {}) {
    if (ThreeUtil.isNotNull(params)) {
      Object.entries(params).forEach(([key, value]) => {
        if (this[key] !== undefined) {
          if (this[key] !== value && ThreeUtil.isNotNull(value)) {
            changes[key] = new SimpleChange(this[key], value, firstChange);
            this[key] = value;
          }
        }
      });
      if (firstChange) {
        this.ngAfterContentInit();
        this.ngOnChanges(changes);
      }
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

  protected subscribeListQuery(queryList: QueryList<any>, subscribeKey: string, changeKey: string) {
    if (ThreeUtil.isNotNull(queryList)) {
      this.unSubscribeReferList(subscribeKey);
      this.subscribeReferList(
        subscribeKey,
        queryList.changes.subscribe(() => {
          this.addChanges(changeKey.toLowerCase());
        })
      );
    }
  }
}
