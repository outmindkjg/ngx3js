import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeColor, ThreeUtil } from './interface';

/**
 * Drawing Canvas Directive
 *
 * @example
 * <code>
 *  <canvas DrawingCanvasDirective [backgroundColor]="'#ffffff'" [lineColor]="'#000000'" />
 * </code>
 *
 */
@Directive({
  selector: '[threeDrawingCanvas]',
})
export class DrawingCanvasDirective implements OnChanges {
  /**
   * The canvas background color
   */
  @Input() public backgroundColor: ThreeColor = 0xffffff;

  /**
   * The drawing line color
   */
  @Input() public lineColor: ThreeColor = 0x000000;

  /**
   * The Canvas
   */
  private drawingCanvas: HTMLCanvasElement = null;

  /**
   * The Context of canvas.
   */
  private drawingContext: CanvasRenderingContext2D = null;

  /**
   * Creates an instance of drawing canvas directive.
   * @param ele
   */
  constructor(ele: ElementRef) {
    this.drawingCanvas = ele.nativeElement;
    const cleatBtn = document.createElement('button');
    cleatBtn.className = 'clear-btn';
    cleatBtn.innerText = 'x';
    this.drawingCanvas.parentNode.appendChild(cleatBtn);
    cleatBtn.addEventListener('click', () => {
      this.clearCanvas();
    });
    this.drawingContext = this.drawingCanvas.getContext('2d');
    this.setupCanvasDrawing();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   *
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.backgroundColor) {
      this._backgroundColor = null;
    }
    if (changes.lineColor) {
      this._lineColor = null;
    }
  }

  /**
   * Background color of drawing canvas directive
   */
  private _backgroundColor: string = null;

  /**
   * Line color of drawing canvas directive
   */
  private _lineColor: string = null;

  /**
   * Whether the mouse is down or not.
   */
  private paint = false;

  /**
   * The drawing start position.
   */
  private drawStartPos = new THREE.Vector2();

  /**
   * Clear the Canvas.
   */
  clearCanvas(): void {
    this.drawingContext.save();
    this.drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    if (this._backgroundColor === null) {
      this._backgroundColor = '#' + ThreeUtil.getColorSafe(this.backgroundColor).getHexString();
    }
    this.drawingContext.fillStyle = this._backgroundColor;
    this.drawingContext.fillRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    this.drawingContext.restore();
    this.drawingContext.beginPath();
    this.drawStartPos = new THREE.Vector2();
    this.drawingCanvas.dispatchEvent(this.event);
  }

  /**
   * Set the canvas be drawable.
   */
  private setupCanvasDrawing(): void {
    this.drawingCanvas.addEventListener('pointerdown', (e) => {
      this.paint = true;
      this.drawStartPos.set(e.offsetX, e.offsetY);
    });
    this.drawingCanvas.addEventListener('pointermove', (e) => {
      if (this.paint) {
        this.draw(this.drawingContext, e.offsetX, e.offsetY);
      }
    });
    this.drawingCanvas.addEventListener('pointerup', () => {
      this.paint = false;
    });
    this.drawingCanvas.addEventListener('pointerleave', () => {
      this.paint = false;
    });
    this.clearCanvas();
  }

  /**
   * The event of drawing canvas.
   */
  private event = new Event('needupdate');

  /**
   * Draw a line to canvas
   *
   * @param drawContext
   * @param x
   * @param y
   */
  private draw(drawContext: CanvasRenderingContext2D, x: number, y: number): void {
    if (this._lineColor === null) {
      this._lineColor = '#' + ThreeUtil.getColorSafe(this.lineColor).getHexString();
      drawContext.beginPath();
    }
    drawContext.moveTo(this.drawStartPos.x, this.drawStartPos.y);
    drawContext.strokeStyle = this._lineColor;
    drawContext.lineTo(x, y);
    drawContext.stroke();
    this.drawStartPos.set(x, y);
    this.drawingCanvas.dispatchEvent(this.event);
  }
}
