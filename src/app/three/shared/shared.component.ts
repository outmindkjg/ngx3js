import { AfterContentInit, Component, ContentChildren, EventEmitter, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
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
    this.subscribeListQuery(this.geometryList, 'geometryList', 'geometry');
    this.subscribeListQuery(this.materialList, 'materialList', 'material');
    this.subscribeListQuery(this.textureList, 'textureList', 'texture');
    this.subscribeListQuery(this.lensflareElementList, 'lensflareElementList', 'lensflareElement');
    this.subscribeListQuery(this.svgList, 'svgList', 'svg');
    this.subscribeListQuery(this.listnerList, 'listnerList', 'listner');
    this.subscribeListQuery(this.audioList, 'audioList', 'audio');
    this.subscribeListQuery(this.cssChildrenList, 'cssChildrenList', 'cssChildren');
    this.subscribeListQuery(this.rigidbodyList, 'rigidbodyList', 'rigidbody');
    this.subscribeListQuery(this.meshList, 'meshList', 'mesh');
    this.subscribeListQuery(this.cameraList, 'cameraList', 'camera');
    this.subscribeListQuery(this.helperList, 'helperList', 'helper');
    this.subscribeListQuery(this.lightList, 'lightList', 'light');
    this.subscribeListQuery(this.controllerList, 'controllerList', 'controller');
    this.subscribeListQuery(this.positionList, 'positionList', 'position');
    this.subscribeListQuery(this.rotationList, 'rotationList', 'rotation');
    this.subscribeListQuery(this.scaleList, 'scaleList', 'scale');
    this.subscribeListQuery(this.lookatList, 'lookatList', 'lookat');
    super.ngAfterContentInit();
  }

  private sharedObj: any = null;

  synkObject(synkTypes: string[]) {
    if (this.sharedObj !== null) {
      if (ThreeUtil.isIndexOf(synkTypes, 'init')) {
        synkTypes = ThreeUtil.pushUniq(synkTypes, ['geometry', 'material', 'texture', 'lensflareElement', 'svg', 'listner', 'audio', 'cssChildren', 'rigidbody', 'mesh', 'camera', 'helper', 'light', 'controller', 'position', 'rotation', 'scale', 'lookat']);
      }
      if (ThreeUtil.isIndexOf(synkTypes, ['type'])) {
        return;
      }
      synkTypes.forEach((synkType) => {
        switch (synkType) {
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
              texture.getTexture();
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
              rigidbody.resetRigidBody();
            });
            break;
          case 'mesh':
            this.meshList.forEach((mesh) => {
              mesh.getMesh();
            });
            break;
          case 'camera':
            this.cameraList.forEach((camera) => {
              camera.getCamera();
            });
            break;
          case 'helper':
            this.helperList.forEach((helper) => {
              helper.getHelper();
            });
            break;
          case 'light':
            this.lightList.forEach((light) => {
              light.getLight();
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
          case 'lookat':
            this.lookatList.forEach((lookat) => {
              lookat.getLookAt();
            });
            break;
        }
      });
    }
    super.synkObject(synkTypes);
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

  getComponents(list: QueryList<any>): any[] {
    const result: any[] = [];
    list.forEach((ele) => {
      result.push(ele);
    });
    return result;
  }
}
