import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ClipComponent } from './../clip/clip.component';
import { RendererTimer, ThreeUtil } from './../interface';
import { PhysicsComponent } from './../physics/physics.component';

@Component({
  selector: 'three-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss']
})
export class MixerComponent extends AbstractSubscribeComponent implements OnInit {

  @Input() public type: string = "mixer";
  @Input() private action: string = "";
  @Input() private fps:number = null;
  @Input() private duration: number = 0.5;
  @Input() private timeScale: number = 1;

  @Input() private sync:boolean = null;
	@Input() private afterglow:number = null;
	@Input() private resetPhysicsOnLoop:boolean = null;
  @Input() private physics:boolean = null;
  @Input() private warmup:number = null;
  @Input() private unitStep:number = null;
  @Input() private maxStepNum:number = null;
  @Input() private gravity:number = null;
  @Input() private delayTime:number = null;
  @Input() private animationHelper: MixerComponent = null;
  @Input() private skin: number = null;
  @Input() private weapon: number = null;
  @Input() private controls: any = null;
  @Input() private mmdHelpers : string[] = null;

  @ContentChildren(ClipComponent, { descendants: false }) private clipList: QueryList<ClipComponent>;

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
    return ThreeUtil.getTypeSafe(this.resetPhysicsOnLoop, def);
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

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('mixer');
  }

  ngOnDestroy(): void {
    if (this.mixer !== null) {
      this.mixer.stopAllAction();
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.mixer) {
      this.addChanges(changes);
      /*
    if (changes.action) {
      this.play(this.action.toLowerCase());
    }
    if (changes.timeScale && this.mixer !== null) {
      this.mixer.timeScale = this.getTimeScale(1);
    }
    if (changes.fps && this.mixer !== null) {
      const fps = this.getFps(20);
      this.clipList.forEach(clip => {
        clip.setMixer(this.mixer, this.clips, fps);
      });
    } 
    if (changes.weapon) {
      if (this.clips !== null && this.clips.setWeapon) {
        this.clips.setWeapon(this.weapon);
      }
    }
    if (changes.skin) {
      if (this.clips !== null && this.clips.setSkin) {
        this.clips.setSkin(this.skin);
      }
    }
    if (changes.pose) {
      if (this.model instanceof THREE.SkinnedMesh) {
        // this.helper.pose(this.model, null);
      }
    }
    todo
      */
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private mixer : THREE.AnimationMixer = null;
  private helper : MMDAnimationHelper = null;
  private model : THREE.Object3D | THREE.AnimationObjectGroup = null;
  private clips : THREE.AnimationClip[] | any = null;

  setModel(model: THREE.Object3D | THREE.AnimationObjectGroup , clips: THREE.AnimationClip[] | any) {
    if (this.model !== model) {
      this.model = model;
      this.clips = clips;
      this.helper = null;
      if (this.debug) {
        const clipsNames = [];
        if (this.clips.forEach) {
          this.clips.forEach(clip => {
            clipsNames.push(clip.name);
          })
        } else if (this.clips.meshBody && this.clips.meshBody.geometry&& this.clips.meshBody.geometry.animations) {
          this.clips.meshBody.geometry.animations.forEach(clip => {
            clipsNames.push(clip.name);
          })
        }
      }
      this.resetMixer();
      if (this.lastAction !== this.action) {
        if (this.delayTime > 0) {
          setTimeout(() => {
            this.play(this.action);
          }, this.delayTime);
        } else {
          this.play(this.action);
        }
      }
    }
  }

  private lastAction : string = null;

  private _physics : PhysicsComponent = null;

  private _ammo : any = null;
  setPhysics(physics : PhysicsComponent) {
    this._physics = physics;
    if (this._physics !== null && this._physics !== undefined) {
      const _physics = this._physics.getPhysics();
      if (_physics !== null) {
        this._ammo = this._physics.getAmmo();
        this.synkAnimationHelper(this.helper);
      } else {
        this.unSubscribeRefer('physics');
        this.subscribeRefer('physics', ThreeUtil.getSubscribe(this._physics, () => {
          this._ammo = this._physics.getAmmo();
          this.synkAnimationHelper(this.helper);
        },'physics'))
      }
    }
  }

  fadeToAction(endAction : string , duration? : number, restoreAction? : string, restoreDuration? : number ) {
    if (this.mixer !== null) {
      if (this.play(endAction, duration )) {
        if (ThreeUtil.isNotNull(restoreAction)) {
          const listener = () => {
            this.mixer.removeEventListener('finished', listener);
            this.play(restoreAction, restoreDuration );
          }
          this.mixer.addEventListener('finished', listener);
        }
      }
    }
  }

  private isAdded : boolean = false;
  private mmdAnimationHelpers : THREE.Object3D[] = [];

  
  getMmdAnimationHelper() : MMDAnimationHelper {
    return this.helper;
  }

  getMmdAnimationHelperObject3D() : THREE.Object3D[]{
    return this.mmdAnimationHelpers;
  }

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
          this.mmdAnimationHelpers.forEach(mmdHelper => {
            if (mmdHelper.parent) {
              mmdHelper.parent.remove(mmdHelper);
            }
          });
          this.mmdAnimationHelpers = [];
          if (ThreeUtil.isNotNull(this.mmdHelpers)) {
            let rootObject3d: THREE.Object3D = skinnedMesh;
            while(rootObject3d.parent) {
              rootObject3d = rootObject3d.parent;
            }
            let objectsHelper:any = helper['objects'].get( skinnedMesh );
            this.mmdHelpers.forEach(mmdHelper => {
              switch(mmdHelper.toLowerCase()) {
                case 'iksolver' :
                  if (objectsHelper.ikSolver) {
                    this.mmdAnimationHelpers.push(objectsHelper.ikSolver.createHelper());
                  }
                  break;
                case 'physics' :
                  if (objectsHelper.physics) {
                    this.mmdAnimationHelpers.push(objectsHelper.physics.createHelper());
                  }
                  break;
              }
            })
            this.mmdAnimationHelpers.forEach(mmdAnimationHelper => {
              rootObject3d.add(mmdAnimationHelper);
            });
          }
          super.callOnLoad();
          this.isAdded = true;
        }
      } else if (this.model instanceof THREE.Audio) {
        if (this.model.buffer !== null) {
          helper.add(this.model, {
            delayTime: this.getDelayTime()
          })
        } else {
          console.error('mix error');
        }
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
              this.synkAnimationHelper(this.helper);
              this.setSubscribeNext('animation');
            } else {
              this.unSubscribeRefer('animation');
              this.subscribeRefer('animation', ThreeUtil.getSubscribe(this.animationHelper, () => {
                this.synkAnimationHelper(this.animationHelper.helper);
              }, 'animation'));
              if (this.animationHelper.helper !== null) {
                this.synkAnimationHelper(this.animationHelper.helper);
              }
            }
            super.callOnLoad();
        }
        break;
      case 'mixer' :
        if (this.mixer == null) {
          this.mixer = new THREE.AnimationMixer(this.model);
          this.mixer.timeScale = this.getTimeScale(1);
          const fps = this.getFps();
          this.clipList.forEach(clip => {
            clip.setMixer(this.mixer, this.clips, fps);
          });
          super.callOnLoad();
        }
        break;
      case 'virtulous' :
      default :
        if (this.clips !== null) {
          if (ThreeUtil.isNotNull(this.weapon) && this.clips.setWeapon) {
            this.clips.setWeapon(this.weapon);
          }
          if (ThreeUtil.isNotNull(this.skin) && this.clips.setSkin) {
            this.clips.setSkin(this.skin);
          }
          if (ThreeUtil.isNotNull(this.controls) && this.clips.controls !== undefined) {
            this.clips.controls = this.controls;
          }
        }
        break;
      }
  }

  lastPlayedClip : ClipComponent = null;
  play(name : string, duration : number = this.duration): boolean {
    if (ThreeUtil.isNotNull(name) && name !== '' && this.mixer !== null && this.clipList !== null && this.clipList !== undefined && this.clipList.length > 0) {
      duration = ThreeUtil.getTypeSafe(duration, this.duration);
      this.lastAction = name.toLowerCase();
      let foundAction:ClipComponent = null;
      this.clipList.forEach(clip => {
        if (clip.isPlayable()) {
          clip.action.paused = false;
          if (clip.name.toLowerCase() == this.lastAction) {
            foundAction = clip;
          }
        }
      });
      if (this.lastPlayedClip !== null) {
        if (foundAction !== null) {
          this.lastPlayedClip.crossFadeTo(foundAction, duration);
        } else {
          this.lastPlayedClip.fadeOut(duration);
        }
      } else if (foundAction !== null){
        foundAction.fadeIn(duration);
      }
      this.lastPlayedClip = foundAction;
      return true;
    } else if (this.clips && this.clips.setAnimation) {
      this.clips.setAnimation(name);
      return true;
    } else {
      return false;
    }
  }

  update(timer : RendererTimer) {
    if (this.helper !== null) {
      this.helper.update( timer.delta );
    } else if (this.mixer !== null) {
      this.mixer.update( timer.delta );
    } else if (this.clips !== null) {
      if (this.clips.setTime) {
        this.clips.setTime(timer.elapsedTime * this.timeScale);
      } else if (this.clips.update) {
        try {
          this.clips.update(timer.delta * this.timeScale);
        } catch(ex) {}
      }
    }
  }
}
