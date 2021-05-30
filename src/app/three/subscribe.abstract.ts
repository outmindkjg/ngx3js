import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ThreeUtil } from './interface';

@Component({
  template: '',
})
export abstract class AbstractSubscribeComponent
  implements OnInit, OnChanges, OnDestroy {

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    if (this._subscribe !== null) {
      for (let key in this._subscribe) {
        this._subscribe[key].unsubscribe();
      }
      this._subscribe = {}
    }
    if (this._subscribeList !== null) {
      for (let key in this._subscribeList) {
        this._subscribeList[key].forEach(subscribe => {
          subscribe.unsubscribe();
        });
      }
      this._subscribeList = {};
    }
  }

  private _changeList : string[] = null;
  
  protected addChanges(key : string) {
    if (this._changeList === null) {
      this._changeList = [];
    }
    if (this._changeList.indexOf(key) === -1) {
      this._changeList.push(key);
      if (this._changeList.length === 1) {
        setTimeout(() => {
          this.applyChanges();
        },1);
      }
    }
  }

  protected getChanges() : string[] {
    return this._changeList || [];
  }

  protected clearChanges() {
    this._changeList = null;
  }
  
  protected applyChanges() {
    this._changeList = null;
  }

  private _subject: Subject<string[]> = new Subject<string[]>();

  public getSubscribe(): Observable<string[]> {
    return this._subject.asObservable();
  }
  private _subscribeNext : string[] = [];

  protected setSubscribeNext(key : string | string[]) {
    if (this._subscribeNext.length == 0) {
      setTimeout(() => {
        if (this._subscribeNext.length > 0) {
          this._subject.next(this._subscribeNext);
          this._subscribeNext = [];
        }
      },10);
    }
    if (Array.isArray(key)) {
      key.forEach(subKey => {
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
    if (ThreeUtil.isNotNull(this._subscribe[key])) {
      this._subscribeList[key].forEach(subscribe => {
        subscribe.unsubscribe();
      })
      delete this._subscribeList[key];
    }
  }

  protected subscribeReferList(key: string, subscription: Subscription) {
    if (ThreeUtil.isNotNull(subscription)) {
      if (ThreeUtil.isNull(this._subscribeList[key])) {
        this._subscribeList[key] = [];
      }
      this._subscribeList[key].push(subscription);
    }
  }

  protected subscribeListQuery(queryList : QueryList<any>, subscribeKey : string, changeKey : string) {
    if (ThreeUtil.isNotNull(queryList)) {
      const callBack = () => {
        this.unSubscribeReferList(subscribeKey);
        queryList.forEach((query) => {
          this.subscribeReferList(
            subscribeKey,
            ThreeUtil.getSubscribe(query, () => {
              this.addChanges(changeKey);
            }, changeKey)
          );
        });
      }
      queryList.changes.subscribe((e) => {
        callBack();
      });
      callBack();
    }
  }

}
