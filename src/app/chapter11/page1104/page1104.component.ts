import { Component, OnInit } from '@angular/core';
import {
  GeometriesVector3,
  GuiControlParam,
  RendererTimer,
} from './../../three';

@Component({
  selector: 'app-page1104',
  templateUrl: './page1104.component.html',
  styleUrls: ['./page1104.component.scss'],
})
export class Page1104Component implements OnInit {
  controls = {
    select: 'none',
    brightness: {
      brightness: 0.01,
      contrast: 0.01,
    },
    colorify: {
      color: 0xffffff,
    },
    colorCorrection: {
      powRGBx: 2,
      powRGBy: 2,
      powRGBz: 2,
      mulRGBx: 1,
      mulRGBy: 1,
      mulRGBz: 1,
      addRGBx: 0,
      addRGBy: 0,
      addRGBz: 0,
    },
    sepia: {
      amount: 1,
    },
    rgbShift: {
      amount: 0.005,
      angle: 0.0,
    },
    mirror: {
      side: 1,
    },
    vignette: {
      offset: 1,
      darkness: 1,
    },
    hueSaturation: {
      hue: 0.01,
      saturation: 0.01,
    },
    kaleidoscope: {
      angle: 0,
      side: 6,
    },
    update: () => {
      this.controlsValues.colorify.enabled = false;
      this.controlsValues.sepia.enabled = false;
      this.controlsValues.colorCorrection.enabled = false;
      this.controlsValues.rgbShift.enabled = false;
      this.controlsValues.mirror.enabled = false;
      this.controlsValues.vignette.enabled = false;
      this.controlsValues.hueSaturation.enabled = false;
      this.controlsValues.kaleidoscope.enabled = false;
      this.controlsValues.luminosity.enabled = false;
      this.controlsValues.technicolor.enabled = false;
      switch (this.controls.select) {
        case 'none':
          break;
        case 'brightness':
            this.controlsValues.brightness = Object.assign(
              { enabled: true },
              this.controls.brightness
            );
            break;
        case 'colorify':
          this.controlsValues.colorify = Object.assign(
            { enabled: true },
            this.controls.colorify
          );
          break;
        case 'sepia':
          this.controlsValues.sepia = Object.assign(
            { enabled: true },
            this.controls.sepia
          );
          break;
        case 'colorCorrection':
          this.controlsValues.colorCorrection = Object.assign(
            { enabled: true },
            this.controls.colorCorrection
          );
          break;
        case 'rgbShift':
          this.controlsValues.rgbShift = Object.assign(
            { enabled: true },
            this.controls.rgbShift
          );
          break;
        case 'mirror':
          this.controlsValues.mirror = Object.assign(
            { enabled: true },
            this.controls.mirror
          );
          break;
        case 'vignette':
          this.controlsValues.vignette = Object.assign(
            { enabled: true },
            this.controls.vignette
          );
          break;
        case 'hueAndSaturation':
          this.controlsValues.hueSaturation = Object.assign(
            { enabled: true },
            this.controls.hueSaturation
          );
          break;
        case 'kaleidoscope':
          this.controlsValues.kaleidoscope = Object.assign(
            { enabled: true },
            this.controls.kaleidoscope
          );
          break;
        case 'luminosity':
          this.controlsValues.luminosity = { enabled: true };
          break;
        case 'technicolor':
          this.controlsValues.technicolor = { enabled: true };
          break;
      }
    },
    rotate: false,
    wireframe: false,
  };

  controlsValues = {
    brightness: {
      enabled: false,
      brightness: 0.01,
      contrast: 0.01,
    },
    colorify: {
      enabled: false,
      color: 0xffffff,
    },
    colorCorrection: {
      enabled: false,
      powRGBx: 2,
      powRGBy: 2,
      powRGBz: 2,
      mulRGBx: 1,
      mulRGBy: 1,
      mulRGBz: 1,
      addRGBx: 0,
      addRGBy: 0,
      addRGBz: 0,
    },
    sepia: {
      enabled: false,
      amount: 1,
    },
    rgbShift: {
      enabled: false,
      amount: 0.005,
      angle: 0.0,
    },
    mirror: {
      enabled: false,
      side: 1,
    },
    vignette: {
      enabled: false,
      offset: 1,
      darkness: 1,
    },
    hueSaturation: {
      enabled: false,
      hue: 0.01,
      saturation: 0.01,
    },
    kaleidoscope: {
      enabled: false,
      angle: 0,
      side: 6,
    },
    luminosity: {
      enabled: false,
    },
    technicolor: {
      enabled: false,
    },
    unpackDepth: {
      enabled: false,
    },
  };

