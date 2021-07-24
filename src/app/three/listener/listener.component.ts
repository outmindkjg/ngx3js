import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AbstractObject3dComponent } from '../object3d.abstract';

/**
 * ListenerComponent
 */
@Component({
  selector: 'ngx3js-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.scss'],
  providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ListenerComponent) }],
})
export class ListenerComponent extends AbstractObject3dComponent implements OnInit {
  /**
   * Set the volume.
   */
  @Input() private volume: number = 1;

  /**
   * Creates an instance of listener component.
   */
  constructor() {
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
    super.ngOnInit('listener');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.listener !== null && this.listener.parent !== null) {
      this.listener.parent.remove(this.listener);
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
    if (changes && this.listener) {
      this.addChanges(changes);
      // this.resetListener(); todo
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  /**
   * Listener  of listener component
   */
  private listener: THREE.AudioListener = null;

  /**
   * Sets parent
   * @param parent
   * @returns true if parent
   */
  public setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.resetListener();
      return true;
    } else {
      return false;
    }
  }

  /**
   * Resets listener
   */
  public resetListener() {
    if (this.listener === null || this._needUpdate) {
      this.listener = this.getListener();
    }
    if (this.listener !== null && this.parent !== null) {
      this.listener.setMasterVolume(this.volume);
      if (!this.visible && this.listener.parent !== null) {
        this.listener.parent.remove(this.listener);
        this.listener.setMasterVolume(0);
      } else if (this.visible && this.listener.parent === null) {
        if (this.listener.parent !== this.parent) {
          if (this.listener.parent !== null && this.listener.parent !== undefined) {
            this.listener.parent.remove(this.listener);
          }
          this.parent.add(this.listener);
        }
        this.listener.setMasterVolume(this.volume);
      }
      this.listener.visible = this.visible;
    }
  }

  /**
   * Gets listener
   * @returns listener
   */
  public getListener(): THREE.AudioListener {
    if (this.listener === null || this._needUpdate) {
      this.needUpdate = false;
      this.listener = new THREE.AudioListener();
      super.setObject3d(this.listener);
    }
    return this.listener;
  }
}
