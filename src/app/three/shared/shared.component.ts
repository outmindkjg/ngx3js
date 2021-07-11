import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { AnimationGroupComponent } from '../animation-group/animation-group.component';
import { GeometryComponent } from '../geometry/geometry.component';
import { HtmlComponent } from '../html/html.component';
import { ThreeUtil } from '../interface';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { MaterialComponent } from '../material/material.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { SvgComponent } from '../svg/svg.component';
import { TextureComponent } from '../texture/texture.component';
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

@Component({
  selector: 'three-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent extends AbstractSubscribeComponent implements OnInit, AfterContentInit {
  @ContentChildren(GeometryComponent, { descendants: false }) private geometryList: QueryList<GeometryComponent>;
  @ContentChildren(MaterialComponent, { descendants: false }) private materialList: QueryList<MaterialComponent>;
  @ContentChildren(TextureComponent, { descendants: false }) private textureList: QueryList<TextureComponent>;
  @ContentChildren(LensflareelementComponent, { descendants: false }) private lensflareElementList: QueryList<LensflareelementComponent>;
  @ContentChildren(SvgComponent, { descendants: false }) private svgList: QueryList<SvgComponent>;
  @ContentChildren(ListenerComponent, { descendants: false }) private listnerList: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false }) private audioList: QueryList<AudioComponent>;
  @ContentChildren(HtmlComponent, { descendants: false }) private cssChildrenList: QueryList<HtmlComponent>;
  @ContentChildren(RigidbodyComponent, { descendants: false }) private rigidbodyList: QueryList<RigidbodyComponent>;
  @ContentChildren(MeshComponent, { descendants: false }) private meshList: QueryList<MeshComponent>;
  @ContentChildren(CameraComponent, { descendants: false }) private cameraList: QueryList<CameraComponent>;
  @ContentChildren(HelperComponent, { descendants: false }) private helperList: QueryList<HelperComponent>;
  @ContentChildren(LightComponent, { descendants: false }) private lightList: QueryList<LightComponent>;
  @ContentChildren(ControllerComponent, { descendants: false }) public controllerList: QueryList<ControllerComponent>;
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
  @ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;
  @ContentChildren(AnimationGroupComponent, { descendants: false }) private animationGroupList: QueryList<AnimationGroupComponent>;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('shared');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit() {
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

  private sharedObj: any = null;

  applyChanges(changes: string[]) {
    if (this.sharedObj !== null) {
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['geometry', 'material', 'texture', 'lensflareelement', 'svg', 'listner', 'audio', 'csschildren', 'rigidbody', 'mesh', 'camera', 'helper', 'light', 'controller', 'position', 'rotation', 'scale', 'animation-group','lookat']);
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
          case 'animation-group' :
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

  getShared(): any {
    if (this.sharedObj === null || this._needUpdate) {
      this.needUpdate = false;
      this.sharedObj = { shared: Math.random() };
      super.setObject(this.sharedObj);
    }
    return this.sharedObj;
  }

  getGeometryComponents(): GeometryComponent[] {
    return this.getComponents(this.geometryList);
  }

  getMaterialComponents(): MaterialComponent[] {
    return this.getComponents(this.materialList);
  }

  getTextureComponents(): TextureComponent[] {
    return this.getComponents(this.textureList);
  }

  getAnimationGroupComponents(): AnimationGroupComponent[] {
    return this.getComponents(this.animationGroupList);
  }

  getComponents(list: QueryList<any>): any[] {
    const result: any[] = [];
    list.forEach((ele) => {
      result.push(ele);
    });
    return result;
  }
}
