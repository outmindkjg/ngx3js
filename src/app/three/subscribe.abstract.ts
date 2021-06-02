import { AfterContentInit, Component, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ThreeUtil } from './interface';

@Component({
  template: '',
})
export abstract class AbstractSubscribeComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

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
  }

  ngAfterContentInit(): void {}

  private _changeList: string[] = null;

  protected checkChanges(changes: SimpleChanges): SimpleChanges {
    return changes;
  }

  private _logTimeSeqn : number = 0;
  protected consoleLogTime(key: string, object: any): void {
    this._logTimeSeqn ++;
    if (this._logTimeSeqn % 300 === 0) {
      console.log(key, object);
    }
  }

  protected consoleLog(key: string, object: any): void {
    // console.trace(key, object);
  }

  private _applychangeBind: any = null;

  protected addChanges(key: string | SimpleChanges) {
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
      changes.push(change);
    });
    this._changeList = [];
    return changes;
  }

  protected clearChanges() {
    this.consoleLog('changeList', this._changeList);
    this._changeList = null;
  }

  protected applyChanges() {
    this.getChanges();
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

  private _subscribeList: { [key: string]: Subscription[] } = {};

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
          this.addChanges(changeKey);
        })
      );
    }
  }
}
