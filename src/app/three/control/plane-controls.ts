import * as THREE from 'three';

/**
 * Plane controls
 */
export class PlaneControls {
  /**
   * X distance of plane controls
   */
  public xDistance: number = 2000;

  /**
   * Y distance of plane controls
   */
  public yDistance: number = 2000;

  /**
   * Rotate speed of plane controls
   */
  public rotateSpeed = 1.0;

  /**
   * Zoom speed of plane controls
   */
  public zoomSpeed = 1.2;

  /**
   * Pan speed of plane controls
   */
  public panSpeed = 0.5;

  /**
   * Target  of plane controls
   */
  public target: THREE.Vector3 = new THREE.Vector3();

  /**
   * Enabled  of plane controls
   */
  public enabled: boolean = true;

  /**
   * Screen  of plane controls
   */
  public screen: {
    left: number;
    top: number;
    width: number;
    height: number;
  } = { left: 0, top: 0, width: 0, height: 0 };

  /**
   * Creates an instance of plane controls.
   * @param camera
   * @param domElement
   */
  constructor(private camera: THREE.Camera, private domElement: HTMLElement) {
    if (domElement === undefined) {
      console.warn('THREE.PlainControls: The second parameter "domElement" is now mandatory.');
    }
    this.handleResize();
    this.cameraPosition = camera.position.clone();
    window.setTimeout(() => {
      this.handleResize();
    }, 100);
    this.setActive(true);
  }

  /**
   * Handles resize
   */
  public handleResize() {
    const box = this.domElement.getBoundingClientRect();
    const d = this.domElement.ownerDocument.documentElement;
    this.screen = {
      left: box.left + window.pageXOffset - d.clientLeft,
      top: box.top + window.pageYOffset - d.clientTop,
      width: box.width,
      height: box.height,
    };
  }

  /**
   * Gets mouse on screen
   * @param vector
   * @param pageX
   * @param pageY
   * @returns
   */
  public getMouseOnScreen(vector: THREE.Vector2, pageX: number, pageY: number) {
    vector.set(((pageX - this.screen.left) / this.screen.width - 0.5) * 2, (0.5 - (pageY - this.screen.top) / this.screen.height) * 2);
    return vector;
  }

  /**
   * Mouse  of plane controls
   */
  private mouse: THREE.Vector2 = new THREE.Vector2();

  /**
   * Camera position of plane controls
   */
  private cameraPosition: THREE.Vector3 = new THREE.Vector3();

  /**
   * Sets active
   * @param isActive
   */
  public setActive(isActive: boolean) {
    if (isActive) {
      if (this._mouseMoveHandler === null) {
        this._mouseMoveHandler = (event) => {
          if (this.enabled === false) return;
          event.preventDefault();
          event.stopPropagation();
          this.getMouseOnScreen(this.mouse, event.pageX, event.pageY);
          const cameraPosition = new THREE.Vector2(this.xDistance, this.yDistance);
          cameraPosition.multiply(this.mouse);
          cameraPosition.add(new THREE.Vector2(this.target.x, this.target.y));
          this.cameraPosition = new THREE.Vector3(cameraPosition.x, Math.max(0.5, cameraPosition.y), this.camera.position.z);
        };
        this.domElement.addEventListener('pointermove', this._mouseMoveHandler);
      }
    } else {
      if (this._mouseMoveHandler !== null) {
        this.domElement.removeEventListener('pointermove', this._mouseMoveHandler);
        this._mouseMoveHandler = null;
      }
    }
  }

  /**
   * Mouse move handler of plane controls
   */
  private _mouseMoveHandler = null;

  /**
   * Disposes plane controls
   */
  public dispose() {
    this.setActive(false);
  }

  /**
   * Updates plane controls
   * @param delta
   */
  public update(delta: number) {
    this.camera.position.lerp(this.cameraPosition, this.panSpeed * delta);
    this.camera.lookAt(this.target);
  }
}
