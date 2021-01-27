import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { BokehPass, BokehPassParamters } from 'three/examples/jsm/postprocessing/BokehPass';
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
import { AbstractEffectComposer, ThreeUtil } from '../interface';

@Component({
  selector: 'three-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss'],
})
export class PassComponent implements OnInit {
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

  constructor() { }

  private getEnabled(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.enabled, def);
  }

  private getNeedsSwap(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.needsSwap, def);
  }

  private getClear(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.clear, def);
  }

  private getRenderToScreen(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.renderToScreen, def);
  }

  private getAdaptive(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.adaptive, def);
  }

  private getResolution(def?: number): number {
    return ThreeUtil.getTypeSafe(this.resolution, def);
  }

  private getDamp(def?: number): number {
    return ThreeUtil.getTypeSafe(this.damp, def);
  }

  private getStrength(def?: number): number {
    return ThreeUtil.getTypeSafe(this.strength, def);
  }

  private getKernelSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.kernelSize, def);
  }

  private getSigma(def?: number): number {
    return ThreeUtil.getTypeSafe(this.sigma, def);
  }

  private getScene(def? : THREE.Scene): THREE.Scene {
    const scene = ThreeUtil.getTypeSafe(this.scene, def);
    return ThreeUtil.isNotNull(scene) ? scene : new THREE.Scene();
  }

  private getCamera(def? : THREE.Camera): THREE.Camera {
    const camera = ThreeUtil.getTypeSafe(this.camera, def);
    return ThreeUtil.isNotNull(camera) ? camera : new THREE.Camera();
  }

  private getParams(def?: BokehPassParamters): BokehPassParamters {
    return ThreeUtil.getTypeSafe(this.params, def);
  }

  private getClearColor(def?: THREE.Color | string | number): THREE.Color | string | number {
    return ThreeUtil.getColorSafe(this.clearColor, def);
  }

  private getClearAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearAlpha, def);
  }

  private getEnvMap(def?: THREE.CubeTexture): THREE.CubeTexture {
    return ThreeUtil.getTypeSafe(this.envMap, def);
  }

  private getOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  private getCenter(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getTypeSafe(this.center, def);
  }

  private getAngle(def?: number): number {
    return ThreeUtil.getTypeSafe(this.angle, def);
  }

  private getScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scale, def);
  }

  private getNoiseIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.noiseIntensity, def);
  }

  private getScanlinesIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scanlinesIntensity, def);
  }

  private getScanlinesCount(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scanlinesCount, def);
  }

  private getGrayscale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.grayscale, def);
  }

  private getDtSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.dtSize, def);
  }

  private getWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.width, def);
  }

  private getHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.height, def);
  }

  private getSelectedObjects(def?: THREE.Object3D[]): THREE.Object3D[] {
    return ThreeUtil.getTypeSafe(this.selectedObjects, def);
  }

  private getOverrideMaterial(def?: THREE.Material): THREE.Material {
    return ThreeUtil.getTypeSafe(this.overrideMaterial, def);
  }

  private getDepthTexture(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.depthTexture, def);
  }

  private getUseNormals(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.useNormals, def);
  }

  private getRenderTarget(def?: THREE.WebGLRenderTarget): THREE.WebGLRenderTarget {
    return ThreeUtil.getTypeSafe(this.renderTarget, def);
  }

  private getShader(def?: object): object {
    return ThreeUtil.getTypeSafe(this.shader, def);
  }

  private getTextureID(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textureID, def);
  }

  private getMap(def?: THREE.Texture): THREE.Texture {
    return ThreeUtil.getTypeSafe(this.map, def);
  }

  private getRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radius, def);
  }

  private getThreshold(def?: number): number {
    return ThreeUtil.getTypeSafe(this.threshold, def);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.pass = null;
      if (this.cameraComponent !== null) {
        this.cameraComponent.resetEffectComposer();
      }
    }
  }

  private cameraComponent: AbstractEffectComposer = null;

  private pass: Pass = null;

  getPass(scene: THREE.Scene, camera: THREE.Camera, cameraComponent: AbstractEffectComposer): Pass {
    if (this.pass === null) {
      this.cameraComponent = cameraComponent;
      switch (this.type.toLowerCase()) {
        case 'adaptivetonemapping':
          this.pass = new AdaptiveToneMappingPass(
            this.getAdaptive(),
            this.getResolution()
          );
          break;
        case 'afterimage':
          this.pass = new AfterimagePass(this.getDamp());
          break;
        case 'bloom':
          this.pass = new BloomPass(
            this.getStrength(),
            this.getKernelSize(),
            this.getSigma(),
            this.getResolution()
          );
          break;
        case 'bokeh':
          this.pass = new BokehPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getParams()
          );
          break;
        case 'cubetexture':
          this.pass = new CubeTexturePass(
            this.getCamera(camera) as THREE.PerspectiveCamera,
            this.getEnvMap(),
            this.getOpacity()
          );
          break;
        case 'dotscreen':
          this.pass = new DotScreenPass(
            this.getCenter(),
            this.getAngle(),
            this.getScale()
          );
          break;
        case 'film':
          this.pass = new FilmPass(
            this.getNoiseIntensity(),
            this.getScanlinesIntensity(),
            this.getScanlinesCount(),
            this.getGrayscale()
          );
          break;
        case 'glitch':
          this.pass = new GlitchPass(
            this.getDtSize()
          );
          break;
        case 'halftone':
          this.pass = new HalftonePass(
            this.getWidth(),
            this.getHeight(),
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
            null, //this.getResolution(),
            this.getScene(scene),
            this.getCamera(camera),
            null // this.getSelectedObjects()
          );
          break;
        case 'render':
          this.pass = new RenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            //this.getOverrideMaterial(null),
            //new THREE.Color(this.getClearColor()),
            // this.getClearAlpha()
          );
          break;
        case 'sao':
          this.pass = new SAOPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getDepthTexture(),
            this.getUseNormals(),
            null // this.getResolution()
          );
          break;
        case 'save':
          this.pass = new SavePass(
            this.getRenderTarget()
          );
          break;
        case 'shader':
          this.pass = new ShaderPass(
            this.getShader(),
            this.getTextureID()
          );
          break;
        case 'smaa':
          this.pass = new SMAAPass(
            this.getWidth(), 
            this.getHeight()
          );
          break;
        case 'ssaarender':
          this.pass = new SSAARenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getClearColor(),
            this.getClearAlpha()
          );
          break;
        case 'ssao':
          this.pass = new SSAOPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getWidth(),
            this.getHeight()
          );
          break;
        case 'taarender':
          this.pass = new TAARenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getClearColor(),
            this.getClearAlpha()
          );
          break;
        case 'texture':
          this.pass = new TexturePass(
            this.getMap(), 
            this.getOpacity()
          );
          break;
        case 'taarender':
          this.pass = new UnrealBloomPass(
            null, //this.getResolution(),
            this.getStrength(),
            this.getRadius(),
            this.getThreshold()
          );
          break;
        case 'clear':
        default:
          this.pass = new ClearPass(
            this.getClearColor(),
            this.getClearAlpha()
          );
          break;
      }
      if (ThreeUtil.isNotNull(this.enabled)) {
        this.pass.enabled = this.getEnabled(true);
      }
      if (ThreeUtil.isNotNull(this.needsSwap)) {
        this.pass.needsSwap = this.getNeedsSwap(true);
      }
      if (ThreeUtil.isNotNull(this.clear)) {
        this.pass.clear = this.getClear(false);
      }
      if (ThreeUtil.isNotNull(this.renderToScreen)) {
        this.pass.renderToScreen = this.getRenderToScreen(false);
      }
    }
    return this.pass;
  }
}
