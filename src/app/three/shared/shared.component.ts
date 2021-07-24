import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { AnimationGroupComponent } from '../animation-group/animation-group.component';
import { AbstractGeometryComponent } from '../geometry.abstract';
import { HtmlComponent } from '../html/html.component';
import { ThreeUtil } from '../interface';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { AbstractMaterialComponent } from '../material.abstract';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { SvgComponent } from '../svg/svg.component';
import { AbstractTextureComponent } from '../texture.abstract';
import { AudioComponent } from './../audio/audio.component';
import { CameraComponent } from './../camera/camera.component';
import { ControllerComponent } from './../controller/controller.component';
import { HelperComponent } from './../helper/helper.component';
import { LightComponent } from './../light/light.component';
import { ListenerComponent } from './../listener/listener.component';
import { LookatComponent } from './../lookat/lookat.component';
import { MeshComponent } from './../mesh/mesh.component';
import { PositionComponent } from './../position/position.component';
import { RigidbodyComponent } from './../rigidbody/rigidbody.component';
import { RotationComponent } from './../rotation/rotation.component';
import { ScaleComponent } from './../scale/scale.component';

/**
 * SharedComponent
 */
@Component({
  selector: 'ngx3js-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent extends AbstractSubscribeComponent implements OnInit, AfterContentInit {
  /**
   * Content children of shared component
   */
  @ContentChildren(AbstractGeometryComponent, { descendants: false }) private geometryList: QueryList<AbstractGeometryComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(AbstractMaterialComponent, { descendants: false }) private materialList: QueryList<AbstractMaterialComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(AbstractTextureComponent, { descendants: false }) private textureList: QueryList<AbstractTextureComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(LensflareelementComponent, { descendants: false }) private lensflareElementList: QueryList<LensflareelementComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(SvgComponent, { descendants: false }) private svgList: QueryList<SvgComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(ListenerComponent, { descendants: false }) private listnerList: QueryList<ListenerComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(AudioComponent, { descendants: false }) private audioList: QueryList<AudioComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(HtmlComponent, { descendants: false }) private cssChildrenList: QueryList<HtmlComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(RigidbodyComponent, { descendants: false }) private rigidbodyList: QueryList<RigidbodyComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(MeshComponent, { descendants: false }) private meshList: QueryList<MeshComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(CameraComponent, { descendants: false }) private cameraList: QueryList<CameraComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(HelperComponent, { descendants: false }) private helperList: QueryList<HelperComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(LightComponent, { descendants: false }) private lightList: QueryList<LightComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(ControllerComponent, { descendants: false }) public controllerList: QueryList<ControllerComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;

  /**
   * Content children of shared component
   */
  @ContentChildren(AnimationGroupComponent, { descendants: false }) private animationGroupList: QueryList<AnimationGroupComponent>;

  /**
   * Creates an instance of shared component.
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
    super.ngOnInit('shared');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
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
    if (changes) {
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
    this.subscribeListQueryChange(this.geometryList, 'geometryList', 'geometry');
    this.subscribeListQueryChange(this.materialList, 'materialList', 'material');
    this.subscribeListQueryChange(this.textureList, 'textureList', 'texture');
    this.subscribeListQueryChange(this.lensflareElementList, 'lensflareElementList', 'lensflareElement');
    this.subscribeListQueryChange(this.svgList, 'svgList', 'svg');
    this.subscribeListQueryChange(this.listnerList, 'listnerList', 'listner');
    this.subscribeListQueryChange(this.audioList, 'audioList', 'audio');
    this.subscribeListQueryChange(this.cssChildrenList, 'cssChildrenList', 'cssChildren');
    this.subscribeListQueryChange(this.rigidbodyList, 'rigidbodyList', 'rigidbody');
    this.subscribeListQueryChange(this.meshList, 'meshList', 'mesh');
    this.subscribeListQueryChange(this.cameraList, 'cameraList', 'camera');
    this.subscribeListQueryChange(this.helperList, 'helperList', 'helper');
    this.subscribeListQueryChange(this.lightList, 'lightList', 'light');
    this.subscribeListQueryChange(this.controllerList, 'controllerList', 'controller');
    this.subscribeListQueryChange(this.positionList, 'positionList', 'position');
    this.subscribeListQueryChange(this.rotationList, 'rotationList', 'rotation');
    this.subscribeListQueryChange(this.scaleList, 'scaleList', 'scale');
    this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
    this.subscribeListQueryChange(this.animationGroupList, 'animationGroupList', 'animation-group');
    super.ngAfterContentInit();
  }

  /**
   * Shared obj of shared component
   */
  private sharedObj: any = null;

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  public applyChanges(changes: string[]) {
    if (this.sharedObj !== null) {
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['geometry', 'material', 'texture', 'lensflareelement', 'svg', 'listner', 'audio', 'csschildren', 'rigidbody', 'mesh', 'camera', 'helper', 'light', 'controller', 'position', 'rotation', 'scale', 'animation-group', 'lookat']);
      }
      if (ThreeUtil.isIndexOf(changes, ['type'])) {
        return;
      }
      changes.forEach((change) => {
        switch (change) {
          case 'geometry':
            this.geometryList.forEach((geometry) => {
              geometry.getGeometry();
            });
            break;
          case 'material':
            this.materialList.forEach((material) => {
              material.getMaterial();
            });
            break;
          case 'texture':
            this.textureList.forEach((texture) => {
              // texture.getTexture();
            });
            break;
          case 'lensflare':
            this.lensflareElementList.forEach((lensflareElement) => {
              lensflareElement.getLensflareElement();
            });
            break;
          case 'svg':
            this.svgList.forEach((svg) => {
              svg.getSVGResult(() => {});
            });
            break;
          case 'listner':
            this.listnerList.forEach((listner) => {
              listner.getListener();
            });
            break;
          case 'audio':
            this.audioList.forEach((audio) => {
              audio.getAudio();
            });
            break;
          case 'geometry':
            this.cssChildrenList.forEach((cssChildren) => {
              cssChildren.getHtml();
            });
            break;
          case 'rigidbody':
            this.rigidbodyList.forEach((rigidbody) => {
              rigidbody.getRigidBody();
            });
            break;
          case 'mesh':
            this.meshList.forEach((mesh) => {
              mesh.getObject3d();
            });
            break;
          case 'camera':
            this.cameraList.forEach((camera) => {
              camera.getObject3d();
            });
            break;
          case 'helper':
            this.helperList.forEach((helper) => {
              helper.getHelper();
            });
            break;
          case 'light':
            this.lightList.forEach((light) => {
              light.getObject3d();
            });
            break;
          case 'position':
            this.positionList.forEach((position) => {
              position.getPosition();
            });
            break;
          case 'rotation':
            this.rotationList.forEach((rotation) => {
              rotation.getRotation();
            });
            break;
          case 'scale':
            this.scaleList.forEach((scale) => {
              scale.getScale();
            });
            break;
          case 'animation-group':
            this.animationGroupList.forEach((animationGroup) => {
              animationGroup.getAnimationGroup();
            });
            break;
          case 'lookat':
            this.lookatList.forEach((lookat) => {
              lookat.getLookAt();
            });
            break;
        }
      });
    }
    super.applyChanges(changes);
  }

  /**
   * Gets shared
   * @returns shared
   */
  public getShared(): any {
    if (this.sharedObj === null || this._needUpdate) {
      this.needUpdate = false;
      this.sharedObj = { shared: Math.random() };
      super.setObject(this.sharedObj);
    }
    return this.sharedObj;
  }

  /**
   * Gets geometry components
   * @returns geometry components
   */
  public getGeometryComponents(): AbstractGeometryComponent[] {
    return this.getComponents(this.geometryList);
  }

  /**
   * Gets material components
   * @returns material components
   */
  public getMaterialComponents(): AbstractMaterialComponent[] {
    return this.getComponents(this.materialList);
  }

  /**
   * Gets texture components
   * @returns texture components
   */
  public getTextureComponents(): AbstractTextureComponent[] {
    return this.getComponents(this.textureList);
  }

  /**
   * Gets animation group components
   * @returns animation group components
   */
  public getAnimationGroupComponents(): AnimationGroupComponent[] {
    return this.getComponents(this.animationGroupList);
  }

  /**
   * Gets components
   * @param list
   * @returns components
   */
  public getComponents(list: QueryList<any>): any[] {
    const result: any[] = [];
    list.forEach((ele) => {
      result.push(ele);
    });
    return result;
  }
}
