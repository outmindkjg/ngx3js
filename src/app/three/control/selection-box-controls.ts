import * as THREE from 'three';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox';
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper';
import { ThreeColor, ThreeUtil } from '../interface';

/**
 * Plane controls
 */
export class SelectBoxControls {

  public selectionBox : SelectionBox = null;
  public helper : SelectionHelper = null;

  pointerup : ThreeColor = 0xffffff;
  pointerdown : ThreeColor = 0x000000;
  
	/**
	 * Offset top of renderer component
	 */
	private offsetTop: number = 0;

	/**
	 * Offset left of renderer component
	 */
	private offsetLeft: number = 0;

  private docElement : HTMLElement;
  /**
   * Creates an instance of plane controls.
   * @param camera
   * @param domElement
   */
  constructor(camera: THREE.Camera, scene: THREE.Scene, renderer : THREE.WebGLRenderer) {
    this.selectionBox = new SelectionBox( camera, scene );
    this.helper = new SelectionHelper( this.selectionBox, renderer, 'selectBox' );
    const docElement = renderer.domElement.parentElement;
    this.docElement = docElement;
    let offsetParent : any = docElement;
    this.offsetTop = 0;
    this.offsetLeft = 0;
    while (offsetParent) {
      this.offsetLeft += offsetParent.offsetLeft;
      this.offsetTop += offsetParent.offsetTop;
      offsetParent = offsetParent.offsetParent;
    }
    docElement.addEventListener( 'pointerdown', ( event ) => {
      for ( const item of this.selectionBox.collection ) {
        if (ThreeUtil.isNotNull(item.material['emissive'])) {
          item.material['emissive'].set( ThreeUtil.getColorSafe(this.pointerdown) );
        }
      }
      const mouse = this.getMouse(event);
      this.selectionBox.startPoint.set(
        mouse.x,
        mouse.y,
        0.5 );
    } );
    docElement.addEventListener( 'pointermove', ( event ) => {
      if ( this.helper.isDown ) {
        for ( let i = 0; i < this.selectionBox.collection.length; i ++ ) {
          const item = this.selectionBox.collection[ i ].material;
          if (ThreeUtil.isNotNull(item['emissive'])) {
            item['emissive'].set( ThreeUtil.getColorSafe(this.pointerdown) );
          }
        }
        const mouse = this.getMouse(event);
        this.selectionBox.endPoint.set(
          mouse.x,
          mouse.y,
          0.5 );
        const allSelected = this.selectionBox.select();
        allSelected.forEach(item => {
          if (ThreeUtil.isNotNull(item.material['emissive'])) {
            item.material['emissive'].set( ThreeUtil.getColorSafe(this.pointerup) );
          }
        })
      }
    } );

    docElement.addEventListener( 'pointerup', ( event ) => {
      const mouse = this.getMouse(event);
      this.selectionBox.endPoint.set(
        mouse.x,
        mouse.y,
        0.5 );
      const allSelected = this.selectionBox.select();
      allSelected.forEach(item => {
        if (ThreeUtil.isNotNull(item.material['emissive'])) {
          item.material['emissive'].set( ThreeUtil.getColorSafe(this.pointerup) );
        }
      })
    });
  }
  
  private mouse: THREE.Vector2 = new THREE.Vector2();

  private getMouse(event) : THREE.Vector2 {
    const clientX = event.clientX;
    const clientY = event.clientY;
    const offsetX = clientX - this.offsetLeft;
    const offsetY = clientY - this.offsetTop;
    this.mouse.set((offsetX / this.docElement.clientWidth) * 2 - 1, -(offsetY / this.docElement.clientHeight) * 2 + 1);
    return this.mouse;
  }

}
