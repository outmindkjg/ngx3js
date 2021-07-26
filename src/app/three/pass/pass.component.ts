import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { LUTCubeLoader, LUTCubeResult } from 'three/examples/jsm/loaders/LUTCubeLoader';
import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { BokehPass, BokehPassParamters } from 'three/examples/jsm/postprocessing/BokehPass';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass';
import { ClearMaskPass, MaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass';
import { SSRrPass } from 'three/examples/jsm/postprocessing/SSRrPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ThreeColor, ThreeUtil } from '../interface';
import { ShaderComponent } from '../shader/shader.component';
import { ShaderUtils } from '../shader/shaders/shaderUtils';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { TextureComponent } from '../texture/texture.component';

/**
 * PassComponent
 */
@Component({
  selector: 'ngx3js-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss'],
})
export class PassComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of pass component
   */
  @Input() public type: string = '';

  /**
   * Input  of pass component
   */
  @Input() private refer: PassComponent = null;

  /**
   * Input  of pass component
   */
  @Input() private needsSwap: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private clear: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private renderToScreen: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private adaptive: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private resolution: number = null;

  /**
   * Input  of pass component
   */
  @Input() private damp: number = null;

  /**
   * Input  of pass component
   */
  @Input() private strength: number = null;

  /**
   * Input  of pass component
   */
  @Input() private kernelSize: number = null;

  /**
   * Input  of pass component
   */
  @Input() private sigma: number = null;

  /**
   * Input  of pass component
   */
  @Input() private scene: any = null;

  /**
   * Input  of pass component
   */
  @Input() private camera: any = null;

  /**
   * Input  of pass component
   */
  @Input() private params: BokehPassParamters = null;

  /**
   * Input  of pass component
   */
  @Input() private intensity: number = null;

  /**
   * Input  of pass component
   */
  @Input() private clearColor: THREE.Color | string | number = null;

  /**
   * Input  of pass component
   */
  @Input() private clearAlpha: number = null;

  /**
   * Input  of pass component
   */
  @Input() private envMap: THREE.CubeTexture | TextureComponent = null;

  /**
   * Input  of pass component
   */
  @Input() private opacity: number = null;

  /**
   * Input  of pass component
   */
  @Input() private centerX: number = null;

  /**
   * Input  of pass component
   */
  @Input() private centerY: number = null;

  /**
   * Input  of pass component
   */
  @Input() private angle: number = null;

  /**
   * Input  of pass component
   */
  @Input() private scale: number = null;

  /**
   * Input  of pass component
   */
  @Input() private noiseIntensity: number = null;

  /**
   * Input  of pass component
   */
  @Input() private scanlinesIntensity: number = null;

  /**
   * Input  of pass component
   */
  @Input() private scanlinesCount: number = null;

  /**
   * Input  of pass component
   */
  @Input() private grayscale: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private dtSize: number = null;

  /**
   * Input  of pass component
   */
  @Input() private width: number = null;

  /**
   * Input  of pass component
   */
  @Input() private height: number = null;

  /**
   * Input  of pass component
   */
  @Input() private selectedObjects: (THREE.Object3D | any)[] = null;

  /**
   * Input  of pass component
   */
  @Input() private overrideMaterial: THREE.Material = null;

  /**
   * Input  of pass component
   */
  @Input() private depthTexture: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private useNormals: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private renderTarget: THREE.WebGLRenderTarget = null;

  /**
   * Input  of pass component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private shader: string = null;

  /**
   * Input  of pass component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private materialShader: string = null;

  /**
   * Input  of pass component
   */
  @Input() private textureId: string = null;

  /**
   * Input  of pass component
   */
  @Input() private map: THREE.Texture | TextureComponent | any = null;

  /**
   * Input  of pass component
   */
  @Input() private texture: THREE.Texture | TextureComponent = null;

  /**
   * Input  of pass component
   */
  @Input() private patternTexture: THREE.Texture | TextureComponent = null;

  /**
   * Input  of pass component
   */
  @Input() private radius: number = null;

  /**
   * Input  of pass component
   */
  @Input() private threshold: number = null;

  /**
   * Input  of pass component
   */
  @Input() private goWild: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private uniforms: { [key: string]: any } = null;

  /**
   * Input  of pass component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private lut: string = null;

  /**
   * Input  of pass component
   */
  @Input() private use2DLut: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private inverse: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private focus: number = null;

  /**
   * Input  of pass component
   */
  @Input() private aspect: number = null;

  /**
   * Input  of pass component
   */
  @Input() private aperture: number = null;

  /**
   * Input  of pass component
   */
  @Input() private maxblur: number = null;

  /**
   * Input  of pass component
   */
  @Input() private sampleLevel: number = null;

  /**
   * Input  of pass component
   */
  @Input() private unbiased: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private accumulate: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private visibleEdgeColor: ThreeColor = null;

  /**
   * Input  of pass component
   */
  @Input() private hiddenEdgeColor: ThreeColor = null;

  /**
   * Input  of pass component
   */
  @Input() private edgeGlow: number = null;

  /**
   * Input  of pass component
   */
  @Input() private usePatternTexture: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private edgeThickness: number = null;

  /**
   * Input  of pass component
   */
  @Input() private edgeStrength: number = null;

  /**
   * Input  of pass component
   */
  @Input() private downSampleRatio: number = null;

  /**
   * Input  of pass component
   */
  @Input() private pulsePeriod: number = null;

  /**
   * Input  of pass component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private output: string = null;

  /**
   * Input  of pass component
   */
  @Input() private kernelRadius: number = null;

  /**
   * Input  of pass component
   */
  @Input() private minDistance: number = null;

  /**
   * Input  of pass component
   */
  @Input() private maxDistance: number = null;

  /**
   * Input  of pass component
   */
  @Input() private saoBias: number = null;

  /**
   * Input  of pass component
   */
  @Input() private saoIntensity: number = null;

  /**
   * Input  of pass component
   */
  @Input() private saoScale: number = null;

  /**
   * Input  of pass component
   */
  @Input() private saoKernelRadius: number = null;

  /**
   * Input  of pass component
   */
  @Input() private saoMinResolution: number = null;

  /**
   * Input  of pass component
   */
  @Input() private saoBlur: boolean = null;

  /**
   * Input  of pass component
   */
  @Input() private saoBlurRadius: number = null;

  /**
   * Input  of pass component
   */
  @Input() private saoBlurStdDev: number = null;

  /**
   * Input  of pass component
   */
  @Input() private saoBlurDepthCutoff: number = null;

  /**
   * Input  of pass component
   */
  @Input() private vertexShader: string = null;

  /**
   * Input  of pass component
   */
  @Input() private fragmentShader: string = null;

  /**
   * Input  of pass component
   */
  @Input() private bloomTexture: any = null;

  /**
   * Content children of pass component
   */
  @ContentChildren(ShaderComponent) private shaderList: QueryList<ShaderComponent>;

  /**
   * Creates an instance of pass component.
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
    super.ngOnInit('pass');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.pass !== null) {
      this.pass.enabled = false;
      if (this.effectComposer !== null) {
        this.effectComposer.removePass(this.pass);
      }
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
    if (changes && this.pass) {
      this.addChanges(changes);
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
   * Lut cube loader of pass component
   */
  private lutCubeLoader: LUTCubeLoader = null;

  /**
   * Gets lut
   * @param callBack
   * @param [def]
   */
  private getLut(callBack: (result: LUTCubeResult) => void, def?: string): void {
    const lut = ThreeUtil.getTypeSafe(this.lut, def, 'remy24');
    let lutPath = '';
    switch (lut.toLowerCase()) {
      case 'bourbon 64.cube':
      case 'bourbon64':
        lutPath = 'luts/Bourbon 64.CUBE';
        break;
      case 'chemical 168.cube':
      case 'chemical168':
        lutPath = 'luts/Chemical 168.CUBE';
        break;
      case 'clayton 33.cube':
      case 'clayton33':
        lutPath = 'luts/Clayton 33.CUBE';
        break;
      case 'cubicle 99.cube':
      case 'cubicle99':
        lutPath = 'luts/Cubicle 99.CUBE';
        break;
      case 'remy 24.cube':
      case 'remy24':
        lutPath = 'luts/Remy 24.CUBE';
        break;
      default:
        lutPath = lut;
        break;
    }
    if (this.lutCubeLoader === null) {
      this.lutCubeLoader = new LUTCubeLoader(ThreeUtil.getLoadingManager());
    }
    this.lutCubeLoader.load(ThreeUtil.getStoreUrl(lutPath), (result: LUTCubeResult) => {
      callBack(result);
    });
  }

  /**
   * Gets enabled
   * @param [def]
   * @returns true if enabled
   */
  private getEnabled(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.enabled, def);
  }

  /**
   * Gets needs swap
   * @param [def]
   * @returns true if needs swap
   */
  private getNeedsSwap(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.needsSwap, def);
  }

  /**
   * Gets clear
   * @param [def]
   * @returns true if clear
   */
  private getClear(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.clear, def);
  }

  /**
   * Gets render to screen
   * @param [def]
   * @returns true if render to screen
   */
  private getRenderToScreen(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.renderToScreen, def);
  }

  /**
   * Gets adaptive
   * @param [def]
   * @returns true if adaptive
   */
  private getAdaptive(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.adaptive, def);
  }

  /**
   * Gets resolution
   * @param [def]
   * @returns resolution
   */
  private getResolution(def?: number): number {
    return ThreeUtil.getTypeSafe(this.resolution, def);
  }

  /**
   * Gets damp
   * @param [def]
   * @returns damp
   */
  private getDamp(def?: number): number {
    return ThreeUtil.getTypeSafe(this.damp, def);
  }

  /**
   * Gets strength
   * @param [def]
   * @returns strength
   */
  private getStrength(def?: number): number {
    return ThreeUtil.getTypeSafe(this.strength, def);
  }

  /**
   * Gets kernel size
   * @param [def]
   * @returns kernel size
   */
  private getKernelSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.kernelSize, def);
  }

  /**
   * Gets sigma
   * @param [def]
   * @returns sigma
   */
  private getSigma(def?: number): number {
    return ThreeUtil.getTypeSafe(this.sigma, def);
  }

  /**
   * Gets scene
   * @param [def]
   * @returns scene
   */
  private getScene(def?: any): THREE.Scene {
    const scene = ThreeUtil.getTypeSafe(this.scene, def);
    if (ThreeUtil.isNotNull(scene)) {
      if (scene instanceof THREE.Scene) {
        return scene;
      } else {
        return scene.getScene();
      }
    } else {
      return new THREE.Scene();
    }
  }

  /**
   * Gets camera
   * @param [def]
   * @returns camera
   */
  private getCamera(def?: any): THREE.Camera {
    const camera = ThreeUtil.getTypeSafe(this.camera, def);
    if (ThreeUtil.isNotNull(camera)) {
      if (camera instanceof THREE.Camera) {
        return camera;
      } else {
        return camera.getObject3d();
      }
    } else {
      return new THREE.Camera();
    }
  }

  /**
   * Gets params
   * @param [def]
   * @returns params
   */
  private getParams(def?: BokehPassParamters): BokehPassParamters {
    return ThreeUtil.getTypeSafe(this.params, def);
  }

  /**
   * Gets intensity
   * @param [def]
   * @returns intensity
   */
  private getIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.intensity, def);
  }

  /**
   * Gets clear color
   * @param [def]
   * @returns clear color
   */
  private getClearColor(def?: THREE.Color | string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.clearColor, def);
  }

  /**
   * Gets clear alpha
   * @param [def]
   * @returns clear alpha
   */
  private getClearAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearAlpha, def);
  }

  /**
   * Gets env map
   * @param [def]
   * @returns env map
   */
  private getEnvMap(def?: THREE.CubeTexture): THREE.CubeTexture {
    const cubeTexture = this.getTexture(this.envMap, def);
    if (cubeTexture instanceof THREE.CubeTexture) {
      return cubeTexture;
    }
    return undefined;
  }

  /**
   * Gets pattern texture
   * @param [def]
   * @returns pattern texture
   */
  private getPatternTexture(def?: THREE.Texture): THREE.Texture {
    return this.getTexture(this.patternTexture, def);
  }

  /**
   * Gets texture
   * @param baseTexture
   * @param [def]
   * @returns texture
   */
  private getTexture(baseTexture: THREE.Texture | TextureComponent | any, def?: THREE.Texture | TextureComponent | any): THREE.Texture {
    const texture = ThreeUtil.getTypeSafe(baseTexture, ThreeUtil.getTypeSafe(this.texture, this.map, def), def);
    if (texture instanceof THREE.Texture) {
      return texture;
    } else if (texture instanceof TextureComponent) {
      return texture.getTexture();
    }
    return undefined;
  }

  /**
   * Gets opacity
   * @param [def]
   * @returns opacity
   */
  private getOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  /**
   * Gets center
   * @param [def]
   * @returns center
   */
  private getCenter(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.centerX, this.centerY, def);
  }

  /**
   * Gets angle
   * @param [def]
   * @returns angle
   */
  private getAngle(def?: number): number {
    return ThreeUtil.getAngleSafe(this.angle, def);
  }

  /**
   * Gets scale
   * @param [def]
   * @returns scale
   */
  private getScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scale, def);
  }

  /**
   * Gets noise intensity
   * @param [def]
   * @returns noise intensity
   */
  private getNoiseIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.noiseIntensity, def);
  }

  /**
   * Gets scanlines intensity
   * @param [def]
   * @returns scanlines intensity
   */
  private getScanlinesIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scanlinesIntensity, def);
  }

  /**
   * Gets scanlines count
   * @param [def]
   * @returns scanlines count
   */
  private getScanlinesCount(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scanlinesCount, def);
  }

  /**
   * Gets grayscale
   * @param [def]
   * @returns grayscale
   */
  private getGrayscale(def?: boolean): number {
    if (ThreeUtil.getTypeSafe(this.grayscale, def)) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Gets dt size
   * @param [def]
   * @returns dt size
   */
  private getDtSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.dtSize, def);
  }

  /**
   * Gets width
   * @param [def]
   * @returns width
   */
  private getWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.width, def);
  }

  /**
   * Gets height
   * @param [def]
   * @returns height
   */
  private getHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.height, def);
  }

  /**
   * Gets selected objects
   * @param [def]
   * @returns selected objects
   */
  private getSelectedObjects(def?: THREE.Object3D[]): THREE.Object3D[] {
    const selectedObjects = ThreeUtil.getTypeSafe(this.selectedObjects, def);
    const safeObject3d: THREE.Object3D[] = [];
    selectedObjects.forEach((child) => {
      if (child instanceof THREE.Object3D) {
        safeObject3d.push(child);
      } else if (child.getMesh) {
        safeObject3d.push(child.getObject3d());
      } else if (child.getHelper) {
        safeObject3d.push(child.getHelper());
      } else if (child.getObject3d) {
        safeObject3d.push(child.getObject3d());
      }
    });
    return safeObject3d;
  }

  /**
   * Gets override material
   * @param [def]
   * @returns override material
   */
  private getOverrideMaterial(def?: THREE.Material): THREE.Material {
    return ThreeUtil.getTypeSafe(this.overrideMaterial, def);
  }

  /**
   * Gets depth texture
   * @param [def]
   * @returns true if depth texture
   */
  private getDepthTexture(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.depthTexture, def);
  }

  /**
   * Gets use normals
   * @param [def]
   * @returns true if use normals
   */
  private getUseNormals(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.useNormals, def);
  }

  /**
   * Gets sao output
   * @param [def]
   * @returns sao output
   */
  private getSaoOutput(def?: string): number {
    const output = ThreeUtil.getTypeSafe(this.output, def, '');
    switch (output.toLowerCase()) {
      case 'beauty':
        return 1;
      case 'sao':
        return 2;
      case 'depth':
        return 3;
      case 'normal':
        return 4;
      case 'default':
      default:
        return 0;
    }
  }

  /**
   * Gets ssao output
   * @param [def]
   * @returns ssao output
   */
  private getSsaoOutput(def?: string): number {
    const output = ThreeUtil.getTypeSafe(this.output, def, '');
    switch (output.toLowerCase()) {
      case 'ssao':
        return 1;
      case 'blur':
        return 1;
      case 'beauty':
        return 3;
      case 'depth':
        return 4;
      case 'normal':
        return 5;
      case 'default':
      default:
        return 0;
    }
  }

  /**
   * Gets render target
   * @param [def]
   * @returns render target
   */
  private getRenderTarget(def?: THREE.WebGLRenderTarget): THREE.WebGLRenderTarget {
    return ThreeUtil.getTypeSafe(this.renderTarget, def);
  }

  /**
   * Gets shader
   * @param [def]
   * @returns shader
   */
  private getShader(def?: string): {
    uniforms?: any;
    vertexShader?: any;
    fragmentShader?: any;
  } {
    const shader = ThreeUtil.getTypeSafe(this.shader, def, '');
    let shaderUniforms: {
      uniforms?: any;
      vertexShader?: any;
      fragmentShader?: any;
    } = null;
    switch (shader.toLowerCase()) {
      case 'shadermaterial':
      case 'material':
        const shaderMaterialParameters: THREE.ShaderMaterialParameters = {
          vertexShader: this.getMaterialShader('x-shader/x-vertex'),
          fragmentShader: this.getMaterialShader('x-shader/x-fragment'),
          uniforms: this.getUniforms(ShaderUtils.getUniforms(this.materialShader)),
        };
        shaderUniforms = new THREE.ShaderMaterial(shaderMaterialParameters);
        break;
      default:
        shaderUniforms = ShaderUtils.getShaderClone(shader);
        if (ThreeUtil.isNotNull(shaderUniforms.uniforms)) {
          this.getUniforms(shaderUniforms.uniforms);
        }
        break;
    }
    if (shaderUniforms !== null) {
      return shaderUniforms;
    }
    return undefined;
  }

  /**
   * Gets uniforms
   * @param resultUniforms
   * @returns uniforms
   */
  private getUniforms(resultUniforms: { [uniform: string]: THREE.IUniform }): { [uniform: string]: THREE.IUniform } {
    const uniforms: {
      [key: string]: any;
    } = ThreeUtil.getTypeSafe(this.uniforms, {});
    Object.entries(uniforms).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(value) && ThreeUtil.isNotNull(value['type']) && ThreeUtil.isNotNull(value['value'])) {
        const valueType: string = value['type'];
        const valueValue: any = value['value'];
        switch (valueType.toLowerCase()) {
          case 'projectionmatrixinverse':
          case 'projectionmatrix':
          case 'matrixworldinverse':
          case 'matrixworld':
          case 'matrix':
            if (ThreeUtil.isNotNull(valueValue.getObject3d)) {
              this.unSubscribeRefer('unforms_' + key);
              const object3d: THREE.Object3D = valueValue.getObject3d();
              resultUniforms[key] = {
                value: ThreeUtil.getMatrix4Safe(object3d, valueType),
              };
              if (ThreeUtil.isNotNull(valueValue.getSubscribe)) {
                this.subscribeRefer(
                  'unforms_' + key,
                  valueValue.getSubscribe().subscribe((e) => {
                    resultUniforms[key].value = ThreeUtil.getMatrix4Safe(e, valueType);
                  })
                );
              }
            } else {
              resultUniforms[key] = {
                value: new THREE.Matrix4(),
              };
            }
            break;
          case 'vector2':
          case 'v2':
            if (ThreeUtil.isNotNull(valueValue.getSize)) {
              this.unSubscribeRefer('unforms_' + key);
              resultUniforms[key] = {
                value: valueValue.getSize(),
              };
              if (ThreeUtil.isNotNull(valueValue.sizeSubscribe)) {
                this.subscribeRefer(
                  'unforms_' + key,
                  valueValue.sizeSubscribe().subscribe((e) => {
                    resultUniforms[key].value = e;
                  })
                );
              }
            } else {
              resultUniforms[key] = {
                value: ThreeUtil.getVector2Safe(valueValue[0], valueValue[1], new THREE.Vector2()),
              };
            }
            break;
          case 'vector3':
          case 'vector':
          case 'v3':
            resultUniforms[key] = {
              value: ThreeUtil.getVector3Safe(valueValue[0], valueValue[1], valueValue[2], new THREE.Vector3()),
            };
            break;
          case 'color':
            resultUniforms[key] = {
              value: ThreeUtil.getColorSafe(valueValue, 0xffffff),
            };
            break;
          case 'image':
          case 'texture2d':
          case 'texture3d':
          case 'texture':
          case 'datatexture2d':
          case 'datatexture3d':
          case 'datatexture':
          case 'video':
          case 'videotexture':
            resultUniforms[key] = {
              value: TextureComponent.getTextureImageOption(valueValue, value['options'], valueType.toLowerCase()),
            };
            break;
          case 'imagelist':
          case 'texturelist':
          case 'imagearray':
          case 'texturearray':
            const textureList: THREE.Texture[] = [];
            const texturePathList: string[] = [];
            const textureOption = value['options'];
            if (typeof valueValue === 'string') {
              valueValue.split(',').forEach((path) => {
                if (path !== '' && path.length > 3) {
                  texturePathList.push(path);
                }
              });
            } else if (ThreeUtil.isNotNull(valueValue.forEach)) {
              valueValue.forEach((path) => {
                if (path !== '' && path.length > 3) {
                  texturePathList.push(path);
                }
              });
            }
            texturePathList.forEach((texturePath) => {
              textureList.push(TextureComponent.getTextureImageOption(texturePath, textureOption, 'texture'));
            });
            resultUniforms[key] = {
              value: textureList,
            };
            break;
          case 'int':
          case 'integer':
            resultUniforms[key] = { value: parseInt(valueValue) };
            break;
          case 'str':
          case 'string':
            resultUniforms[key] = { value: valueValue.toString() };
            break;
          case 'double':
          case 'float':
          case 'number':
            resultUniforms[key] = { value: parseFloat(valueValue) };
            break;
          default:
            resultUniforms[key] = { value: valueValue };
            break;
        }
      } else if (ThreeUtil.isNotNull(value) && value['value'] !== undefined) {
        resultUniforms[key] = value;
      } else {
        switch (key) {
          case 'color':
            resultUniforms.color.value = ThreeUtil.getColorSafe(value, resultUniforms.color.value);
            break;
          case 'deltaX':
            resultUniforms.delta.value = ThreeUtil.getVector2Safe(uniforms.deltaX, uniforms.deltaY, resultUniforms.delta.value);
            break;
          case 'powRGBx':
            resultUniforms.powRGB.value = ThreeUtil.getVector3Safe(uniforms.powRGBx, uniforms.powRGBy, uniforms.powRGBz, resultUniforms.powRGB.value);
            break;
          case 'mulRGBx':
            resultUniforms.mulRGB.value = ThreeUtil.getVector3Safe(uniforms.mulRGBx, uniforms.mulRGBy, uniforms.mulRGBz, resultUniforms.mulRGB.value);
            break;
          case 'addRGBx':
            resultUniforms.addRGB.value = ThreeUtil.getVector3Safe(uniforms.addRGBx, uniforms.addRGBy, uniforms.addRGBz, resultUniforms.addRGB.value);
            break;
          default:
            resultUniforms[key] = { value: value };
            break;
        }
      }
    });
    Object.entries(resultUniforms).forEach(([key, value]) => {
      switch (key) {
        case 'resolution':
          resultUniforms.resolution.value = ThreeUtil.getVector2Safe(uniforms.resolutionX || this.width || 1024, uniforms.resolutionY || this.height || 1024, value.value);
          break;
        case 'bloomTexture':
          if (ThreeUtil.isNotNull(this.bloomTexture) && ThreeUtil.isNotNull(this.bloomTexture.getRenderTarget2)) {
            resultUniforms.bloomTexture.value = this.bloomTexture.getRenderTarget2().texture;
          }
          break;
      }
    });
    if (this.debug) {
      this.consoleLog('pass-uniforms', resultUniforms);
    }
    return resultUniforms;
  }

  /**
   * Sets assign uniforms
   * @param resultUniforms
   */
  private setAssignUniforms(resultUniforms: { [key: string]: THREE.IUniform }) {
    if (ThreeUtil.isNotNull(this.uniforms)) {
      Object.entries(resultUniforms).forEach(([key, value]) => {
        this.uniforms[key] = value;
      });
    }
  }

  /**
   * Gets material shader
   * @param type
   * @returns
   */
  private getMaterialShader(type: string) {
    if (type === 'x-shader/x-vertex') {
      if (ThreeUtil.isNotNull(this.vertexShader) || ThreeUtil.isNotNull(this.materialShader)) {
        return ShaderUtils.getVertexShader(ThreeUtil.getTypeSafe(this.vertexShader, this.materialShader));
      }
    } else if (type === 'x-shader/x-fragment') {
      if (ThreeUtil.isNotNull(this.fragmentShader) || ThreeUtil.isNotNull(this.materialShader)) {
        return ShaderUtils.getFragmentShader(ThreeUtil.getTypeSafe(this.fragmentShader, this.materialShader));
      }
    }
    if (this.shaderList !== null && this.shaderList.length > 0) {
      const foundShader = this.shaderList.find((shader) => {
        return shader.type.toLowerCase() === type;
      });
      if (foundShader !== null && foundShader !== undefined) {
        return foundShader.getShader();
      }
    }
    return undefined;
  }

  /**
   * Gets texture id
   * @param [def]
   * @returns texture id
   */
  private getTextureId(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textureId, def);
  }

  /**
   * Gets map
   * @param [effectComposer]
   * @param [camera]
   * @param [scene]
   * @param [mapType]
   * @returns map
   */
  private getMap(effectComposer?: EffectComposer, camera?: THREE.Camera, scene?: THREE.Scene, mapType?: string): THREE.Texture {
    const map = this.getTexture(this.map, this.texture);
    if (ThreeUtil.isNotNull(map)) {
      return map;
    }
    if (ThreeUtil.isNotNull(effectComposer)) {
      switch ((mapType || '').toLowerCase()) {
        case 'target1':
          return effectComposer.renderTarget1.texture;
        case 'write':
          return effectComposer.writeBuffer.texture;
        case 'read':
          return effectComposer.readBuffer.texture;
        case 'target2':
        default:
          return effectComposer.renderTarget2.texture;
      }
    }
    const refMap = this.map;
    if (ThreeUtil.isNotNull(refMap) && refMap.getRenderTarget2 && refMap.getRenderTarget1 && refMap.getWriteBuffer && refMap.getReadBuffer) {
      switch ((mapType || '').toLowerCase()) {
        case 'target1':
          return refMap.getRenderTarget1(effectComposer.renderer, camera, scene).texture;
        case 'write':
          return refMap.getWriteBuffer(effectComposer.renderer, camera, scene).texture;
        case 'read':
          return refMap.getReadBuffer(effectComposer.renderer, camera, scene).texture;
        case 'target2':
        default:
          return refMap.getRenderTarget2(effectComposer.renderer, camera, scene).texture;
      }
    }
    return undefined;
  }

  /**
   * Gets radius
   * @param [def]
   * @returns radius
   */
  private getRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radius, def);
  }

  /**
   * Gets threshold
   * @param [def]
   * @returns threshold
   */
  private getThreshold(def?: number): number {
    return ThreeUtil.getTypeSafe(this.threshold, def);
  }

  /**
   * Gets go wild
   * @param [def]
   * @returns true if go wild
   */
  private getGoWild(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.goWild, def);
  }

  /**
   * Effect composer of pass component
   */
  private effectComposer: EffectComposer = null;

  /**
   * Effect scene of pass component
   */
  private effectScene: THREE.Scene = null;

  /**
   * Effect camera of pass component
   */
  private effectCamera: THREE.Camera = null;

  /**
   * Pass  of pass component
   */
  private pass: Pass = null;

  /**
   * Sets scene
   * @param [scene]
   */
  public setScene(scene?: THREE.Scene) {
    if (this.effectScene !== scene) {
      this.effectScene = scene;
      if (this.pass !== null && this.pass['scene'] !== undefined) {
        this.pass['scene'] = this.getScene(this.effectScene);
      }
    }
  }

  /**
   * Sets effect composer
   * @param [scene]
   * @param [camera]
   * @param [effectComposer]
   */
  public setEffectComposer(scene?: THREE.Scene, camera?: THREE.Camera, effectComposer?: EffectComposer) {
    if (this.effectComposer !== effectComposer || scene !== this.effectScene || camera !== this.effectCamera) {
      this.effectComposer = effectComposer;
      this.effectScene = scene;
      this.effectCamera = camera;
      if (this.pass === null) {
        this.getPass();
      } else {
        this.needUpdate = true;
      }
    }
  }

  /**
   * Gets object
   * @returns object
   */
  public getObject<T>(): T {
    return this.getPass() as any;
  }

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  public applyChanges(changes: string[]) {
    if (this.pass !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getPass();
        return;
      }

      if (!ThreeUtil.isOnlyIndexOf(changes, ['init', 'enabled', 'needsswap', 'clear', 'rendertoscreen'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['enabled', 'needsswap', 'clear', 'rendertoscreen']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'enabled':
            if (ThreeUtil.isNotNull(this.enabled)) {
              this.pass.enabled = this.getEnabled(true);
            }
            break;
          case 'needsswap':
            if (ThreeUtil.isNotNull(this.needsSwap)) {
              this.pass.needsSwap = this.getNeedsSwap(true);
            }
            break;
          case 'clear':
            if (ThreeUtil.isNotNull(this.clear)) {
              this.pass.clear = this.getClear(false);
            }
            break;
          case 'rendertoscreen':
            if (ThreeUtil.isNotNull(this.renderToScreen)) {
              this.pass.renderToScreen = this.getRenderToScreen(false);
            }
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  /**
   * Gets pass
   * @returns pass
   */
  public getPass(): Pass {
    if (this.pass === null || this._needUpdate) {
      this.needUpdate = false;
      let pass: Pass = null;
      if (ThreeUtil.isNotNull(this.refer)) {
        this.unSubscribeRefer('referPass');
        if (ThreeUtil.isNotNull(this.refer.getPass)) {
          pass = this.refer.getPass();
        }
        this.subscribeRefer(
          'referPass',
          ThreeUtil.getSubscribe(
            this.refer,
            () => {
              this.needUpdate = true;
            },
            'pass'
          )
        );
      }
      if (pass === null) {
        switch (this.type.toLowerCase()) {
          case 'adaptivetonemappingpass':
          case 'adaptivetonemapping':
            pass = new AdaptiveToneMappingPass(this.getAdaptive(), this.getResolution());
            break;
          case 'afterimagepass':
          case 'afterimage':
            pass = new AfterimagePass(this.getDamp());
            break;
          case 'bloompass':
          case 'bloom':
            pass = new BloomPass(this.getStrength(), this.getKernelSize(), this.getSigma(), this.getResolution());
            break;
          case 'bokehpass':
          case 'bokeh':
            pass = new BokehPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), {
              focus: ThreeUtil.getTypeSafe(this.focus, 1.0),
              aspect: ThreeUtil.getTypeSafe(this.aspect, null),
              aperture: ThreeUtil.getTypeSafe(this.aperture, null),
              maxblur: ThreeUtil.getTypeSafe(this.maxblur, null),
              width: ThreeUtil.getTypeSafe(this.width, null),
              height: ThreeUtil.getTypeSafe(this.height, null),
            });
            break;
          case 'cubetexturepass':
          case 'cubetexture':
            pass = new CubeTexturePass(this.getCamera(this.effectCamera) as THREE.PerspectiveCamera, this.getEnvMap(), this.getOpacity());
            break;
          case 'dotscreenpass':
          case 'dotscreen':
            pass = new DotScreenPass(this.getCenter(), this.getAngle(), this.getScale());
            break;
          case 'filmpass':
          case 'film':
            pass = new FilmPass(this.getNoiseIntensity(), this.getScanlinesIntensity(), this.getScanlinesCount(), this.getGrayscale());
            break;
          case 'glitchpass':
          case 'glitch':
            const glitchpass = new GlitchPass(this.getDtSize());
            glitchpass.goWild = this.getGoWild(false);
            pass = glitchpass;
            break;
          case 'halftonepass':
          case 'halftone':
            const halftonePass = new HalftonePass(
              this.getWidth(),
              this.getHeight(),
              null // this.getParams(null)
            );
            pass = halftonePass;
            break;
          case 'clearmaskpass':
          case 'clearmask':
            pass = new ClearMaskPass();
            break;
          case 'maskpass':
          case 'mask':
            const maskpass = new MaskPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera));
            if (ThreeUtil.isNotNull(this.inverse)) {
              maskpass.inverse = ThreeUtil.getTypeSafe(this.inverse, false);
            }
            pass = maskpass;
            break;
          case 'outlinepass':
          case 'outline':
            const outlinePass = new OutlinePass(ThreeUtil.getVector2Safe(this.getWidth(1024), this.getHeight(1024)), this.getScene(this.effectScene), this.getCamera(this.effectCamera));
            if (ThreeUtil.isNotNull(this.patternTexture)) {
              outlinePass.patternTexture = this.getPatternTexture();
            }
            if (ThreeUtil.isNotNull(this.selectedObjects)) {
              outlinePass.selectedObjects = this.getSelectedObjects();
            }
            if (ThreeUtil.isNotNull(this.visibleEdgeColor)) {
              outlinePass.visibleEdgeColor = ThreeUtil.getColorSafe(this.visibleEdgeColor, 0xffffff);
            }
            if (ThreeUtil.isNotNull(this.hiddenEdgeColor)) {
              outlinePass.hiddenEdgeColor = ThreeUtil.getColorSafe(this.hiddenEdgeColor, 0xffffff);
            }
            if (ThreeUtil.isNotNull(this.edgeGlow)) {
              outlinePass.edgeGlow = ThreeUtil.getTypeSafe(this.edgeGlow, 0);
            }
            if (ThreeUtil.isNotNull(this.usePatternTexture)) {
              outlinePass.usePatternTexture = ThreeUtil.getTypeSafe(this.usePatternTexture, false);
            }
            if (ThreeUtil.isNotNull(this.edgeThickness)) {
              outlinePass.edgeThickness = ThreeUtil.getTypeSafe(this.edgeThickness, 1.0);
            }
            if (ThreeUtil.isNotNull(this.edgeStrength)) {
              outlinePass.edgeStrength = ThreeUtil.getTypeSafe(this.edgeStrength, 3.0);
            }
            if (ThreeUtil.isNotNull(this.downSampleRatio)) {
              outlinePass.downSampleRatio = ThreeUtil.getTypeSafe(this.downSampleRatio, 2.0);
            }
            if (ThreeUtil.isNotNull(this.pulsePeriod)) {
              outlinePass.pulsePeriod = ThreeUtil.getTypeSafe(this.pulsePeriod, 0.0);
            }
            pass = outlinePass;
            break;
          case 'renderpass':
          case 'render':
            pass = new RenderPass(
              this.getScene(this.effectScene),
              this.getCamera(this.effectCamera)
              //this.getOverrideMaterial(null),
              //new THREE.Color(this.getClearColor()),
              // this.getClearAlpha()
            );
            break;
          case 'saopass':
          case 'sao':
            const saoPass = new SAOPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), this.getDepthTexture(), this.getUseNormals(), ThreeUtil.getVector2Safe(this.width, this.height));
            saoPass.params = {
              output: this.getSaoOutput('Default'),
              saoBias: ThreeUtil.getTypeSafe(this.saoBias, 0.5),
              saoIntensity: ThreeUtil.getTypeSafe(this.saoIntensity, 0.18),
              saoScale: ThreeUtil.getTypeSafe(this.saoScale, 1),
              saoKernelRadius: ThreeUtil.getTypeSafe(this.saoKernelRadius, this.kernelRadius, 100),
              saoMinResolution: ThreeUtil.getTypeSafe(this.saoMinResolution, 0),
              saoBlur: ThreeUtil.getTypeSafe(this.saoBlur, true),
              saoBlurRadius: ThreeUtil.getTypeSafe(this.saoBlurRadius, 8),
              saoBlurStdDev: ThreeUtil.getTypeSafe(this.saoBlurStdDev, 4),
              saoBlurDepthCutoff: ThreeUtil.getTypeSafe(this.saoBlurDepthCutoff, 0.01),
            };
            pass = saoPass;
            break;
          case 'savepass':
          case 'save':
            pass = new SavePass(this.getRenderTarget());
            break;
          case 'shaderpass':
          case 'shader':
            const shaderPass = new ShaderPass(this.getShader(), this.getTextureId());
            pass = shaderPass;
            break;
          case 'smaapass':
          case 'smaa':
            pass = new SMAAPass(this.getWidth(1024), this.getHeight(1024));
            break;
          case 'ssaarenderpass':
          case 'ssaarender':
            const ssaaRenderPass = new SSAARenderPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), this.getClearColor(), this.getClearAlpha());
            if (ThreeUtil.isNotNull(this.sampleLevel)) {
              ssaaRenderPass.sampleLevel = ThreeUtil.getTypeSafe(this.sampleLevel, 4);
            }
            if (ThreeUtil.isNotNull(this.unbiased)) {
              ssaaRenderPass.unbiased = ThreeUtil.getTypeSafe(this.unbiased, true);
            }
            pass = ssaaRenderPass;
            break;
          case 'ssaopass':
          case 'ssao':
            const ssaoPass = new SSAOPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), this.getWidth(), this.getHeight());
            ssaoPass.output = this.getSsaoOutput('Default');
            ssaoPass.kernelRadius = ThreeUtil.getTypeSafe(this.kernelRadius, this.saoKernelRadius, 8);
            ssaoPass.minDistance = ThreeUtil.getTypeSafe(this.minDistance, 0.005);
            ssaoPass.maxDistance = ThreeUtil.getTypeSafe(this.maxDistance, 0.1);
            pass = ssaoPass;
            break;
          case 'taarenderpass':
          case 'taarender':
            const taaRenderPass = new TAARenderPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), this.getClearColor(), this.getClearAlpha());
            if (ThreeUtil.isNotNull(this.sampleLevel)) {
              taaRenderPass.sampleLevel = ThreeUtil.getTypeSafe(this.sampleLevel, 4);
            }
            if (ThreeUtil.isNotNull(this.unbiased)) {
              taaRenderPass.unbiased = ThreeUtil.getTypeSafe(this.unbiased, true);
            }
            if (ThreeUtil.isNotNull(this.accumulate)) {
              taaRenderPass.accumulate = ThreeUtil.getTypeSafe(this.accumulate, false);
            }
            pass = taaRenderPass;
            break;
          case 'texturepass':
          case 'texture':
            pass = new TexturePass(this.getMap(this.effectComposer, this.effectCamera, this.effectScene), this.getOpacity());
            break;
          case 'unrealbloompass':
          case 'unrealbloom':
            pass = new UnrealBloomPass(ThreeUtil.getVector2Safe(this.width | 512, this.height | 512, new THREE.Vector2(512, 512)), this.getStrength(1.5), this.getRadius(0.4), this.getThreshold(0.85));
            break;
          case 'ssrpass':
          case 'ssr': // todo
            pass = new SSRPass({
              renderer: null, // WebGLRenderer;
              scene: null, // this.getScene(this.effectScene),
              camera: null, // this.getCamera(this.effectCamera),
              width: null, // number | undefined;
              height: null, // number | undefined;
              selects: null, // Mesh[] | null;
              encoding: null, // TextureEncoding;
              isPerspectiveCamera: null, // boolean | undefined;
              isBouncing: null, // boolean | undefined;
              morphTargets: null, // boolean | undefined;
              groundReflector: null, // Reflector | null;
            });
            break;
          case 'ssrrpass':
          case 'ssrr': // todo
            pass = new SSRrPass({
              renderer: null, //  WebGLRenderer;
              scene: null, //  Scene;
              camera: null, //  Camera;
              width: null, //  number | undefined;
              height: null, //  number | undefined;
              selects: null, //  Mesh[] | null;
              encoding: null, //  TextureEncoding;
              morphTargets: null, //  boolean | undefined;
            });
            break;
          case 'lutpass':
          case 'lut':
            const lutPass = new LUTPass({
              lut: null,
              intensity: this.getIntensity(),
            });
            lutPass.enabled = false;
            this.getLut((result) => {
              this.pass['lut'] = this.use2DLut ? result.texture : result.texture3D;
              this.pass.enabled = this.enabled;
            });
            pass = lutPass;
            break;
          case 'clearpass':
          case 'clear':
            pass = new ClearPass(this.getClearColor(), this.getClearAlpha());
            break;
          default:
            pass = null;
            break;
        }
      }
      if (this.effectComposer !== null && pass !== null) {
        let passIndex = -1;
        if (this.pass !== null) {
          passIndex = this.effectComposer.passes.indexOf(this.pass);
        }
        if (passIndex === -1) {
          this.effectComposer.addPass(pass);
        } else {
          this.effectComposer.removePass(this.pass);
          this.effectComposer.insertPass(pass, passIndex);
        }
      }
      if (ThreeUtil.isNotNull(pass['uniforms']) && ThreeUtil.isNotNull(this.uniforms)) {
        this.setAssignUniforms(pass['uniforms']);
      }
      this.pass = pass;
      this.setObject(this.pass);
    }
    return this.pass;
  }
}
