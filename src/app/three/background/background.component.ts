import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { HtmlComponent } from '../html/html.component';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  @Input() visible: boolean = true;
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

  private getBackgroundColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.backgroundColor, def);
  }

  private getBackgroundOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.backgroundOpacity, def);
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

  private parentNode: HTMLElement = null;

  setParentNode(parentNode: HTMLElement) {
    if (this.parentNode !== parentNode) {
      this.parentNode = parentNode;
    }
    this.applyHtmlStyle();
  }

  applyHtmlStyle() {
    if (this.parentNode !== null) {
      const style: { [key: string]: string } = {
        fontSize: 'inherit',
        color: 'inherit',
      }
      const backgroundColor = this.getBackgroundColor();
      if (ThreeUtil.isNotNull(backgroundColor)) {
        style.backgroundColor = backgroundColor.getStyle();
      }

      const backgroundOpacity = this.getBackgroundOpacity();
      if (ThreeUtil.isNotNull(backgroundOpacity)) {
        style.backgroundOpacity = backgroundOpacity.toString();
      }

      const backgroundImage = this.getBackgroundImage();
      if (ThreeUtil.isNotNull(backgroundImage)) {
        style.backgroundImage = backgroundImage;
      }

      const backgroundRepeat = this.getBackgroundRepeat();
      if (ThreeUtil.isNotNull(backgroundRepeat)) {
        style.backgroundRepeat = backgroundRepeat;
      }

      const backgroundPosition = this.getBackgroundPosition();
      if (ThreeUtil.isNotNull(backgroundPosition)) {
        style.backgroundPosition = backgroundPosition;
      }

      const backgroundSize = this.getBackgroundSize();
      if (ThreeUtil.isNotNull(backgroundSize)) {
        style.backgroundSize = backgroundSize;
      }

      const backgroundClip = this.getBackgroundClip();
      if (ThreeUtil.isNotNull(backgroundClip)) {
        style.backgroundClip = backgroundClip;
      }

      const border = this.getBorder();
      if (ThreeUtil.isNotNull(border)) {
        style.border = border;
      }

      const borderColor = this.getBorderColor();
      if (ThreeUtil.isNotNull(borderColor)) {
        style.borderColor = borderColor;
      }

      const borderStyle = this.getBorderStyle();
      if (ThreeUtil.isNotNull(borderStyle)) {
        style.borderStyle = borderStyle;
      }

      const borderWidth = this.getBorderWidth();
      if (ThreeUtil.isNotNull(borderWidth)) {
        style.borderWidth = borderWidth;
      }

      const borderRadius = this.getBorderRadius();
      if (ThreeUtil.isNotNull(borderRadius)) {
        style.borderRadius = borderRadius;
      }

      const borderLeft = this.getBorderLeft();
      if (ThreeUtil.isNotNull(borderLeft)) {
        style.borderLeft = borderLeft;
      }

      const borderTop = this.getBorderTop();
      if (ThreeUtil.isNotNull(borderTop)) {
        style.borderTop = borderTop;
      }

      const borderRight = this.getBorderRight();
      if (ThreeUtil.isNotNull(borderRight)) {
        style.borderRight = borderRight;
      }

      const borderBottom = this.getBorderBottom();
      if (ThreeUtil.isNotNull(borderBottom)) {
        style.borderBottom = borderBottom;
      }

      const borderImage = this.getBorderImage();
      if (ThreeUtil.isNotNull(borderImage)) {
        style.borderImage = borderImage;
      }

      const borderImageSource = this.getBorderImageSource();
      if (ThreeUtil.isNotNull(borderImageSource)) {
        style.borderImageSource = borderImageSource;
      }

      const borderImageSlice = this.getBorderImageSlice();
      if (ThreeUtil.isNotNull(borderImageSlice)) {
        style.borderImageSlice = borderImageSlice;
      }

      const borderImageOutset = this.getBorderImageOutset();
      if (ThreeUtil.isNotNull(borderImageOutset)) {
        style.borderImageOutset = borderImageOutset;
      }

      const borderImageRepeat = this.getBorderImageRepeat();
      if (ThreeUtil.isNotNull(borderImageRepeat)) {
        style.borderImageRepeat = borderImageRepeat;
      }

      const borderImageWidth = this.getBorderImageWidth();
      if (ThreeUtil.isNotNull(borderImageWidth)) {
        style.borderImageWidth = borderImageWidth;
      }


      const opacity = this.getOpacity();
      if (ThreeUtil.isNotNull(opacity)) {
        style.opacity = opacity.toString();
      }

      const color = this.getColor();
      if (ThreeUtil.isNotNull(color)) {
        style.color = color.getStyle();
      }

      const fontFamily = this.getFontFamily();
      if (ThreeUtil.isNotNull(fontFamily)) {
        style.fontFamily = fontFamily;
      }

      const fontSize = this.getFontSize();
      if (ThreeUtil.isNotNull(fontSize)) {
        style.fontSize = fontSize + 'px';
      }

      const fontStyle = this.getFontStyle();
      if (ThreeUtil.isNotNull(fontStyle)) {
        style.fontStyle = fontStyle;
      }

      const fontWeight = this.getFontWeight();
      if (ThreeUtil.isNotNull(fontWeight)) {
        style.fontWeight = fontWeight;
      }

      const textAlign = this.getTextAlign();
      if (ThreeUtil.isNotNull(textAlign)) {
        style.textAlign = textAlign;
      }

      const textTransform = this.getTextTransform();
      if (ThreeUtil.isNotNull(textTransform)) {
        style.textTransform = textTransform;
      }

      const textDecoration = this.getTextDecoration();
      if (ThreeUtil.isNotNull(textDecoration)) {
        style.textDecoration = textDecoration;
      }

      const letterSpacing = this.getLetterSpacing();
      if (ThreeUtil.isNotNull(letterSpacing)) {
        style.letterSpacing = letterSpacing;
      }

      const textIndent = this.getTextIndent();
      if (ThreeUtil.isNotNull(textIndent)) {
        style.textIndent = textIndent;
      }

      const textJustify = this.getTextJustify();
      if (ThreeUtil.isNotNull(textJustify)) {
        style.textJustify = textJustify;
      }

      const textSizeAdjust = this.getTextSizeAdjust();
      if (ThreeUtil.isNotNull(textSizeAdjust)) {
        style.textSizeAdjust = textSizeAdjust;
      }

      const whiteSpace = this.getWhiteSpace();
      if (ThreeUtil.isNotNull(whiteSpace)) {
        style.whiteSpace = whiteSpace;
      }

      const wordBreak = this.getWordBreak();
      if (ThreeUtil.isNotNull(wordBreak)) {
        style.wordBreak = wordBreak;
      }

      const wordSpacing = this.getWordSpacing();
      if (ThreeUtil.isNotNull(wordSpacing)) {
        style.wordSpacing = wordSpacing;
      }
      console.log(style);
      HtmlComponent.applyHtmlStyle(this.parentNode, style);

    }
  }
}
