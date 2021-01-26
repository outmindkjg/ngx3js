import { CameraComponent } from 'src/app/three/camera/camera.component';
import { SceneComponent } from './../scene/scene.component';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import {
  BokehPass,
  BokehPassParamters,
} from 'three/examples/jsm/postprocessing/BokehPass';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import { MaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

@Component({
  selector: 'three-camerapass',
  templateUrl: './camerapass.component.html',
  styleUrls: ['./camerapass.component.scss'],
})
export class CamerapassComponent implements OnInit {
  @Input() type: string = '';
  @Input() enabled: boolean = null;
  @Input() needsSwap: boolean = null;
  @Input() clear: boolean = null;
  @Input() renderToScreen: boolean = null;
  @Input() adaptive: boolean = null;
  @Input() resolution: number = null;
  @Input() damp: number = null;
  @Input() strength: number = null;
  @Input() kernelSize: number = null;
  @Input() sigma: number = null;
  @Input() scene: THREE.Scene = null;
  @Input() camera: THREE.Camera = null;
  @Input() params: BokehPassParamters = null;
  @Input() clearColor: THREE.Color | string | number = null;
  @Input() clearAlpha: number = null;
  @Input() envMap: THREE.CubeTexture = null;
  @Input() opacity: number = null;
  @Input() center: THREE.Vector2 = null;
  @Input() angle: number = null;
  @Input() scale: number = null;
  @Input() noiseIntensity: number = null;
  @Input() scanlinesIntensity: number = null;
  @Input() scanlinesCount: number = null;
  @Input() grayscale: number = null;
  @Input() dtSize: number = null;
  @Input() width: number = null;
  @Input() height: number = null;
  @Input() selectedObjects: THREE.Object3D[] = null;
  @Input() overrideMaterial: THREE.Material = null;
  @Input() depthTexture: boolean = null;
  @Input() useNormals: boolean = null;
  @Input() renderTarget: THREE.WebGLRenderTarget = null;
  @Input() shader: object = null;
  @Input() textureID: string = null;
  @Input() map: THREE.Texture = null;
  @Input() radius: number = null;
  @Input() threshold: number = null;

  constructor() {}

  private getEnabled(def: boolean): boolean {
    const enabled = this.enabled === null ? def : this.enabled;
    return enabled;
  }

  private getNeedsSwap(def: boolean): boolean {
    const needsSwap = this.needsSwap === null ? def : this.needsSwap;
    return needsSwap;
  }

  private getClear(def: boolean): boolean {
    const clear = this.clear === null ? def : this.clear;
    return clear;
  }

  private getRenderToScreen(def: boolean): boolean {
    const renderToScreen = this.renderToScreen === null ? def : this.renderToScreen;
    return renderToScreen;
  }

  private getAdaptive(def: boolean): boolean {
    const adaptive = this.adaptive === null ? def : this.adaptive;
    return adaptive;
  }

  private getResolution(def: number): number {
    const resolution = this.resolution === null ? def : this.resolution;
    return resolution;
  }

  private getDamp(def: number): number {
    const damp = this.damp === null ? def : this.damp;
    return damp;
  }

  private getStrength(def: number): number {
    const strength = this.strength === null ? def : this.strength;
    return strength;
  }

  private getKernelSize(def: number): number {
    const kernelSize = this.kernelSize === null ? def : this.kernelSize;
    return kernelSize;
  }

  private getSigma(def: number): number {
    const sigma = this.sigma === null ? def : this.sigma;
    return sigma;
  }

  private getScene(def: THREE.Scene): THREE.Scene {
    const scene = this.scene === null ? def : this.scene;
    return scene;
  }

  private getCamera(def: THREE.Camera): THREE.Camera {
    const camera = this.camera === null ? def : this.camera;
    return camera;
  }

  private getParams(def: BokehPassParamters): BokehPassParamters {
    const params = this.params === null ? def : this.params;
    return params;
  }

  private getClearColor(
    def: THREE.Color | string | number
  ): THREE.Color | string | number {
    const clearColor = this.clearColor === null ? def : this.clearColor;
    return clearColor;
  }

  private getClearAlpha(def: number): number {
    const clearAlpha = this.clearAlpha === null ? def : this.clearAlpha;
    return clearAlpha;
  }

  private getEnvMap(def: THREE.CubeTexture): THREE.CubeTexture {
    const envMap = this.envMap === null ? def : this.envMap;
    return envMap;
  }

  private getOpacity(def: number): number {
    const opacity = this.opacity === null ? def : this.opacity;
    return opacity;
  }

  private getCenter(def: THREE.Vector2): THREE.Vector2 {
    const center = this.center === null ? def : this.center;
    return center;
  }

  private getAngle(def: number): number {
    const angle = this.angle === null ? def : this.angle;
    return angle;
  }

  private getScale(def: number): number {
    const scale = this.scale === null ? def : this.scale;
    return scale;
  }

  private getNoiseIntensity(def: number): number {
    const noiseIntensity =
      this.noiseIntensity === null ? def : this.noiseIntensity;
    return noiseIntensity;
  }

  private getScanlinesIntensity(def: number): number {
    const scanlinesIntensity =
      this.scanlinesIntensity === null ? def : this.scanlinesIntensity;
    return scanlinesIntensity;
  }

  private getScanlinesCount(def: number): number {
    const scanlinesCount =
      this.scanlinesCount === null ? def : this.scanlinesCount;
    return scanlinesCount;
  }

  private getGrayscale(def: number): number {
    const grayscale = this.grayscale === null ? def : this.grayscale;
    return grayscale;
  }

  private getDtSize(def: number): number {
    const dtSize = this.dtSize === null ? def : this.dtSize;
    return dtSize;
  }

  private getWidth(def: number): number {
    const width = this.width === null ? def : this.width;
    return width;
  }

  private getHeight(def: number): number {
    const height = this.height === null ? def : this.height;
    return height;
  }

  private getSelectedObjects(def: THREE.Object3D[]): THREE.Object3D[] {
    const selectedObjects =
      this.selectedObjects === null ? def : this.selectedObjects;
    return selectedObjects;
  }

  private getOverrideMaterial(def: THREE.Material): THREE.Material {
    const overrideMaterial =
      this.overrideMaterial === null ? def : this.overrideMaterial;
    return overrideMaterial;
  }

  private getDepthTexture(def: boolean): boolean {
    const depthTexture = this.depthTexture === null ? def : this.depthTexture;
    return depthTexture;
  }

  private getUseNormals(def: boolean): boolean {
    const useNormals = this.useNormals === null ? def : this.useNormals;
    return useNormals;
  }

  private getRenderTarget(
    def: THREE.WebGLRenderTarget
  ): THREE.WebGLRenderTarget {
    const renderTarget = this.renderTarget === null ? def : this.renderTarget;
    return renderTarget;
  }

  private getShader(def: object): object {
    const shader = this.shader === null ? def : this.shader;
    return shader;
  }

  private getTextureID(def: string): string {
    const textureID = this.textureID === null ? def : this.textureID;
    return textureID;
  }

  private getMap(def: THREE.Texture): THREE.Texture {
    const map = this.map === null ? def : this.map;
    return map;
  }

  private getRadius(def: number): number {
    const radius = this.radius === null ? def : this.radius;
    return radius;
  }

  private getThreshold(def: number): number {
    const threshold = this.threshold === null ? def : this.threshold;
    return threshold;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.pass = null;
      if (this.cameraComponent !== null) {
        this.cameraComponent.resetEffectComposer();
      }
    }
  }

  private cameraComponent: CameraComponent = null;

  private pass: Pass = null;

  getPass(scene: THREE.Scene, camera: THREE.Camera, cameraComponent : CameraComponent): Pass {
    if (this.pass === null) {
      this.cameraComponent = cameraComponent;
      switch (this.type.toLowerCase()) {
        case 'adaptivetonemapping':
          this.pass = new AdaptiveToneMappingPass(
            this.getAdaptive(true),
            this.getResolution(0)
          );
          break;
        case 'afterimage':
          this.pass = new AfterimagePass(this.getDamp(0));
          break;
        case 'bloom':
          this.pass = new BloomPass(
            this.getStrength(0),
            this.getKernelSize(0),
            this.getSigma(0),
            this.getResolution(0)
          );
          break;
        case 'bokeh':
          this.pass = new BokehPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getParams(null)
          );
          break;
        case 'cubetexture':
          this.pass = new CubeTexturePass(
            this.getCamera(camera) as THREE.PerspectiveCamera,
            this.getEnvMap(null),
            this.getOpacity(0)
          );
          break;
        case 'dotscreen':
          this.pass = new DotScreenPass(
            this.getCenter(null),
            this.getAngle(0),
            this.getScale(0)
          );
          break;
        case 'film':
          this.pass = new FilmPass(
            this.getNoiseIntensity(0),
            this.getScanlinesIntensity(0),
            this.getScanlinesCount(0),
            this.getGrayscale(0)
          );
          break;
        case 'glitch':
          this.pass = new GlitchPass(this.getDtSize(0));
          break;
        case 'halftone':
          this.pass = new HalftonePass(
            this.getWidth(0),
            this.getHeight(0),
            null // this.getParams(null)
          );
          break;
        case 'mask':
          this.pass = new MaskPass(
            this.getScene(scene),
            this.getCamera(camera)
          );
          break;
        case 'outline':
          this.pass = new OutlinePass(
            null, //this.getResolution(0),
            this.getScene(scene),
            this.getCamera(camera),
            null // this.getSelectedObjects(0)
          );
          break;
        case 'render':
          this.pass = new RenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            //this.getOverrideMaterial(null),
            //new THREE.Color(this.getClearColor(0)),
            // this.getClearAlpha(0)
          );
          break;
        case 'sao':
          this.pass = new SAOPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getDepthTexture(null),
            this.getUseNormals(null),
            null // this.getResolution(0)
          );
          break;
        case 'save':
          this.pass = new SavePass(this.getRenderTarget(null));
          break;
        case 'shader':
          this.pass = new ShaderPass(
            this.getShader(null),
            this.getTextureID('aaa')
          );
          break;
        case 'smaa':
          this.pass = new SMAAPass(this.getWidth(0), this.getHeight(0));
          break;
        case 'ssaarender':
          this.pass = new SSAARenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getClearColor(0x000000),
            this.getClearAlpha(0)
          );
          break;
        case 'ssao':
          this.pass = new SSAOPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getWidth(0),
            this.getHeight(0)
          );
          break;
        case 'taarender':
          this.pass = new TAARenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getClearColor(0x000000),
            this.getClearAlpha(0)
          );
          break;
        case 'texture':
          this.pass = new TexturePass(this.getMap(null), this.getOpacity(0));
          break;
        case 'taarender':
          this.pass = new UnrealBloomPass(
            null, //this.getResolution(0),
            this.getStrength(0),
            this.getRadius(0),
            this.getThreshold(0)
          );
          break;
        case 'clear':
        default:
          this.pass = new ClearPass(
            this.getClearColor(0),
            this.getClearAlpha(0)
          );
          break;
      }
      // this.pass.enabled = this.getEnabled(true);
      // this.pass.needsSwap = this.getNeedsSwap(false);
      // this.pass.clear = this.getClear(false);
      this.pass.renderToScreen = this.getRenderToScreen(true);
    }
    return this.pass;
  }
}
