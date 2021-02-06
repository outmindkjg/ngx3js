import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CssStyle, ThreeUtil } from '../interface';

@Component({
  selector: 'three-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  @Input() visible: boolean = true;

  @Input() virtualClass: string = null;
  @Input() backgroundColor: string | number = null;
  @Input() backgroundOpacity: number = null;
  @Input() backgroundImage: string = null;
  @Input() backgroundRepeat: string = null;
  @Input() backgroundRepeatX: string = null;
  @Input() backgroundRepeatY: string = null;
  @Input() backgroundPosition: string = null;
  @Input() backgroundPositionX: string = null;
  @Input() backgroundPositionY: string = null;
  @Input() backgroundSize: string = null;
  @Input() backgroundSizeX: string = null;
  @Input() backgroundSizeY: string = null;
  @Input() backgroundClip: string = null;

  @Input() border: string = null;
  @Input() borderColor: string = null;
  @Input() borderStyle: string = null;
  @Input() borderWidth: string = null;
  @Input() borderRadius: string = null;
  @Input() borderLeft: string = null;
  @Input() borderTop: string = null;
  @Input() borderRight: string = null;
  @Input() borderBottom: string = null;
  @Input() borderImage: string = null;
  @Input() borderImageSource: string = null;
  @Input() borderImageSlice: string = null;
  @Input() borderImageOutset: string = null;
  @Input() borderImageRepeat: string = null;
  @Input() borderImageWidth: string = null;

  @Input() opacity: number = null;
  @Input() color: string | number = null;
  @Input() fontFamily: string = null;
  @Input() fontSize: number = null;
  @Input() fontStyle: string = null;
  @Input() fontWeight: string = null;
  @Input() textAlign: string = null;
  @Input() textTransform: string = null;
  @Input() textDecoration: string = null;
  @Input() letterSpacing: string = null;
  @Input() textIndent: string = null;
  @Input() textJustify: string = null;
  @Input() textSizeAdjust: string = null;
  @Input() whiteSpace: string = null;
  @Input() wordBreak: string = null;
  @Input() wordSpacing: string = null;

  private getBackgroundColor(def?: string | number): THREE.Color | THREE.Vector4 {
    return ThreeUtil.getColorAlphaSafe(this.backgroundColor, this.backgroundOpacity, def);
  }

  private getBackgroundImage(def?: string): string {
    return ThreeUtil.getTypeSafe(this.backgroundImage, def);
  }

  private getBackgroundRepeat(def?: string): string {
    if (ThreeUtil.isNotNull(this.backgroundRepeatX) && ThreeUtil.isNotNull(this.backgroundRepeatX)) {
      return this.backgroundRepeatX + ' ' + this.backgroundRepeatY;
    }
    return ThreeUtil.getTypeSafe(this.backgroundRepeat, def);
  }

  private getBackgroundPosition(def?: string): string {
    if (ThreeUtil.isNotNull(this.backgroundPositionX) && ThreeUtil.isNotNull(this.backgroundPositionY)) {
      return this.backgroundPositionX + ' ' + this.backgroundPositionY;
    }
    return ThreeUtil.getTypeSafe(this.backgroundPosition, def);
  }

  private getBackgroundSize(def?: string): string {
    if (ThreeUtil.isNotNull(this.backgroundSizeX) && ThreeUtil.isNotNull(this.backgroundSizeY)) {
      return this.backgroundSizeX + ' ' + this.backgroundSizeY;
    }
    return ThreeUtil.getTypeSafe(this.backgroundSize, def);
  }

  private getBackgroundClip(def?: string): string {
    return ThreeUtil.getTypeSafe(this.backgroundClip, def);
  }


  private getBorder(def?: string): string {
    return ThreeUtil.getTypeSafe(this.border, def);
  }

  private getBorderColor(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderColor, def);
  }

  private getBorderStyle(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderStyle, def);
  }

  private getBorderWidth(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderWidth, def);
  }

  private getBorderRadius(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderRadius, def);
  }

  private getBorderLeft(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderLeft, def);
  }

  private getBorderTop(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderTop, def);
  }

  private getBorderRight(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderRight, def);
  }

  private getBorderBottom(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderBottom, def);
  }

  private getBorderImage(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderImage, def);
  }

  private getBorderImageSource(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderImageSource, def);
  }

  private getBorderImageSlice(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderImageSlice, def);
  }

  private getBorderImageOutset(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderImageOutset, def);
  }

  private getBorderImageRepeat(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderImageRepeat, def);
  }

  private getBorderImageWidth(def?: string): string {
    return ThreeUtil.getTypeSafe(this.borderImageWidth, def);
  }


  private getOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  private getColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
  }

  private getFontFamily(def?: string): string {
    return ThreeUtil.getTypeSafe(this.fontFamily, def);
  }

  private getFontSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.fontSize, def);
  }

  private getFontStyle(def?: string): string {
    return ThreeUtil.getTypeSafe(this.fontStyle, def);
  }

  private getFontWeight(def?: string): string {
    return ThreeUtil.getTypeSafe(this.fontWeight, def);
  }

  private getTextAlign(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textAlign, def);
  }

  private getTextTransform(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textTransform, def);
  }

  private getTextDecoration(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textDecoration, def);
  }

  private getLetterSpacing(def?: string): string {
    return ThreeUtil.getTypeSafe(this.letterSpacing, def);
  }

  private getTextIndent(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textIndent, def);
  }

  private getTextJustify(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textJustify, def);
  }

  private getTextSizeAdjust(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textSizeAdjust, def);
  }

  private getWhiteSpace(def?: string): string {
    return ThreeUtil.getTypeSafe(this.whiteSpace, def);
  }

  private getWordBreak(def?: string): string {
    return ThreeUtil.getTypeSafe(this.wordBreak, def);
  }

  private getWordSpacing(def?: string): string {
    return ThreeUtil.getTypeSafe(this.wordSpacing, def);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.applyHtmlStyle();
    }
  }

  ngOnDestroy(): void {
    if (this.parentNode !== null) {
      if (ThreeUtil.isNotNull(this.cssClazzName)) {
        ThreeUtil.removeCssStyle(this.parentNode, this.cssClazzName);
        this.cssClazzName = null;
      }
      this.parentNode = null;
    }
  }

  private parentNode: HTMLElement = null;

  setParentNode(parentNode: HTMLElement) {
    if (this.parentNode !== parentNode) {
      this.parentNode = parentNode;
    }
    this.applyHtmlStyle();
  }

  getStyle() : CssStyle{
    return {
      backgroundColor  : this.getBackgroundColor(),
      backgroundImage  : this.getBackgroundImage(),
      backgroundRepeat  : this.getBackgroundRepeat(),
      backgroundPosition  : this.getBackgroundPosition(),
      backgroundSize  : this.getBackgroundSize(),
      backgroundClip  : this.getBackgroundClip(),
      border  : this.getBorder(),
      borderColor  : this.getBorderColor(),
      borderStyle  : this.getBorderStyle(),
      borderWidth  : this.getBorderWidth(),
      borderRadius  : this.getBorderRadius(),
      borderLeft  : this.getBorderLeft(),
      borderTop  : this.getBorderTop(),
      borderRight  : this.getBorderRight(),
      borderBottom  : this.getBorderBottom(),
      borderImage  : this.getBorderImage(),
      borderImageSource  : this.getBorderImageSource(),
      borderImageSlice  : this.getBorderImageSlice(),
      borderImageOutset  : this.getBorderImageOutset(),
      borderImageRepeat  : this.getBorderImageRepeat(),
      borderImageWidth  : this.getBorderImageWidth(),
      opacity  : this.getOpacity(),
      color  : this.getColor(),
      fontFamily  : this.getFontFamily(),
      fontSize  : this.getFontSize(),
      fontStyle  : this.getFontStyle(),
      fontWeight  : this.getFontWeight(),
      textAlign  : this.getTextAlign(),
      textTransform  : this.getTextTransform(),
      textDecoration  : this.getTextDecoration(),
      letterSpacing  : this.getLetterSpacing(),
      textIndent  : this.getTextIndent(),
      textJustify  : this.getTextJustify(),
      textSizeAdjust  : this.getTextSizeAdjust(),
      whiteSpace  : this.getWhiteSpace(),
      wordBreak  : this.getWordBreak(),
      wordSpacing  : this.getWordSpacing(),
    }
  }

  applyHtmlStyle() {
    if (this.parentNode !== null) {
      if (this.visible) {
        const style: CssStyle= this.getStyle();
        this.cssClazzName = ThreeUtil.addCssStyle(this.parentNode, style, this.cssClazzName, 'background', this.virtualClass);
      } else {
        ThreeUtil.toggleCssStyle(this.parentNode, this.cssClazzName, false);
      }
    }
  }

  private cssClazzName : string = null;

}
