import * as THREE from 'three';
import { ThreeUtil } from '../interface';

export class ViewerCanvas {

  position : { x : number , y : number } = null;
  size : { width : number, height : number } = null;
  enabled : boolean = true;
  camera : THREE.PerspectiveCamera = null;
  scene : THREE.Scene = null;
  private renderer : THREE.Renderer = null;
  target : THREE.Vector3 = null;  
  virtualCamera : THREE.Group = null;
  constructor(renderer : THREE.Renderer, options : any = {}) {
    this.target = new THREE.Vector3();
    this.position = { x : 0, y : 0 };
    this.size = { width : 100 , height : 100};
    const camera = new THREE.PerspectiveCamera( 70, 1, 1, 20000 );
    this.camera = camera;
    const virtualCamera = new THREE.Group();
    this.virtualCamera = virtualCamera;
    this.scene = new THREE.Scene();
    this.setOptions(options);
    this.setRenderer(renderer);
  }
  private options : any = null;
  private renderType : string = '';

  changeMultiView() {
    this.viewList.forEach(view => {
      view.left = view._left * this.size.width + this.position.x;
      view.top  = view._top * this.size.height + this.position.y;
      view.width = view._width * this.size.width;
      view.height = view._height * this.size.height;
    });
  }

  public setOptions(options : any) {
    this.options = options || { type : null};
    this.scene.clear();
    this.virtualCamera.clear();
    this.renderType = (this.options.type || 'circlescreen').toLowerCase();
    switch(this.renderType) {
      case 'multiview' :
        this.viewList = [];
        const views : any[] = options.views || [];
        views.forEach(view => {
          const left = parseFloat(ThreeUtil.getTypeSafe(view.left, 0));
          const top = parseFloat(ThreeUtil.getTypeSafe(view.top, 0));
          const width = parseFloat(ThreeUtil.getTypeSafe(view.width, 0));
          const height = parseFloat(ThreeUtil.getTypeSafe(view.height, 0));
          this.viewList.push({
            _left : left,
            _top :top,
            _width :width,
            _height :height,
            left : 0,
            top : 0 ,
            width : 100,
            height : 100,
            background : ThreeUtil.getColorSafe(view.background)
          });
        });
        this.changeMultiView();
        break;
      case 'circlescreen' :
        this.scene.add(this.virtualCamera);
        this.virtualCamera.add( this.camera );
        const screenWidth = ThreeUtil.getTypeSafe(this.options.width, 175);
        const screenHeight = ThreeUtil.getTypeSafe(this.options.height, screenWidth * 1.7);
        this.options.useClear = ThreeUtil.getTypeSafe(this.options.useClear, true);
        this.options.clearColor = ThreeUtil.getColorSafe(this.options.clearColor, 0x555555);
        this.options.width = screenWidth;
        this.options.height = screenHeight;
        const frameColor = ThreeUtil.getColorSafe(this.options.frameColor, 0x666666);
        const wireframeLinewidth = ThreeUtil.getTypeSafe(this.options.frameLinewidth, 3);
        this.options.frameLinewidth = wireframeLinewidth;
        const planeGeometry = new THREE.PlaneBufferGeometry(screenWidth,screenHeight,1,1);
        const planeFrameMaterial = new THREE.MeshBasicMaterial({ depthTest : false, depthWrite : false, side : THREE.FrontSide, color : frameColor , wireframe : true, wireframeLinewidth : wireframeLinewidth });
        this.canvasList = [];
        const screenCnt = ThreeUtil.getTypeSafe(this.options.cnt , 5);
        const screenAngle = - ThreeUtil.getAngleSafe(this.options.angle , 100) ;
        const screenRadius = ThreeUtil.getTypeSafe(this.options.radius , 400) ;
        this.camera.position.y = ThreeUtil.getTypeSafe(this.options.cameraY , -100);
        this.virtualCamera.position.z = - screenRadius * 1.2;
        const screenZ = ThreeUtil.getTypeSafe(this.options.screenZ , 200) ;
        for(let i = 0 ; i < screenCnt ; i++) {
          const planeTarget = new THREE.WebGLRenderTarget(1024,1024, { minFilter : THREE.LinearFilter, magFilter : THREE.LinearFilter, format : THREE.RGBAFormat });
          const planeMaterial = new THREE.MeshBasicMaterial({ map : planeTarget.texture, depthTest : false, depthWrite : false, side : THREE.FrontSide });
          const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
          planeMesh.add(new THREE.Mesh(planeGeometry,planeFrameMaterial));
          const angle = screenAngle * (i / (screenCnt - 1) - 0.5);
          planeMesh.position.x = Math.sin(angle) * screenRadius;
          planeMesh.position.y = 0;
          planeMesh.position.z = Math.cos(angle) * screenRadius + screenZ;
          planeMesh.rotation.y = angle + Math.PI;
          this.canvasList.push({
            mesh : planeMesh,
            planeTarget : planeTarget,
            rotation : planeMesh.rotation,
          });
          this.virtualCamera.add(planeMesh);
        }
        break;
    }
  }

