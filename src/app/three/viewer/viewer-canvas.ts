import * as THREE from 'three';

export class ViewerCanvas {

	domElement: HTMLCanvasElement;
  position : { x : number , y : number } = null;
  size : { width : number, height : number } = null;
  enabled : boolean = true;
  camera : THREE.PerspectiveCamera = null;
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
    const camera = new THREE.PerspectiveCamera( 45, 1, 1, 20000 );
    options = options || {}

    camera.rotation.y = options.rotateY || 0;
    this.camera = camera;
    // Think of the virtual camera as a post with 5 cameras on it (even though those cameras happen to live in difference scenes)
    // You need to move the post (ie, the virtualCamera) to move all 5 cameras together.
    const virtualCamera = new THREE.Group();
    virtualCamera.add( this.camera );
    this.virtualCamera = virtualCamera;
    this.setRenderer(renderer);
  }

  setRenderer(renderer : THREE.Renderer) {
    if (this.renderer !== renderer) {
      if (renderer.domElement.parentNode !== this.domElement.parentNode) {
        renderer.domElement.parentNode.appendChild(this.domElement);
      }
      this.updateForWindowResize();
    }
  }

  dispose() {
    if (this.domElement.parentNode !== null) {
      this.domElement.parentNode.removeChild(this.domElement);
    }
  }

  updateForWindowResize() {
    /*
    this.domElement.style.left = this.position.x + 'px';
    this.domElement.style.top = this.position.y + 'px';
    this.domElement.style.width = this.size.width + 'px';
    this.domElement.style.height = this.size.height + 'px';
    */
    this.domElement.width = this.domElement.clientWidth * window.devicePixelRatio;
    this.domElement.height = this.domElement.clientHeight * window.devicePixelRatio;
    this.camera.aspect = this.domElement.clientWidth / this.domElement.clientHeight;
  }

  render(renderer : THREE.Renderer, scene : THREE.Scene ) {
    if (this.enabled) {
      const virtualCamera = this.virtualCamera;
      // virtualCamera.position.x = - mouseX * 4;
      // virtualCamera.position.y = - mouseY * 4;
      virtualCamera.position.z = 180;
      virtualCamera.lookAt( this.target );
      virtualCamera.updateMatrixWorld( true );
      renderer.render( scene, this.camera );
      this.context.drawImage( renderer.domElement, 0, 0 );

    }
  }
}
