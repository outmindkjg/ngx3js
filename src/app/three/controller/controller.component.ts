import { Component, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CameraComponent } from '../camera/camera.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { AbstractThreeController } from '../controller.abstract';
import { RendererTimer } from '../interface';
import { SceneComponent } from '../scene/scene.component';
import { HtmlCollection } from '../visual/visual.component';

@Component({
  selector: 'three-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  @Input() controller : { new(ref3d : THREE.Object3D, ref2d : HtmlCollection) : AbstractThreeController } = null;
  @Input() params : { [key : string] : any} = null;
  constructor() { }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.controller) {
        this.resetController();
      } else if (changes.params && this._controller !== null) {
        this._controller.setVariables(this.params);
      }
    }
  }

  private _controller : AbstractThreeController = null;
  private refObject3d : THREE.Object3D = null;
  private refObject2d : HtmlCollection = null;

  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.resetController();
    }
  }

  setObject2D(refObject2d: HtmlCollection) {
    if (this.refObject2d !== refObject2d) {
      this.refObject2d = refObject2d;
      this.resetController();
    }
  }

	private _renderer : THREE.Renderer = null;
	private _scenes : QueryList<SceneComponent> = null;
	private _cameras : QueryList<CameraComponent> = null;
  private _canvas2ds : QueryList<CanvasComponent> = null;
  private _scene : THREE.Scene = null;
  private _canvas : HtmlCollection = null;
	
  setRenderer(renderer : THREE.Renderer, scenes : QueryList<SceneComponent>, cameras : QueryList<CameraComponent>, canvas2ds : QueryList<CanvasComponent>) {
		this._renderer = renderer;
		this._scenes = scenes;
    this._cameras = cameras;
    this._canvas2ds = canvas2ds;
    this.resetRenderer();
  }

  setScene(scene : THREE.Scene) {
    this._scene = scene;
    this.resetRenderer();
  }

  setCanvas(canvas : HtmlCollection) {
    this._canvas = canvas;
    this.resetRenderer();
  }

  resetRenderer() {
    if (this._controller !== null && this._renderer !== null) {
      this._controller.setRenderer(this._renderer, this._scenes, this._cameras, this._canvas2ds);
      if (this._scene !== null) {
        this._controller.setScene(this._scene);
      }
      if (this._canvas !== null) {
        this._controller.setCanvas(this._canvas);
      }
      
    }
  }

  resetController() {
    this._controller = null;
    this.getController();
  }

  getController() : AbstractThreeController {
    if ((this.refObject3d !== null || this.refObject2d)&& this._controller === null) {
      this._controller = new this.controller(this.refObject3d, this.refObject2d);
      this.resetRenderer();
      this._controller.setVariables(this.params);
      this._controller.awake();
    }
    return this._controller;
  }

  logSeqn : number = 0;
  update(rendererTimer : RendererTimer) {
    if (this._controller !== null) {
      this._controller.update(rendererTimer);
    } else {
      this.logSeqn++;
      if (this.logSeqn % 300 === 0) {
        console.log(rendererTimer);
      }
    }
  }
}
