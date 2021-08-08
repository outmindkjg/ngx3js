import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiReadComponent } from './docs/api-read/api-read.component';
import { DocsComponent } from './docs/docs.component';
import { Css2dLabelComponent } from './examples/css2d-label/css2d-label.component';
import { Css3dMoleculesComponent } from './examples/css3d-molecules/css3d-molecules.component';
import { Css3dOrthographicComponent } from './examples/css3d-orthographic/css3d-orthographic.component';
import { Css3dPanoramaDeviceorientationComponent } from './examples/css3d-panorama-deviceorientation/css3d-panorama-deviceorientation.component';
import { Css3dPanoramaComponent } from './examples/css3d-panorama/css3d-panorama.component';
import { Css3dPeriodictableComponent } from './examples/css3d-periodictable/css3d-periodictable.component';
import { Css3dSandboxComponent } from './examples/css3d-sandbox/css3d-sandbox.component';
import { Css3dSpritesComponent } from './examples/css3d-sprites/css3d-sprites.component';
import { Css3dYoutubeComponent } from './examples/css3d-youtube/css3d-youtube.component';
import { ExamplesComponent } from './examples/examples.component';
import { GamesFpsComponent } from './examples/games-fps/games-fps.component';
import { MiscAnimationGroupsComponent } from './examples/misc-animation-groups/misc-animation-groups.component';
import { MiscAnimationKeysComponent } from './examples/misc-animation-keys/misc-animation-keys.component';
import { MiscBoxselectionComponent } from './examples/misc-boxselection/misc-boxselection.component';
import { MiscControlsDeviceorientationComponent } from './examples/misc-controls-deviceorientation/misc-controls-deviceorientation.component';
import { MiscControlsDragComponent } from './examples/misc-controls-drag/misc-controls-drag.component';
import { MiscControlsFlyComponent } from './examples/misc-controls-fly/misc-controls-fly.component';
import { MiscControlsMapComponent } from './examples/misc-controls-map/misc-controls-map.component';
import { MiscControlsOrbitComponent } from './examples/misc-controls-orbit/misc-controls-orbit.component';
import { MiscControlsPointerlockComponent } from './examples/misc-controls-pointerlock/misc-controls-pointerlock.component';
import { MiscControlsTrackballComponent } from './examples/misc-controls-trackball/misc-controls-trackball.component';
import { MiscControlsTransformComponent } from './examples/misc-controls-transform/misc-controls-transform.component';
import { MiscExporterColladaComponent } from './examples/misc-exporter-collada/misc-exporter-collada.component';
import { MiscExporterDracoComponent } from './examples/misc-exporter-draco/misc-exporter-draco.component';
import { MiscExporterGltfComponent } from './examples/misc-exporter-gltf/misc-exporter-gltf.component';
import { MiscExporterObjComponent } from './examples/misc-exporter-obj/misc-exporter-obj.component';
import { MiscExporterPlyComponent } from './examples/misc-exporter-ply/misc-exporter-ply.component';
import { MiscExporterStlComponent } from './examples/misc-exporter-stl/misc-exporter-stl.component';
import { MiscExporterUsdzComponent } from './examples/misc-exporter-usdz/misc-exporter-usdz.component';
import { MiscLegacyComponent } from './examples/misc-legacy/misc-legacy.component';
import { MiscLookatComponent } from './examples/misc-lookat/misc-lookat.component';
import { MiscUvTestsComponent } from './examples/misc-uv-tests/misc-uv-tests.component';
import { NgxChartAreaComponent } from './examples/ngx-chart-area/ngx-chart-area.component';
import { NgxChartBarComponent } from './examples/ngx-chart-bar/ngx-chart-bar.component';
import { NgxChartBubbleComponent } from './examples/ngx-chart-bubble/ngx-chart-bubble.component';
import { NgxChartLineComponent } from './examples/ngx-chart-line/ngx-chart-line.component';
import { NgxChartMixedComponent } from './examples/ngx-chart-mixed/ngx-chart-mixed.component';
import { NgxChartPolarComponent } from './examples/ngx-chart-polar/ngx-chart-polar.component';
import { NgxChartRadarComponent } from './examples/ngx-chart-radar/ngx-chart-radar.component';
import { NgxChartScatterComponent } from './examples/ngx-chart-scatter/ngx-chart-scatter.component';
import { NgxGeometryComponent } from './examples/ngx-geometry/ngx-geometry.component';
import { NgxMaterialComponent } from './examples/ngx-material/ngx-material.component';
import { PhysicsAmmoBreakComponent } from './examples/physics-ammo-break/physics-ammo-break.component';
import { PhysicsAmmoClothComponent } from './examples/physics-ammo-cloth/physics-ammo-cloth.component';
import { PhysicsAmmoInstancingComponent } from './examples/physics-ammo-instancing/physics-ammo-instancing.component';
import { PhysicsAmmoRopeComponent } from './examples/physics-ammo-rope/physics-ammo-rope.component';
import { PhysicsAmmoTerrainComponent } from './examples/physics-ammo-terrain/physics-ammo-terrain.component';
import { PhysicsAmmoVolumeComponent } from './examples/physics-ammo-volume/physics-ammo-volume.component';
import { PhysicsOimoInstancingComponent } from './examples/physics-oimo-instancing/physics-oimo-instancing.component';
import { SvgLinesComponent } from './examples/svg-lines/svg-lines.component';
import { SvgSandboxComponent } from './examples/svg-sandbox/svg-sandbox.component';
import { UnderConstructionComponent } from './examples/under-construction/under-construction.component';
import { WebaudioOrientationComponent } from './examples/webaudio-orientation/webaudio-orientation.component';
import { WebaudioSandboxComponent } from './examples/webaudio-sandbox/webaudio-sandbox.component';
import { WebaudioTimingComponent } from './examples/webaudio-timing/webaudio-timing.component';
import { WebaudioVisualizerComponent } from './examples/webaudio-visualizer/webaudio-visualizer.component';
import { WebglAnimationClothComponent } from './examples/webgl-animation-cloth/webgl-animation-cloth.component';
import { WebglAnimationKeyframesComponent } from './examples/webgl-animation-keyframes/webgl-animation-keyframes.component';
import { WebglAnimationMultipleComponent } from './examples/webgl-animation-multiple/webgl-animation-multiple.component';
import { WebglAnimationSkinningAdditiveBlendingComponent } from './examples/webgl-animation-skinning-additive-blending/webgl-animation-skinning-additive-blending.component';
import { WebglAnimationSkinningBlendingComponent } from './examples/webgl-animation-skinning-blending/webgl-animation-skinning-blending.component';
import { WebglAnimationSkinningMorphComponent } from './examples/webgl-animation-skinning-morph/webgl-animation-skinning-morph.component';
import { WebglBuffergeometryCompressionComponent } from './examples/webgl-buffergeometry-compression/webgl-buffergeometry-compression.component';
import { WebglBuffergeometryCustomAttributesParticlesComponent } from './examples/webgl-buffergeometry-custom-attributes-particles/webgl-buffergeometry-custom-attributes-particles.component';
import { WebglBuffergeometryDrawrangeComponent } from './examples/webgl-buffergeometry-drawrange/webgl-buffergeometry-drawrange.component';
import { WebglBuffergeometryGlbufferattributeComponent } from './examples/webgl-buffergeometry-glbufferattribute/webgl-buffergeometry-glbufferattribute.component';
import { WebglBuffergeometryIndexedComponent } from './examples/webgl-buffergeometry-indexed/webgl-buffergeometry-indexed.component';
import { WebglBuffergeometryInstancingBillboardsComponent } from './examples/webgl-buffergeometry-instancing-billboards/webgl-buffergeometry-instancing-billboards.component';
import { WebglBuffergeometryInstancingInterleavedComponent } from './examples/webgl-buffergeometry-instancing-interleaved/webgl-buffergeometry-instancing-interleaved.component';
import { WebglBuffergeometryInstancingComponent } from './examples/webgl-buffergeometry-instancing/webgl-buffergeometry-instancing.component';
import { WebglBuffergeometryLinesIndexedComponent } from './examples/webgl-buffergeometry-lines-indexed/webgl-buffergeometry-lines-indexed.component';
import { WebglBuffergeometryLinesComponent } from './examples/webgl-buffergeometry-lines/webgl-buffergeometry-lines.component';
import { WebglBuffergeometryPointsInterleavedComponent } from './examples/webgl-buffergeometry-points-interleaved/webgl-buffergeometry-points-interleaved.component';
import { WebglBuffergeometryPointsComponent } from './examples/webgl-buffergeometry-points/webgl-buffergeometry-points.component';
import { WebglBuffergeometryRawshaderComponent } from './examples/webgl-buffergeometry-rawshader/webgl-buffergeometry-rawshader.component';
import { WebglBuffergeometrySelectiveDrawComponent } from './examples/webgl-buffergeometry-selective-draw/webgl-buffergeometry-selective-draw.component';
import { WebglBuffergeometryUintComponent } from './examples/webgl-buffergeometry-uint/webgl-buffergeometry-uint.component';
import { WebglBuffergeometryComponent } from './examples/webgl-buffergeometry/webgl-buffergeometry.component';
import { WebglCameraArrayComponent } from './examples/webgl-camera-array/webgl-camera-array.component';
import { WebglCameraCinematicComponent } from './examples/webgl-camera-cinematic/webgl-camera-cinematic.component';
import { WebglCameraLogarithmicdepthbufferComponent } from './examples/webgl-camera-logarithmicdepthbuffer/webgl-camera-logarithmicdepthbuffer.component';
import { WebglCameraComponent } from './examples/webgl-camera/webgl-camera.component';
import { WebglClippingAdvancedComponent } from './examples/webgl-clipping-advanced/webgl-clipping-advanced.component';
import { WebglClippingIntersectionComponent } from './examples/webgl-clipping-intersection/webgl-clipping-intersection.component';
import { WebglClippingStencilComponent } from './examples/webgl-clipping-stencil/webgl-clipping-stencil.component';
import { WebglClippingComponent } from './examples/webgl-clipping/webgl-clipping.component';
import { WebglCustomAttributesLinesComponent } from './examples/webgl-custom-attributes-lines/webgl-custom-attributes-lines.component';
import { WebglCustomAttributesPointsComponent } from './examples/webgl-custom-attributes-points/webgl-custom-attributes-points.component';
import { WebglCustomAttributesPoints2Component } from './examples/webgl-custom-attributes-points2/webgl-custom-attributes-points2.component';
import { WebglCustomAttributesPoints3Component } from './examples/webgl-custom-attributes-points3/webgl-custom-attributes-points3.component';
import { WebglCustomAttributesComponent } from './examples/webgl-custom-attributes/webgl-custom-attributes.component';
import { WebglDecalsComponent } from './examples/webgl-decals/webgl-decals.component';
import { WebglDepthTextureComponent } from './examples/webgl-depth-texture/webgl-depth-texture.component';
import { WebglEffectsAnaglyphComponent } from './examples/webgl-effects-anaglyph/webgl-effects-anaglyph.component';
import { WebglEffectsAsciiComponent } from './examples/webgl-effects-ascii/webgl-effects-ascii.component';
import { WebglEffectsParallaxbarrierComponent } from './examples/webgl-effects-parallaxbarrier/webgl-effects-parallaxbarrier.component';
import { WebglEffectsPeppersghostComponent } from './examples/webgl-effects-peppersghost/webgl-effects-peppersghost.component';
import { WebglEffectsStereoComponent } from './examples/webgl-effects-stereo/webgl-effects-stereo.component';
import { WebglFramebufferTextureComponent } from './examples/webgl-framebuffer-texture/webgl-framebuffer-texture.component';
import { WebglFurnaceTestComponent } from './examples/webgl-furnace-test/webgl-furnace-test.component';
import { WebglGeometriesParametricComponent } from './examples/webgl-geometries-parametric/webgl-geometries-parametric.component';
import { WebglGeometriesComponent } from './examples/webgl-geometries/webgl-geometries.component';
import { WebglGeometryColorsLookuptableComponent } from './examples/webgl-geometry-colors-lookuptable/webgl-geometry-colors-lookuptable.component';
import { WebglGeometryColorsComponent } from './examples/webgl-geometry-colors/webgl-geometry-colors.component';
import { WebglGeometryConvexComponent } from './examples/webgl-geometry-convex/webgl-geometry-convex.component';
import { WebglGeometryCubeComponent } from './examples/webgl-geometry-cube/webgl-geometry-cube.component';
import { WebglGeometryDynamicComponent } from './examples/webgl-geometry-dynamic/webgl-geometry-dynamic.component';
import { WebglGeometryExtrudeShapesComponent } from './examples/webgl-geometry-extrude-shapes/webgl-geometry-extrude-shapes.component';
import { WebglGeometryExtrudeShapes2Component } from './examples/webgl-geometry-extrude-shapes2/webgl-geometry-extrude-shapes2.component';
import { WebglGeometryExtrudeSplinesComponent } from './examples/webgl-geometry-extrude-splines/webgl-geometry-extrude-splines.component';
import { WebglGeometryHierarchyComponent } from './examples/webgl-geometry-hierarchy/webgl-geometry-hierarchy.component';
import { WebglGeometryHierarchy2Component } from './examples/webgl-geometry-hierarchy2/webgl-geometry-hierarchy2.component';
import { WebglGeometryMinecraftAoComponent } from './examples/webgl-geometry-minecraft-ao/webgl-geometry-minecraft-ao.component';
import { WebglGeometryMinecraftComponent } from './examples/webgl-geometry-minecraft/webgl-geometry-minecraft.component';
import { WebglGeometryNormalsComponent } from './examples/webgl-geometry-normals/webgl-geometry-normals.component';
import { WebglGeometryNurbsComponent } from './examples/webgl-geometry-nurbs/webgl-geometry-nurbs.component';
import { WebglGeometryShapesComponent } from './examples/webgl-geometry-shapes/webgl-geometry-shapes.component';
import { WebglGeometrySplineEditorComponent } from './examples/webgl-geometry-spline-editor/webgl-geometry-spline-editor.component';
import { WebglGeometryTeapotComponent } from './examples/webgl-geometry-teapot/webgl-geometry-teapot.component';
import { WebglGeometryTerrainFogComponent } from './examples/webgl-geometry-terrain-fog/webgl-geometry-terrain-fog.component';
import { WebglGeometryTerrainRaycastComponent } from './examples/webgl-geometry-terrain-raycast/webgl-geometry-terrain-raycast.component';
import { WebglGeometryTerrainComponent } from './examples/webgl-geometry-terrain/webgl-geometry-terrain.component';
import { WebglGeometryTextShapesComponent } from './examples/webgl-geometry-text-shapes/webgl-geometry-text-shapes.component';
import { WebglGeometryTextStrokeComponent } from './examples/webgl-geometry-text-stroke/webgl-geometry-text-stroke.component';
import { WebglGeometryTextComponent } from './examples/webgl-geometry-text/webgl-geometry-text.component';
import { WebglGpgpuBirdsGltfComponent } from './examples/webgl-gpgpu-birds-gltf/webgl-gpgpu-birds-gltf.component';
import { WebglGpgpuBirdsComponent } from './examples/webgl-gpgpu-birds/webgl-gpgpu-birds.component';
import { WebglGpgpuProtoplanetComponent } from './examples/webgl-gpgpu-protoplanet/webgl-gpgpu-protoplanet.component';
import { WebglGpgpuWaterComponent } from './examples/webgl-gpgpu-water/webgl-gpgpu-water.component';
import { WebglHelpersComponent } from './examples/webgl-helpers/webgl-helpers.component';
import { WebglInstancingDynamicComponent } from './examples/webgl-instancing-dynamic/webgl-instancing-dynamic.component';
import { WebglInstancingModifiedComponent } from './examples/webgl-instancing-modified/webgl-instancing-modified.component';
import { WebglInstancingPerformanceComponent } from './examples/webgl-instancing-performance/webgl-instancing-performance.component';
import { WebglInstancingRaycastComponent } from './examples/webgl-instancing-raycast/webgl-instancing-raycast.component';
import { WebglInstancingScatterComponent } from './examples/webgl-instancing-scatter/webgl-instancing-scatter.component';
import { WebglInteractiveBuffergeometryComponent } from './examples/webgl-interactive-buffergeometry/webgl-interactive-buffergeometry.component';
import { WebglInteractiveCubesGpuComponent } from './examples/webgl-interactive-cubes-gpu/webgl-interactive-cubes-gpu.component';
import { WebglInteractiveCubesOrthoComponent } from './examples/webgl-interactive-cubes-ortho/webgl-interactive-cubes-ortho.component';
import { WebglInteractiveCubesComponent } from './examples/webgl-interactive-cubes/webgl-interactive-cubes.component';
import { WebglInteractiveLinesComponent } from './examples/webgl-interactive-lines/webgl-interactive-lines.component';
import { WebglInteractivePointsComponent } from './examples/webgl-interactive-points/webgl-interactive-points.component';
import { WebglInteractiveRaycastingPointsComponent } from './examples/webgl-interactive-raycasting-points/webgl-interactive-raycasting-points.component';
import { WebglInteractiveVoxelpainterComponent } from './examples/webgl-interactive-voxelpainter/webgl-interactive-voxelpainter.component';
import { WebglLayersComponent } from './examples/webgl-layers/webgl-layers.component';
import { WebglLensflaresComponent } from './examples/webgl-lensflares/webgl-lensflares.component';
import { WebglLightningstrikeComponent } from './examples/webgl-lightningstrike/webgl-lightningstrike.component';
import { WebglLightprobeCubecameraComponent } from './examples/webgl-lightprobe-cubecamera/webgl-lightprobe-cubecamera.component';
import { WebglLightprobeComponent } from './examples/webgl-lightprobe/webgl-lightprobe.component';
import { WebglLightsHemisphereComponent } from './examples/webgl-lights-hemisphere/webgl-lights-hemisphere.component';
import { WebglLightsPhysicalComponent } from './examples/webgl-lights-physical/webgl-lights-physical.component';
import { WebglLightsPointlightsComponent } from './examples/webgl-lights-pointlights/webgl-lights-pointlights.component';
import { WebglLightsPointlights2Component } from './examples/webgl-lights-pointlights2/webgl-lights-pointlights2.component';
import { WebglLightsRectarealightComponent } from './examples/webgl-lights-rectarealight/webgl-lights-rectarealight.component';
import { WebglLightsSpotlightComponent } from './examples/webgl-lights-spotlight/webgl-lights-spotlight.component';
import { WebglLightsSpotlightsComponent } from './examples/webgl-lights-spotlights/webgl-lights-spotlights.component';
import { WebglLinesColorsComponent } from './examples/webgl-lines-colors/webgl-lines-colors.component';
import { WebglLinesDashedComponent } from './examples/webgl-lines-dashed/webgl-lines-dashed.component';
import { WebglLinesFatWireframeComponent } from './examples/webgl-lines-fat-wireframe/webgl-lines-fat-wireframe.component';
import { WebglLinesFatComponent } from './examples/webgl-lines-fat/webgl-lines-fat.component';
import { WebglLinesSphereComponent } from './examples/webgl-lines-sphere/webgl-lines-sphere.component';
import { WebglLoaderAmfComponent } from './examples/webgl-loader-amf/webgl-loader-amf.component';
import { WebglLoaderAssimpComponent } from './examples/webgl-loader-assimp/webgl-loader-assimp.component';
import { WebglLoaderBvhComponent } from './examples/webgl-loader-bvh/webgl-loader-bvh.component';
import { WebglLoaderColladaKinematicsComponent } from './examples/webgl-loader-collada-kinematics/webgl-loader-collada-kinematics.component';
import { WebglLoaderColladaSkinningComponent } from './examples/webgl-loader-collada-skinning/webgl-loader-collada-skinning.component';
import { WebglLoaderColladaComponent } from './examples/webgl-loader-collada/webgl-loader-collada.component';
import { WebglLoaderDm3Component } from './examples/webgl-loader-dm3/webgl-loader-dm3.component';
import { WebglLoaderDracoComponent } from './examples/webgl-loader-draco/webgl-loader-draco.component';
import { WebglLoaderDs3Component } from './examples/webgl-loader-ds3/webgl-loader-ds3.component';
import { WebglLoaderFbxNurbsComponent } from './examples/webgl-loader-fbx-nurbs/webgl-loader-fbx-nurbs.component';
import { WebglLoaderFbxComponent } from './examples/webgl-loader-fbx/webgl-loader-fbx.component';
import { WebglLoaderGcodeComponent } from './examples/webgl-loader-gcode/webgl-loader-gcode.component';
import { WebglLoaderGltfCompressedComponent } from './examples/webgl-loader-gltf-compressed/webgl-loader-gltf-compressed.component';
import { WebglLoaderGltfExtensionsComponent } from './examples/webgl-loader-gltf-extensions/webgl-loader-gltf-extensions.component';
import { WebglLoaderGltfTransmissionComponent } from './examples/webgl-loader-gltf-transmission/webgl-loader-gltf-transmission.component';
import { WebglLoaderGltfVariantsComponent } from './examples/webgl-loader-gltf-variants/webgl-loader-gltf-variants.component';
import { WebglLoaderGltfComponent } from './examples/webgl-loader-gltf/webgl-loader-gltf.component';
import { WebglLoaderIfcComponent } from './examples/webgl-loader-ifc/webgl-loader-ifc.component';
import { WebglLoaderImagebitmapComponent } from './examples/webgl-loader-imagebitmap/webgl-loader-imagebitmap.component';
import { WebglLoaderKmzComponent } from './examples/webgl-loader-kmz/webgl-loader-kmz.component';
import { WebglLoaderLdrawComponent } from './examples/webgl-loader-ldraw/webgl-loader-ldraw.component';
import { WebglLoaderLwoComponent } from './examples/webgl-loader-lwo/webgl-loader-lwo.component';
import { WebglLoaderMd2ControlComponent } from './examples/webgl-loader-md2-control/webgl-loader-md2-control.component';
import { WebglLoaderMd2Component } from './examples/webgl-loader-md2/webgl-loader-md2.component';
import { WebglLoaderMddComponent } from './examples/webgl-loader-mdd/webgl-loader-mdd.component';
import { WebglLoaderMf3MaterialsComponent } from './examples/webgl-loader-mf3-materials/webgl-loader-mf3-materials.component';
import { WebglLoaderMf3Component } from './examples/webgl-loader-mf3/webgl-loader-mf3.component';
import { WebglLoaderMmdAudioComponent } from './examples/webgl-loader-mmd-audio/webgl-loader-mmd-audio.component';
import { WebglLoaderMmdPoseComponent } from './examples/webgl-loader-mmd-pose/webgl-loader-mmd-pose.component';
import { WebglLoaderMmdComponent } from './examples/webgl-loader-mmd/webgl-loader-mmd.component';
import { WebglLoaderNodesComponent } from './examples/webgl-loader-nodes/webgl-loader-nodes.component';
import { WebglLoaderNrrdComponent } from './examples/webgl-loader-nrrd/webgl-loader-nrrd.component';
import { WebglLoaderObjMtlComponent } from './examples/webgl-loader-obj-mtl/webgl-loader-obj-mtl.component';
import { WebglLoaderObjComponent } from './examples/webgl-loader-obj/webgl-loader-obj.component';
import { WebglLoaderPcdComponent } from './examples/webgl-loader-pcd/webgl-loader-pcd.component';
import { WebglLoaderPdbComponent } from './examples/webgl-loader-pdb/webgl-loader-pdb.component';
import { WebglLoaderPlyComponent } from './examples/webgl-loader-ply/webgl-loader-ply.component';
import { WebglLoaderPrwmComponent } from './examples/webgl-loader-prwm/webgl-loader-prwm.component';
import { WebglLoaderStlComponent } from './examples/webgl-loader-stl/webgl-loader-stl.component';
import { WebglLoaderSvgComponent } from './examples/webgl-loader-svg/webgl-loader-svg.component';
import { WebglLoaderTextureBasisComponent } from './examples/webgl-loader-texture-basis/webgl-loader-texture-basis.component';
import { WebglLoaderTextureDdsComponent } from './examples/webgl-loader-texture-dds/webgl-loader-texture-dds.component';
import { WebglLoaderTextureExrComponent } from './examples/webgl-loader-texture-exr/webgl-loader-texture-exr.component';
import { WebglLoaderTextureHdrComponent } from './examples/webgl-loader-texture-hdr/webgl-loader-texture-hdr.component';
import { WebglLoaderTextureKtxComponent } from './examples/webgl-loader-texture-ktx/webgl-loader-texture-ktx.component';
import { WebglLoaderTextureKtx2Component } from './examples/webgl-loader-texture-ktx2/webgl-loader-texture-ktx2.component';
import { WebglLoaderTextureLottieComponent } from './examples/webgl-loader-texture-lottie/webgl-loader-texture-lottie.component';
import { WebglLoaderTexturePvrtcComponent } from './examples/webgl-loader-texture-pvrtc/webgl-loader-texture-pvrtc.component';
import { WebglLoaderTextureRgbmComponent } from './examples/webgl-loader-texture-rgbm/webgl-loader-texture-rgbm.component';
import { WebglLoaderTextureTgaComponent } from './examples/webgl-loader-texture-tga/webgl-loader-texture-tga.component';
import { WebglLoaderTiltComponent } from './examples/webgl-loader-tilt/webgl-loader-tilt.component';
import { WebglLoaderTtfComponent } from './examples/webgl-loader-ttf/webgl-loader-ttf.component';
import { WebglLoaderVoxComponent } from './examples/webgl-loader-vox/webgl-loader-vox.component';
import { WebglLoaderVrmComponent } from './examples/webgl-loader-vrm/webgl-loader-vrm.component';
import { WebglLoaderVrmlComponent } from './examples/webgl-loader-vrml/webgl-loader-vrml.component';
import { WebglLoaderVtkComponent } from './examples/webgl-loader-vtk/webgl-loader-vtk.component';
import { WebglLoaderXComponent } from './examples/webgl-loader-x/webgl-loader-x.component';
import { WebglLoaderXyzComponent } from './examples/webgl-loader-xyz/webgl-loader-xyz.component';
import { WebglLodComponent } from './examples/webgl-lod/webgl-lod.component';
import { WebglMarchingcubesComponent } from './examples/webgl-marchingcubes/webgl-marchingcubes.component';
import { WebglMaterialsBlendingCustomComponent } from './examples/webgl-materials-blending-custom/webgl-materials-blending-custom.component';
import { WebglMaterialsBlendingComponent } from './examples/webgl-materials-blending/webgl-materials-blending.component';
import { WebglMaterialsBumpmapComponent } from './examples/webgl-materials-bumpmap/webgl-materials-bumpmap.component';
import { WebglMaterialsCarComponent } from './examples/webgl-materials-car/webgl-materials-car.component';
import { WebglMaterialsChannelsComponent } from './examples/webgl-materials-channels/webgl-materials-channels.component';
import { WebglMaterialsCompileComponent } from './examples/webgl-materials-compile/webgl-materials-compile.component';
import { WebglMaterialsCubemapBallsReflectionComponent } from './examples/webgl-materials-cubemap-balls-reflection/webgl-materials-cubemap-balls-reflection.component';
import { WebglMaterialsCubemapBallsRefractionComponent } from './examples/webgl-materials-cubemap-balls-refraction/webgl-materials-cubemap-balls-refraction.component';
import { WebglMaterialsCubemapDynamicComponent } from './examples/webgl-materials-cubemap-dynamic/webgl-materials-cubemap-dynamic.component';
import { WebglMaterialsCubemapMipmapsComponent } from './examples/webgl-materials-cubemap-mipmaps/webgl-materials-cubemap-mipmaps.component';
import { WebglMaterialsCubemapRefractionComponent } from './examples/webgl-materials-cubemap-refraction/webgl-materials-cubemap-refraction.component';
import { WebglMaterialsCubemapComponent } from './examples/webgl-materials-cubemap/webgl-materials-cubemap.component';
import { WebglMaterialsCurvatureComponent } from './examples/webgl-materials-curvature/webgl-materials-curvature.component';
import { WebglMaterialsDisplacementmapComponent } from './examples/webgl-materials-displacementmap/webgl-materials-displacementmap.component';
import { WebglMaterialsEnvmapsExrComponent } from './examples/webgl-materials-envmaps-exr/webgl-materials-envmaps-exr.component';
import { WebglMaterialsEnvmapsHdrNodesComponent } from './examples/webgl-materials-envmaps-hdr-nodes/webgl-materials-envmaps-hdr-nodes.component';
import { WebglMaterialsEnvmapsHdrComponent } from './examples/webgl-materials-envmaps-hdr/webgl-materials-envmaps-hdr.component';
import { WebglMaterialsEnvmapsParallaxComponent } from './examples/webgl-materials-envmaps-parallax/webgl-materials-envmaps-parallax.component';
import { WebglMaterialsEnvmapsPmremNodesComponent } from './examples/webgl-materials-envmaps-pmrem-nodes/webgl-materials-envmaps-pmrem-nodes.component';
import { WebglMaterialsEnvmapsComponent } from './examples/webgl-materials-envmaps/webgl-materials-envmaps.component';
import { WebglMaterialsGrassComponent } from './examples/webgl-materials-grass/webgl-materials-grass.component';
import { WebglMaterialsLightmapComponent } from './examples/webgl-materials-lightmap/webgl-materials-lightmap.component';
import { WebglMaterialsMatcapComponent } from './examples/webgl-materials-matcap/webgl-materials-matcap.component';
import { WebglMaterialsModifiedComponent } from './examples/webgl-materials-modified/webgl-materials-modified.component';
import { WebglMaterialsNodesComponent } from './examples/webgl-materials-nodes/webgl-materials-nodes.component';
import { WebglMaterialsNormalmapObjectSpaceComponent } from './examples/webgl-materials-normalmap-object-space/webgl-materials-normalmap-object-space.component';
import { WebglMaterialsNormalmapComponent } from './examples/webgl-materials-normalmap/webgl-materials-normalmap.component';
import { WebglMaterialsParallaxmapComponent } from './examples/webgl-materials-parallaxmap/webgl-materials-parallaxmap.component';
import { WebglMaterialsPhysicalClearcoatComponent } from './examples/webgl-materials-physical-clearcoat/webgl-materials-physical-clearcoat.component';
import { WebglMaterialsPhysicalReflectivityComponent } from './examples/webgl-materials-physical-reflectivity/webgl-materials-physical-reflectivity.component';
import { WebglMaterialsPhysicalSheenComponent } from './examples/webgl-materials-physical-sheen/webgl-materials-physical-sheen.component';
import { WebglMaterialsPhysicalTransmissionComponent } from './examples/webgl-materials-physical-transmission/webgl-materials-physical-transmission.component';
import { WebglMaterialsShadersFresnelComponent } from './examples/webgl-materials-shaders-fresnel/webgl-materials-shaders-fresnel.component';
import { WebglMaterialsStandardNodesComponent } from './examples/webgl-materials-standard-nodes/webgl-materials-standard-nodes.component';
import { WebglMaterialsStandardComponent } from './examples/webgl-materials-standard/webgl-materials-standard.component';
import { WebglMaterialsSubsurfaceScatteringComponent } from './examples/webgl-materials-subsurface-scattering/webgl-materials-subsurface-scattering.component';
import { WebglMaterialsTextureAnisotropyComponent } from './examples/webgl-materials-texture-anisotropy/webgl-materials-texture-anisotropy.component';
import { WebglMaterialsTextureCanvasComponent } from './examples/webgl-materials-texture-canvas/webgl-materials-texture-canvas.component';
import { WebglMaterialsTextureFiltersComponent } from './examples/webgl-materials-texture-filters/webgl-materials-texture-filters.component';
import { WebglMaterialsTextureManualmipmapComponent } from './examples/webgl-materials-texture-manualmipmap/webgl-materials-texture-manualmipmap.component';
import { WebglMaterialsTexturePartialupdateComponent } from './examples/webgl-materials-texture-partialupdate/webgl-materials-texture-partialupdate.component';
import { WebglMaterialsTextureRotationComponent } from './examples/webgl-materials-texture-rotation/webgl-materials-texture-rotation.component';
import { WebglMaterialsVariationsBasicComponent } from './examples/webgl-materials-variations-basic/webgl-materials-variations-basic.component';
import { WebglMaterialsVariationsLambertComponent } from './examples/webgl-materials-variations-lambert/webgl-materials-variations-lambert.component';
import { WebglMaterialsVariationsPhongComponent } from './examples/webgl-materials-variations-phong/webgl-materials-variations-phong.component';
import { WebglMaterialsVariationsPhysicalComponent } from './examples/webgl-materials-variations-physical/webgl-materials-variations-physical.component';
import { WebglMaterialsVariationsStandardComponent } from './examples/webgl-materials-variations-standard/webgl-materials-variations-standard.component';
import { WebglMaterialsVariationsToonComponent } from './examples/webgl-materials-variations-toon/webgl-materials-variations-toon.component';
import { WebglMaterialsVideoWebcamComponent } from './examples/webgl-materials-video-webcam/webgl-materials-video-webcam.component';
import { WebglMaterialsVideoComponent } from './examples/webgl-materials-video/webgl-materials-video.component';
import { WebglMaterialsWireframeComponent } from './examples/webgl-materials-wireframe/webgl-materials-wireframe.component';
import { WebglMaterialsComponent } from './examples/webgl-materials/webgl-materials.component';
import { WebglMathObbComponent } from './examples/webgl-math-obb/webgl-math-obb.component';
import { WebglMathOrientationTransformComponent } from './examples/webgl-math-orientation-transform/webgl-math-orientation-transform.component';
import { WebglMirrorNodesComponent } from './examples/webgl-mirror-nodes/webgl-mirror-nodes.component';
import { WebglMirrorComponent } from './examples/webgl-mirror/webgl-mirror.component';
import { WebglModifierCurveInstancedComponent } from './examples/webgl-modifier-curve-instanced/webgl-modifier-curve-instanced.component';
import { WebglModifierCurveComponent } from './examples/webgl-modifier-curve/webgl-modifier-curve.component';
import { WebglModifierEdgesplitComponent } from './examples/webgl-modifier-edgesplit/webgl-modifier-edgesplit.component';
import { WebglModifierSimplifierComponent } from './examples/webgl-modifier-simplifier/webgl-modifier-simplifier.component';
import { WebglModifierTessellationComponent } from './examples/webgl-modifier-tessellation/webgl-modifier-tessellation.component';
import { WebglMorphtargetsHorseComponent } from './examples/webgl-morphtargets-horse/webgl-morphtargets-horse.component';
import { WebglMorphtargetsSphereComponent } from './examples/webgl-morphtargets-sphere/webgl-morphtargets-sphere.component';
import { WebglMorphtargetsComponent } from './examples/webgl-morphtargets/webgl-morphtargets.component';
import { WebglMultipleCanvasesCircleComponent } from './examples/webgl-multiple-canvases-circle/webgl-multiple-canvases-circle.component';
import { WebglMultipleCanvasesComplexComponent } from './examples/webgl-multiple-canvases-complex/webgl-multiple-canvases-complex.component';
import { WebglMultipleCanvasesGridComponent } from './examples/webgl-multiple-canvases-grid/webgl-multiple-canvases-grid.component';
import { WebglMultipleElementsTextComponent } from './examples/webgl-multiple-elements-text/webgl-multiple-elements-text.component';
import { WebglMultipleElementsComponent } from './examples/webgl-multiple-elements/webgl-multiple-elements.component';
import { WebglMultipleRenderersComponent } from './examples/webgl-multiple-renderers/webgl-multiple-renderers.component';
import { WebglMultipleScenesComparisonComponent } from './examples/webgl-multiple-scenes-comparison/webgl-multiple-scenes-comparison.component';
import { WebglMultipleViewsComponent } from './examples/webgl-multiple-views/webgl-multiple-views.component';
import { WebglPanoramaCubeComponent } from './examples/webgl-panorama-cube/webgl-panorama-cube.component';
import { WebglPanoramaEquirectangularComponent } from './examples/webgl-panorama-equirectangular/webgl-panorama-equirectangular.component';
import { WebglPerformanceNodesComponent } from './examples/webgl-performance-nodes/webgl-performance-nodes.component';
import { WebglPerformanceStaticComponent } from './examples/webgl-performance-static/webgl-performance-static.component';
import { WebglPerformanceComponent } from './examples/webgl-performance/webgl-performance.component';
import { WebglPmremTestComponent } from './examples/webgl-pmrem-test/webgl-pmrem-test.component';
import { WebglPointsBillboardsComponent } from './examples/webgl-points-billboards/webgl-points-billboards.component';
import { WebglPointsDynamicComponent } from './examples/webgl-points-dynamic/webgl-points-dynamic.component';
import { WebglPointsSpritesComponent } from './examples/webgl-points-sprites/webgl-points-sprites.component';
import { WebglPointsWavesComponent } from './examples/webgl-points-waves/webgl-points-waves.component';
import { WebglPortalComponent } from './examples/webgl-portal/webgl-portal.component';
import { WebglPostprocessingAdvancedComponent } from './examples/webgl-postprocessing-advanced/webgl-postprocessing-advanced.component';
import { WebglPostprocessingAfterimageComponent } from './examples/webgl-postprocessing-afterimage/webgl-postprocessing-afterimage.component';
import { WebglPostprocessingBackgroundsComponent } from './examples/webgl-postprocessing-backgrounds/webgl-postprocessing-backgrounds.component';
import { WebglPostprocessingCrossfadeComponent } from './examples/webgl-postprocessing-crossfade/webgl-postprocessing-crossfade.component';
import { WebglPostprocessingD3lutComponent } from './examples/webgl-postprocessing-d3lut/webgl-postprocessing-d3lut.component';
import { WebglPostprocessingDofComponent } from './examples/webgl-postprocessing-dof/webgl-postprocessing-dof.component';
import { WebglPostprocessingDof2Component } from './examples/webgl-postprocessing-dof2/webgl-postprocessing-dof2.component';
import { WebglPostprocessingFxaaComponent } from './examples/webgl-postprocessing-fxaa/webgl-postprocessing-fxaa.component';
import { WebglPostprocessingGlitchComponent } from './examples/webgl-postprocessing-glitch/webgl-postprocessing-glitch.component';
import { WebglPostprocessingGodraysComponent } from './examples/webgl-postprocessing-godrays/webgl-postprocessing-godrays.component';
import { WebglPostprocessingMaskingComponent } from './examples/webgl-postprocessing-masking/webgl-postprocessing-masking.component';
import { WebglPostprocessingNodesPassComponent } from './examples/webgl-postprocessing-nodes-pass/webgl-postprocessing-nodes-pass.component';
import { WebglPostprocessingNodesComponent } from './examples/webgl-postprocessing-nodes/webgl-postprocessing-nodes.component';
import { WebglPostprocessingOutlineComponent } from './examples/webgl-postprocessing-outline/webgl-postprocessing-outline.component';
import { WebglPostprocessingPixelComponent } from './examples/webgl-postprocessing-pixel/webgl-postprocessing-pixel.component';
import { WebglPostprocessingProceduralComponent } from './examples/webgl-postprocessing-procedural/webgl-postprocessing-procedural.component';
import { WebglPostprocessingRgbHalftoneComponent } from './examples/webgl-postprocessing-rgb-halftone/webgl-postprocessing-rgb-halftone.component';
import { WebglPostprocessingSaoComponent } from './examples/webgl-postprocessing-sao/webgl-postprocessing-sao.component';
import { WebglPostprocessingSmaaComponent } from './examples/webgl-postprocessing-smaa/webgl-postprocessing-smaa.component';
import { WebglPostprocessingSobelComponent } from './examples/webgl-postprocessing-sobel/webgl-postprocessing-sobel.component';
import { WebglPostprocessingSsaaComponent } from './examples/webgl-postprocessing-ssaa/webgl-postprocessing-ssaa.component';
import { WebglPostprocessingSsaoComponent } from './examples/webgl-postprocessing-ssao/webgl-postprocessing-ssao.component';
import { WebglPostprocessingSsrComponent } from './examples/webgl-postprocessing-ssr/webgl-postprocessing-ssr.component';
import { WebglPostprocessingSsrrComponent } from './examples/webgl-postprocessing-ssrr/webgl-postprocessing-ssrr.component';
import { WebglPostprocessingTaaComponent } from './examples/webgl-postprocessing-taa/webgl-postprocessing-taa.component';
import { WebglPostprocessingUnrealBloomSelectiveComponent } from './examples/webgl-postprocessing-unreal-bloom-selective/webgl-postprocessing-unreal-bloom-selective.component';
import { WebglPostprocessingUnrealBloomComponent } from './examples/webgl-postprocessing-unreal-bloom/webgl-postprocessing-unreal-bloom.component';
import { WebglPostprocessingComponent } from './examples/webgl-postprocessing/webgl-postprocessing.component';
import { WebglRaycastSpriteComponent } from './examples/webgl-raycast-sprite/webgl-raycast-sprite.component';
import { WebglRaycastTextureComponent } from './examples/webgl-raycast-texture/webgl-raycast-texture.component';
import { WebglRaymarchingReflectComponent } from './examples/webgl-raymarching-reflect/webgl-raymarching-reflect.component';
import { WebglReadFloatBufferComponent } from './examples/webgl-read-float-buffer/webgl-read-float-buffer.component';
import { WebglRefractionComponent } from './examples/webgl-refraction/webgl-refraction.component';
import { WebglRttComponent } from './examples/webgl-rtt/webgl-rtt.component';
import { WebglSandboxComponent } from './examples/webgl-sandbox/webgl-sandbox.component';
import { WebglShaderLavaComponent } from './examples/webgl-shader-lava/webgl-shader-lava.component';
import { WebglShaderComponent } from './examples/webgl-shader/webgl-shader.component';
import { WebglShader2Component } from './examples/webgl-shader2/webgl-shader2.component';
import { WebglShadersOceanComponent } from './examples/webgl-shaders-ocean/webgl-shaders-ocean.component';
import { WebglShadersOcean2Component } from './examples/webgl-shaders-ocean2/webgl-shaders-ocean2.component';
import { WebglShadersSkyComponent } from './examples/webgl-shaders-sky/webgl-shaders-sky.component';
import { WebglShadersTonemappingComponent } from './examples/webgl-shaders-tonemapping/webgl-shaders-tonemapping.component';
import { WebglShadersVectorComponent } from './examples/webgl-shaders-vector/webgl-shaders-vector.component';
import { WebglShadingPhysicalComponent } from './examples/webgl-shading-physical/webgl-shading-physical.component';
import { WebglShadowContactComponent } from './examples/webgl-shadow-contact/webgl-shadow-contact.component';
import { WebglShadowmapCsmComponent } from './examples/webgl-shadowmap-csm/webgl-shadowmap-csm.component';
import { WebglShadowmapPcssComponent } from './examples/webgl-shadowmap-pcss/webgl-shadowmap-pcss.component';
import { WebglShadowmapPerformanceComponent } from './examples/webgl-shadowmap-performance/webgl-shadowmap-performance.component';
import { WebglShadowmapPointlightComponent } from './examples/webgl-shadowmap-pointlight/webgl-shadowmap-pointlight.component';
import { WebglShadowmapProgressiveComponent } from './examples/webgl-shadowmap-progressive/webgl-shadowmap-progressive.component';
import { WebglShadowmapViewerComponent } from './examples/webgl-shadowmap-viewer/webgl-shadowmap-viewer.component';
import { WebglShadowmapVsmComponent } from './examples/webgl-shadowmap-vsm/webgl-shadowmap-vsm.component';
import { WebglShadowmapComponent } from './examples/webgl-shadowmap/webgl-shadowmap.component';
import { WebglShadowmeshComponent } from './examples/webgl-shadowmesh/webgl-shadowmesh.component';
import { WebglSimpleGiComponent } from './examples/webgl-simple-gi/webgl-simple-gi.component';
import { WebglSkinningSimpleComponent } from './examples/webgl-skinning-simple/webgl-skinning-simple.component';
import { WebglSpritesNodesComponent } from './examples/webgl-sprites-nodes/webgl-sprites-nodes.component';
import { WebglSpritesComponent } from './examples/webgl-sprites/webgl-sprites.component';
import { WebglTestMemoryComponent } from './examples/webgl-test-memory/webgl-test-memory.component';
import { WebglTestMemory2Component } from './examples/webgl-test-memory2/webgl-test-memory2.component';
import { WebglTiledForwardComponent } from './examples/webgl-tiled-forward/webgl-tiled-forward.component';
import { WebglTonemappingComponent } from './examples/webgl-tonemapping/webgl-tonemapping.component';
import { WebglTrailsComponent } from './examples/webgl-trails/webgl-trails.component';
import { WebglVideoKinectComponent } from './examples/webgl-video-kinect/webgl-video-kinect.component';
import { WebglVideoPanoramaEquirectangularComponent } from './examples/webgl-video-panorama-equirectangular/webgl-video-panorama-equirectangular.component';
import { WebglWaterFlowmapComponent } from './examples/webgl-water-flowmap/webgl-water-flowmap.component';
import { WebglWaterComponent } from './examples/webgl-water/webgl-water.component';
import { WebglWorkerOffscreencanvasComponent } from './examples/webgl-worker-offscreencanvas/webgl-worker-offscreencanvas.component';
import { Webgl2BuffergeometryAttributesIntegerComponent } from './examples/webgl2-buffergeometry-attributes-integer/webgl2-buffergeometry-attributes-integer.component';
import { Webgl2MaterialsTexture2darrayComponent } from './examples/webgl2-materials-texture2darray/webgl2-materials-texture2darray.component';
import { Webgl2MaterialsTexture3dPartialupdateComponent } from './examples/webgl2-materials-texture3d-partialupdate/webgl2-materials-texture3d-partialupdate.component';
import { Webgl2MaterialsTexture3dComponent } from './examples/webgl2-materials-texture3d/webgl2-materials-texture3d.component';
import { Webgl2MultipleRendertargetsComponent } from './examples/webgl2-multiple-rendertargets/webgl2-multiple-rendertargets.component';
import { Webgl2MultisampledRenderbuffersComponent } from './examples/webgl2-multisampled-renderbuffers/webgl2-multisampled-renderbuffers.component';
import { Webgl2RendertargetTexture2darrayComponent } from './examples/webgl2-rendertarget-texture2darray/webgl2-rendertarget-texture2darray.component';
import { Webgl2VolumeCloudComponent } from './examples/webgl2-volume-cloud/webgl2-volume-cloud.component';
import { Webgl2VolumeInstancingComponent } from './examples/webgl2-volume-instancing/webgl2-volume-instancing.component';
import { Webgl2VolumePerlinComponent } from './examples/webgl2-volume-perlin/webgl2-volume-perlin.component';
import { WebgpuComputeComponent } from './examples/webgpu-compute/webgpu-compute.component';
import { WebgpuInstanceUniformComponent } from './examples/webgpu-instance-uniform/webgpu-instance-uniform.component';
import { WebgpuRttComponent } from './examples/webgpu-rtt/webgpu-rtt.component';
import { WebgpuSandboxComponent } from './examples/webgpu-sandbox/webgpu-sandbox.component';
import { WebxrArConesComponent } from './examples/webxr-ar-cones/webxr-ar-cones.component';
import { WebxrArHittestComponent } from './examples/webxr-ar-hittest/webxr-ar-hittest.component';
import { WebxrArPaintComponent } from './examples/webxr-ar-paint/webxr-ar-paint.component';
import { WebxrVrBallshooterComponent } from './examples/webxr-vr-ballshooter/webxr-vr-ballshooter.component';
import { WebxrVrCubesComponent } from './examples/webxr-vr-cubes/webxr-vr-cubes.component';
import { WebxrVrDraggingComponent } from './examples/webxr-vr-dragging/webxr-vr-dragging.component';
import { WebxrVrHandinputCubesComponent } from './examples/webxr-vr-handinput-cubes/webxr-vr-handinput-cubes.component';
import { WebxrVrHandinputProfilesComponent } from './examples/webxr-vr-handinput-profiles/webxr-vr-handinput-profiles.component';
import { WebxrVrHandinputComponent } from './examples/webxr-vr-handinput/webxr-vr-handinput.component';
import { WebxrVrHapticsComponent } from './examples/webxr-vr-haptics/webxr-vr-haptics.component';
import { WebxrVrLorenzattractorComponent } from './examples/webxr-vr-lorenzattractor/webxr-vr-lorenzattractor.component';
import { WebxrVrPaintComponent } from './examples/webxr-vr-paint/webxr-vr-paint.component';
import { WebxrVrPanoramaDepthComponent } from './examples/webxr-vr-panorama-depth/webxr-vr-panorama-depth.component';
import { WebxrVrPanoramaComponent } from './examples/webxr-vr-panorama/webxr-vr-panorama.component';
import { WebxrVrRollercoasterComponent } from './examples/webxr-vr-rollercoaster/webxr-vr-rollercoaster.component';
import { WebxrVrSandboxComponent } from './examples/webxr-vr-sandbox/webxr-vr-sandbox.component';
import { WebxrVrSculptComponent } from './examples/webxr-vr-sculpt/webxr-vr-sculpt.component';
import { WebxrVrVideoComponent } from './examples/webxr-vr-video/webxr-vr-video.component';
import { MenuComponent } from './menu/menu.component';
import { Ngx3JsModule } from './three/ngx3js.module';
import { WebgpuLightsCustomComponent } from './examples/webgpu-lights-custom/webgpu-lights-custom.component';
import { WebgpuLightsSelectiveComponent } from './examples/webgpu-lights-selective/webgpu-lights-selective.component';
import { WebgpuMaterialsComponent } from './examples/webgpu-materials/webgpu-materials.component';
import { WebxrArLightingComponent } from './examples/webxr-ar-lighting/webxr-ar-lighting.component';
import { WebxrVrHandinputPointerclickComponent } from './examples/webxr-vr-handinput-pointerclick/webxr-vr-handinput-pointerclick.component';
import { WebxrVrHandinputPointerdragComponent } from './examples/webxr-vr-handinput-pointerdrag/webxr-vr-handinput-pointerdrag.component';
import { WebxrVrHandinputPressbuttonComponent } from './examples/webxr-vr-handinput-pressbutton/webxr-vr-handinput-pressbutton.component';
import { WebxrVrLayersComponent } from './examples/webxr-vr-layers/webxr-vr-layers.component';


