import * as THREE from 'three';

export class PlainControls {
  constructor(private camera: THREE.Camera, private domElement: HTMLElement) { 
    if ( domElement === undefined ) console.warn( 'THREE.PlainControls: The second parameter "domElement" is now mandatory.' );
    this.handleResize();
    this.cameraPosition = camera.position.clone();
    setTimeout(() => {
      this.handleResize();
    }, 100);
    this.setActive(true);
  }
  xDistance:number = 2000;
  yDistance:number = 2000;
	rotateSpeed = 1.0;
	zoomSpeed = 1.2;
	panSpeed = 0.5;
  target : THREE.Vector3 = new THREE.Vector3();
	enabled : boolean = true;
  screen : {
    left : number;
    top : number;
    width : number;
    height : number;
  } = { left: 0, top: 0, width: 0, height: 0 };
  handleResize () {
		const box = this.domElement.getBoundingClientRect();
		const d = this.domElement.ownerDocument.documentElement;
		this.screen = {
      left : box.left + window.pageXOffset - d.clientLeft,
      top : box.top + window.pageYOffset - d.clientTop,
      width : box.width,
      height : box.height
    }
	}

  
  getMouseOnScreen(vector : THREE.Vector2,  pageX : number, pageY : number ) {
			vector.set(
				(( pageX - this.screen.left ) / this.screen.width - 0.5) * 2,
				(0.5 - ( pageY - this.screen.top ) / this.screen.height) * 2
			);
			return vector;
	}

  private mouse : THREE.Vector2 = new THREE.Vector2();
  private cameraPosition : THREE.Vector3 = new THREE.Vector3();

  setActive(isActive : boolean) {
    if (isActive) {
      if (this._mouseMoveHandler === null) {
        this._mouseMoveHandler = (event) => {
          if ( this.enabled === false ) return;
          event.preventDefault();
          event.stopPropagation();
          this.getMouseOnScreen(this.mouse, event.pageX, event.pageY);
          const cameraPosition = new THREE.Vector2(this.xDistance, this.yDistance);
          cameraPosition.multiply(this.mouse);
          cameraPosition.add(new THREE.Vector2(this.target.x, this.target.y));
          this.cameraPosition = new THREE.Vector3(cameraPosition.x, cameraPosition.y, this.camera.position.z);
        }
        this.domElement.addEventListener('pointermove', this._mouseMoveHandler);
      }
    } else {
      if (this._mouseMoveHandler !== null) {
        this.domElement.removeEventListener('pointermove', this._mouseMoveHandler);
        this._mouseMoveHandler = null;
      }
    }
  }
  private _mouseMoveHandler = null;

  dispose() {
    this.setActive(false);
  }

  update(delta : number) {
    this.camera.position.lerp(this.cameraPosition, this.panSpeed * delta );
    this.camera.lookAt(this.target);
  }
}