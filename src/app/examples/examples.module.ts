import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ngx3JsModule } from 'ngx3js';
import { Css2dLabelComponent } from './css2d-label/css2d-label.component';
import { Css3dMoleculesComponent } from './css3d-molecules/css3d-molecules.component';
import { Css3dOrthographicComponent } from './css3d-orthographic/css3d-orthographic.component';
import { Css3dPanoramaDeviceorientationComponent } from './css3d-panorama-deviceorientation/css3d-panorama-deviceorientation.component';
import { Css3dPanoramaComponent } from './css3d-panorama/css3d-panorama.component';
import { Css3dPeriodictableComponent } from './css3d-periodictable/css3d-periodictable.component';
import { Css3dSandboxComponent } from './css3d-sandbox/css3d-sandbox.component';
import { Css3dSpritesComponent } from './css3d-sprites/css3d-sprites.component';
import { Css3dYoutubeComponent } from './css3d-youtube/css3d-youtube.component';
import { ExamplesRoutingModule } from './examples-routing.module';
import { GamesFpsComponent } from './games-fps/games-fps.component';
import { MiscAnimationGroupsComponent } from './misc-animation-groups/misc-animation-groups.component';
import { MiscAnimationKeysComponent } from './misc-animation-keys/misc-animation-keys.component';
import { MiscBoxselectionComponent } from './misc-boxselection/misc-boxselection.component';
import { MiscControlsArcballComponent } from './misc-controls-arcball/misc-controls-arcball.component';
import { MiscControlsDeviceorientationComponent } from './misc-controls-deviceorientation/misc-controls-deviceorientation.component';
import { MiscControlsDragComponent } from './misc-controls-drag/misc-controls-drag.component';
import { MiscControlsFlyComponent } from './misc-controls-fly/misc-controls-fly.component';
import { MiscControlsMapComponent } from './misc-controls-map/misc-controls-map.component';
import { MiscControlsOrbitComponent } from './misc-controls-orbit/misc-controls-orbit.component';
import { MiscControlsPointerlockComponent } from './misc-controls-pointerlock/misc-controls-pointerlock.component';
import { MiscControlsTrackballComponent } from './misc-controls-trackball/misc-controls-trackball.component';
import { MiscControlsTransformComponent } from './misc-controls-transform/misc-controls-transform.component';
import { MiscExporterColladaComponent } from './misc-exporter-collada/misc-exporter-collada.component';
import { MiscExporterDracoComponent } from './misc-exporter-draco/misc-exporter-draco.component';
import { MiscExporterGltfComponent } from './misc-exporter-gltf/misc-exporter-gltf.component';
import { MiscExporterObjComponent } from './misc-exporter-obj/misc-exporter-obj.component';
import { MiscExporterPlyComponent } from './misc-exporter-ply/misc-exporter-ply.component';
import { MiscExporterStlComponent } from './misc-exporter-stl/misc-exporter-stl.component';
import { MiscExporterUsdzComponent } from './misc-exporter-usdz/misc-exporter-usdz.component';
import { MiscLegacyComponent } from './misc-legacy/misc-legacy.component';
import { MiscLookatComponent } from './misc-lookat/misc-lookat.component';
import { MiscUvTestsComponent } from './misc-uv-tests/misc-uv-tests.component';
import { NgxCameraComponent } from './ngx-camera/ngx-camera.component';
import { NgxChartAreaComponent } from './ngx-chart-area/ngx-chart-area.component';
import { NgxChartBarComponent } from './ngx-chart-bar/ngx-chart-bar.component';
import { NgxChartBubbleComponent } from './ngx-chart-bubble/ngx-chart-bubble.component';
import { NgxChartLineComponent } from './ngx-chart-line/ngx-chart-line.component';
import { NgxChartMixedComponent } from './ngx-chart-mixed/ngx-chart-mixed.component';
import { NgxChartPolarComponent } from './ngx-chart-polar/ngx-chart-polar.component';
import { NgxChartRadarComponent } from './ngx-chart-radar/ngx-chart-radar.component';
import { NgxChartScatterComponent } from './ngx-chart-scatter/ngx-chart-scatter.component';
import { NgxEffectComponent } from './ngx-effect/ngx-effect.component';
import { NgxControlComponent } from './ngx-control/ngx-control.component';
import { NgxCurveComponent } from './ngx-curve/ngx-curve.component';
import { NgxDirectivesComponent } from './ngx-directives/ngx-directives.component';
import { NgxFontComponent } from './ngx-font/ngx-font.component';
import { NgxGeometryComponent } from './ngx-geometry/ngx-geometry.component';
import { NgxHudComponent } from './ngx-hud/ngx-hud.component';
import { NgxLightComponent } from './ngx-light/ngx-light.component';
import { NgxMaterialComponent } from './ngx-material/ngx-material.component';
import { NgxPhysicsComponent } from './ngx-physics/ngx-physics.component';
import { NgxPipesComponent } from './ngx-pipes/ngx-pipes.component';
import { NgxPositionComponent } from './ngx-position/ngx-position.component';
import { NgxRendererComponent } from './ngx-renderer/ngx-renderer.component';
import { NgxRotationComponent } from './ngx-rotation/ngx-rotation.component';
import { NgxScaleComponent } from './ngx-scale/ngx-scale.component';
import { NgxSceneComponent } from './ngx-scene/ngx-scene.component';
import { PhysicsAmmoBreakComponent } from './physics-ammo-break/physics-ammo-break.component';
import { PhysicsAmmoClothComponent } from './physics-ammo-cloth/physics-ammo-cloth.component';
import { PhysicsAmmoInstancingComponent } from './physics-ammo-instancing/physics-ammo-instancing.component';
import { PhysicsAmmoRopeComponent } from './physics-ammo-rope/physics-ammo-rope.component';
import { PhysicsAmmoTerrainComponent } from './physics-ammo-terrain/physics-ammo-terrain.component';
import { PhysicsAmmoVolumeComponent } from './physics-ammo-volume/physics-ammo-volume.component';
import { PhysicsOimoInstancingComponent } from './physics-oimo-instancing/physics-oimo-instancing.component';
import { SvgLinesComponent } from './svg-lines/svg-lines.component';
import { SvgSandboxComponent } from './svg-sandbox/svg-sandbox.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { WebaudioOrientationComponent } from './webaudio-orientation/webaudio-orientation.component';
import { WebaudioSandboxComponent } from './webaudio-sandbox/webaudio-sandbox.component';
import { WebaudioTimingComponent } from './webaudio-timing/webaudio-timing.component';
import { WebaudioVisualizerComponent } from './webaudio-visualizer/webaudio-visualizer.component';
import { WebglAnimationClothComponent } from './webgl-animation-cloth/webgl-animation-cloth.component';
import { WebglAnimationKeyframesComponent } from './webgl-animation-keyframes/webgl-animation-keyframes.component';
import { WebglAnimationMultipleComponent } from './webgl-animation-multiple/webgl-animation-multiple.component';
import { WebglAnimationSkinningAdditiveBlendingComponent } from './webgl-animation-skinning-additive-blending/webgl-animation-skinning-additive-blending.component';
import { WebglAnimationSkinningBlendingComponent } from './webgl-animation-skinning-blending/webgl-animation-skinning-blending.component';
import { WebglAnimationSkinningMorphComponent } from './webgl-animation-skinning-morph/webgl-animation-skinning-morph.component';
import { WebglBuffergeometryCompressionComponent } from './webgl-buffergeometry-compression/webgl-buffergeometry-compression.component';
import { WebglBuffergeometryCustomAttributesParticlesComponent } from './webgl-buffergeometry-custom-attributes-particles/webgl-buffergeometry-custom-attributes-particles.component';
import { WebglBuffergeometryDrawrangeComponent } from './webgl-buffergeometry-drawrange/webgl-buffergeometry-drawrange.component';
import { WebglBuffergeometryGlbufferattributeComponent } from './webgl-buffergeometry-glbufferattribute/webgl-buffergeometry-glbufferattribute.component';
import { WebglBuffergeometryIndexedComponent } from './webgl-buffergeometry-indexed/webgl-buffergeometry-indexed.component';
import { WebglBuffergeometryInstancingBillboardsComponent } from './webgl-buffergeometry-instancing-billboards/webgl-buffergeometry-instancing-billboards.component';
import { WebglBuffergeometryInstancingInterleavedComponent } from './webgl-buffergeometry-instancing-interleaved/webgl-buffergeometry-instancing-interleaved.component';
import { WebglBuffergeometryInstancingComponent } from './webgl-buffergeometry-instancing/webgl-buffergeometry-instancing.component';
import { WebglBuffergeometryLinesIndexedComponent } from './webgl-buffergeometry-lines-indexed/webgl-buffergeometry-lines-indexed.component';
import { WebglBuffergeometryLinesComponent } from './webgl-buffergeometry-lines/webgl-buffergeometry-lines.component';
import { WebglBuffergeometryPointsInterleavedComponent } from './webgl-buffergeometry-points-interleaved/webgl-buffergeometry-points-interleaved.component';
import { WebglBuffergeometryPointsComponent } from './webgl-buffergeometry-points/webgl-buffergeometry-points.component';
import { WebglBuffergeometryRawshaderComponent } from './webgl-buffergeometry-rawshader/webgl-buffergeometry-rawshader.component';
import { WebglBuffergeometrySelectiveDrawComponent } from './webgl-buffergeometry-selective-draw/webgl-buffergeometry-selective-draw.component';
import { WebglBuffergeometryUintComponent } from './webgl-buffergeometry-uint/webgl-buffergeometry-uint.component';
import { WebglBuffergeometryComponent } from './webgl-buffergeometry/webgl-buffergeometry.component';
import { WebglCameraArrayComponent } from './webgl-camera-array/webgl-camera-array.component';
import { WebglCameraCinematicComponent } from './webgl-camera-cinematic/webgl-camera-cinematic.component';
import { WebglCameraLogarithmicdepthbufferComponent } from './webgl-camera-logarithmicdepthbuffer/webgl-camera-logarithmicdepthbuffer.component';
import { WebglCameraComponent } from './webgl-camera/webgl-camera.component';
import { WebglClippingAdvancedComponent } from './webgl-clipping-advanced/webgl-clipping-advanced.component';
import { WebglClippingIntersectionComponent } from './webgl-clipping-intersection/webgl-clipping-intersection.component';
import { WebglClippingStencilComponent } from './webgl-clipping-stencil/webgl-clipping-stencil.component';
import { WebglClippingComponent } from './webgl-clipping/webgl-clipping.component';
import { WebglCustomAttributesLinesComponent } from './webgl-custom-attributes-lines/webgl-custom-attributes-lines.component';
import { WebglCustomAttributesPointsComponent } from './webgl-custom-attributes-points/webgl-custom-attributes-points.component';
import { WebglCustomAttributesPoints2Component } from './webgl-custom-attributes-points2/webgl-custom-attributes-points2.component';
import { WebglCustomAttributesPoints3Component } from './webgl-custom-attributes-points3/webgl-custom-attributes-points3.component';
import { WebglCustomAttributesComponent } from './webgl-custom-attributes/webgl-custom-attributes.component';
import { WebglDecalsComponent } from './webgl-decals/webgl-decals.component';
import { WebglDepthTextureComponent } from './webgl-depth-texture/webgl-depth-texture.component';
import { WebglEffectsAnaglyphComponent } from './webgl-Effects-anaglyph/webgl-Effects-anaglyph.component';
import { WebglEffectsAsciiComponent } from './webgl-Effects-ascii/webgl-Effects-ascii.component';
import { WebglEffectsParallaxbarrierComponent } from './webgl-Effects-parallaxbarrier/webgl-Effects-parallaxbarrier.component';
import { WebglEffectsPeppersghostComponent } from './webgl-Effects-peppersghost/webgl-Effects-peppersghost.component';
import { WebglEffectsStereoComponent } from './webgl-Effects-stereo/webgl-Effects-stereo.component';
import { WebglFramebufferTextureComponent } from './webgl-framebuffer-texture/webgl-framebuffer-texture.component';
import { WebglFurnaceTestComponent } from './webgl-furnace-test/webgl-furnace-test.component';
import { WebglGeometriesParametricComponent } from './webgl-geometries-parametric/webgl-geometries-parametric.component';
import { WebglGeometriesComponent } from './webgl-geometries/webgl-geometries.component';
import { WebglGeometryColorsLookuptableComponent } from './webgl-geometry-colors-lookuptable/webgl-geometry-colors-lookuptable.component';
import { WebglGeometryColorsComponent } from './webgl-geometry-colors/webgl-geometry-colors.component';
import { WebglGeometryConvexComponent } from './webgl-geometry-convex/webgl-geometry-convex.component';
import { WebglGeometryCubeComponent } from './webgl-geometry-cube/webgl-geometry-cube.component';
import { WebglGeometryDynamicComponent } from './webgl-geometry-dynamic/webgl-geometry-dynamic.component';
import { WebglGeometryExtrudeShapesComponent } from './webgl-geometry-extrude-shapes/webgl-geometry-extrude-shapes.component';
import { WebglGeometryExtrudeShapes2Component } from './webgl-geometry-extrude-shapes2/webgl-geometry-extrude-shapes2.component';
import { WebglGeometryExtrudeSplinesComponent } from './webgl-geometry-extrude-splines/webgl-geometry-extrude-splines.component';
import { WebglGeometryHierarchyComponent } from './webgl-geometry-hierarchy/webgl-geometry-hierarchy.component';
import { WebglGeometryHierarchy2Component } from './webgl-geometry-hierarchy2/webgl-geometry-hierarchy2.component';
import { WebglGeometryMinecraftAoComponent } from './webgl-geometry-minecraft-ao/webgl-geometry-minecraft-ao.component';
import { WebglGeometryMinecraftComponent } from './webgl-geometry-minecraft/webgl-geometry-minecraft.component';
import { WebglGeometryNormalsComponent } from './webgl-geometry-normals/webgl-geometry-normals.component';
import { WebglGeometryNurbsComponent } from './webgl-geometry-nurbs/webgl-geometry-nurbs.component';
import { WebglGeometryShapesComponent } from './webgl-geometry-shapes/webgl-geometry-shapes.component';
import { WebglGeometrySplineEditorComponent } from './webgl-geometry-spline-editor/webgl-geometry-spline-editor.component';
import { WebglGeometryTeapotComponent } from './webgl-geometry-teapot/webgl-geometry-teapot.component';
import { WebglGeometryTerrainFogComponent } from './webgl-geometry-terrain-fog/webgl-geometry-terrain-fog.component';
import { WebglGeometryTerrainRaycastComponent } from './webgl-geometry-terrain-raycast/webgl-geometry-terrain-raycast.component';
import { WebglGeometryTerrainComponent } from './webgl-geometry-terrain/webgl-geometry-terrain.component';
import { WebglGeometryTextShapesComponent } from './webgl-geometry-text-shapes/webgl-geometry-text-shapes.component';
import { WebglGeometryTextStrokeComponent } from './webgl-geometry-text-stroke/webgl-geometry-text-stroke.component';
import { WebglGeometryTextComponent } from './webgl-geometry-text/webgl-geometry-text.component';
import { WebglGpgpuBirdsGltfComponent } from './webgl-gpgpu-birds-gltf/webgl-gpgpu-birds-gltf.component';
import { WebglGpgpuBirdsComponent } from './webgl-gpgpu-birds/webgl-gpgpu-birds.component';
import { WebglGpgpuProtoplanetComponent } from './webgl-gpgpu-protoplanet/webgl-gpgpu-protoplanet.component';
import { WebglGpgpuWaterComponent } from './webgl-gpgpu-water/webgl-gpgpu-water.component';
import { WebglHelpersComponent } from './webgl-helpers/webgl-helpers.component';
import { WebglInstancingDynamicComponent } from './webgl-instancing-dynamic/webgl-instancing-dynamic.component';
import { WebglInstancingModifiedComponent } from './webgl-instancing-modified/webgl-instancing-modified.component';
import { WebglInstancingPerformanceComponent } from './webgl-instancing-performance/webgl-instancing-performance.component';
import { WebglInstancingRaycastComponent } from './webgl-instancing-raycast/webgl-instancing-raycast.component';
import { WebglInstancingScatterComponent } from './webgl-instancing-scatter/webgl-instancing-scatter.component';
import { WebglInteractiveBuffergeometryComponent } from './webgl-interactive-buffergeometry/webgl-interactive-buffergeometry.component';
import { WebglInteractiveCubesGpuComponent } from './webgl-interactive-cubes-gpu/webgl-interactive-cubes-gpu.component';
import { WebglInteractiveCubesOrthoComponent } from './webgl-interactive-cubes-ortho/webgl-interactive-cubes-ortho.component';
import { WebglInteractiveCubesComponent } from './webgl-interactive-cubes/webgl-interactive-cubes.component';
import { WebglInteractiveLinesComponent } from './webgl-interactive-lines/webgl-interactive-lines.component';
import { WebglInteractivePointsComponent } from './webgl-interactive-points/webgl-interactive-points.component';
import { WebglInteractiveRaycastingPointsComponent } from './webgl-interactive-raycasting-points/webgl-interactive-raycasting-points.component';
import { WebglInteractiveVoxelpainterComponent } from './webgl-interactive-voxelpainter/webgl-interactive-voxelpainter.component';
import { WebglLayersComponent } from './webgl-layers/webgl-layers.component';
import { WebglLensflaresComponent } from './webgl-lensflares/webgl-lensflares.component';
import { WebglLightningstrikeComponent } from './webgl-lightningstrike/webgl-lightningstrike.component';
import { WebglLightprobeCubecameraComponent } from './webgl-lightprobe-cubecamera/webgl-lightprobe-cubecamera.component';
import { WebglLightprobeComponent } from './webgl-lightprobe/webgl-lightprobe.component';
import { WebglLightsHemisphereComponent } from './webgl-lights-hemisphere/webgl-lights-hemisphere.component';
import { WebglLightsPhysicalComponent } from './webgl-lights-physical/webgl-lights-physical.component';
import { WebglLightsPointlightsComponent } from './webgl-lights-pointlights/webgl-lights-pointlights.component';
import { WebglLightsPointlights2Component } from './webgl-lights-pointlights2/webgl-lights-pointlights2.component';
import { WebglLightsRectarealightComponent } from './webgl-lights-rectarealight/webgl-lights-rectarealight.component';
import { WebglLightsSpotlightComponent } from './webgl-lights-spotlight/webgl-lights-spotlight.component';
import { WebglLightsSpotlightsComponent } from './webgl-lights-spotlights/webgl-lights-spotlights.component';
import { WebglLinesColorsComponent } from './webgl-lines-colors/webgl-lines-colors.component';
import { WebglLinesDashedComponent } from './webgl-lines-dashed/webgl-lines-dashed.component';
import { WebglLinesFatWireframeComponent } from './webgl-lines-fat-wireframe/webgl-lines-fat-wireframe.component';
import { WebglLinesFatComponent } from './webgl-lines-fat/webgl-lines-fat.component';
import { WebglLinesSphereComponent } from './webgl-lines-sphere/webgl-lines-sphere.component';
import { WebglLoaderAmfComponent } from './webgl-loader-amf/webgl-loader-amf.component';
import { WebglLoaderAssimpComponent } from './webgl-loader-assimp/webgl-loader-assimp.component';
import { WebglLoaderBvhComponent } from './webgl-loader-bvh/webgl-loader-bvh.component';
import { WebglLoaderColladaKinematicsComponent } from './webgl-loader-collada-kinematics/webgl-loader-collada-kinematics.component';
import { WebglLoaderColladaSkinningComponent } from './webgl-loader-collada-skinning/webgl-loader-collada-skinning.component';
import { WebglLoaderColladaComponent } from './webgl-loader-collada/webgl-loader-collada.component';
import { WebglLoaderDm3Component } from './webgl-loader-dm3/webgl-loader-dm3.component';
import { WebglLoaderDracoComponent } from './webgl-loader-draco/webgl-loader-draco.component';
import { WebglLoaderDs3Component } from './webgl-loader-ds3/webgl-loader-ds3.component';
import { WebglLoaderFbxNurbsComponent } from './webgl-loader-fbx-nurbs/webgl-loader-fbx-nurbs.component';
import { WebglLoaderFbxComponent } from './webgl-loader-fbx/webgl-loader-fbx.component';
import { WebglLoaderGcodeComponent } from './webgl-loader-gcode/webgl-loader-gcode.component';
import { WebglLoaderGltfCompressedComponent } from './webgl-loader-gltf-compressed/webgl-loader-gltf-compressed.component';
import { WebglLoaderGltfExtensionsComponent } from './webgl-loader-gltf-extensions/webgl-loader-gltf-extensions.component';
import { WebglLoaderGltfSheenComponent } from './webgl-loader-gltf-sheen/webgl-loader-gltf-sheen.component';
import { WebglLoaderGltfTransmissionComponent } from './webgl-loader-gltf-transmission/webgl-loader-gltf-transmission.component';
import { WebglLoaderGltfVariantsComponent } from './webgl-loader-gltf-variants/webgl-loader-gltf-variants.component';
import { WebglLoaderGltfComponent } from './webgl-loader-gltf/webgl-loader-gltf.component';
import { WebglLoaderIfcComponent } from './webgl-loader-ifc/webgl-loader-ifc.component';
import { WebglLoaderImagebitmapComponent } from './webgl-loader-imagebitmap/webgl-loader-imagebitmap.component';
import { WebglLoaderKmzComponent } from './webgl-loader-kmz/webgl-loader-kmz.component';
import { WebglLoaderLdrawComponent } from './webgl-loader-ldraw/webgl-loader-ldraw.component';
import { WebglLoaderLwoComponent } from './webgl-loader-lwo/webgl-loader-lwo.component';
import { WebglLoaderMd2ControlComponent } from './webgl-loader-md2-control/webgl-loader-md2-control.component';
import { WebglLoaderMd2Component } from './webgl-loader-md2/webgl-loader-md2.component';
import { WebglLoaderMddComponent } from './webgl-loader-mdd/webgl-loader-mdd.component';
import { WebglLoaderMf3MaterialsComponent } from './webgl-loader-mf3-materials/webgl-loader-mf3-materials.component';
import { WebglLoaderMf3Component } from './webgl-loader-mf3/webgl-loader-mf3.component';
import { WebglLoaderMmdAudioComponent } from './webgl-loader-mmd-audio/webgl-loader-mmd-audio.component';
import { WebglLoaderMmdPoseComponent } from './webgl-loader-mmd-pose/webgl-loader-mmd-pose.component';
import { WebglLoaderMmdComponent } from './webgl-loader-mmd/webgl-loader-mmd.component';
import { WebglLoaderNodesComponent } from './webgl-loader-nodes/webgl-loader-nodes.component';
import { WebglLoaderNrrdComponent } from './webgl-loader-nrrd/webgl-loader-nrrd.component';
import { WebglLoaderObjMtlComponent } from './webgl-loader-obj-mtl/webgl-loader-obj-mtl.component';
import { WebglLoaderObjComponent } from './webgl-loader-obj/webgl-loader-obj.component';
import { WebglLoaderPcdComponent } from './webgl-loader-pcd/webgl-loader-pcd.component';
import { WebglLoaderPdbComponent } from './webgl-loader-pdb/webgl-loader-pdb.component';
import { WebglLoaderPlyComponent } from './webgl-loader-ply/webgl-loader-ply.component';
import { WebglLoaderPrwmComponent } from './webgl-loader-prwm/webgl-loader-prwm.component';
import { WebglLoaderStlComponent } from './webgl-loader-stl/webgl-loader-stl.component';
import { WebglLoaderSvgComponent } from './webgl-loader-svg/webgl-loader-svg.component';
import { WebglLoaderTextureBasisComponent } from './webgl-loader-texture-basis/webgl-loader-texture-basis.component';
import { WebglLoaderTextureDdsComponent } from './webgl-loader-texture-dds/webgl-loader-texture-dds.component';
import { WebglLoaderTextureExrComponent } from './webgl-loader-texture-exr/webgl-loader-texture-exr.component';
import { WebglLoaderTextureHdrComponent } from './webgl-loader-texture-hdr/webgl-loader-texture-hdr.component';
import { WebglLoaderTextureKtxComponent } from './webgl-loader-texture-ktx/webgl-loader-texture-ktx.component';
import { WebglLoaderTextureKtx2Component } from './webgl-loader-texture-ktx2/webgl-loader-texture-ktx2.component';
import { WebglLoaderTextureLottieComponent } from './webgl-loader-texture-lottie/webgl-loader-texture-lottie.component';
import { WebglLoaderTexturePvrtcComponent } from './webgl-loader-texture-pvrtc/webgl-loader-texture-pvrtc.component';
import { WebglLoaderTextureRgbmComponent } from './webgl-loader-texture-rgbm/webgl-loader-texture-rgbm.component';
import { WebglLoaderTextureTgaComponent } from './webgl-loader-texture-tga/webgl-loader-texture-tga.component';
import { WebglLoaderTiltComponent } from './webgl-loader-tilt/webgl-loader-tilt.component';
import { WebglLoaderTtfComponent } from './webgl-loader-ttf/webgl-loader-ttf.component';
import { WebglLoaderVoxComponent } from './webgl-loader-vox/webgl-loader-vox.component';
import { WebglLoaderVrmComponent } from './webgl-loader-vrm/webgl-loader-vrm.component';
import { WebglLoaderVrmlComponent } from './webgl-loader-vrml/webgl-loader-vrml.component';
import { WebglLoaderVtkComponent } from './webgl-loader-vtk/webgl-loader-vtk.component';
import { WebglLoaderXComponent } from './webgl-loader-x/webgl-loader-x.component';
import { WebglLoaderXyzComponent } from './webgl-loader-xyz/webgl-loader-xyz.component';
import { WebglLodComponent } from './webgl-lod/webgl-lod.component';
import { WebglMarchingcubesComponent } from './webgl-marchingcubes/webgl-marchingcubes.component';
import { WebglMaterialsBlendingCustomComponent } from './webgl-materials-blending-custom/webgl-materials-blending-custom.component';
import { WebglMaterialsBlendingComponent } from './webgl-materials-blending/webgl-materials-blending.component';
import { WebglMaterialsBumpmapComponent } from './webgl-materials-bumpmap/webgl-materials-bumpmap.component';
import { WebglMaterialsCarComponent } from './webgl-materials-car/webgl-materials-car.component';
import { WebglMaterialsChannelsComponent } from './webgl-materials-channels/webgl-materials-channels.component';
import { WebglMaterialsCompileComponent } from './webgl-materials-compile/webgl-materials-compile.component';
import { WebglMaterialsCubemapBallsReflectionComponent } from './webgl-materials-cubemap-balls-reflection/webgl-materials-cubemap-balls-reflection.component';
import { WebglMaterialsCubemapBallsRefractionComponent } from './webgl-materials-cubemap-balls-refraction/webgl-materials-cubemap-balls-refraction.component';
import { WebglMaterialsCubemapDynamicComponent } from './webgl-materials-cubemap-dynamic/webgl-materials-cubemap-dynamic.component';
import { WebglMaterialsCubemapMipmapsComponent } from './webgl-materials-cubemap-mipmaps/webgl-materials-cubemap-mipmaps.component';
import { WebglMaterialsCubemapRefractionComponent } from './webgl-materials-cubemap-refraction/webgl-materials-cubemap-refraction.component';
import { WebglMaterialsCubemapComponent } from './webgl-materials-cubemap/webgl-materials-cubemap.component';
import { WebglMaterialsCurvatureComponent } from './webgl-materials-curvature/webgl-materials-curvature.component';
import { WebglMaterialsDisplacementmapComponent } from './webgl-materials-displacementmap/webgl-materials-displacementmap.component';
import { WebglMaterialsEnvmapsExrComponent } from './webgl-materials-envmaps-exr/webgl-materials-envmaps-exr.component';
import { WebglMaterialsEnvmapsHdrNodesComponent } from './webgl-materials-envmaps-hdr-nodes/webgl-materials-envmaps-hdr-nodes.component';
import { WebglMaterialsEnvmapsHdrComponent } from './webgl-materials-envmaps-hdr/webgl-materials-envmaps-hdr.component';
import { WebglMaterialsEnvmapsParallaxComponent } from './webgl-materials-envmaps-parallax/webgl-materials-envmaps-parallax.component';
import { WebglMaterialsEnvmapsPmremNodesComponent } from './webgl-materials-envmaps-pmrem-nodes/webgl-materials-envmaps-pmrem-nodes.component';
import { WebglMaterialsEnvmapsComponent } from './webgl-materials-envmaps/webgl-materials-envmaps.component';
import { WebglMaterialsGrassComponent } from './webgl-materials-grass/webgl-materials-grass.component';
import { WebglMaterialsInstanceUniformNodesComponent } from './webgl-materials-instance-uniform-nodes/webgl-materials-instance-uniform-nodes.component';
import { WebglMaterialsLightmapComponent } from './webgl-materials-lightmap/webgl-materials-lightmap.component';
import { WebglMaterialsMatcapComponent } from './webgl-materials-matcap/webgl-materials-matcap.component';
import { WebglMaterialsModifiedComponent } from './webgl-materials-modified/webgl-materials-modified.component';
import { WebglMaterialsNodesComponent } from './webgl-materials-nodes/webgl-materials-nodes.component';
import { WebglMaterialsNormalmapObjectSpaceComponent } from './webgl-materials-normalmap-object-space/webgl-materials-normalmap-object-space.component';
import { WebglMaterialsNormalmapComponent } from './webgl-materials-normalmap/webgl-materials-normalmap.component';
import { WebglMaterialsParallaxmapComponent } from './webgl-materials-parallaxmap/webgl-materials-parallaxmap.component';
import { WebglMaterialsPhysicalClearcoatComponent } from './webgl-materials-physical-clearcoat/webgl-materials-physical-clearcoat.component';
import { WebglMaterialsPhysicalReflectivityComponent } from './webgl-materials-physical-reflectivity/webgl-materials-physical-reflectivity.component';
import { WebglMaterialsPhysicalSheenComponent } from './webgl-materials-physical-sheen/webgl-materials-physical-sheen.component';
import { WebglMaterialsPhysicalTransmissionComponent } from './webgl-materials-physical-transmission/webgl-materials-physical-transmission.component';
import { WebglMaterialsShadersFresnelComponent } from './webgl-materials-shaders-fresnel/webgl-materials-shaders-fresnel.component';
import { WebglMaterialsStandardNodesComponent } from './webgl-materials-standard-nodes/webgl-materials-standard-nodes.component';
import { WebglMaterialsStandardComponent } from './webgl-materials-standard/webgl-materials-standard.component';
import { WebglMaterialsSubsurfaceScatteringComponent } from './webgl-materials-subsurface-scattering/webgl-materials-subsurface-scattering.component';
import { WebglMaterialsTextureAnisotropyComponent } from './webgl-materials-texture-anisotropy/webgl-materials-texture-anisotropy.component';
import { WebglMaterialsTextureCanvasComponent } from './webgl-materials-texture-canvas/webgl-materials-texture-canvas.component';
import { WebglMaterialsTextureFiltersComponent } from './webgl-materials-texture-filters/webgl-materials-texture-filters.component';
import { WebglMaterialsTextureManualmipmapComponent } from './webgl-materials-texture-manualmipmap/webgl-materials-texture-manualmipmap.component';
import { WebglMaterialsTexturePartialupdateComponent } from './webgl-materials-texture-partialupdate/webgl-materials-texture-partialupdate.component';
import { WebglMaterialsTextureRotationComponent } from './webgl-materials-texture-rotation/webgl-materials-texture-rotation.component';
import { WebglMaterialsVariationsBasicComponent } from './webgl-materials-variations-basic/webgl-materials-variations-basic.component';
import { WebglMaterialsVariationsLambertComponent } from './webgl-materials-variations-lambert/webgl-materials-variations-lambert.component';
import { WebglMaterialsVariationsPhongComponent } from './webgl-materials-variations-phong/webgl-materials-variations-phong.component';
import { WebglMaterialsVariationsPhysicalComponent } from './webgl-materials-variations-physical/webgl-materials-variations-physical.component';
import { WebglMaterialsVariationsStandardComponent } from './webgl-materials-variations-standard/webgl-materials-variations-standard.component';
import { WebglMaterialsVariationsToonComponent } from './webgl-materials-variations-toon/webgl-materials-variations-toon.component';
import { WebglMaterialsVideoWebcamComponent } from './webgl-materials-video-webcam/webgl-materials-video-webcam.component';
import { WebglMaterialsVideoComponent } from './webgl-materials-video/webgl-materials-video.component';
import { WebglMaterialsWireframeComponent } from './webgl-materials-wireframe/webgl-materials-wireframe.component';
import { WebglMaterialsComponent } from './webgl-materials/webgl-materials.component';
import { WebglMathObbComponent } from './webgl-math-obb/webgl-math-obb.component';
import { WebglMathOrientationTransformComponent } from './webgl-math-orientation-transform/webgl-math-orientation-transform.component';
import { WebglMirrorNodesComponent } from './webgl-mirror-nodes/webgl-mirror-nodes.component';
import { WebglMirrorComponent } from './webgl-mirror/webgl-mirror.component';
import { WebglModifierCurveInstancedComponent } from './webgl-modifier-curve-instanced/webgl-modifier-curve-instanced.component';
import { WebglModifierCurveComponent } from './webgl-modifier-curve/webgl-modifier-curve.component';
import { WebglModifierEdgesplitComponent } from './webgl-modifier-edgesplit/webgl-modifier-edgesplit.component';
import { WebglModifierSimplifierComponent } from './webgl-modifier-simplifier/webgl-modifier-simplifier.component';
import { WebglModifierTessellationComponent } from './webgl-modifier-tessellation/webgl-modifier-tessellation.component';
import { WebglMorphtargetsFaceComponent } from './webgl-morphtargets-face/webgl-morphtargets-face.component';
import { WebglMorphtargetsHorseComponent } from './webgl-morphtargets-horse/webgl-morphtargets-horse.component';
import { WebglMorphtargetsSphereComponent } from './webgl-morphtargets-sphere/webgl-morphtargets-sphere.component';
import { WebglMorphtargetsComponent } from './webgl-morphtargets/webgl-morphtargets.component';
import { WebglMultipleCanvasesCircleComponent } from './webgl-multiple-canvases-circle/webgl-multiple-canvases-circle.component';
import { WebglMultipleCanvasesComplexComponent } from './webgl-multiple-canvases-complex/webgl-multiple-canvases-complex.component';
import { WebglMultipleCanvasesGridComponent } from './webgl-multiple-canvases-grid/webgl-multiple-canvases-grid.component';
import { WebglMultipleElementsTextComponent } from './webgl-multiple-elements-text/webgl-multiple-elements-text.component';
import { WebglMultipleElementsComponent } from './webgl-multiple-elements/webgl-multiple-elements.component';
import { WebglMultipleRenderersComponent } from './webgl-multiple-renderers/webgl-multiple-renderers.component';
import { WebglMultipleScenesComparisonComponent } from './webgl-multiple-scenes-comparison/webgl-multiple-scenes-comparison.component';
import { WebglMultipleViewsComponent } from './webgl-multiple-views/webgl-multiple-views.component';
import { WebglPanoramaCubeComponent } from './webgl-panorama-cube/webgl-panorama-cube.component';
import { WebglPanoramaEquirectangularComponent } from './webgl-panorama-equirectangular/webgl-panorama-equirectangular.component';
import { WebglPerformanceNodesComponent } from './webgl-performance-nodes/webgl-performance-nodes.component';
import { WebglPerformanceStaticComponent } from './webgl-performance-static/webgl-performance-static.component';
import { WebglPerformanceComponent } from './webgl-performance/webgl-performance.component';
import { WebglPmremTestComponent } from './webgl-pmrem-test/webgl-pmrem-test.component';
import { WebglPointsBillboardsComponent } from './webgl-points-billboards/webgl-points-billboards.component';
import { WebglPointsDynamicComponent } from './webgl-points-dynamic/webgl-points-dynamic.component';
import { WebglPointsNodesComponent } from './webgl-points-nodes/webgl-points-nodes.component';
import { WebglPointsSpritesComponent } from './webgl-points-sprites/webgl-points-sprites.component';
import { WebglPointsWavesComponent } from './webgl-points-waves/webgl-points-waves.component';
import { WebglPortalComponent } from './webgl-portal/webgl-portal.component';
import { WebglPostprocessingAdvancedComponent } from './webgl-postprocessing-advanced/webgl-postprocessing-advanced.component';
import { WebglPostprocessingAfterimageComponent } from './webgl-postprocessing-afterimage/webgl-postprocessing-afterimage.component';
import { WebglPostprocessingBackgroundsComponent } from './webgl-postprocessing-backgrounds/webgl-postprocessing-backgrounds.component';
import { WebglPostprocessingCrossfadeComponent } from './webgl-postprocessing-crossfade/webgl-postprocessing-crossfade.component';
import { WebglPostprocessingD3lutComponent } from './webgl-postprocessing-d3lut/webgl-postprocessing-d3lut.component';
import { WebglPostprocessingDofComponent } from './webgl-postprocessing-dof/webgl-postprocessing-dof.component';
import { WebglPostprocessingDof2Component } from './webgl-postprocessing-dof2/webgl-postprocessing-dof2.component';
import { WebglPostprocessingFxaaComponent } from './webgl-postprocessing-fxaa/webgl-postprocessing-fxaa.component';
import { WebglPostprocessingGlitchComponent } from './webgl-postprocessing-glitch/webgl-postprocessing-glitch.component';
import { WebglPostprocessingGodraysComponent } from './webgl-postprocessing-godrays/webgl-postprocessing-godrays.component';
import { WebglPostprocessingMaskingComponent } from './webgl-postprocessing-masking/webgl-postprocessing-masking.component';
import { WebglPostprocessingNodesPassComponent } from './webgl-postprocessing-nodes-pass/webgl-postprocessing-nodes-pass.component';
import { WebglPostprocessingNodesComponent } from './webgl-postprocessing-nodes/webgl-postprocessing-nodes.component';
import { WebglPostprocessingOutlineComponent } from './webgl-postprocessing-outline/webgl-postprocessing-outline.component';
import { WebglPostprocessingPixelComponent } from './webgl-postprocessing-pixel/webgl-postprocessing-pixel.component';
import { WebglPostprocessingProceduralComponent } from './webgl-postprocessing-procedural/webgl-postprocessing-procedural.component';
import { WebglPostprocessingRgbHalftoneComponent } from './webgl-postprocessing-rgb-halftone/webgl-postprocessing-rgb-halftone.component';
import { WebglPostprocessingSaoComponent } from './webgl-postprocessing-sao/webgl-postprocessing-sao.component';
import { WebglPostprocessingSmaaComponent } from './webgl-postprocessing-smaa/webgl-postprocessing-smaa.component';
import { WebglPostprocessingSobelComponent } from './webgl-postprocessing-sobel/webgl-postprocessing-sobel.component';
import { WebglPostprocessingSsaaComponent } from './webgl-postprocessing-ssaa/webgl-postprocessing-ssaa.component';
import { WebglPostprocessingSsaoComponent } from './webgl-postprocessing-ssao/webgl-postprocessing-ssao.component';
import { WebglPostprocessingSsrComponent } from './webgl-postprocessing-ssr/webgl-postprocessing-ssr.component';
import { WebglPostprocessingSsrrComponent } from './webgl-postprocessing-ssrr/webgl-postprocessing-ssrr.component';
import { WebglPostprocessingTaaComponent } from './webgl-postprocessing-taa/webgl-postprocessing-taa.component';
import { WebglPostprocessingUnrealBloomSelectiveComponent } from './webgl-postprocessing-unreal-bloom-selective/webgl-postprocessing-unreal-bloom-selective.component';
import { WebglPostprocessingUnrealBloomComponent } from './webgl-postprocessing-unreal-bloom/webgl-postprocessing-unreal-bloom.component';
import { WebglPostprocessingComponent } from './webgl-postprocessing/webgl-postprocessing.component';
import { WebglRaycastSpriteComponent } from './webgl-raycast-sprite/webgl-raycast-sprite.component';
import { WebglRaycastTextureComponent } from './webgl-raycast-texture/webgl-raycast-texture.component';
import { WebglRaymarchingReflectComponent } from './webgl-raymarching-reflect/webgl-raymarching-reflect.component';
import { WebglReadFloatBufferComponent } from './webgl-read-float-buffer/webgl-read-float-buffer.component';
import { WebglRefractionComponent } from './webgl-refraction/webgl-refraction.component';
import { WebglRttComponent } from './webgl-rtt/webgl-rtt.component';
import { WebglSandboxComponent } from './webgl-sandbox/webgl-sandbox.component';
import { WebglShaderLavaComponent } from './webgl-shader-lava/webgl-shader-lava.component';
import { WebglShaderComponent } from './webgl-shader/webgl-shader.component';
import { WebglShader2Component } from './webgl-shader2/webgl-shader2.component';
import { WebglShadersOceanComponent } from './webgl-shaders-ocean/webgl-shaders-ocean.component';
import { WebglShadersOcean2Component } from './webgl-shaders-ocean2/webgl-shaders-ocean2.component';
import { WebglShadersSkyComponent } from './webgl-shaders-sky/webgl-shaders-sky.component';
import { WebglShadersTonemappingComponent } from './webgl-shaders-tonemapping/webgl-shaders-tonemapping.component';
import { WebglShadersVectorComponent } from './webgl-shaders-vector/webgl-shaders-vector.component';
import { WebglShadingPhysicalComponent } from './webgl-shading-physical/webgl-shading-physical.component';
import { WebglShadowContactComponent } from './webgl-shadow-contact/webgl-shadow-contact.component';
import { WebglShadowmapCsmComponent } from './webgl-shadowmap-csm/webgl-shadowmap-csm.component';
import { WebglShadowmapPcssComponent } from './webgl-shadowmap-pcss/webgl-shadowmap-pcss.component';
import { WebglShadowmapPerformanceComponent } from './webgl-shadowmap-performance/webgl-shadowmap-performance.component';
import { WebglShadowmapPointlightComponent } from './webgl-shadowmap-pointlight/webgl-shadowmap-pointlight.component';
import { WebglShadowmapProgressiveComponent } from './webgl-shadowmap-progressive/webgl-shadowmap-progressive.component';
import { WebglShadowmapViewerComponent } from './webgl-shadowmap-viewer/webgl-shadowmap-viewer.component';
import { WebglShadowmapVsmComponent } from './webgl-shadowmap-vsm/webgl-shadowmap-vsm.component';
import { WebglShadowmapComponent } from './webgl-shadowmap/webgl-shadowmap.component';
import { WebglShadowmeshComponent } from './webgl-shadowmesh/webgl-shadowmesh.component';
import { WebglSimpleGiComponent } from './webgl-simple-gi/webgl-simple-gi.component';
import { WebglSkinningSimpleComponent } from './webgl-skinning-simple/webgl-skinning-simple.component';
import { WebglSpritesNodesComponent } from './webgl-sprites-nodes/webgl-sprites-nodes.component';
import { WebglSpritesComponent } from './webgl-sprites/webgl-sprites.component';
import { WebglTestMemoryComponent } from './webgl-test-memory/webgl-test-memory.component';
import { WebglTestMemory2Component } from './webgl-test-memory2/webgl-test-memory2.component';
import { WebglTiledForwardComponent } from './webgl-tiled-forward/webgl-tiled-forward.component';
import { WebglTonemappingComponent } from './webgl-tonemapping/webgl-tonemapping.component';
import { WebglTrailsComponent } from './webgl-trails/webgl-trails.component';
import { WebglVideoKinectComponent } from './webgl-video-kinect/webgl-video-kinect.component';
import { WebglVideoPanoramaEquirectangularComponent } from './webgl-video-panorama-equirectangular/webgl-video-panorama-equirectangular.component';
import { WebglWaterFlowmapComponent } from './webgl-water-flowmap/webgl-water-flowmap.component';
import { WebglWaterComponent } from './webgl-water/webgl-water.component';
import { WebglWorkerOffscreencanvasComponent } from './webgl-worker-offscreencanvas/webgl-worker-offscreencanvas.component';
import { Webgl2BuffergeometryAttributesIntegerComponent } from './webgl2-buffergeometry-attributes-integer/webgl2-buffergeometry-attributes-integer.component';
import { Webgl2MaterialsTexture2darrayComponent } from './webgl2-materials-texture2darray/webgl2-materials-texture2darray.component';
import { Webgl2MaterialsTexture3dPartialupdateComponent } from './webgl2-materials-texture3d-partialupdate/webgl2-materials-texture3d-partialupdate.component';
import { Webgl2MaterialsTexture3dComponent } from './webgl2-materials-texture3d/webgl2-materials-texture3d.component';
import { Webgl2MultipleRendertargetsComponent } from './webgl2-multiple-rendertargets/webgl2-multiple-rendertargets.component';
import { Webgl2MultisampledRenderbuffersComponent } from './webgl2-multisampled-renderbuffers/webgl2-multisampled-renderbuffers.component';
import { Webgl2RendertargetTexture2darrayComponent } from './webgl2-rendertarget-texture2darray/webgl2-rendertarget-texture2darray.component';
import { Webgl2VolumeCloudComponent } from './webgl2-volume-cloud/webgl2-volume-cloud.component';
import { Webgl2VolumeInstancingComponent } from './webgl2-volume-instancing/webgl2-volume-instancing.component';
import { Webgl2VolumePerlinComponent } from './webgl2-volume-perlin/webgl2-volume-perlin.component';
import { WebgpuComputeComponent } from './webgpu-compute/webgpu-compute.component';
import { WebgpuInstanceUniformComponent } from './webgpu-instance-uniform/webgpu-instance-uniform.component';
import { WebgpuLightsCustomComponent } from './webgpu-lights-custom/webgpu-lights-custom.component';
import { WebgpuLightsSelectiveComponent } from './webgpu-lights-selective/webgpu-lights-selective.component';
import { WebgpuMaterialsComponent } from './webgpu-materials/webgpu-materials.component';
import { WebgpuRttComponent } from './webgpu-rtt/webgpu-rtt.component';
import { WebgpuSandboxComponent } from './webgpu-sandbox/webgpu-sandbox.component';
import { WebgpuSkinningComponent } from './webgpu-skinning/webgpu-skinning.component';
import { WebxrArConesComponent } from './webxr-ar-cones/webxr-ar-cones.component';
import { WebxrArHittestComponent } from './webxr-ar-hittest/webxr-ar-hittest.component';
import { WebxrArLightingComponent } from './webxr-ar-lighting/webxr-ar-lighting.component';
import { WebxrArPaintComponent } from './webxr-ar-paint/webxr-ar-paint.component';
import { WebxrVrBallshooterComponent } from './webxr-vr-ballshooter/webxr-vr-ballshooter.component';
import { WebxrVrCubesComponent } from './webxr-vr-cubes/webxr-vr-cubes.component';
import { WebxrVrDraggingComponent } from './webxr-vr-dragging/webxr-vr-dragging.component';
import { WebxrVrHandinputCubesComponent } from './webxr-vr-handinput-cubes/webxr-vr-handinput-cubes.component';
import { WebxrVrHandinputPointerclickComponent } from './webxr-vr-handinput-pointerclick/webxr-vr-handinput-pointerclick.component';
import { WebxrVrHandinputPointerdragComponent } from './webxr-vr-handinput-pointerdrag/webxr-vr-handinput-pointerdrag.component';
import { WebxrVrHandinputPressbuttonComponent } from './webxr-vr-handinput-pressbutton/webxr-vr-handinput-pressbutton.component';
import { WebxrVrHandinputProfilesComponent } from './webxr-vr-handinput-profiles/webxr-vr-handinput-profiles.component';
import { WebxrVrHandinputComponent } from './webxr-vr-handinput/webxr-vr-handinput.component';
import { WebxrVrHapticsComponent } from './webxr-vr-haptics/webxr-vr-haptics.component';
import { WebxrVrLayersComponent } from './webxr-vr-layers/webxr-vr-layers.component';
import { WebxrVrLorenzattractorComponent } from './webxr-vr-lorenzattractor/webxr-vr-lorenzattractor.component';
import { WebxrVrPaintComponent } from './webxr-vr-paint/webxr-vr-paint.component';
import { WebxrVrPanoramaDepthComponent } from './webxr-vr-panorama-depth/webxr-vr-panorama-depth.component';
import { WebxrVrPanoramaComponent } from './webxr-vr-panorama/webxr-vr-panorama.component';
import { WebxrVrRollercoasterComponent } from './webxr-vr-rollercoaster/webxr-vr-rollercoaster.component';
import { WebxrVrSandboxComponent } from './webxr-vr-sandbox/webxr-vr-sandbox.component';
import { WebxrVrSculptComponent } from './webxr-vr-sculpt/webxr-vr-sculpt.component';
import { WebxrVrVideoComponent } from './webxr-vr-video/webxr-vr-video.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { NgxMeshComponent } from './ngx-mesh/ngx-mesh.component';
@NgModule({
	declarations: [
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
		WebglLoaderGltfSheenComponent,
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
		WebglMaterialsInstanceUniformNodesComponent,
		WebglMathObbComponent,
		WebglMathOrientationTransformComponent,
		WebglMirrorComponent,
		WebglModifierCurveComponent,
		WebglModifierCurveInstancedComponent,
		WebglModifierEdgesplitComponent,
		WebglModifierSimplifierComponent,
		WebglModifierTessellationComponent,
		WebglMorphtargetsComponent,
		WebglMorphtargetsFaceComponent,
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
		WebglPointsNodesComponent,
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
		WebgpuSkinningComponent,
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
		MiscControlsArcballComponent,
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
		NgxFontComponent,
		NgxChartBarComponent,
		NgxChartLineComponent,
		NgxChartRadarComponent,
		NgxChartScatterComponent,
		NgxChartAreaComponent,
		NgxChartBubbleComponent,
		NgxChartPolarComponent,
		NgxChartMixedComponent,
		NgxHudComponent,
		NgxControlComponent,
		NgxLightComponent,
		NgxSceneComponent,
		NgxRendererComponent,
		NgxCameraComponent,
		NgxPipesComponent,
		NgxDirectivesComponent,
		NgxPhysicsComponent,
		NgxPositionComponent,
		NgxRotationComponent,
		NgxScaleComponent,
		NgxCurveComponent,
		NgxEffectComponent,
		NgxMeshComponent,
		HelloWorldComponent,
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
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		ExamplesRoutingModule,
		Ngx3JsModule,
	],
	providers: [],
	bootstrap: [],
})
export class ExamplesModule {}
