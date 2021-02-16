import { PhysicsComponent } from './../physics/physics.component';
import { Observable, Subject, Subscription } from 'rxjs';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { RendererTimer, ThreeUtil } from './../interface';
import { ClipComponent } from './../clip/clip.component';
import { Component, OnInit, ContentChildren, QueryList, Input, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss']
})
export class MixerComponent implements OnInit {

  @Input() type : string = "mixer";
  @Input() action : string = "";
  @Input() fps: number = null;
  @Input() duration : number = 0.5;
  @Input() timeScale : number = 1;
  @Input() debug: boolean = false;

  @Input() sync: boolean = null;
	@Input() afterglow: number = null;
	@Input() resetPhysicsOnLoop: boolean = null;
  @Input() physics: boolean = null;
  @Input() warmup: number = null;
  @Input() unitStep: number = null;
  @Input() maxStepNum: number = null;
  @Input() gravity: number = null;
  @Input() delayTime: number = null;
  @Input() animationHelper : MixerComponent = null;

  @ContentChildren(ClipComponent, { descendants: false }) clip: QueryList<ClipComponent>;

  private getFps(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.fps, def);
  }

  private getTimeScale(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.timeScale, def);
  }

  private getSync(def?: boolean) : boolean {
    return ThreeUtil.getTypeSafe(this.sync, def);
  }

  private getAfterglow(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.afterglow, def);
  }

  private getResetPhysicsOnLoop(def?: boolean) : boolean {
    return ThreeUtil.getTypeSafe(this.sync, def);
  }

  private getPhysics(def?: boolean) : boolean {
    return ThreeUtil.getTypeSafe(this.physics, def);
  }

  private getWarmup(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.warmup, def);
  }

  private getUnitStep(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.unitStep, def);
  }

  private getMaxStepNum(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.maxStepNum, def);
  }

  private getGravity(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.gravity, def);
  }

  private getDelayTime(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.delayTime, def);
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.action) {
      this.play(this.action.toLowerCase());
    }
    if (changes.timeScale && this.mixer !== null) {
      this.mixer.timeScale = this.getTimeScale(1);
    }
    if (changes.fps && this.mixer !== null) {
      const fps = this.getFps(20);
      this.clip.forEach(clip => {
        clip.setMixer(this.mixer, this.clips, fps);
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.mixer !== null) {
      this.mixer.stopAllAction();
    }
  }

  private mixer : THREE.AnimationMixer = null;
  private helper : MMDAnimationHelper = null;
  private model : THREE.Object3D | THREE.AnimationObjectGroup = null;
  private clips : THREE.AnimationClip[] = null;

  setModel(model: THREE.Object3D | THREE.AnimationObjectGroup , clips: THREE.AnimationClip[]) {
    if (this.model !== model) {
      this.model = model;
      this.clips = clips;
      if (this.debug) {
        const clipsNames = [];
        this.clips.forEach(clip => {
          clipsNames.push(clip.name);
        })
      }
      this.resetMixer();
      if (this.lastAction !== this.action) {
        this.play(this.action);
      }
    }
  }

  private lastAction : string = null;

  private _animationHelperSubscribe: Subscription = null;

  private _animationHelperSubject:Subject<MMDAnimationHelper> = new Subject<MMDAnimationHelper>();

  private _physics : PhysicsComponent = null;

  private _ammo : any = null;
  setPhysics(physics : PhysicsComponent) {
    this._physics = physics;
    const _physics = this._physics.getPhysics();
    if (_physics !== null) {
      this._ammo = this._physics.getAmmo();
      this.synkAnimationHelper(this.helper);
    } else {
      const subscribe = this._physics.physicsSubscribe().subscribe(() => {
        this._ammo = this._physics.getAmmo();
        this.synkAnimationHelper(this.helper);
        subscribe.unsubscribe();
      });
    }
  }

  animationHelperSubscribe() : Observable<MMDAnimationHelper>{
    return this._animationHelperSubject.asObservable();
  }

  private isAdded : boolean = false;
  synkAnimationHelper(helper : MMDAnimationHelper) {
    if (helper !== null && !this.isAdded) {
      if (this.model instanceof THREE.SkinnedMesh || this.model instanceof THREE.Camera) {
        if (this._ammo || this.getPhysics(false) == false) {
          const skinnedMesh = this.model;
          const oldParent = skinnedMesh.parent;
          if (ThreeUtil.isNotNull(oldParent)) {
            skinnedMesh.parent.remove(skinnedMesh);
            skinnedMesh.parent = null;
          }
          this.clips.forEach(clip => {
            helper.add(skinnedMesh, {
              animation : clip,
              physics : this.getPhysics(),
              // warmup: this.getWarmup(),
              // unitStep: this.getUnitStep(),
              // maxStepNum: this.getMaxStepNum(),
              // gravity: this.getGravity(),
              //gravity: -1000,
              // gravity : new THREE.Vector3(0,0,-90),
              // delayTime: this.getDelayTime()
            })
          });
          if (ThreeUtil.isNotNull(oldParent)) {
            oldParent.add(skinnedMesh);
          }
          this.isAdded = true;
        }
      } else if (this.model instanceof THREE.Audio) {
        helper.add(this.model, {
          delayTime: this.getDelayTime()
        })
      }
    }
  }

  resetMixer() {
    switch(this.type.toLowerCase()) {
      case 'mmd' :
      case 'mmdanimation' :
      case 'mmdanimationhelper' :
        if (this.helper === null) {
            if (this.animationHelper === null) {
              this.helper = new MMDAnimationHelper( {
                sync: this.getSync(),
                afterglow: this.getAfterglow(),
                resetPhysicsOnLoop: this.getResetPhysicsOnLoop()
              });
              // this.helper.sharedPhysics = true;
              this.synkAnimationHelper(this.helper);
              this._animationHelperSubject.next(this.helper);
            } else {
              this.animationHelper.animationHelperSubscribe().subscribe((helper) => {
                this.synkAnimationHelper(helper);
              })
              if (this.animationHelper.helper !== null) {
                this.synkAnimationHelper(this.animationHelper.helper);
              }
            }
        }
        break;
      case 'mixer' :
      default :
        if (this.mixer == null) {
          this.mixer = new THREE.AnimationMixer(this.model);
          this.mixer.timeScale = this.getTimeScale(1);
          const fps = this.getFps();
          this.clip.forEach(clip => {
            clip.setMixer(this.mixer, this.clips, fps);
          });
        }
        break;
    }
  }

  lastPlayedClip : ClipComponent = null;
  play(name : string) {
    if (this.mixer !== null && this.clip !== null && this.clip !== undefined && this.clip.length > 0) {
      this.lastAction = name.toLowerCase();
      let foundAction:ClipComponent = null;
      this.clip.forEach(clip => {
        if (clip.isPlayable()) {
          clip.action.paused = false;
          if (clip.name.toLowerCase() == this.lastAction) {
            foundAction = clip;
          }
        }
      });
      if (this.lastPlayedClip !== null) {
        if (foundAction !== null) {
          this.lastPlayedClip.crossFadeTo(foundAction, this.duration);
        } else {
          this.lastPlayedClip.fadeOut(this.duration);
        }
      } else if (foundAction !== null){
        foundAction.fadeIn(this.duration);
      }
      this.lastPlayedClip = foundAction;
    }
  }

  update(timer : RendererTimer) {
    if (this.helper !== null) {
      this.helper.update( timer.delta );
    } else if (this.mixer !== null) {
      this.mixer.update( timer.delta );
    }
  }
}
