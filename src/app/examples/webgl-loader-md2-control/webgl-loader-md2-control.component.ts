import { Component } from '@angular/core';
import { BaseComponent, RendererEvent } from '../../three';

@Component({
  selector: 'app-webgl-loader-md2-control',
  templateUrl: './webgl-loader-md2-control.component.html',
  styleUrls: ['./webgl-loader-md2-control.component.scss'],
})
export class WebglLoaderMd2ControlComponent extends BaseComponent<{}> {
  constructor() {
    super({}, []);
  }

  characterControls = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  };

  configOgro = {
    type: 'MD2CharacterComplex',
    baseUrl: 'models/md2/ogro/',
    body: 'ogro.md2',
    skins: [
      'grok.jpg',
      'ogrobase.png',
      'arboshak.png',
      'ctf_r.png',
      'ctf_b.png',
      'darkam.png',
      'freedom.png',
      'gib.png',
      'gordogh.png',
      'igdosh.png',
      'khorne.png',
      'nabogro.png',
      'sharokh.png',
    ],
    weapons: [['weapon.md2', 'weapon.jpg']],
    animations: {
      move: 'run',
      idle: 'stand',
      jump: 'jump',
      attack: 'attack',
      crouchMove: 'cwalk',
      crouchIdle: 'cstand',
      crouchAttach: 'crattack',
    },
    walkSpeed: 350,
    crouchSpeed: 175,
  };

  ngOnInit() {
    const nRows = 4;
    const nSkins = this.configOgro.skins.length;
    this.characterInfos = [];
    for (let j = 0; j < nRows; j++) {
      for (let i = 0; i < nSkins; i++) {
        this.characterInfos.push({
          x: (i - nSkins / 2) * 150,
          y: 0,
          z: j * 250,
          skin: i,
          useGyro : i == 0 && j === 0
        });
      }
    }
  }

  characterInfos: {
    x: number;
    y: number;
    z: number;
    skin: number;
    useGyro : boolean;
  }[] = [];

  setKeyDownEvent(event: RendererEvent) {
    switch (event.type) {
      case 'keydown':
        switch (event.event.code) {
          case 'ArrowUp':
          case 'KeyW':
            this.characterControls.moveForward = true;
            break;
          case 'ArrowDown':
          case 'KeyS':
            this.characterControls.moveBackward = true;
            break;
          case 'ArrowLeft':
          case 'KeyA':
            this.characterControls.moveLeft = true;
            break;
          case 'ArrowRight':
          case 'KeyD':
            this.characterControls.moveRight = true;
            break;
        }
        break;
      case 'keyup':
        switch (event.event.code) {
          case 'ArrowUp':
          case 'KeyW':
            this.characterControls.moveForward = false;
            break;
          case 'ArrowDown':
          case 'KeyS':
            this.characterControls.moveBackward = false;
            break;
          case 'ArrowLeft':
          case 'KeyA':
            this.characterControls.moveLeft = false;
            break;
          case 'ArrowRight':
          case 'KeyD':
            this.characterControls.moveRight = false;
            break;
        }
        break;
    }
  }
}