  controlsParams: GuiControlParam[] = [
    {
      name: 'select',
      type: 'select',
      select: [
        'none',
        'colorify',
        'brightness',
        'sepia',
        'colorCorrection',
        'rgbShift',
        'mirror',
        'vignette',
        'hueAndSaturation',
        'kaleidoscope',
        'luminosity',
        'technicolor',
      ], finishChange : (e) => { this.controls.update();}
    },
    {
      name: 'Brightness',
      control: 'brightness',
      type: 'folder',
      children: [
        { name: 'brightness', type: 'number', min: -1, max: 1, finishChange : (e) => { this.controls.update();} },
        { name: 'contrast', type: 'number', min: -1, max: 1, finishChange : (e) => { this.controls.update();} },
      ],
      isOpen: false,
    },
    {
      name: 'Colorify',
      control: 'colorify',
      type: 'folder',
      children: [{ name: 'color', type: 'color', finishChange : (e) => { this.controls.update();} }],
      isOpen: false,
    },
    {
      name: 'Color Correction',
      control: 'colorCorrection',
      type: 'folder',
      children: [
        { name: 'powRGBx', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
        { name: 'powRGBy', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
        { name: 'powRGBz', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
        { name: 'mulRGBx', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
        { name: 'mulRGBy', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
        { name: 'mulRGBz', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
        { name: 'addRGBx', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
        { name: 'addRGBy', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
        { name: 'addRGBz', type: 'number', min: 0, max: 5, finishChange : (e) => { this.controls.update();} },
      ],
      isOpen: false,
    },
    {
      name: 'Sepia',
      control: 'sepia',
      type: 'folder',
      children: [{ name: 'amount', type: 'number', min: 0, max: 2, step: 0.1, finishChange : (e) => { this.controls.update();} }],
      isOpen: false,
    },
    {
      name: 'RGB Shift',
      control: 'rgbShift',
      type: 'folder',
      children: [
        { name: 'amount', type: 'number', min: 0, max: 1, step: 0.001, finishChange : (e) => { this.controls.update();} },
        { name: 'angle', type: 'number', min: 1, max: 180, finishChange : (e) => { this.controls.update();} },
      ],
      isOpen: false,
    },
    {
      name: 'mirror',
      control: 'mirror',
      type: 'folder',
      children: [{ name: 'side', type: 'number', min: 0, max: 3, step: 1, finishChange : (e) => { this.controls.update();} }],
      isOpen: false,
    },
    {
      name: 'vignette',
      control: 'vignette',
      type: 'folder',
      children: [
        { name: 'darkness', type: 'number', min: 0, max: 2, finishChange : (e) => { this.controls.update();} },
        { name: 'offset', type: 'number', min: 0, max: 2, finishChange : (e) => { this.controls.update();} },
      ],
      isOpen: false,
    },
    {
      name: 'hue and saturation',
      control: 'hueSaturation',
      type: 'folder',
      children: [
        { name: 'hue', type: 'number', min: -1, max: 1, step: 0.01, finishChange : (e) => { this.controls.update();} },
        { name: 'saturation', type: 'number', min: -1, max: 1, step: 0.01, finishChange : (e) => { this.controls.update();} },
      ],
      isOpen: false,
    },
    {
      name: 'Kaleidoscope',
      control: 'kaleidoscope',
      type: 'folder',
      children: [
        { name: 'angle', type: 'number', min: -360, max: 360, finishChange : (e) => { this.controls.update();} },
        { name: 'side', type: 'number', min: 2, max: 20, finishChange : (e) => { this.controls.update();} },
      ],
      isOpen: false,
    },
    { name: 'rotate', type: 'checkbox' },
    { name: 'wireframe', type: 'checkbox' },
  ];

  constructor() {}

  ngOnInit(): void {}

  rotation: GeometriesVector3 = {
    x: 0,
    y: 0,
    z: 0,
  };

  onRender(timer: RendererTimer) {
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 10;
    }
  }
}
