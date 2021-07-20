import { Directive, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';

@Directive({
  selector: '[threeDrawingCanvas]'
})
export class DrawingCanvasDirective{

  drawingCanvas : HTMLCanvasElement = null;
  drawingContext : CanvasRenderingContext2D = null;

  constructor(ele : ElementRef) { 
    this.drawingCanvas = ele.nativeElement;
    const parentEle = document.createElement('div');
    parentEle.id = 'lbl_left';
    parentEle.className ="lbl canvas" 
    this.drawingCanvas.parentNode.appendChild(parentEle);
    parentEle.appendChild(this.drawingCanvas);
    const cleatBtn = document.createElement('button');
    cleatBtn.className="clear-btn";
    cleatBtn.innerText = 'x';
    parentEle.appendChild(cleatBtn);
    cleatBtn.addEventListener('click', () => {
      this.clearCanvas();
    });
    this.drawingContext = this.drawingCanvas.getContext( '2d' );
    this.setupCanvasDrawing();
  }

  paint = false;
  drawStartPos = new THREE.Vector2();

  clearCanvas() {
    this.drawingContext.save();
    this.drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    this.drawingContext.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height );
    this.drawingContext.restore();
    this.drawingContext.beginPath();
    this.drawStartPos = new THREE.Vector2();
    this.drawingCanvas.dispatchEvent(this.event);
  }

  setupCanvasDrawing() {
    this.drawingCanvas.addEventListener( 'pointerdown',  ( e ) => {
      this.paint = true;
      this.drawStartPos.set( e.offsetX, e.offsetY );
    } );
    this.drawingCanvas.addEventListener( 'pointermove',  ( e ) => {
      if ( this.paint ) {
        this.draw( this.drawingContext, e.offsetX, e.offsetY );
      }
    });
    this.drawingCanvas.addEventListener( 'pointerup', () => {
      this.paint = false;
    } );
    this.drawingCanvas.addEventListener( 'pointerleave', () => {
      this.paint = false;
    });
    this.clearCanvas();
  }
  event = new Event('needupdate');
  draw( drawContext : CanvasRenderingContext2D, x : number, y : number ) {
    drawContext.moveTo( this.drawStartPos.x, this.drawStartPos.y );
    drawContext.strokeStyle = '#000000';
    drawContext.lineTo( x, y );
    drawContext.stroke();
    this.drawStartPos.set( x, y );
    this.drawingCanvas.dispatchEvent(this.event);
  }
}