  viewList : any[] = [];
  canvasList : any[] = [];

  public setRenderer(renderer : THREE.Renderer) {
    if (this.renderer !== renderer) {
      this.renderer = renderer;
      this.updateForWindowResize();
    }
  }

  dispose() {
  }

  updateForWindowResize() {
    this.camera.aspect = this.size.width / this.size.height;
    switch(this.renderType) {
      case 'multiview' :
        this.changeMultiView();
        break;
    }
  }

  private _clearColor = new THREE.Color();
  private _autoClear : boolean = true;
  private _viewport = new THREE.Vector4();
  private _aspect = 1;
  private _cameraRotation = new THREE.Euler();
  render(renderer : THREE.Renderer, scene : THREE.Scene, camera : THREE.Camera ) {
    if (this.enabled && renderer instanceof THREE.WebGLRenderer) {
      this._autoClear = renderer.autoClear;
      renderer.getClearColor(this._clearColor);
      renderer.getViewport(this._viewport);
      if (camera instanceof THREE.PerspectiveCamera) {
        this._aspect = camera.aspect;
      }
      this._cameraRotation.copy(camera.rotation);
      switch(this.renderType) {
        case 'circlescreen' :
          if (camera instanceof THREE.PerspectiveCamera) {
            camera.aspect = this.options.width / this.options.height;
            camera.updateProjectionMatrix();
          }
          this.camera.lookAt(new THREE.Vector3(0,0,0));
          renderer.autoClear = false;
          this.canvasList.forEach(info => {
            renderer.setRenderTarget(info.planeTarget);
            const infoRotation = this._cameraRotation.clone();
            infoRotation.x += info.rotation.x;
            infoRotation.y += info.rotation.y - Math.PI;
            infoRotation.z += info.rotation.z;
            camera.rotation.copy(infoRotation);
            renderer.render(scene, camera);
          });
          renderer.setRenderTarget(null);
          if (this.options.useClear && ThreeUtil.isNotNull(this.options.clearColor)) {
            renderer.setClearColor(this.options.clearColor);
            renderer.clear();
          }
          renderer.setViewport(this.position.x, this.position.y, this.size.width, this.size.height);
          renderer.render(this.scene, this.camera);
          break;
        case 'multiview' :
          this.viewList.forEach(view => {
            renderer.setViewport(view.left, view.top, view.width, view.height);
            renderer.setScissor(view.left, view.top, view.width, view.height);
            renderer.setScissorTest( true );
            if (ThreeUtil.isNotNull(view.background)) {
              renderer.setClearColor(view.background);
              renderer.clear();
            }
            if (camera instanceof THREE.PerspectiveCamera) {
              camera.aspect = view.width / view.height;
              camera.updateProjectionMatrix();
            }
            renderer.render( scene, camera );
            renderer.setScissorTest( false );
          })
          break;
      }
      renderer.setClearColor(this._clearColor);
      renderer.autoClear = this._autoClear;
      renderer.setViewport(this._viewport);
      camera.rotation.copy(this._cameraRotation);
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = this._aspect;
        camera.updateProjectionMatrix();
      }
    }
  }

}
