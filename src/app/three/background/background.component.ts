import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CssStyle, ThreeUtil } from '../interface';

@Component({
  selector: 'three-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  @Input() private visible:boolean = true;

  @Input() private pseudo:string = null;

  @Input() private transition:string[] = null;

  @Input() private content:string = null;
  @Input() private backgroundColor:string | number = null;
  @Input() private backgroundAlpha:number = null;
  @Input() private backgroundImage:string = null;
  @Input() private backgroundRepeat:string = null;
  @Input() private backgroundRepeatX:string = null;
  @Input() private backgroundRepeatY:string = null;
  @Input() private backgroundPosition:string = null;
  @Input() private backgroundPositionX:string = null;
  @Input() private backgroundPositionY:string = null;
  @Input() private backgroundSize:string = null;
  @Input() private backgroundSizeX:string = null;
  @Input() private backgroundSizeY:string = null;
  @Input() private backgroundClip:string = null;

  @Input() private padding:string = null;
  @Input() private paddingLeft:string = null;
  @Input() private paddingTop:string = null;
  @Input() private paddingRight:string = null;
  @Input() private paddingBottom:string = null;

  @Input() private margin:string = null;
  @Input() private marginLeft:string = null;
  @Input() private marginTop:string = null;
  @Input() private marginRight:string = null;
  @Input() private marginBottom:string = null;

  @Input() private border:string = null;
  @Input() private borderColor:string = null;
  @Input() private borderStyle:string = null;
  @Input() private borderWidth:string | number = null;
  @Input() private borderRadius:string | number = null;
  @Input() private borderLeft:string = null;
  @Input() private borderTop:string = null;
  @Input() private borderRight:string = null;
  @Input() private borderBottom:string = null;
  @Input() private borderImage:string = null;
  @Input() private borderImageSource:string = null;
  @Input() private borderImageSlice:string = null;
  @Input() private borderImageOutset:string = null;
  @Input() private borderImageRepeat:string = null;
  @Input() private borderImageWidth:string = null;

  @Input() private opacity:number = null;
  @Input() private color:string | number = null;
  @Input() private fontFamily:string = null;
  @Input() private fontSize:number = null;
  @Input() private fontStyle:string = null;
  @Input() private fontWeight:string = null;
  @Input() private textAlign:string = null;
  @Input() private textTransform:string = null;
  @Input() private textDecoration:string = null;
  @Input() private letterSpacing:string = null;
  @Input() private textIndent:string = null;
  @Input() private textJustify:string = null;
  @Input() private textSizeAdjust:string = null;
  @Input() private whiteSpace:string = null;
  @Input() private wordBreak:string = null;
  @Input() private wordSpacing:string = null;

  private getTransition(def?: string[]): string[] {
    return ThreeUtil.getTypeSafe(this.transition, def);
  }
  private getContent(def?: string): string {
    return ThreeUtil.getTypeSafe(this.content, def);
  }
  private getBackgroundColor(def?: string | number): THREE.Color | THREE.Vector4 {
    return ThreeUtil.getColorAlphaSafe(this.backgroundColor, this.backgroundAlpha, def);
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

  private getPadding(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.padding, def);
  }

  private getPaddingLeft(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.paddingLeft, def);
  }

  private getPaddingTop(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.paddingTop, def);
  }

  private getPaddingRight(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.paddingRight, def);
  }

  private getPaddingBottom(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.paddingBottom, def);
  }

  private getMargin(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.margin, def);
  }

  private getMarginLeft(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.marginLeft, def);
  }

  private getMarginTop(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.marginTop, def);
  }

  private getMarginRight(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.marginRight, def);
  }

  private getMarginBottom(def?: string | number): string | number {
    return ThreeUtil.getTypeSafe(this.marginBottom, def);
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

  private getBorderWidth(def?: string | number): string | number{
    return ThreeUtil.getTypeSafe(this.borderWidth, def);
  }

  private getBorderRadius(def?: string | number): string | number {
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
      content : this.getContent(),
      transition : this.getTransition(),
      backgroundColor  : this.getBackgroundColor(),
      backgroundImage  : this.getBackgroundImage(),
      backgroundRepeat  : this.getBackgroundRepeat(),
      backgroundPosition  : this.getBackgroundPosition(),
      backgroundSize  : this.getBackgroundSize(),
      backgroundClip  : this.getBackgroundClip(),
      padding  : this.getPadding(),
      paddingLeft  : this.getPaddingLeft(),
      paddingTop  : this.getPaddingTop(),
      paddingRight  : this.getPaddingRight(),
      paddingBottom  : this.getPaddingBottom(),
      margin  : this.getMargin(),
      marginLeft  : this.getMarginLeft(),
      marginTop  : this.getMarginTop(),
      marginRight  : this.getMarginRight(),
      marginBottom  : this.getMarginBottom(),
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
        this.cssClazzName = ThreeUtil.addCssStyle(this.parentNode, style, this.cssClazzName, 'background', this.pseudo);
      } else {
        ThreeUtil.toggleCssStyle(this.parentNode, this.cssClazzName, false);
      }
    }
  }

  private cssClazzName : string = null;

}
