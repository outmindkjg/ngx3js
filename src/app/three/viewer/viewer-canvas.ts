import * as THREE from 'three';

export class ViewerCanvas {

	domElement: HTMLCanvasElement;
  position : { x : number , y : number } = null;
  size : { width : number, height : number } = null;
  enabled : boolean = true;
  camera : THREE.PerspectiveCamera = null;
  scene : THREE.Scene = null;
  private renderer : THREE.Renderer = null;
  target : THREE.Vector3 = null;  
  virtualCamera : THREE.Group = null;
  context : CanvasRenderingContext2D = null;
  constructor(renderer : THREE.Renderer, cssClassName : string, options : any = {}) {
    this.domElement = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' ) as HTMLCanvasElement;
    this.domElement.style.display = 'block';
    this.domElement.style.position = 'absolute';
    this.domElement.className = cssClassName;
    this.context = this.domElement.getContext( '2d' );
    this.target = new THREE.Vector3();
    this.position = { x : 0, y : 0 };
    this.size = { width : 100 , height : 100};
    const camera = new THREE.PerspectiveCamera( 70, 1, 1, 20000 );
    options = options || {}
    this.camera = camera;
    this.camera.position.y = -100;
    const virtualCamera = new THREE.Group();
    virtualCamera.add( this.camera );
    this.virtualCamera = virtualCamera;
    this.virtualCamera.position.z = -300;
    this.scene = new THREE.Scene();
    this.scene.add(this.virtualCamera);
    const planeGeometry = new THREE.PlaneBufferGeometry(190,380,1,1);
    const planeFrame = new THREE.MeshBasicMaterial({ depthTest : false, depthWrite : false, side : THREE.FrontSide, color : new THREE.Color(0x666666), wireframe : true, wireframeLinewidth : 3 });
    this.canvasList = [];
    const screenCnt = 5;
    for(let i = 0 ; i < screenCnt ; i++) {
      const planeTarget = new THREE.WebGLRenderTarget(1024,1024, { minFilter : THREE.LinearFilter, magFilter : THREE.LinearFilter });
      const planeMaterial = new THREE.MeshBasicMaterial({ map : planeTarget.texture, depthTest : false, depthWrite : false, side : THREE.FrontSide });
      const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial);
      planeMesh.add(new THREE.Mesh(planeGeometry,planeFrame));
      const angle = -Math.PI * 0.6 * (i / (screenCnt - 1) - 0.5);
      planeMesh.position.x = Math.sin(angle) * 400;
      planeMesh.position.y = 0;
      planeMesh.position.z = Math.cos(angle) * 400 + 200;
      planeMesh.rotation.y = angle + Math.PI;
      this.canvasList.push({
        mesh : planeMesh,
        planeTarget : planeTarget,
        rotation : planeMesh.rotation,
      });
      this.virtualCamera.add(planeMesh);
    }
    
    this.setRenderer(renderer);
  }

  canvasList : {
    mesh : THREE.Mesh;
    planeTarget : THREE.WebGLRenderTarget;
    rotation : THREE.Euler
  }[] = [];

  setRenderer(renderer : THREE.Renderer) {
    if (this.renderer !== renderer) {
      if (renderer.domElement.parentNode !== this.domElement.parentNode) {
        // renderer.domElement.parentNode.appendChild(this.domElement);
      }
      this.updateForWindowResize();
    }
  }

  dispose() {
    if (this.domElement.parentNode !== null) {
      // this.domElement.parentNode.removeChild(this.domElement);
    }
  }

  updateForWindowResize() {
    /*
    this.domElement.style.left = this.position.x + 'px';
    this.domElement.style.top = this.position.y + 'px';
    this.domElement.style.width = this.size.width + 'px';
    this.domElement.style.height = this.size.height + 'px';
    */
    // this.domElement.width = this.domElement.clientWidth * window.devicePixelRatio;
    // this.domElement.height = this.domElement.clientHeight * window.devicePixelRatio;
    this.camera.aspect = this.size.width / this.size.height;
  }

  render(renderer : THREE.Renderer, scene : THREE.Scene, camera : THREE.Camera ) {
    if (this.enabled && renderer instanceof THREE.WebGLRenderer) {
      //renderer.setScissorTest(true);
      //renderer.setScissor(this.position.x, this.position.y, this.size.width, this.size.height);
      this.camera.lookAt(new THREE.Vector3(0,0,0));
      const autoClear = renderer.autoClear;
      renderer.autoClear = false;
      const orgRotation = camera.rotation.clone();
      this.canvasList.forEach(info => {
        renderer.setRenderTarget(info.planeTarget);
        const infoRotation = orgRotation.clone();
        infoRotation.x += info.rotation.x;
        infoRotation.y += info.rotation.y - Math.PI;
        infoRotation.z += info.rotation.z;
        camera.rotation.copy(infoRotation);
        renderer.render(scene, camera);
      });
      camera.rotation.copy(orgRotation);
      renderer.setRenderTarget(null);
      renderer.setClearColor(0x555555);
      renderer.clear();
      renderer.render(this.scene, this.camera);
      renderer.autoClear = autoClear;
      //renderer.setScissorTest(false);
    }
  }
}