@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		DocsComponent,
		ApiReadComponent,
		ExamplesComponent,
		WebglAnimationClothComponent,
		WebglAnimationKeyframesComponent,
		WebglAnimationSkinningBlendingComponent,
		WebglAnimationSkinningAdditiveBlendingComponent,
		UnderConstructionComponent,
		WebglAnimationSkinningMorphComponent,
		WebglAnimationMultipleComponent,
		WebglCameraComponent,
		WebglCameraArrayComponent,
		WebglCameraCinematicComponent,
		WebglCameraLogarithmicdepthbufferComponent,
		WebglClippingComponent,
		WebglClippingAdvancedComponent,
		WebglClippingIntersectionComponent,
		WebglClippingStencilComponent,
		WebglDecalsComponent,
		WebglDepthTextureComponent,
		WebglEffectsAnaglyphComponent,
		WebglEffectsAsciiComponent,
		WebglEffectsParallaxbarrierComponent,
		WebglEffectsPeppersghostComponent,
		WebglEffectsStereoComponent,
		WebglFramebufferTextureComponent,
		WebglGeometriesComponent,
		WebglGeometriesParametricComponent,
		WebglGeometryColorsComponent,
		WebglGeometryColorsLookuptableComponent,
		WebglGeometryConvexComponent,
		WebglGeometryCubeComponent,
		WebglGeometryDynamicComponent,
		WebglGeometryExtrudeShapesComponent,
		WebglGeometryExtrudeShapes2Component,
		WebglGeometryExtrudeSplinesComponent,
		WebglGeometryHierarchyComponent,
		WebglGeometryHierarchy2Component,
		WebglGeometryMinecraftComponent,
		WebglGeometryMinecraftAoComponent,
		WebglGeometryNormalsComponent,
		WebglGeometryNurbsComponent,
		WebglGeometryShapesComponent,
		WebglGeometrySplineEditorComponent,
		WebglGeometryTeapotComponent,
		WebglGeometryTerrainComponent,
		WebglGeometryTerrainFogComponent,
		WebglGeometryTerrainRaycastComponent,
		WebglGeometryTextComponent,
		WebglGeometryTextShapesComponent,
		WebglGeometryTextStrokeComponent,
		WebglHelpersComponent,
		WebglInstancingDynamicComponent,
		WebglInstancingPerformanceComponent,
		WebglInstancingRaycastComponent,
		WebglInstancingScatterComponent,
		WebglInteractiveBuffergeometryComponent,
		WebglInteractiveCubesComponent,
		WebglInteractiveCubesGpuComponent,
		WebglInteractiveCubesOrthoComponent,
		WebglInteractiveLinesComponent,
		WebglInteractivePointsComponent,
		WebglInteractiveRaycastingPointsComponent,
		WebglInteractiveVoxelpainterComponent,
		WebglLayersComponent,
		WebglLensflaresComponent,
		WebglLightprobeComponent,
		WebglLightprobeCubecameraComponent,
		WebglLightsHemisphereComponent,
		WebglLightsPhysicalComponent,
		WebglLightsPointlightsComponent,
		WebglLightsPointlights2Component,
		WebglLightsSpotlightComponent,
		WebglLightsSpotlightsComponent,
		WebglLightsRectarealightComponent,
		WebglLinesColorsComponent,
		WebglLinesDashedComponent,
		WebglLinesFatComponent,
		WebglLinesFatWireframeComponent,
		WebglLinesSphereComponent,
		WebglMaterialsBlendingComponent,
		WebglMaterialsBlendingCustomComponent,
		WebglMaterialsComponent,
		WebglMarchingcubesComponent,
		WebglLodComponent,
		WebglLoaderXyzComponent,
		WebglLoaderXComponent,
		WebglLoaderVtkComponent,
		WebglLoaderVrmlComponent,
		WebglLoaderVrmComponent,
		WebglLoaderVoxComponent,
		WebglLoaderTtfComponent,
		WebglLoaderTextureTgaComponent,
		WebglLoaderTextureRgbmComponent,
		WebglLoaderTexturePvrtcComponent,
		WebglLoaderTextureLottieComponent,
		WebglLoaderTextureKtx2Component,
		WebglLoaderTextureKtxComponent,
		WebglLoaderTextureHdrComponent,
		WebglLoaderTextureExrComponent,
		WebglLoaderTextureDdsComponent,
		WebglLoaderTextureBasisComponent,
		WebglLoaderTiltComponent,
		WebglLoaderSvgComponent,
		WebglLoaderStlComponent,
		WebglLoaderPrwmComponent,
		WebglLoaderPlyComponent,
		WebglLoaderPdbComponent,
		WebglLoaderPcdComponent,
		WebglLoaderObjMtlComponent,
		WebglLoaderObjComponent,
		WebglLoaderNrrdComponent,
		WebglLoaderMmdAudioComponent,
		WebglLoaderMmdPoseComponent,
		WebglLoaderMmdComponent,
		WebglLoaderMddComponent,
		WebglLoaderMd2ControlComponent,
		WebglLoaderMd2Component,
		WebglLoaderLwoComponent,
		WebglLoaderLdrawComponent,
		WebglLoaderKmzComponent,
		WebglLoaderImagebitmapComponent,
		WebglLoaderGltfVariantsComponent,
		WebglLoaderGltfExtensionsComponent,
		WebglLoaderGltfCompressedComponent,
		WebglLoaderGltfComponent,
		WebglLoaderGcodeComponent,
		WebglLoaderFbxNurbsComponent,
		WebglLoaderFbxComponent,
		WebglLoaderDracoComponent,
		WebglLoaderColladaSkinningComponent,
		WebglLoaderColladaKinematicsComponent,
		WebglLoaderColladaComponent,
		WebglLoaderBvhComponent,
		WebglLoaderAssimpComponent,
		WebglLoaderAmfComponent,
		WebglLoaderMf3MaterialsComponent,
		WebglLoaderMf3Component,
		WebglLoaderDs3Component,
		WebglLoaderDm3Component,
		WebglMaterialsBumpmapComponent,
		WebglMaterialsCarComponent,
		WebglMaterialsChannelsComponent,
		WebglMaterialsCubemapComponent,
		WebglMaterialsCubemapBallsReflectionComponent,
		WebglMaterialsCubemapBallsRefractionComponent,
		WebglMaterialsCubemapDynamicComponent,
		WebglMaterialsCubemapRefractionComponent,
		WebglMaterialsCubemapMipmapsComponent,
		WebglMaterialsCurvatureComponent,
		WebglMaterialsDisplacementmapComponent,
		WebglMaterialsEnvmapsComponent,
		WebglMaterialsEnvmapsExrComponent,
		WebglMaterialsEnvmapsHdrComponent,
		WebglMaterialsEnvmapsParallaxComponent,
		WebglMaterialsGrassComponent,
		WebglMaterialsLightmapComponent,
		WebglMaterialsMatcapComponent,
		WebglMaterialsNormalmapComponent,
		WebglMaterialsNormalmapObjectSpaceComponent,
		WebglMaterialsParallaxmapComponent,
		WebglMaterialsPhysicalClearcoatComponent,
		WebglMaterialsPhysicalReflectivityComponent,
		WebglMaterialsPhysicalSheenComponent,
		WebglMaterialsPhysicalTransmissionComponent,
		WebglMaterialsShadersFresnelComponent,
		WebglMaterialsStandardComponent,
		WebglMaterialsSubsurfaceScatteringComponent,
		WebglMaterialsTextureAnisotropyComponent,
		WebglMaterialsTextureCanvasComponent,
		WebglMaterialsTextureFiltersComponent,
		WebglMaterialsTextureManualmipmapComponent,
		WebglMaterialsTexturePartialupdateComponent,
		WebglMaterialsTextureRotationComponent,
		WebglMaterialsVariationsBasicComponent,
		WebglMaterialsVariationsLambertComponent,
		WebglMaterialsVariationsPhongComponent,
		WebglMaterialsVariationsStandardComponent,
		WebglMaterialsVariationsPhysicalComponent,
		WebglMaterialsVariationsToonComponent,
		WebglMaterialsVideoComponent,
		WebglMaterialsVideoWebcamComponent,
		WebglMaterialsWireframeComponent,
		WebglMathObbComponent,
		WebglMathOrientationTransformComponent,
		WebglMirrorComponent,
		WebglModifierCurveComponent,
		WebglModifierCurveInstancedComponent,
		WebglModifierEdgesplitComponent,
		WebglModifierSimplifierComponent,
		WebglModifierTessellationComponent,
		WebglMorphtargetsComponent,
		WebglMorphtargetsHorseComponent,
		WebglMorphtargetsSphereComponent,
		WebglMultipleCanvasesCircleComponent,
		WebglMultipleCanvasesComplexComponent,
		WebglMultipleCanvasesGridComponent,
		WebglMultipleElementsComponent,
		WebglMultipleElementsTextComponent,
		WebglMultipleRenderersComponent,
		WebglMultipleScenesComparisonComponent,
		WebglMultipleViewsComponent,
		WebglPanoramaCubeComponent,
		WebglPanoramaEquirectangularComponent,
		WebglPerformanceComponent,
		WebglPerformanceStaticComponent,
		WebglPointsBillboardsComponent,
		WebglPointsDynamicComponent,
		WebglPointsSpritesComponent,
		WebglPointsWavesComponent,
		WebglRaycastSpriteComponent,
		WebglRaycastTextureComponent,
		WebglReadFloatBufferComponent,
		WebglRefractionComponent,
		WebglRttComponent,
		WebglSandboxComponent,
		WebglShaderComponent,
		WebglShaderLavaComponent,
		WebglShader2Component,
		WebglShadersOceanComponent,
		WebglShadersOcean2Component,
		WebglShadersSkyComponent,
		WebglShadersTonemappingComponent,
		WebglShadersVectorComponent,
		WebglShadingPhysicalComponent,
		WebglShadowContactComponent,
		WebglShadowmapComponent,
		WebglShadowmapPerformanceComponent,
		WebglShadowmapPointlightComponent,
		WebglShadowmapViewerComponent,
		WebglShadowmapVsmComponent,
		WebglShadowmeshComponent,
		WebglSkinningSimpleComponent,
		WebglSpritesComponent,
		WebglTestMemoryComponent,
		WebglTestMemory2Component,
		WebglTonemappingComponent,
		WebglTrailsComponent,
		WebglVideoKinectComponent,
		WebglVideoPanoramaEquirectangularComponent,
		WebglWaterComponent,
		WebglWaterFlowmapComponent,
		WebglLoaderNodesComponent,
		WebglMaterialsCompileComponent,
		WebglMaterialsEnvmapsHdrNodesComponent,
		WebglMaterialsEnvmapsPmremNodesComponent,
		WebglMaterialsNodesComponent,
		WebglPerformanceNodesComponent,
		WebglPostprocessingNodesComponent,
		WebglPostprocessingNodesPassComponent,
		WebglSpritesNodesComponent,
		WebglPostprocessingComponent,
		WebglPostprocessingD3lutComponent,
		WebglPostprocessingAdvancedComponent,
		WebglPostprocessingAfterimageComponent,
		WebglPostprocessingBackgroundsComponent,
		WebglPostprocessingCrossfadeComponent,
		WebglPostprocessingDofComponent,
		WebglPostprocessingDof2Component,
		WebglPostprocessingFxaaComponent,
		WebglPostprocessingGlitchComponent,
		WebglPostprocessingGodraysComponent,
		WebglPostprocessingRgbHalftoneComponent,
		WebglPostprocessingMaskingComponent,
		WebglPostprocessingSsaaComponent,
		WebglPostprocessingOutlineComponent,
		WebglPostprocessingPixelComponent,
		WebglPostprocessingProceduralComponent,
		WebglPostprocessingSaoComponent,
		WebglPostprocessingSmaaComponent,
		WebglPostprocessingSobelComponent,
		WebglPostprocessingSsaoComponent,
		WebglPostprocessingTaaComponent,
		WebglPostprocessingUnrealBloomComponent,
		WebglPostprocessingUnrealBloomSelectiveComponent,
		WebglBuffergeometryComponent,
		WebglBuffergeometryCompressionComponent,
		WebglBuffergeometryCustomAttributesParticlesComponent,
		WebglBuffergeometryDrawrangeComponent,
		WebglBuffergeometryGlbufferattributeComponent,
		WebglBuffergeometryIndexedComponent,
		WebglBuffergeometryInstancingComponent,
		WebglBuffergeometryInstancingBillboardsComponent,
		WebglBuffergeometryInstancingInterleavedComponent,
		WebglBuffergeometryLinesComponent,
		WebglBuffergeometryLinesIndexedComponent,
		WebglBuffergeometryPointsComponent,
		WebglBuffergeometryPointsInterleavedComponent,
		WebglBuffergeometryRawshaderComponent,
		WebglBuffergeometrySelectiveDrawComponent,
		WebglBuffergeometryUintComponent,
		WebglCustomAttributesComponent,
		WebglCustomAttributesLinesComponent,
		WebglCustomAttributesPointsComponent,
		WebglCustomAttributesPoints2Component,
		WebglCustomAttributesPoints3Component,
		WebglGpgpuBirdsComponent,
		WebglGpgpuBirdsGltfComponent,
		WebglGpgpuWaterComponent,
		WebglGpgpuProtoplanetComponent,
		WebglInstancingModifiedComponent,
		WebglLightningstrikeComponent,
		WebglMaterialsModifiedComponent,
		WebglRaymarchingReflectComponent,
		WebglShadowmapCsmComponent,
		WebglShadowmapPcssComponent,
		WebglSimpleGiComponent,
		WebglTiledForwardComponent,
		WebglWorkerOffscreencanvasComponent,
		Webgl2BuffergeometryAttributesIntegerComponent,
		Webgl2MaterialsTexture2darrayComponent,
		Webgl2MaterialsTexture3dComponent,
		Webgl2MultisampledRenderbuffersComponent,
		Webgl2VolumeCloudComponent,
		Webgl2VolumeInstancingComponent,
		Webgl2VolumePerlinComponent,
		WebgpuSandboxComponent,
		WebgpuRttComponent,
		WebgpuComputeComponent,
		WebaudioOrientationComponent,
		WebaudioSandboxComponent,
		WebaudioTimingComponent,
		WebaudioVisualizerComponent,
		WebxrArConesComponent,
		WebxrArHittestComponent,
		WebxrArPaintComponent,
		WebxrVrBallshooterComponent,
		WebxrVrCubesComponent,
		WebxrVrDraggingComponent,
		WebxrVrHandinputComponent,
		WebxrVrHandinputCubesComponent,
		WebxrVrHandinputProfilesComponent,
		WebxrVrHapticsComponent,
		WebxrVrLorenzattractorComponent,
		WebxrVrPanoramaComponent,
		WebxrVrPanoramaDepthComponent,
		WebxrVrPaintComponent,
		WebxrVrRollercoasterComponent,
		WebxrVrSandboxComponent,
		WebxrVrSculptComponent,
		WebxrVrVideoComponent,
		GamesFpsComponent,
		PhysicsAmmoBreakComponent,
		PhysicsAmmoClothComponent,
		PhysicsAmmoInstancingComponent,
		PhysicsAmmoRopeComponent,
		PhysicsAmmoTerrainComponent,
		PhysicsAmmoVolumeComponent,
		MiscAnimationGroupsComponent,
		MiscAnimationKeysComponent,
		MiscBoxselectionComponent,
		MiscControlsDeviceorientationComponent,
		MiscControlsDragComponent,
		MiscControlsFlyComponent,
		MiscControlsMapComponent,
		MiscControlsOrbitComponent,
		MiscControlsPointerlockComponent,
		MiscControlsTrackballComponent,
		MiscControlsTransformComponent,
		MiscExporterColladaComponent,
		MiscExporterDracoComponent,
		MiscExporterGltfComponent,
		MiscExporterObjComponent,
		MiscExporterPlyComponent,
		MiscExporterStlComponent,
		MiscLegacyComponent,
		MiscLookatComponent,
		Css2dLabelComponent,
		Css3dMoleculesComponent,
		Css3dOrthographicComponent,
		Css3dPanoramaComponent,
		Css3dPanoramaDeviceorientationComponent,
		Css3dPeriodictableComponent,
		Css3dSandboxComponent,
		Css3dSpritesComponent,
		Css3dYoutubeComponent,
		SvgLinesComponent,
		SvgSandboxComponent,
		WebglFurnaceTestComponent,
		WebglPmremTestComponent,
		MiscUvTestsComponent,
		WebglMirrorNodesComponent,
		WebglShadowmapProgressiveComponent,
		Webgl2MaterialsTexture3dPartialupdateComponent,
		Webgl2MultipleRendertargetsComponent,
		WebglPostprocessingSsrComponent,
		WebglPostprocessingSsrrComponent,
		PhysicsOimoInstancingComponent,
		WebglLoaderIfcComponent,
		WebglLoaderGltfTransmissionComponent,
		Webgl2RendertargetTexture2darrayComponent,
		WebglPortalComponent,
		MiscExporterUsdzComponent,
		WebglMaterialsStandardNodesComponent,
		NgxMaterialComponent,
		NgxGeometryComponent,
		NgxChartBarComponent,
		NgxChartLineComponent,
		NgxChartRadarComponent,
		NgxChartScatterComponent,
		NgxChartAreaComponent,
		NgxChartBubbleComponent,
		NgxChartPolarComponent,
		NgxChartMixedComponent,
		WebgpuInstanceUniformComponent,
		WebgpuLightsCustomComponent,
		WebgpuLightsSelectiveComponent,
		WebgpuMaterialsComponent,
		WebxrArLightingComponent,
		WebxrVrHandinputPointerclickComponent,
		WebxrVrHandinputPointerdragComponent,
		WebxrVrHandinputPressbuttonComponent,
		WebxrVrLayersComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, HighlightModule, Ngx3JsModule],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {
				fullLibraryLoader: () => import('highlight.js'),
			},
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
