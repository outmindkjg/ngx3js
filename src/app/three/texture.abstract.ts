import { AfterContentInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { unzipSync } from 'three/examples/jsm/libs/fflate.module';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { RGBMLoader } from 'three/examples/jsm/loaders/RGBMLoader';
import { TextureNode, NodeMaterial } from 'three/examples/jsm/nodes/Nodes';
import { ThreeUtil } from './interface';
import { AbstractSubscribeComponent } from './subscribe.abstract';
import { CanvasFunctionType, TextureUtils } from './texture/textureUtils';

@Component({
  template: '',
})
export abstract class AbstractTextureComponent extends AbstractSubscribeComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {

  /**
   * The Type of Texture of Matrial 
   */
  @Input() protected type: string = 'map';

  /**
   * The LoadType of Texture - video, image etc
   */
  @Input() private loaderType: string = null;

  /**
   * The CubeType of Texture - 
   */
  @Input() private cubeType: string = null;

  /**
   * Optional name of the object (doesn't need to be unique). Default is an empty string.
   */
  @Input() public name: string = null;

  /**
   * If set to *true*, the alpha channel, if present, is multiplied into the color channels when the texture is uploaded to the GPU. Default is *false*.<br /><br />
   * Note that this property has no effect for [link:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap ImageBitmap].
   * You need to configure on bitmap creation instead. See [page:ImageBitmapLoader].
   */
  @Input() private premultiplyAlpha: boolean = null;

  /**
   * The data of DataTexture
   */
  @Input() private data: BufferSource | number[] = null;

  /**
   * 
   */
  @Input() private programParam: any = null;

  /**
   * 
   */
  @Input() private programMipmaps: any[] = null;

  /**
   * The Texture param use when call Canvas Program.
   */
  @Input() private text: string = null;

  /**
   * How the image is applied to the object. An object type of [page:Textures THREE.UVMapping] is the default,
   * where the U,V coordinates are used to apply the map.<br />
   * See the [page:Textures texture constants] page for other mapping types.
   */
  @Input() protected mapping: string = null;

  /**
   * 
   */
  @Input() private wrap: string = null;

  /**
   * This defines how the texture is wrapped horizontally and corresponds to *U* in UV mapping.<br />
   * The default is [page:Textures THREE.ClampToEdgeWrapping], where the edge is clamped to the outer edge texels.
   * The other two choices are [page:Textures THREE.RepeatWrapping] and [page:Textures THREE.MirroredRepeatWrapping].
   * See the [page:Textures texture constants] page for details.
   * 
   */
  @Input() private wrapS: string = null;

  /**
   * This defines how the texture is wrapped vertically and corresponds to *V* in UV mapping.<br />
   * The same choices are available as for [property:number wrapS].<br /><br />
   * NOTE: tiling of images in textures only functions if image dimensions are powers of two
   * (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ...) in terms of pixels.
   * Individual dimensions need not be equal, but each must be a power of two.
   * This is a limitation of WebGL, not three.js.
   */
  @Input() private wrapT: string = null;

  /**
   * 
   */
  @Input() private filter: string = null;

  /**
   * How the texture is sampled when a texel covers more than one pixel. The default is
   * [page:Textures THREE.LinearFilter], which takes the four closest texels and bilinearly interpolates among them.
   * The other option is [page:Textures THREE.NearestFilter], which uses the value of the closest texel.<br />
   * See the [page:Textures texture constants] page for details.
   */
  @Input() private magFilter: string = null;

  /**
   * How the texture is sampled when a texel covers less than one pixel. The default is
   * [page:Textures THREE.LinearMipmapLinearFilter], which uses mipmapping and a trilinear filter. <br /><br />
   * See the [page:Textures texture constants] page for all possible choices.
   */
  @Input() private minFilter: string = null;

  /**
   * The default is [page:Textures THREE.RGBAFormat], although the [page:TextureLoader TextureLoader] will automatically
   * set this to [page:Textures THREE.RGBFormat] for JPG images. <br /><br />
   * See the [page:Textures texture constants] page for details of other formats.
   */
  @Input() private format: string = null;

  /**
   * This must correspond to the [page:Texture.format .format]. The default is [page:Textures THREE.UnsignedByteType],
   * which will be used for most texture formats.<br /><br />
   * See the [page:Textures texture constants] page for details of other formats.
   */
  @Input() private dataType: string = null;

  /**
   * The number of samples taken along the axis through the pixel that has the highest density of texels.
   * By default, this value is 1. A higher value gives a less blurry result than a basic mipmap,
   * at the cost of more texture samples being used. Use [page:WebGLRenderer.getMaxAnisotropy renderer.getMaxAnisotropy]() to
   * find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
   * 
   */
  @Input() private anisotropy: number = null;

  /**
   * 4 by default. Specifies the alignment requirements for the start of each pixel row in memory.
   * The allowable values are 1 (byte-alignment), 2 (rows aligned to even-numbered bytes),
   * 4 (word-alignment), and 8 (rows start on double-word boundaries).
   * See [link:http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml glPixelStorei]
   * for more information.
   */
  @Input() private unpackAlignment: number = null;

  /**
   * [page:Textures THREE.LinearEncoding] is the default.
   * See the [page:Textures texture constants] page for details of other formats.<br /><br />
   * Note that if this value is changed on a texture after the material has been used,
   * it is necessary to trigger a Material.needsUpdate for this value to be realized in the shader.
   */
  @Input() private encoding: string = null;

  /**
   * How many times the texture is repeated across the surface, in each direction U and V.  If repeat is set
   * greater than 1 in either direction, the corresponding Wrap parameter should also be set to
   * [page:Textures THREE.RepeatWrapping] or [page:Textures THREE.MirroredRepeatWrapping] to achieve the desired
   * tiling effect. Setting different repeat values for textures is restricted in the same way like [page:.offset].
   */
  @Input() private repeat: number = null;

  /**
   * 
   */
  @Input() private repeatX: number = null;

  /**
   * 
   */
  @Input() private repeatY: number = null;

  /**
   * 
   */
  @Input() private offset: number = null;

  /**
   * How much a single repetition of the texture is offset from the beginning, in each direction U and V.
   * Typical range is *0.0* to *1.0*.
   */
  @Input() private offsetX: number = null;

  /**
   * 
   */
  @Input() private offsetY: number = null;

  /**
   * The point around which rotation occurs. A value of (0.5, 0.5) corresponds to the center of the texture. Default is (0, 0), the lower left.
   */
  @Input() private center: number = null;

  /**
   * 
   */
  @Input() private centerX: number = null;

  /**
   * 
   */
  @Input() private centerY: number = null;

  /**
   * 
   */
  @Input() private width: number = null;

  /**
   * 
   */
  @Input() private height: number = null;

  /**
   * Whether to generate mipmaps (if possible) for a texture. True by default. Set this to false if you are
   * creating mipmaps manually.
   */
  @Input() private generateMipmaps: boolean = null;

  /**
   * How much the texture is rotated around the center point, in radians. Positive values are counter-clockwise. Default is *0*.
   */
  @Input() private rotation: number = null;

  /**
   * If set to *true*, the texture is flipped along the vertical axis when uploaded to the GPU. Default is *true*.<br /><br />
   * Note that this property has no effect for [link:https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap ImageBitmap].
   * You need to configure on bitmap creation instead. See [page:ImageBitmapLoader].
   */
  @Input() private flipY: boolean = null;

  /**
   * The base attribute can be fine without re-make Texture
   */
  protected TEXTURE_ATTR: string[] = []

  constructor() {
    super();
    this.TEXTURE_ATTR.push(...this.OBJECT_ATTR);
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   * 
   * @param subscribeType
   */
  ngOnInit(subscribeType?: string): void {
    super.ngOnInit(subscribeType || 'texture');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.texture != null) {
      if (this.texture.image instanceof HTMLMediaElement) {
        this.texture.image.pause();
      }
      this.texture.dispose();
      this.texture = null;
    }
    if (this.refTexture != null) {
      this.refTexture.dispose();
    }
    super.ngOnDestroy();
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
    super.ngOnChanges(changes);
    if (changes) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  protected getRepeat(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(ThreeUtil.getTypeSafe(this.repeatX, this.repeat), ThreeUtil.getTypeSafe(this.repeatY, this.repeat), new THREE.Vector2(defX, defY));
  }

  protected getOffset(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(ThreeUtil.getTypeSafe(this.offsetX, this.offset), ThreeUtil.getTypeSafe(this.offsetY, this.offset), new THREE.Vector2(defX, defY));
  }

  private getCenter(defX: number, defY: number): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(ThreeUtil.getTypeSafe(this.centerX, this.center), ThreeUtil.getTypeSafe(this.centerY, this.center), new THREE.Vector2(defX, defY));
  }

  private refTexture: THREE.Texture = null;
  protected texture: THREE.Texture = null;
  static textureLoader: THREE.TextureLoader = null;
  static nrrdLoader: NRRDLoader = null;
  static fileLoader: THREE.FileLoader = null;
  static cubeTextureLoader: THREE.CubeTextureLoader = null;
  static imageBitmapLoader: THREE.ImageBitmapLoader = null;
  static hdrCubeMapLoader: HDRCubeTextureLoader = null;
  static rgbmLoader: RGBMLoader = null;

  getTextureImage(image: string, cubeImage?: string[], program?: CanvasFunctionType | string, onLoad?: () => void): THREE.Texture {
    return AbstractTextureComponent.getTextureImage(
      image,
      cubeImage,
      program,
      {
        width: this.width,
        height: this.height,
        type: this.loaderType,
        text: this.text,
        programParam: this.programParam,
        programMipmaps: this.programMipmaps,
        data: this.data,
      },
      onLoad
    );
  }

  static getTextureImageOption(image: any, optionsTxt?: string, loaderType?: string, cubeImage?: string[], onLoad?: () => void): THREE.Texture {
    const loadOption: { [key: string]: any } = {
      width: 10,
      height: 10,
      type: loaderType,
    };
    const textureOption: { [key: string]: any } = {};
    if (ThreeUtil.isNotNull(optionsTxt)) {
      const optionsList = optionsTxt.split(',');
      optionsList.forEach((option) => {
        switch (option.toLowerCase()) {
          case 'nearestfilter':
          case 'nearest':
          case 'nearestmipmapnearestfilter':
          case 'nearestmipmapnearest':
          case 'nearestmipmaplinearfilter':
          case 'nearestmipmaplinear':
          case 'linearmipmapnearestfilter':
          case 'linearmipmapnearest':
          case 'linearmipmaplinearfilter':
          case 'linearmipmaplinear':
          case 'linearfilter':
          case 'linear':
            textureOption.minFilter = textureOption.magFilter = ThreeUtil.getTypeSafe(option, 'LinearMipmapLinearFilter');
            break;
          case 'minnearestfilter':
          case 'minnearest':
          case 'minnearestmipmapnearestfilter':
          case 'minnearestmipmapnearest':
          case 'minnearestmipmaplinearfilter':
          case 'minnearestmipmaplinear':
          case 'minlinearmipmapnearestfilter':
          case 'minlinearmipmapnearest':
          case 'minlinearmipmaplinearfilter':
          case 'minlinearmipmaplinear':
          case 'minlinearfilter':
          case 'minlinear':
            textureOption.minFilter = ThreeUtil.getTypeSafe(option.substr(3), 'LinearMipmapLinearFilter');
            break;
          case 'magnearestfilter':
          case 'magnearest':
          case 'magnearestmipmapnearestfilter':
          case 'magnearestmipmapnearest':
          case 'magnearestmipmaplinearfilter':
          case 'magnearestmipmaplinear':
          case 'maglinearmipmapnearestfilter':
          case 'maglinearmipmapnearest':
          case 'maglinearmipmaplinearfilter':
          case 'maglinearmipmaplinear':
          case 'maglinearfilter':
          case 'maglinear':
            textureOption.magFilter = ThreeUtil.getTypeSafe(option.substr(3), 'LinearFilter');
            break;
          case 'repeatwrapping':
          case 'repeat':
          case 'mirroredrepeatwrapping':
          case 'mirroredrepeat':
          case 'clamptoedgewrapping':
          case 'clamptoedge':
          case 'wraprepeat':
            textureOption.wrapS = textureOption.wrapT = ThreeUtil.getTypeSafe(option, 'repeat');
            break;
          case 'wrapsrepeatwrapping':
          case 'wrapsrepeat':
          case 'wrapsmirroredrepeatwrapping':
          case 'wrapsmirroredrepeat':
          case 'wrapsclamptoedgewrapping':
          case 'wrapsclamptoedge':
            textureOption.wrapS = ThreeUtil.getTypeSafe(option.substr(5), 'repeat');
            break;
          case 'wraptrepeatwrapping':
          case 'wraptrepeat':
          case 'wraptmirroredrepeatwrapping':
          case 'wraptmirroredrepeat':
          case 'wraptclamptoedgewrapping':
          case 'wraptclamptoedge':
            textureOption.wrapT = ThreeUtil.getTypeSafe(option.substr(5), 'repeat');
            break;
          case 'alphaformat':
          case 'alpha':
          case 'redformat':
          case 'red':
          case 'redintegerformat':
          case 'redinteger':
          case 'rgformat':
          case 'rg':
          case 'rgintegerformat':
          case 'rginteger':
          case 'rgbformat':
          case 'rgb':
          case 'rgbintegerformat':
          case 'rgbinteger':
          case 'rgbaintegerformat':
          case 'rgbainteger':
          case 'luminanceformat':
          case 'luminance':
          case 'luminancealphaformat':
          case 'luminancealpha':
          case 'rgbeformat':
          case 'rgbe':
          case 'depthformat':
          case 'depth':
          case 'depthstencilformat':
          case 'depthstencil':
          case 'rgbaformat':
          case 'rgba':
            textureOption.format = ThreeUtil.getTypeSafe(option, 'rgba');
            break;
          case 'bytetype':
          case 'byte':
          case 'shorttype':
          case 'short':
          case 'unsignedshorttype':
          case 'unsignedshort':
          case 'inttype':
          case 'int':
          case 'unsignedinttype':
          case 'unsignedint':
          case 'floattype':
          case 'float':
          case 'halffloattype':
          case 'halffloat':
          case 'unsignedshort4444type':
          case 'unsignedshort4444':
          case 'unsignedshort5551type':
          case 'unsignedshort5551':
          case 'unsignedshort565type':
          case 'unsignedshort565':
          case 'unsignedint248type':
          case 'unsignedint248':
          case 'unsignedbytetype':
          case 'unsignedbyte':
            textureOption.type = ThreeUtil.getTypeSafe(option, 'unsignedbyte');
            break;
          case 'srgbencoding':
          case 'srgb':
          case 'gammaencoding':
          case 'gamma':
          case 'rgbeencoding':
          case 'rgbe':
          case 'logluvencoding':
          case 'logluv':
          case 'rgbm7encoding':
          case 'rgbm7':
          case 'rgbm16encoding':
          case 'rgbm16':
          case 'rgbdencoding':
          case 'rgbd':
          case 'linearencoding':
            textureOption.encoding = ThreeUtil.getTypeSafe(option, 'linearencoding');
            break;
          case 'uvmapping':
          case 'uv':
          case 'cubereflectionmapping':
          case 'cubereflection':
          case 'cuberefractionmapping':
          case 'cuberefraction':
          case 'equirectangularreflectionmapping':
          case 'equirectangularreflection':
          case 'equirectangularrefractionmapping':
          case 'equirectangularrefraction':
          case 'cubeuvreflectionmapping':
          case 'cubeuvreflection':
          case 'cubeuvrefractionmapping':
          case 'cubeuvrefraction':
            textureOption.mapping = ThreeUtil.getTypeSafe(option, 'default');
            break;
          case 'image':
          case 'texture2d':
          case 'texture3d':
          case 'texture':
          case 'datatexture2d':
          case 'datatexture3d':
          case 'datatexture':
          case 'video':
          case 'videotexture':
            loadOption.type = option;
            break;
          default:
            if (option.indexOf('=') > 0) {
              const [key, value] = option.split('=');
              switch (key.toLowerCase()) {
                case 'size':
                  const [width, height, depth] = (option + 'xxx').split('x');
                  loadOption.width = parseInt(width);
                  loadOption.height = parseInt(height) || loadOption.width;
                  loadOption.depth = parseInt(depth) || loadOption.width;
                  break;
                case 'width':
                case 'height':
                case 'depth':
                  loadOption[key.toLowerCase()] = parseInt(value);
                  break;
                case 'loaderType':
                  loadOption.type = value;
                  break;
                case 'name':
                case 'filename':
                  loadOption.fileName = value;
                  break;
                case 'rotation':
                case 'unpackalignment':
                case 'anisotropy':
                  textureOption[key.toLowerCase()] = parseFloat(value);
                  break;
                case 'mapping':
                case 'wraps':
                case 'wrapt':
                case 'magfilter':
                case 'minfilter':
                case 'format':
                case 'type':
                case 'encoding':
                  textureOption[key.toLowerCase()] = value;
                  break;
                case 'premultiplyalpha':
                case 'generatemipmaps':
                case 'flipy':
                  textureOption[key.toLowerCase()] = ThreeUtil.getBooleanSafe(value, false);
                  break;
                case 'repeat':
                case 'offset':
                  let [x, y] = (value + 'xx').split('x');
                  if (y === '') {
                    y = x;
                  }
                  textureOption[key.toLowerCase()] = ThreeUtil.getVector2Safe(parseFloat(x), parseFloat(y), null, null, true);
                  break;
              }
            }
        }
      });
    }
    let texture: THREE.Texture = null;
    if (ThreeUtil.isNotNull(image.getTexture)) {
      texture = image.getTexture();
      ThreeUtil.getSubscribe(
        image,
        () => {
          const loadedTexture = image.getTexture();
          if (loadedTexture instanceof THREE.Texture) {
            texture.image = loadedTexture.image;
            texture.needsUpdate = true;
          }
        },
        'loaded'
      );
      ThreeUtil.getSubscribe(
        image,
        () => {
          texture.needsUpdate = true;
        },
        'needsupdate'
      );
    } else if (image instanceof THREE.Texture) {
      texture = image;
    } else {
      texture = this.getTextureImage(image, cubeImage, null, loadOption, () => {
        this.setTextureOptions(texture, textureOption);
        if (ThreeUtil.isNotNull(onLoad)) {
          onLoad();
        }
      });
    }
    this.setTextureOptions(texture, textureOption);
    return texture;
  }

  static getTextureImage(image: string, cubeImage?: string[], program?: CanvasFunctionType | string, options?: any, onLoad?: () => void): THREE.Texture {
    options = options || {};
    onLoad = onLoad || (() => {});
    let loaderType = (options.type || 'auto').toLowerCase();
    if (ThreeUtil.isNotNull(cubeImage) && cubeImage.length > 0) {
      cubeImage = ThreeUtil.getCubeImage(cubeImage);
      switch (loaderType || 'cubetexture') {
        case 'hdrcube':
        case 'hdrcubetexture':
          if (this.hdrCubeMapLoader == null) {
            this.hdrCubeMapLoader = new HDRCubeTextureLoader(ThreeUtil.getLoadingManager());
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.hdrCubeMapLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          const cubeTexture = new THREE.CubeTexture();
          this.hdrCubeMapLoader.setDataType(THREE.UnsignedByteType);
          this.hdrCubeMapLoader.load(cubeImage, (hdrCubeMap) => {
            cubeTexture.copy(hdrCubeMap);
            cubeTexture.needsUpdate = true;
            onLoad();
          });
          return cubeTexture;
        case 'rgbm':
        case 'rgbmtexture':
          if (this.rgbmLoader == null) {
            this.rgbmLoader = new RGBMLoader(ThreeUtil.getLoadingManager());
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.rgbmLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          const rgbmTexture = new THREE.CubeTexture();
          this.rgbmLoader.loadCubemap(cubeImage, (rgbmCube) => {
            rgbmTexture.copy(rgbmCube);
            rgbmTexture.needsUpdate = true;
            onLoad();
          });
          return rgbmTexture;
        default:
          if (this.cubeTextureLoader === null) {
            this.cubeTextureLoader = new THREE.CubeTextureLoader(ThreeUtil.getLoadingManager());
          }
          if (ThreeUtil.isNotNull(image) && image !== '') {
            this.cubeTextureLoader.setPath(ThreeUtil.getStoreUrl(image));
          }
          return this.cubeTextureLoader.load(cubeImage, () => {
            onLoad();
          });
      }
    } else if (ThreeUtil.isNotNull(image) && image !== '') {
      const fileName = image.toLowerCase();
      if (loaderType === 'auto') {
        if (
          fileName.endsWith('.webcam') ||
          fileName.endsWith('.mp4') ||
          fileName.endsWith('.m4v') ||
          fileName.endsWith('.f4v') ||
          fileName.endsWith('.mov') ||
          fileName.endsWith('.mpg') ||
          fileName.endsWith('.mpeg') ||
          fileName.endsWith('.mpeg4') ||
          fileName.endsWith('.wmv') ||
          fileName.endsWith('.avi') ||
          fileName.endsWith('.mkv') ||
          fileName.endsWith('.ogv')
        ) {
          loaderType = 'video';
        }
      }
      switch ((loaderType || 'texture').toLowerCase()) {
        case 'video':
          const video = document.createElement('video');
          const videoTexture = new THREE.VideoTexture(video);
          video.loop = true;
          video.crossOrigin = 'anonymous';
          if (fileName.endsWith('.webcam')) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.mediaDevices
                .getUserMedia({ video: { width: 1280, height: 720, facingMode: 'user' } })
                .then((stream) => {
                  video.srcObject = stream;
                  video.play();
                })
                .catch((error) => {
                  console.error('Unable to access the camera/webcam.', error);
                });
            } else {
              console.error('MediaDevices interface not available.');
            }
          } else {
            video.addEventListener('play', () => {
              onLoad();
            });
            video.src = ThreeUtil.getStoreUrl(image);
            video.play();
          }
          return videoTexture;
        case 'imagebitmap':
        case 'image':
        case 'texture':
        case 'texture2d':
        case 'texture3d':
        case 'datatexture':
        case 'datatexture2d':
        case 'datatexture3d':
        default:
          if (image.endsWith('.zip')) {
            if (this.fileLoader === null) {
              this.fileLoader = new THREE.FileLoader(ThreeUtil.getLoadingManager());
              this.fileLoader.setResponseType('arraybuffer');
            }
            let texture: THREE.Texture = null;
            const width = options.width || 1;
            const height = options.height || 1;
            const depth = options.depth || 1;
            switch ((loaderType || 'texture').toLowerCase()) {
              case 'datatexture2d':
              case 'texture2d':
                texture = new THREE.DataTexture2DArray(null, width, height, depth);
                break;
              case 'datatexture3d':
              case 'texture3d':
                texture = new THREE.DataTexture3D(null, width, height, depth);
                break;
              case 'texture':
              case 'datatexture':
              default:
                texture = new THREE.DataTexture(null, width, height);
                break;
            }
            this.fileLoader.load(ThreeUtil.getStoreUrl(image), (data) => {
              const zip = unzipSync(new Uint8Array(data as ArrayBuffer));
              let fileName = (options.fileName || '').toLowerCase();
              let fileObject = null;
              Object.entries(zip).forEach(([key, value]) => {
                if (fileObject === null || key.toLowerCase() === fileName) {
                  fileObject = value;
                }
              });
              texture.image.data = new Uint8Array(fileObject.buffer);
              texture.needsUpdate = true;
              onLoad();
            });
            return texture;
          } else if (image.endsWith('.nrrd')) {
            if (this.nrrdLoader === null) {
              this.nrrdLoader = new NRRDLoader(ThreeUtil.getLoadingManager());
            }
            const texture = new THREE.DataTexture3D(null, 1, 1, 1);
            this.nrrdLoader.load(ThreeUtil.getStoreUrl(image), (volume) => {
              texture.image = {
                data: volume.data,
                width: volume.xLength,
                height: volume.yLength,
                depth: volume.zLength,
              };
              texture.needsUpdate = true;
              onLoad();
            });
            return texture;
          } else {
            switch ((loaderType || 'texture').toLowerCase()) {
              case 'datatexture':
              case 'datatexture2d':
              case 'datatexture3d':
                return TextureUtils.dataTexture(image, () => {
                  onLoad();
                });
              default:
                if (this.textureLoader === null) {
                  this.textureLoader = new THREE.TextureLoader(ThreeUtil.getLoadingManager());
                }
                const texture = this.textureLoader.load(ThreeUtil.getStoreUrl(image), () => {
                  texture.needsUpdate = true;
                  onLoad();
                });
                return texture;
            }
          }
      }
    } else if (ThreeUtil.isNotNull(options.data)) {
      const dataWidth: number = ThreeUtil.getTypeSafe(options.width, 32);
      let dataHeight: number = ThreeUtil.getTypeSafe(options.height, 32);
      const data = options.data;
      let textureData: BufferSource = null;
      if (data instanceof Int8Array || data instanceof Uint8Array || data instanceof Uint8ClampedArray || data instanceof Int16Array || data instanceof Uint16Array || data instanceof Int32Array || data instanceof Uint32Array || data instanceof Float32Array || data instanceof Float64Array) {
        textureData = data;
      } else if (Array.isArray(data)) {
        textureData = new Float32Array(data.length);
        data.forEach((value, idx) => {
          textureData[idx] = parseFloat(value);
        });
      }
      return new THREE.DataTexture(data, dataWidth, dataHeight);
    } else {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const canvasWidth: number = ThreeUtil.getTypeSafe(options.width, 32);
      const canvasHeight: number = ThreeUtil.getTypeSafe(options.height, 32);
      const text: string = ThreeUtil.getTypeSafe(options.text, '');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      if (ThreeUtil.isNotNull(program)) {
        const _context = canvas.getContext('2d', {
          alpha: true,
        });
        TextureUtils.drawCanvas(program, _context, text, canvasWidth, canvasHeight, options.programParam);
      }
      const canvasTexture = new THREE.CanvasTexture(canvas);
      if (ThreeUtil.isNotNull(program) && ThreeUtil.isNotNull(options.programMipmaps)) {
        canvasTexture.generateMipmaps = false;
        canvasTexture.mipmaps.length = 0;
        canvasTexture.mipmaps[0] = canvas;
        let mipmapWidth = canvasWidth;
        let mipmapHeight = canvasHeight;
        const programMipmaps: any[] = options.programMipmaps;
        for (let i = 0; i < programMipmaps.length; i++) {
          mipmapWidth /= 2;
          mipmapHeight /= 2;
          if (mipmapWidth < 1 || mipmapHeight < 1) {
            break;
          }
          const mipmapCanvas: HTMLCanvasElement = document.createElement('canvas');
          mipmapCanvas.width = mipmapWidth;
          mipmapCanvas.height = mipmapHeight;
          const mipmapContext = mipmapCanvas.getContext('2d', {
            alpha: true,
          });
          TextureUtils.drawCanvas(program, mipmapContext, text, mipmapWidth, mipmapHeight, programMipmaps[i]);
          canvasTexture.mipmaps[i + 1] = mipmapCanvas;
        }
      }
      canvasTexture.needsUpdate = true;
      return canvasTexture;
    }
  }

  setTexture(refTexture: THREE.Texture) {
    if (this.refTexture !== refTexture) {
      this.refTexture = refTexture;
      this.refTexture.copy(this.getTexture());
    }
  }

  setReferTexture(texture: any) {
    if (texture instanceof HTMLVideoElement) {
      this.texture = new THREE.VideoTexture(texture);
    } else if (texture instanceof THREE.Texture) {
      this.texture = texture;
    }
    if (texture !== null && this.texture !== null && this.refTexture !== null) {
      this.refTexture.copy(this.getTexture());
    }
  }

  getTextureOptions(options: { [key: string]: any } = {}): { [key: string]: any } {
    if (ThreeUtil.isNotNull(this.mapping)) {
      options.mapping = this.mapping;
    }
    if (ThreeUtil.isNotNull(this.wrapS) || ThreeUtil.isNotNull(this.wrap)) {
      options.wrapS = ThreeUtil.getTypeSafe(this.wrapS, this.wrap, 'clamptoedge');
    }
    if (ThreeUtil.isNotNull(this.wrapT) || ThreeUtil.isNotNull(this.wrap)) {
      options.wrapT = ThreeUtil.getTypeSafe(this.wrapS, this.wrap, 'clamptoedge');
    }
    if (ThreeUtil.isNotNull(this.flipY)) {
      options.flipY = ThreeUtil.getTypeSafe(this.flipY, true);
    }
    if (ThreeUtil.isNotNull(this.rotation)) {
      options.rotation = this.rotation;
    }
    if (ThreeUtil.isNotNull(this.premultiplyAlpha)) {
      options.premultiplyAlpha = this.premultiplyAlpha;
    }
    if (ThreeUtil.isNotNull(this.magFilter)) {
      options.magFilter = ThreeUtil.getTypeSafe(this.magFilter, this.filter, 'linearmipmaplinear');
    }
    if (ThreeUtil.isNotNull(this.minFilter) || ThreeUtil.isNotNull(this.filter)) {
      options.minFilter = ThreeUtil.getTypeSafe(this.minFilter, this.filter, 'linearmipmaplinear');
    }
    if (ThreeUtil.isNotNull(this.format)) {
      options.format = this.format;
    }
    if (ThreeUtil.isNotNull(this.dataType)) {
      options.type = this.dataType;
    }
    if (ThreeUtil.isNotNull(this.anisotropy)) {
      options.anisotropy = this.anisotropy;
    }
    if (ThreeUtil.isNotNull(this.unpackAlignment)) {
      options.unpackAlignment = this.unpackAlignment;
    }
    if (ThreeUtil.isNotNull(this.generateMipmaps)) {
      options.generateMipmaps = this.generateMipmaps;
    }
    if (ThreeUtil.isNotNull(this.encoding)) {
      options.encoding = this.encoding;
    }
    if ((ThreeUtil.isNotNull(this.repeatX) && ThreeUtil.isNotNull(this.repeatY)) || ThreeUtil.isNotNull(this.repeat)) {
      options.repeat = this.getRepeat(1, 1);
    }
    if ((ThreeUtil.isNotNull(this.offsetX) && ThreeUtil.isNotNull(this.offsetY)) || ThreeUtil.isNotNull(this.offset)) {
      options.offset = this.getOffset(0, 0);
    }
    if ((ThreeUtil.isNotNull(this.centerX) && ThreeUtil.isNotNull(this.centerY)) || ThreeUtil.isNotNull(this.center)) {
      options.center = this.getCenter(0, 0);
    }

    if (this.debug) {
      this.consoleLog('texture-option', options);
    }
    return options;
  }

  static setTextureOptions(texture: THREE.Texture, options: { [key: string]: any } = {}): THREE.Texture {
    if (options == {}) {
      return;
    }
    Object.entries(options).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(value)) {
        switch (key.toLowerCase()) {
          case 'mapping':
            texture.mapping = ThreeUtil.getMappingSafe(value);
            break;
          case 'wraps':
            texture.wrapS = ThreeUtil.getWrappingSafe(value, 'clamptoedge');
            break;
          case 'wrapt':
            texture.wrapT = ThreeUtil.getWrappingSafe(value, 'clamptoedge');
            break;
          case 'flipy':
            texture.flipY = ThreeUtil.getTypeSafe(value, true);
            break;
          case 'rotation':
            texture.rotation = ThreeUtil.getAngleSafe(value, 0);
            break;
          case 'premultiplyalpha':
            texture.premultiplyAlpha = ThreeUtil.getTypeSafe(value, true);
            break;
          case 'magfilter':
            texture.magFilter = ThreeUtil.getTextureFilterSafe(value, 'linear');
            break;
          case 'minfilter':
            texture.minFilter = ThreeUtil.getTextureFilterSafe(value, 'linearmipmaplinear');
            break;
          case 'format':
            texture.format = ThreeUtil.getPixelFormatSafe(value, 'rgba');
            break;
          case 'type':
            texture.type = ThreeUtil.getTextureDataTypeSafe(value, 'unsignedbyte');
            break;
          case 'anisotropy':
            texture.anisotropy = ThreeUtil.getTypeSafe(value, 1);
            break;
          case 'unpackalignment':
            texture.unpackAlignment = ThreeUtil.getTypeSafe(value, 4);
            break;
          case 'generatemipmaps':
            texture.generateMipmaps = ThreeUtil.getTypeSafe(value, true);
            if (texture.generateMipmaps) {
              texture.mipmaps.length = 0;
            }
            break;
          case 'encoding':
            texture.encoding = ThreeUtil.getTextureEncodingSafe(value, 'linear');
            break;
          case 'repeat':
            texture.repeat.copy(value);
            break;
          case 'offset':
            texture.offset.copy(value);
            break;
          case 'center':
            texture.center.copy(value);
            break;
        }
      }
    });
    return texture;
  }

  public isTexture(type: String) : boolean {
    type = type.toLowerCase();
    return (this.type.toLowerCase() === type || (this.type + 'map').toLowerCase() === type);
  }

  private material: THREE.Material = null;

  public setMaterial(material: THREE.Material) {
    if (ThreeUtil.isNotNull(material) && this.material !== material) {
      this.material = material;
      if (this.texture !== null) {
        this.applyMaterial();
      } else {
        this.getTexture();
      }
    }
  }

  protected applyTexture2Material(material : THREE.Material, key : string, texture : THREE.Texture) : void {
    if (material instanceof NodeMaterial) {
      if (key !== 'diffuseMap') {
        if (material[key] instanceof TextureNode) {
          material[key].value = texture;
        } else {
          material[key] = new TextureNode(texture);
        }
      }
    } else if (material[key] !== undefined){
      material[key] = texture;
    }
  }

  protected applyMaterial() {
    if (this.material !== null && this.texture !== null) {
      switch (this.type.toLowerCase()) {
        case 'matcap':
          this.applyTexture2Material(this.material, 'matcap', this.texture);
          break;
        case 'env':
        case 'envmap':
          this.applyTexture2Material(this.material, 'envMap', this.texture);
          break;
        case 'specular':
        case 'specularmap':
          this.applyTexture2Material(this.material, 'specularMap', this.texture);
          break;
        case 'alpha':
        case 'alphamap':
          this.applyTexture2Material(this.material, 'alphaMap', this.texture);
          break;
        case 'emissive':
        case 'emissivemap':
          this.applyTexture2Material(this.material, 'emissiveMap', this.texture);
          break;
        case 'bump':
        case 'bumpmap':
          this.applyTexture2Material(this.material, 'bumpMap', this.texture);
          break;
        case 'normal':
        case 'normalmap':
          this.applyTexture2Material(this.material, 'normalMap', this.texture);
          break;
        case 'ao':
        case 'aomap':
          this.applyTexture2Material(this.material, 'aoMap', this.texture);
          break;
        case 'displace':
        case 'displacement':
        case 'displacementmap':
          this.applyTexture2Material(this.material, 'displacementMap', this.texture);
          break;
        case 'clearcoatnormal':
        case 'clearcoatnormalmap':
          this.applyTexture2Material(this.material, 'clearcoatNormalMap', this.texture);
          break;
        case 'metalness':
        case 'metalnessmap':
          this.applyTexture2Material(this.material, 'metalnessMap', this.texture);
          break;
        case 'roughness':
        case 'roughnessmap':
          this.applyTexture2Material(this.material, 'roughnessMap', this.texture);
          break;
        case 'light':
        case 'lightmap':
          this.applyTexture2Material(this.material, 'lightMap', this.texture);
          break;
        case 'gradient':
        case 'gradientmap':
          this.applyTexture2Material(this.material, 'gradientMap', this.texture);
          break;
        case 'map':
          this.applyTexture2Material(this.material, 'map', this.texture);
          break;
        default:
          this.applyTexture2Material(this.material, this.type, this.texture);
          break;
      }
      this.material.needsUpdate = true;
    }
  }

  protected applyChanges(changes: string[]) {
    if (this.texture !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getTexture();
        return;
      }
      if (ThreeUtil.isIndexOf(changes, ['image', 'storagename', 'storageoption', 'cubeimage', 'loadertype', 'canvas'])) {
        this.needUpdate = true;
        return;
      }
      AbstractTextureComponent.setTextureOptions(this.texture, this.getTextureOptions());
      if (ThreeUtil.isTextureLoaded(this.texture)) {
        this.texture.needsUpdate = true;
      }
      super.applyChanges(changes);
    }
  }

  protected getPmremGenerator(): THREE.PMREMGenerator {
    return new THREE.PMREMGenerator(ThreeUtil.getRenderer() as THREE.WebGLRenderer);
  }

  protected setTextureLoaded(texture: THREE.Texture) {
    if (texture !== null) {
      if (ThreeUtil.isNotNull(this.cubeType)) {
        switch (this.cubeType.toLowerCase()) {
          case 'angular':
          case 'equirectangular':
          case 'fromequirectangular':
            {
              AbstractTextureComponent.setTextureOptions(texture, this.getTextureOptions());
              const pmremGenerator = this.getPmremGenerator();
              const equirectangular = pmremGenerator.fromEquirectangular(texture).texture;
              texture.dispose();
              texture = equirectangular;
              pmremGenerator.dispose();
            }
            break;
          case 'cubemap':
            if (texture instanceof THREE.CubeTexture) {
              AbstractTextureComponent.setTextureOptions(texture, this.getTextureOptions());
              const pmremGenerator = this.getPmremGenerator();
              const cubemap = pmremGenerator.fromCubemap(texture).texture;
              texture.dispose();
              texture = cubemap;
              pmremGenerator.dispose();
            }
            break;
        }
      }
      if (this.texture !== texture && texture.image !== null) {
        this.texture = texture;
        super.setObject(this.texture);
      }
      AbstractTextureComponent.setTextureOptions(this.texture, this.getTextureOptions());
      this.applyMaterial();
      this.setSubscribeNext(['texture', 'loaded']);
    }
  }

  public getTexture<T extends THREE.Texture>(): T {
    return this.texture as T;
  }
  
}
