import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { GeometryComponent } from '../geometry/geometry.component';
import { HtmlComponent } from '../html/html.component';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { MaterialComponent } from '../material/material.component';
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
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit, AfterContentInit {

  @Output() private onLoad:EventEmitter<SharedComponent> = new EventEmitter<SharedComponent>();
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

  constructor() { }

  ngOnInit(): void {}

  ngAfterContentInit() {}

  getShared() {
    this.geometryList.changes.subscribe(() => {
      this.initComponents('geometry');
    });
    this.materialList.changes.subscribe(() => {
      this.initComponents('material');
    });
    this.textureList.changes.subscribe(() => {
      this.initComponents('texture');
    });
    this.lensflareElementList.changes.subscribe(() => {
      this.initComponents('lensflare');
    });
    this.svgList.changes.subscribe(() => {
      this.initComponents('svg');
    });
    this.listnerList.changes.subscribe(() => {
      this.initComponents('listner');
    });
    this.audioList.changes.subscribe(() => {
      this.initComponents('audio');
    });
    this.cssChildrenList.changes.subscribe(() => {
      this.initComponents('css');
    });
    this.rigidbodyList.changes.subscribe(() => {
      this.initComponents('rigidbody');
    });
    this.meshList.changes.subscribe(() => {
      this.initComponents('mesh');
    });
    this.cameraList.changes.subscribe(() => {
      this.initComponents('camera');
    });
    this.helperList.changes.subscribe(() => {
      this.initComponents('helper');
    });
    this.lightList.changes.subscribe(() => {
      this.initComponents('light');
    });
    this.positionList.changes.subscribe(() => {
      this.initComponents('position');
    });
    this.rotationList.changes.subscribe(() => {
      this.initComponents('rotation');
    });
    this.scaleList.changes.subscribe(() => {
      this.initComponents('scale');
    });
    this.lookatList.changes.subscribe(() => {
      this.initComponents('lookat');
    });
    this.initComponents('geometry');
    this.initComponents('material');
    this.initComponents('texture');
    this.initComponents('lensflare');
    this.initComponents('svg');
    this.initComponents('listner');
    this.initComponents('audio');
    this.initComponents('css');
    this.initComponents('rigidbody');
    this.initComponents('mesh');
    this.initComponents('camera');
    this.initComponents('helper');
    this.initComponents('light');
    this.initComponents('position');
    this.initComponents('rotation');
    this.initComponents('scale');
    this.initComponents('lookat');
    this.onLoad.emit(this);
  }

  getGeometryComponents(): GeometryComponent[]{
    return this.getComponents(this.geometryList);
  }

  getMaterialComponents(): MaterialComponent[]{
    return this.getComponents(this.materialList);
  }

  getTextureComponents(): TextureComponent[]{
    return this.getComponents(this.textureList);
  }

  getComponents(list : QueryList<any>): any[]{
    const result : any[] = [];
    list.forEach(ele => {
      result.push(ele);
    });
    return result;
  }

  initComponents(type : string) {
    switch(type) {
      case 'geometry' :
          this.geometryList.forEach(geometry => {
            geometry.getGeometry();
          });
        break;
        case 'material' :
          this.materialList.forEach(material => {
            material.getMaterial();
          });
        break;
        case 'texture' :
          this.textureList.forEach(texture => {
            texture.getTexture();
          });
        break;
        case 'lensflare' :
          this.lensflareElementList.forEach(lensflareElement => {
            lensflareElement.getLensflareElement();
          });
        break;
        case 'svg' :
          this.svgList.forEach(svg => {
            svg.getSVGResult(() => {});
          });
        break;
        case 'listner' :
          this.listnerList.forEach(listner => {
            listner.getListener();
          });
        break;
        case 'audio' :
          this.audioList.forEach(audio => {
            audio.getAudio();
          });
        break;
        case 'geometry' :
          this.cssChildrenList.forEach(cssChildren => {
            cssChildren.getHtml();
          });
        break;
        case 'rigidbody' :
          this.rigidbodyList.forEach(rigidbody => {
            rigidbody.resetRigidBody();
          });
        break;
        case 'mesh' :
          this.meshList.forEach(mesh => {
            mesh.getMesh();
          });
        break;
        case 'camera' :
          this.cameraList.forEach(camera => {
            camera.getCamera();
          });
        break;
        case 'helper' :
          this.helperList.forEach(helper => {
            helper.getHelper();
          });
        break;
        case 'light' :
          this.lightList.forEach(light => {
            light.getLight();
          });
        break;
        case 'position' :
          this.positionList.forEach(position => {
            position.getPosition();
          });
        break;
        case 'rotation' :
          this.rotationList.forEach(rotation => {
            rotation.getRotation();
          });
        break;
        case 'scale' :
          this.scaleList.forEach(scale => {
            scale.getScale();
          });
        break;
        case 'lookat' :
          this.lookatList.forEach(lookat => {
            lookat.getLookAt();
          });
        break;
    }
  }

}
