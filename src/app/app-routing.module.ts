import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsComponent } from './docs/docs.component';
import { ApiReadComponent } from './docs/api-read/api-read.component';

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
import { MiscLegacyComponent } from './examples/misc-legacy/misc-legacy.component';
import { MiscLookatComponent } from './examples/misc-lookat/misc-lookat.component';
import { MiscUvTestsComponent } from './examples/misc-uv-tests/misc-uv-tests.component';
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
import { WebglMaterialsStandardNodesComponent } from './examples/webgl-materials-standard-nodes/webgl-materials-standard-nodes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: 'docs',
    component: DocsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'manual/en/introduction/Creating-a-scene' },
      { path: '**', component: ApiReadComponent },
    ],
  },
  {
    path: 'examples',
    component: ExamplesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'webgl_animation_cloth' },
      {
        path: 'webgl_animation_cloth',
        component: WebglAnimationClothComponent,
      },
      {
        path: 'webgl_animation_keyframes',
        component: WebglAnimationKeyframesComponent,
      },
      {
        path: 'webgl_animation_skinning_blending',
        component: WebglAnimationSkinningBlendingComponent,
      },
      {
        path: 'webgl_animation_skinning_additive_blending',
        component: WebglAnimationSkinningAdditiveBlendingComponent,
      },
      {
        path: 'webgl_animation_skinning_morph',
        component: WebglAnimationSkinningMorphComponent,
      },
      {
        path: 'webgl_animation_multiple',
        component: WebglAnimationMultipleComponent,
      },
      { path: 'webgl_camera', component: WebglCameraComponent },
      { path: 'webgl_camera_array', component: WebglCameraArrayComponent },
      {
        path: 'webgl_camera_cinematic',
        component: WebglCameraCinematicComponent,
      },
      {
        path: 'webgl_camera_logarithmicdepthbuffer',
        component: WebglCameraLogarithmicdepthbufferComponent,
      },
      { path: 'webgl_clipping', component: WebglClippingComponent },
      {
        path: 'webgl_clipping_advanced',
        component: WebglClippingAdvancedComponent,
      },
      {
        path: 'webgl_clipping_intersection',
        component: WebglClippingIntersectionComponent,
      },
      {
        path: 'webgl_clipping_stencil',
        component: WebglClippingStencilComponent,
      },
      { path: 'webgl_decals', component: WebglDecalsComponent },
      { path: 'webgl_depth_texture', component: WebglDepthTextureComponent },
      {
        path: 'webgl_effects_anaglyph',
        component: WebglEffectsAnaglyphComponent,
      },
      { path: 'webgl_effects_ascii', component: WebglEffectsAsciiComponent },
      {
        path: 'webgl_effects_parallaxbarrier',
        component: WebglEffectsParallaxbarrierComponent,
      },
      {
        path: 'webgl_effects_peppersghost',
        component: WebglEffectsPeppersghostComponent,
      },
      { path: 'webgl_effects_stereo', component: WebglEffectsStereoComponent },
      {
        path: 'webgl_framebuffer_texture',
        component: WebglFramebufferTextureComponent,
      },
      { path: 'webgl_geometries', component: WebglGeometriesComponent },
      {
        path: 'webgl_geometries_parametric',
        component: WebglGeometriesParametricComponent,
      },
      {
        path: 'webgl_geometry_colors',
        component: WebglGeometryColorsComponent,
      },
      {
        path: 'webgl_geometry_colors_lookuptable',
        component: WebglGeometryColorsLookuptableComponent,
      },
      {
        path: 'webgl_geometry_convex',
        component: WebglGeometryConvexComponent,
      },
      { path: 'webgl_geometry_cube', component: WebglGeometryCubeComponent },
      {
        path: 'webgl_geometry_dynamic',
        component: WebglGeometryDynamicComponent,
      },
      {
        path: 'webgl_geometry_extrude_shapes',
        component: WebglGeometryExtrudeShapesComponent,
      },
      {
        path: 'webgl_geometry_extrude_shapes2',
        component: WebglGeometryExtrudeShapes2Component,
      },
      {
        path: 'webgl_geometry_extrude_splines',
        component: WebglGeometryExtrudeSplinesComponent,
      },
      {
        path: 'webgl_geometry_hierarchy',
        component: WebglGeometryHierarchyComponent,
      },
      {
        path: 'webgl_geometry_hierarchy2',
        component: WebglGeometryHierarchy2Component,
      },
      {
        path: 'webgl_geometry_minecraft',
        component: WebglGeometryMinecraftComponent,
      },
      {
        path: 'webgl_geometry_minecraft_ao',
        component: WebglGeometryMinecraftAoComponent,
      },
      {
        path: 'webgl_geometry_normals',
        component: WebglGeometryNormalsComponent,
      },
      { path: 'webgl_geometry_nurbs', component: WebglGeometryNurbsComponent },
      {
        path: 'webgl_geometry_shapes',
        component: WebglGeometryShapesComponent,
      },
      {
        path: 'webgl_geometry_spline_editor',
        component: WebglGeometrySplineEditorComponent,
      },
      {
        path: 'webgl_geometry_teapot',
        component: WebglGeometryTeapotComponent,
      },
      {
        path: 'webgl_geometry_terrain',
        component: WebglGeometryTerrainComponent,
      },
      {
        path: 'webgl_geometry_terrain_fog',
        component: WebglGeometryTerrainFogComponent,
      },
      {
        path: 'webgl_geometry_terrain_raycast',
        component: WebglGeometryTerrainRaycastComponent,
      },
      { path: 'webgl_geometry_text', component: WebglGeometryTextComponent },
      {
        path: 'webgl_geometry_text_shapes',
        component: WebglGeometryTextShapesComponent,
      },
      {
        path: 'webgl_geometry_text_stroke',
        component: WebglGeometryTextStrokeComponent,
      },
      { path: 'webgl_helpers', component: WebglHelpersComponent },
      {
        path: 'webgl_instancing_dynamic',
        component: WebglInstancingDynamicComponent,
      },
      {
        path: 'webgl_instancing_performance',
        component: WebglInstancingPerformanceComponent,
      },
      {
        path: 'webgl_instancing_raycast',
        component: WebglInstancingRaycastComponent,
      },
      {
        path: 'webgl_instancing_scatter',
        component: WebglInstancingScatterComponent,
      },
      {
        path: 'webgl_interactive_buffergeometry',
        component: WebglInteractiveBuffergeometryComponent,
      },
      {
        path: 'webgl_interactive_cubes',
        component: WebglInteractiveCubesComponent,
      },
      {
        path: 'webgl_interactive_cubes_gpu',
        component: WebglInteractiveCubesGpuComponent,
      },
      {
        path: 'webgl_interactive_cubes_ortho',
        component: WebglInteractiveCubesOrthoComponent,
      },
      {
        path: 'webgl_interactive_lines',
        component: WebglInteractiveLinesComponent,
      },
      {
        path: 'webgl_interactive_points',
        component: WebglInteractivePointsComponent,
      },
      {
        path: 'webgl_interactive_raycasting_points',
        component: WebglInteractiveRaycastingPointsComponent,
      },
      {
        path: 'webgl_interactive_voxelpainter',
        component: WebglInteractiveVoxelpainterComponent,
      },
      { path: 'webgl_layers', component: WebglLayersComponent },
      { path: 'webgl_lensflares', component: WebglLensflaresComponent },
      { path: 'webgl_lightprobe', component: WebglLightprobeComponent },
      {
        path: 'webgl_lightprobe_cubecamera',
        component: WebglLightprobeCubecameraComponent,
      },
      {
        path: 'webgl_lights_hemisphere',
        component: WebglLightsHemisphereComponent,
      },
      {
        path: 'webgl_lights_physical',
        component: WebglLightsPhysicalComponent,
      },
      {
        path: 'webgl_lights_pointlights',
        component: WebglLightsPointlightsComponent,
      },
      {
        path: 'webgl_lights_pointlights2',
        component: WebglLightsPointlights2Component,
      },
      {
        path: 'webgl_lights_spotlight',
        component: WebglLightsSpotlightComponent,
      },
      {
        path: 'webgl_lights_spotlights',
        component: WebglLightsSpotlightsComponent,
      },
      {
        path: 'webgl_lights_rectarealight',
        component: WebglLightsRectarealightComponent,
      },
      { path: 'webgl_lines_colors', component: WebglLinesColorsComponent },
      { path: 'webgl_lines_dashed', component: WebglLinesDashedComponent },
      { path: 'webgl_lines_fat', component: WebglLinesFatComponent },
      {
        path: 'webgl_lines_fat_wireframe',
        component: WebglLinesFatWireframeComponent,
      },
      { path: 'webgl_lines_sphere', component: WebglLinesSphereComponent },
      {
        path: 'webgl_materials_blending',
        component: WebglMaterialsBlendingComponent,
      },
      {
        path: 'webgl_materials_blending_custom',
        component: WebglMaterialsBlendingCustomComponent,
      },
      {
        path: 'webgl_materials_bumpmap',
        component: WebglMaterialsBumpmapComponent,
      },
      { path: 'webgl_materials_car', component: WebglMaterialsCarComponent },
      {
        path: 'webgl_materials_channels',
        component: WebglMaterialsChannelsComponent,
      },
      {
        path: 'webgl_materials_cubemap',
        component: WebglMaterialsCubemapComponent,
      },
      {
        path: 'webgl_materials_cubemap_balls_reflection',
        component: WebglMaterialsCubemapBallsReflectionComponent,
      },
      {
        path: 'webgl_materials_cubemap_balls_refraction',
        component: WebglMaterialsCubemapBallsRefractionComponent,
      },
      {
        path: 'webgl_materials_cubemap_dynamic',
        component: WebglMaterialsCubemapDynamicComponent,
      },
      {
        path: 'webgl_materials_cubemap_refraction',
        component: WebglMaterialsCubemapRefractionComponent,
      },
      {
        path: 'webgl_materials_cubemap_mipmaps',
        component: WebglMaterialsCubemapMipmapsComponent,
      },
      {
        path: 'webgl_materials_curvature',
        component: WebglMaterialsCurvatureComponent,
      },
      {
        path: 'webgl_materials_displacementmap',
        component: WebglMaterialsDisplacementmapComponent,
      },
      {
        path: 'webgl_materials_envmaps',
        component: WebglMaterialsEnvmapsComponent,
      },
      {
        path: 'webgl_materials_envmaps_exr',
        component: WebglMaterialsEnvmapsExrComponent,
      },
      {
        path: 'webgl_materials_envmaps_hdr',
        component: WebglMaterialsEnvmapsHdrComponent,
      },
      {
        path: 'webgl_materials_envmaps_parallax',
        component: WebglMaterialsEnvmapsParallaxComponent,
      },
      {
        path: 'webgl_materials_grass',
        component: WebglMaterialsGrassComponent,
      },
      {
        path: 'webgl_materials_lightmap',
        component: WebglMaterialsLightmapComponent,
      },
      {
        path: 'webgl_materials_matcap',
        component: WebglMaterialsMatcapComponent,
      },
      {
        path: 'webgl_materials_normalmap',
        component: WebglMaterialsNormalmapComponent,
      },
      {
        path: 'webgl_materials_normalmap_object_space',
        component: WebglMaterialsNormalmapObjectSpaceComponent,
      },
      {
        path: 'webgl_materials_parallaxmap',
        component: WebglMaterialsParallaxmapComponent,
      },
      {
        path: 'webgl_materials_physical_clearcoat',
        component: WebglMaterialsPhysicalClearcoatComponent,
      },
      {
        path: 'webgl_materials_physical_reflectivity',
        component: WebglMaterialsPhysicalReflectivityComponent,
      },
      {
        path: 'webgl_materials_physical_sheen',
        component: WebglMaterialsPhysicalSheenComponent,
      },
      {
        path: 'webgl_materials_physical_transmission',
        component: WebglMaterialsPhysicalTransmissionComponent,
      },
      {
        path: 'webgl_materials_shaders_fresnel',
        component: WebglMaterialsShadersFresnelComponent,
      },
      {
        path: 'webgl_materials_standard',
        component: WebglMaterialsStandardComponent,
      },
      {
        path: 'webgl_materials_subsurface_scattering',
        component: WebglMaterialsSubsurfaceScatteringComponent,
      },
      {
        path: 'webgl_materials_texture_anisotropy',
        component: WebglMaterialsTextureAnisotropyComponent,
      },
      {
        path: 'webgl_materials_texture_canvas',
        component: WebglMaterialsTextureCanvasComponent,
      },
      {
        path: 'webgl_materials_texture_filters',
        component: WebglMaterialsTextureFiltersComponent,
      },
      {
        path: 'webgl_materials_texture_manualmipmap',
        component: WebglMaterialsTextureManualmipmapComponent,
      },
      {
        path: 'webgl_materials_texture_partialupdate',
        component: WebglMaterialsTexturePartialupdateComponent,
      },
      {
        path: 'webgl_materials_texture_rotation',
        component: WebglMaterialsTextureRotationComponent,
      },
      {
        path: 'webgl_materials_variations_basic',
        component: WebglMaterialsVariationsBasicComponent,
      },
      {
        path: 'webgl_materials_variations_lambert',
        component: WebglMaterialsVariationsLambertComponent,
      },
      {
        path: 'webgl_materials_variations_phong',
        component: WebglMaterialsVariationsPhongComponent,
      },
      {
        path: 'webgl_materials_variations_standard',
        component: WebglMaterialsVariationsStandardComponent,
      },
      {
        path: 'webgl_materials_variations_physical',
        component: WebglMaterialsVariationsPhysicalComponent,
      },
      {
        path: 'webgl_materials_variations_toon',
        component: WebglMaterialsVariationsToonComponent,
      },
      {
        path: 'webgl_materials_video',
        component: WebglMaterialsVideoComponent,
      },
      {
        path: 'webgl_materials_video_webcam',
        component: WebglMaterialsVideoWebcamComponent,
      },
      {
        path: 'webgl_materials_wireframe',
        component: WebglMaterialsWireframeComponent,
      },
      { path: 'webgl_materials', component: WebglMaterialsComponent },
      { path: 'webgl_marchingcubes', component: WebglMarchingcubesComponent },
      { path: 'webgl_lod', component: WebglLodComponent },
      { path: 'webgl_loader_xyz', component: WebglLoaderXyzComponent },
      { path: 'webgl_loader_x', component: WebglLoaderXComponent },
      { path: 'webgl_loader_vtk', component: WebglLoaderVtkComponent },
      { path: 'webgl_loader_vrml', component: WebglLoaderVrmlComponent },
      { path: 'webgl_loader_vrm', component: WebglLoaderVrmComponent },
      { path: 'webgl_loader_vox', component: WebglLoaderVoxComponent },
      { path: 'webgl_loader_ttf', component: WebglLoaderTtfComponent },
      { path: 'webgl_math_obb', component: WebglMathObbComponent },
      {
        path: 'webgl_math_orientation_transform',
        component: WebglMathOrientationTransformComponent,
      },
      { path: 'webgl_mirror', component: WebglMirrorComponent },
      { path: 'webgl_modifier_curve', component: WebglModifierCurveComponent },
      {
        path: 'webgl_modifier_curve_instanced',
        component: WebglModifierCurveInstancedComponent,
      },
      {
        path: 'webgl_modifier_edgesplit',
        component: WebglModifierEdgesplitComponent,
      },
      {
        path: 'webgl_modifier_simplifier',
        component: WebglModifierSimplifierComponent,
      },
      {
        path: 'webgl_modifier_tessellation',
        component: WebglModifierTessellationComponent,
      },
      { path: 'webgl_morphtargets', component: WebglMorphtargetsComponent },
      {
        path: 'webgl_morphtargets_horse',
        component: WebglMorphtargetsHorseComponent,
      },
      {
        path: 'webgl_morphtargets_sphere',
        component: WebglMorphtargetsSphereComponent,
      },
      {
        path: 'webgl_multiple_canvases_circle',
        component: WebglMultipleCanvasesCircleComponent,
      },
      {
        path: 'webgl_multiple_canvases_complex',
        component: WebglMultipleCanvasesComplexComponent,
      },
      {
        path: 'webgl_multiple_canvases_grid',
        component: WebglMultipleCanvasesGridComponent,
      },
      {
        path: 'webgl_multiple_elements',
        component: WebglMultipleElementsComponent,
      },
      {
        path: 'webgl_multiple_elements_text',
        component: WebglMultipleElementsTextComponent,
      },
      {
        path: 'webgl_multiple_renderers',
        component: WebglMultipleRenderersComponent,
      },
      {
        path: 'webgl_multiple_scenes_comparison',
        component: WebglMultipleScenesComparisonComponent,
      },
      { path: 'webgl_multiple_views', component: WebglMultipleViewsComponent },
      { path: 'webgl_panorama_cube', component: WebglPanoramaCubeComponent },
      {
        path: 'webgl_panorama_equirectangular',
        component: WebglPanoramaEquirectangularComponent,
      },
      { path: 'webgl_performance', component: WebglPerformanceComponent },
      {
        path: 'webgl_performance_static',
        component: WebglPerformanceStaticComponent,
      },
      { path: 'webgl_points_billboards', component: WebglPointsBillboardsComponent },
      { path: 'webgl_points_dynamic', component: WebglPointsDynamicComponent },
      { path: 'webgl_points_sprites', component: WebglPointsSpritesComponent },
      { path: 'webgl_points_waves', component: WebglPointsWavesComponent },
      { path: 'webgl_portal', component: WebglPortalComponent },
      { path: 'webgl_raycast_sprite', component: WebglRaycastSpriteComponent },
      {
        path: 'webgl_raycast_texture',
        component: WebglRaycastTextureComponent,
      },
      {
        path: 'webgl_read_float_buffer',
        component: WebglReadFloatBufferComponent,
      },
      { path: 'webgl_refraction', component: WebglRefractionComponent },
      { path: 'webgl_rtt', component: WebglRttComponent },
      { path: 'webgl_sandbox', component: WebglSandboxComponent },
      { path: 'webgl_shader', component: WebglShaderComponent },
      { path: 'webgl_shader_lava', component: WebglShaderLavaComponent },
      { path: 'webgl_shader2', component: WebglShader2Component },
      { path: 'webgl_shaders_ocean', component: WebglShadersOceanComponent },
      { path: 'webgl_shaders_ocean2', component: WebglShadersOcean2Component },
      { path: 'webgl_shaders_sky', component: WebglShadersSkyComponent },
      {
        path: 'webgl_shaders_tonemapping',
        component: WebglShadersTonemappingComponent,
      },
      { path: 'webgl_shaders_vector', component: WebglShadersVectorComponent },
      {
        path: 'webgl_shading_physical',
        component: WebglShadingPhysicalComponent,
      },
      { path: 'webgl_shadow_contact', component: WebglShadowContactComponent },
      { path: 'webgl_shadowmap', component: WebglShadowmapComponent },
      {
        path: 'webgl_shadowmap_performance',
        component: WebglShadowmapPerformanceComponent,
      },
      {
        path: 'webgl_shadowmap_pointlight',
        component: WebglShadowmapPointlightComponent,
      },
      {
        path: 'webgl_shadowmap_viewer',
        component: WebglShadowmapViewerComponent,
      },
      { path: 'webgl_shadowmap_vsm', component: WebglShadowmapVsmComponent },
      { path: 'webgl_shadowmesh', component: WebglShadowmeshComponent },
      {
        path: 'webgl_skinning_simple',
        component: WebglSkinningSimpleComponent,
      },
      { path: 'webgl_sprites', component: WebglSpritesComponent },
      { path: 'webgl_test_memory', component: WebglTestMemoryComponent },
      { path: 'webgl_test_memory2', component: WebglTestMemory2Component },
      { path: 'webgl_tonemapping', component: WebglTonemappingComponent },
      { path: 'webgl_trails', component: WebglTrailsComponent },
      { path: 'webgl_video_kinect', component: WebglVideoKinectComponent },
      {
        path: 'webgl_video_panorama_equirectangular',
        component: WebglVideoPanoramaEquirectangularComponent,
      },
      { path: 'webgl_water', component: WebglWaterComponent },
      { path: 'webgl_water_flowmap', component: WebglWaterFlowmapComponent },
      { path: 'webgl_loader_nodes', component: WebglLoaderNodesComponent },
      {
        path: 'webgl_materials_compile',
        component: WebglMaterialsCompileComponent,
      },
      {
        path: 'webgl_materials_envmaps_hdr_nodes',
        component: WebglMaterialsEnvmapsHdrNodesComponent,
      },
      {
        path: 'webgl_materials_envmaps_pmrem_nodes',
        component: WebglMaterialsEnvmapsPmremNodesComponent,
      },
      {
        path: 'webgl_materials_nodes',
        component: WebglMaterialsNodesComponent,
      },
      { path: 'webgl_materials_standard_nodes', component: WebglMaterialsStandardNodesComponent },
      {
        path: 'webgl_mirror_nodes',
        component: WebglMirrorNodesComponent,
      },
      {
        path: 'webgl_performance_nodes',
        component: WebglPerformanceNodesComponent,
      },
      {
        path: 'webgl_postprocessing_nodes',
        component: WebglPostprocessingNodesComponent,
      },
      {
        path: 'webgl_postprocessing_nodes_pass',
        component: WebglPostprocessingNodesPassComponent,
      },
      { path: 'webgl_sprites_nodes', component: WebglSpritesNodesComponent },
      { path: 'webgl_postprocessing', component: WebglPostprocessingComponent },
      {
        path: 'webgl_postprocessing_3dlut',
        component: WebglPostprocessingD3lutComponent,
      },
      {
        path: 'webgl_postprocessing_advanced',
        component: WebglPostprocessingAdvancedComponent,
      },
      {
        path: 'webgl_postprocessing_afterimage',
        component: WebglPostprocessingAfterimageComponent,
      },
      {
        path: 'webgl_postprocessing_backgrounds',
        component: WebglPostprocessingBackgroundsComponent,
      },
      {
        path: 'webgl_postprocessing_crossfade',
        component: WebglPostprocessingCrossfadeComponent,
      },
      {
        path: 'webgl_postprocessing_dof',
        component: WebglPostprocessingDofComponent,
      },
      {
        path: 'webgl_postprocessing_dof2',
        component: WebglPostprocessingDof2Component,
      },
      {
        path: 'webgl_postprocessing_fxaa',
        component: WebglPostprocessingFxaaComponent,
      },
      {
        path: 'webgl_postprocessing_glitch',
        component: WebglPostprocessingGlitchComponent,
      },
      {
        path: 'webgl_postprocessing_godrays',
        component: WebglPostprocessingGodraysComponent,
      },
      {
        path: 'webgl_postprocessing_rgb_halftone',
        component: WebglPostprocessingRgbHalftoneComponent,
      },
      {
        path: 'webgl_postprocessing_masking',
        component: WebglPostprocessingMaskingComponent,
      },
      {
        path: 'webgl_postprocessing_ssaa',
        component: WebglPostprocessingSsaaComponent,
      },
      {
        path: 'webgl_postprocessing_outline',
        component: WebglPostprocessingOutlineComponent,
      },
      {
        path: 'webgl_postprocessing_pixel',
        component: WebglPostprocessingPixelComponent,
      },
      {
        path: 'webgl_postprocessing_procedural',
        component: WebglPostprocessingProceduralComponent,
      },
      {
        path: 'webgl_postprocessing_sao',
        component: WebglPostprocessingSaoComponent,
      },
      {
        path: 'webgl_postprocessing_smaa',
        component: WebglPostprocessingSmaaComponent,
      },
      {
        path: 'webgl_postprocessing_sobel',
        component: WebglPostprocessingSobelComponent,
      },
      {
        path: 'webgl_postprocessing_ssao',
        component: WebglPostprocessingSsaoComponent,
      },
      {
        path: 'webgl_postprocessing_taa',
        component: WebglPostprocessingTaaComponent,
      },
      {
        path: 'webgl_postprocessing_unreal_bloom',
        component: WebglPostprocessingUnrealBloomComponent,
      },
      {
        path: 'webgl_postprocessing_unreal_bloom_selective',
        component: WebglPostprocessingUnrealBloomSelectiveComponent,
      },
      { path: 'webgl_buffergeometry', component: WebglBuffergeometryComponent },
      {
        path: 'webgl_buffergeometry_compression',
        component: WebglBuffergeometryCompressionComponent,
      },
      {
        path: 'webgl_buffergeometry_custom_attributes_particles',
        component: WebglBuffergeometryCustomAttributesParticlesComponent,
      },
      {
        path: 'webgl_buffergeometry_drawrange',
        component: WebglBuffergeometryDrawrangeComponent,
      },
      {
        path: 'webgl_buffergeometry_glbufferattribute',
        component: WebglBuffergeometryGlbufferattributeComponent,
      },
      {
        path: 'webgl_buffergeometry_indexed',
        component: WebglBuffergeometryIndexedComponent,
      },
      {
        path: 'webgl_buffergeometry_instancing',
        component: WebglBuffergeometryInstancingComponent,
      },
      {
        path: 'webgl_buffergeometry_instancing_billboards',
        component: WebglBuffergeometryInstancingBillboardsComponent,
      },
      {
        path: 'webgl_buffergeometry_instancing_interleaved',
        component: WebglBuffergeometryInstancingInterleavedComponent,
      },
      {
        path: 'webgl_buffergeometry_lines',
        component: WebglBuffergeometryLinesComponent,
      },
      {
        path: 'webgl_buffergeometry_lines_indexed',
        component: WebglBuffergeometryLinesIndexedComponent,
      },
      {
        path: 'webgl_buffergeometry_points',
        component: WebglBuffergeometryPointsComponent,
      },
      {
        path: 'webgl_buffergeometry_points_interleaved',
        component: WebglBuffergeometryPointsInterleavedComponent,
      },
      {
        path: 'webgl_buffergeometry_rawshader',
        component: WebglBuffergeometryRawshaderComponent,
      },
      {
        path: 'webgl_buffergeometry_selective_draw',
        component: WebglBuffergeometrySelectiveDrawComponent,
      },
      {
        path: 'webgl_buffergeometry_uint',
        component: WebglBuffergeometryUintComponent,
      },
      {
        path: 'webgl_custom_attributes',
        component: WebglCustomAttributesComponent,
      },
      {
        path: 'webgl_custom_attributes_lines',
        component: WebglCustomAttributesLinesComponent,
      },
      {
        path: 'webgl_custom_attributes_points',
        component: WebglCustomAttributesPointsComponent,
      },
      {
        path: 'webgl_custom_attributes_points2',
        component: WebglCustomAttributesPoints2Component,
      },
      {
        path: 'webgl_custom_attributes_points3',
        component: WebglCustomAttributesPoints3Component,
      },
      { path: 'webgl_gpgpu_birds', component: WebglGpgpuBirdsComponent },
      {
        path: 'webgl_gpgpu_birds_gltf',
        component: WebglGpgpuBirdsGltfComponent,
      },
      { path: 'webgl_gpgpu_water', component: WebglGpgpuWaterComponent },
      {
        path: 'webgl_gpgpu_protoplanet',
        component: WebglGpgpuProtoplanetComponent,
      },
      {
        path: 'webgl_instancing_modified',
        component: WebglInstancingModifiedComponent,
      },
      {
        path: 'webgl_lightningstrike',
        component: WebglLightningstrikeComponent,
      },
      {
        path: 'webgl_materials_modified',
        component: WebglMaterialsModifiedComponent,
      },
      {
        path: 'webgl_raymarching_reflect',
        component: WebglRaymarchingReflectComponent,
      },
      { path: 'webgl_shadowmap_csm', component: WebglShadowmapCsmComponent },
      { path: 'webgl_shadowmap_pcss', component: WebglShadowmapPcssComponent },
      { path: 'webgl_simple_gi', component: WebglSimpleGiComponent },
      { path: 'webgl_tiled_forward', component: WebglTiledForwardComponent },
      {
        path: 'webgl_worker_offscreencanvas',
        component: WebglWorkerOffscreencanvasComponent,
      },
      {
        path: 'webgl2_buffergeometry_attributes_integer',
        component: Webgl2BuffergeometryAttributesIntegerComponent,
      },
      {
        path: 'webgl2_materials_texture2darray',
        component: Webgl2MaterialsTexture2darrayComponent,
      },
      {
        path: 'webgl2_materials_texture3d',
        component: Webgl2MaterialsTexture3dComponent,
      },
      {
        path: 'webgl2_multisampled_renderbuffers',
        component: Webgl2MultisampledRenderbuffersComponent,
      },
      { path: 'webgl2_volume_cloud', component: Webgl2VolumeCloudComponent },
      {
        path: 'webgl2_volume_instancing',
        component: Webgl2VolumeInstancingComponent,
      },
      { path: 'webgl2_volume_perlin', component: Webgl2VolumePerlinComponent },
      { path: 'webgl2_rendertarget_texture2darray', component: Webgl2RendertargetTexture2darrayComponent },

      { path: 'webgpu_sandbox', component: WebgpuSandboxComponent },
      { path: 'webgpu_rtt', component: WebgpuRttComponent },
      { path: 'webgpu_compute', component: WebgpuComputeComponent },
      { path: 'webaudio_orientation', component: WebaudioOrientationComponent },
      { path: 'webaudio_sandbox', component: WebaudioSandboxComponent },
      { path: 'webaudio_timing', component: WebaudioTimingComponent },
      { path: 'webaudio_visualizer', component: WebaudioVisualizerComponent },
      { path: 'webxr_ar_cones', component: WebxrArConesComponent },
      { path: 'webxr_ar_hittest', component: WebxrArHittestComponent },
      { path: 'webxr_ar_paint', component: WebxrArPaintComponent },
      { path: 'webxr_vr_ballshooter', component: WebxrVrBallshooterComponent },
      { path: 'webxr_vr_cubes', component: WebxrVrCubesComponent },
      { path: 'webxr_vr_dragging', component: WebxrVrDraggingComponent },
      { path: 'webxr_vr_handinput', component: WebxrVrHandinputComponent },
      {
        path: 'webxr_vr_handinput_cubes',
        component: WebxrVrHandinputCubesComponent,
      },
      {
        path: 'webxr_vr_handinput_profiles',
        component: WebxrVrHandinputProfilesComponent,
      },
      { path: 'webxr_vr_haptics', component: WebxrVrHapticsComponent },
      {
        path: 'webxr_vr_lorenzattractor',
        component: WebxrVrLorenzattractorComponent,
      },
      { path: 'webxr_vr_panorama', component: WebxrVrPanoramaComponent },
      {
        path: 'webxr_vr_panorama_depth',
        component: WebxrVrPanoramaDepthComponent,
      },
      { path: 'webxr_vr_paint', component: WebxrVrPaintComponent },
      {
        path: 'webxr_vr_rollercoaster',
        component: WebxrVrRollercoasterComponent,
      },
      { path: 'webxr_vr_sandbox', component: WebxrVrSandboxComponent },
      { path: 'webxr_vr_sculpt', component: WebxrVrSculptComponent },
      { path: 'webxr_vr_video', component: WebxrVrVideoComponent },
      { path: 'games_fps', component: GamesFpsComponent },
      { path: 'physics_ammo_break', component: PhysicsAmmoBreakComponent },
      { path: 'physics_ammo_cloth', component: PhysicsAmmoClothComponent },
      {
        path: 'physics_ammo_instancing',
        component: PhysicsAmmoInstancingComponent,
      },
      { path: 'physics_ammo_rope', component: PhysicsAmmoRopeComponent },
      { path: 'physics_ammo_terrain', component: PhysicsAmmoTerrainComponent },
      { path: 'physics_ammo_volume', component: PhysicsAmmoVolumeComponent },
      {
        path: 'misc_animation_groups',
        component: MiscAnimationGroupsComponent,
      },
      { path: 'misc_animation_keys', component: MiscAnimationKeysComponent },
      { path: 'misc_boxselection', component: MiscBoxselectionComponent },
      {
        path: 'misc_controls_deviceorientation',
        component: MiscControlsDeviceorientationComponent,
      },
      { path: 'misc_controls_drag', component: MiscControlsDragComponent },
      { path: 'misc_controls_fly', component: MiscControlsFlyComponent },
      { path: 'misc_controls_map', component: MiscControlsMapComponent },
      { path: 'misc_controls_orbit', component: MiscControlsOrbitComponent },
      {
        path: 'misc_controls_pointerlock',
        component: MiscControlsPointerlockComponent,
      },
      {
        path: 'misc_controls_trackball',
        component: MiscControlsTrackballComponent,
      },
      {
        path: 'misc_controls_transform',
        component: MiscControlsTransformComponent,
      },
      {
        path: 'misc_exporter_collada',
        component: MiscExporterColladaComponent,
      },
      { path: 'misc_exporter_draco', component: MiscExporterDracoComponent },
      { path: 'misc_exporter_gltf', component: MiscExporterGltfComponent },
      { path: 'misc_exporter_obj', component: MiscExporterObjComponent },
      { path: 'misc_exporter_ply', component: MiscExporterPlyComponent },
      { path: 'misc_exporter_stl', component: MiscExporterStlComponent },
      { path: 'misc_legacy', component: MiscLegacyComponent },
      { path: 'misc_lookat', component: MiscLookatComponent },
      { path: 'css2d_label', component: Css2dLabelComponent },
      { path: 'css3d_molecules', component: Css3dMoleculesComponent },
      { path: 'css3d_orthographic', component: Css3dOrthographicComponent },
      { path: 'css3d_panorama', component: Css3dPanoramaComponent },
      {
        path: 'css3d_panorama_deviceorientation',
        component: Css3dPanoramaDeviceorientationComponent,
      },
      { path: 'css3d_periodictable', component: Css3dPeriodictableComponent },
      { path: 'css3d_sandbox', component: Css3dSandboxComponent },
      { path: 'css3d_sprites', component: Css3dSpritesComponent },
      { path: 'css3d_youtube', component: Css3dYoutubeComponent },
      { path: 'svg_lines', component: SvgLinesComponent },
      { path: 'svg_sandbox', component: SvgSandboxComponent },
      { path: 'webgl_furnace_test', component: WebglFurnaceTestComponent },
      { path: 'webgl_pmrem_test', component: WebglPmremTestComponent },
      { path: 'misc_uv_tests', component: MiscUvTestsComponent },
      {
        path: 'webgl_loader_texture_tga',
        component: WebglLoaderTextureTgaComponent,
      },
      {
        path: 'webgl_loader_texture_rgbm',
        component: WebglLoaderTextureRgbmComponent,
      },
      {
        path: 'webgl_loader_texture_pvrtc',
        component: WebglLoaderTexturePvrtcComponent,
      },
      {
        path: 'webgl_loader_texture_lottie',
        component: WebglLoaderTextureLottieComponent,
      },
      {
        path: 'webgl_loader_texture_ktx2',
        component: WebglLoaderTextureKtx2Component,
      },
      {
        path: 'webgl_loader_texture_ktx',
        component: WebglLoaderTextureKtxComponent,
      },
      {
        path: 'webgl_loader_texture_hdr',
        component: WebglLoaderTextureHdrComponent,
      },
      {
        path: 'webgl_loader_texture_exr',
        component: WebglLoaderTextureExrComponent,
      },
      {
        path: 'webgl_loader_texture_dds',
        component: WebglLoaderTextureDdsComponent,
      },
      {
        path: 'webgl_loader_texture_basis',
        component: WebglLoaderTextureBasisComponent,
      },
      { path: 'webgl_loader_tilt', component: WebglLoaderTiltComponent },
      { path: 'webgl_loader_svg', component: WebglLoaderSvgComponent },
      { path: 'webgl_loader_stl', component: WebglLoaderStlComponent },
      { path: 'webgl_loader_prwm', component: WebglLoaderPrwmComponent },
      { path: 'webgl_loader_ply', component: WebglLoaderPlyComponent },
      { path: 'webgl_loader_pdb', component: WebglLoaderPdbComponent },
      { path: 'webgl_loader_pcd', component: WebglLoaderPcdComponent },
      { path: 'webgl_loader_obj_mtl', component: WebglLoaderObjMtlComponent },
      { path: 'webgl_loader_obj', component: WebglLoaderObjComponent },
      { path: 'webgl_loader_nrrd', component: WebglLoaderNrrdComponent },
      {
        path: 'webgl_loader_mmd_audio',
        component: WebglLoaderMmdAudioComponent,
      },
      { path: 'webgl_loader_mmd_pose', component: WebglLoaderMmdPoseComponent },
      { path: 'webgl_loader_mmd', component: WebglLoaderMmdComponent },
      { path: 'webgl_loader_mdd', component: WebglLoaderMddComponent },
      {
        path: 'webgl_loader_md2_control',
        component: WebglLoaderMd2ControlComponent,
      },
      { path: 'webgl_loader_md2', component: WebglLoaderMd2Component },
      { path: 'webgl_loader_lwo', component: WebglLoaderLwoComponent },
      { path: 'webgl_loader_ldraw', component: WebglLoaderLdrawComponent },
      { path: 'webgl_loader_kmz', component: WebglLoaderKmzComponent },
      {
        path: 'webgl_loader_imagebitmap',
        component: WebglLoaderImagebitmapComponent,
      },
      {
        path: 'webgl_loader_gltf_variants',
        component: WebglLoaderGltfVariantsComponent,
      },
      {
        path: 'webgl_loader_gltf_extensions',
        component: WebglLoaderGltfExtensionsComponent,
      },
      {
        path: 'webgl_loader_gltf_compressed',
        component: WebglLoaderGltfCompressedComponent,
      },
      { path: 'webgl_loader_gltf', component: WebglLoaderGltfComponent },
      { path: 'webgl_loader_gcode', component: WebglLoaderGcodeComponent },
      {
        path: 'webgl_loader_fbx_nurbs',
        component: WebglLoaderFbxNurbsComponent,
      },
      { path: 'webgl_loader_fbx', component: WebglLoaderFbxComponent },
      { path: 'webgl_loader_draco', component: WebglLoaderDracoComponent },
      {
        path: 'webgl_loader_collada_skinning',
        component: WebglLoaderColladaSkinningComponent,
      },
      {
        path: 'webgl_loader_collada_kinematics',
        component: WebglLoaderColladaKinematicsComponent,
      },
      { path: 'webgl_loader_collada', component: WebglLoaderColladaComponent },
      { path: 'webgl_loader_bvh', component: WebglLoaderBvhComponent },
      { path: 'webgl_loader_assimp', component: WebglLoaderAssimpComponent },
      { path: 'webgl_loader_amf', component: WebglLoaderAmfComponent },
      {
        path: 'webgl_loader_3mf_materials',
        component: WebglLoaderMf3MaterialsComponent,
      },
      { path: 'webgl_loader_3mf', component: WebglLoaderMf3Component },
      { path: 'webgl_loader_3ds', component: WebglLoaderDs3Component },
      { path: 'webgl_loader_3dm', component: WebglLoaderDm3Component },

      { path: 'webgl_shadowmap_progressive', component: WebglShadowmapProgressiveComponent },
      { path: 'webgl2_materials_texture3d_partialupdate', component: Webgl2MaterialsTexture3dPartialupdateComponent },
      { path: 'webgl2_multiple_rendertargets', component: Webgl2MultipleRendertargetsComponent },
      { path: 'webgl_postprocessing_ssr', component: WebglPostprocessingSsrComponent },
      { path: 'webgl_postprocessing_ssrr', component: WebglPostprocessingSsrrComponent },
      { path: 'physics_oimo_instancing', component: PhysicsOimoInstancingComponent },
      { path: 'webgl_loader_ifc', component: WebglLoaderIfcComponent },
      { path: 'webgl_loader_gltf_transmission', component: WebglLoaderGltfTransmissionComponent },
      { path: '**', component: UnderConstructionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
