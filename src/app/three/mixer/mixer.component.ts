import { RendererTimer } from './../interface';
import { ClipComponent } from './../clip/clip.component';
import { Component, OnInit, ContentChildren, QueryList, Input, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.scss']
})
export class MixerComponent implements OnInit {

  @Input() action : string = "";
  @Input() duration : number = 0.5;

  @ContentChildren(ClipComponent, { descendants: false }) clip: QueryList<ClipComponent>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.action) {
      this.play(this.action.toLowerCase());
    }
  }

  ngOnInit(): void {
  }

  private mixer : THREE.AnimationMixer = null;
  private model : THREE.Object3D | THREE.AnimationObjectGroup = null;
  private clips : THREE.AnimationClip[] = null;

  setModel(model: THREE.Object3D | THREE.AnimationObjectGroup , clips: THREE.AnimationClip[]) {
    if (this.model !== model) {
      this.model = model;
      this.clips = clips;
      this.resetMixer();
      if (this.lastAction !== this.action) {
        this.play(this.action);
      }
    }
  }

  private lastAction : string = null;

  resetMixer() {
    this.mixer = new THREE.AnimationMixer(this.model);
    this.clip.forEach(clip => {
      clip.setMixer(this.mixer, this.clips);
    });
  }

  lastPlayedClip : ClipComponent = null;
  play(name : string) {
    if (this.clip !== null && this.clip !== undefined && this.clip.length > 0) {
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
      console.log("----------");
      console.log(foundAction);
      console.log(this.lastPlayedClip);

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
    if (this.mixer !== null) {
      this.mixer.update( timer.delta );
    }
  }
}
