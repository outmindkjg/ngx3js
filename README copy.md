# Install
```bash
git clone it@github.com:josdirksen/learning-threejs.git
npm install -g @angular/cli
npm update ammojs-typed
npm update three
npm i @types/three
npm install typedoc --save-dev

npx typedoc --out docs
npx typedoc --exclude "**/*+(index|.spec|.e2e).ts"
npx typedoc --json docs_api.json --exclude "**/*+(index|.spec|.e2e).ts"

git remote set-url origin https://github.com/outmindkjg/ngx3js.git
git remote -v



ng new my-app
cd my-app
ng serve --open
ng g c three/scene
ng g c three/camera
ng g c three/pass
ng g c three/tween
ng g c three/renderer
ng g c three/geometry
ng g c three/geometry/bird
ng g c three/material
ng g c three/node-material
ng g c three/mesh
ng g c three/light
ng g c three/position
ng g c three/rotation
ng g c three/scale
ng g c three/line
ng g c three/clip
ng g c three/keyframe
ng g c three/lookat
ng g c three/texture
ng g c three/lensflareelement
ng g c three/helper
ng g c three/shader
ng g c three/shape
ng g c three/curve
ng g c three/svg
ng g c three/shared
ng g c three/animation-group
ng g c three/translation
ng g s three/local-storage-service
ng g c three/composer
ng g c three/mixer
ng g c three/animation
ng g c three/listener
ng g c three/audio
ng g c three/plane
ng g c three/html
ng g c three/canvas
ng g c three/chart
ng g c three/visual
ng g c three/transform
ng g c three/controller
ng g c three/controller/controller-item
ng g c three/physics
ng g c three/physics/physics-constraint
ng g c three/rigidbody
ng g c three/rigidbody/rigidbody-node
ng g c three/render-target

ng g c three/control
ng g c three/tools
ng g c three/viewer
ng g directive three/drawing-canvas








ng g c chapter08/page0801
ng g c chapter08/page0802
ng g c chapter08/page0803
ng g c chapter08/page0804
ng g c chapter08/page0805
ng g c chapter08/page0806
ng g c chapter08/page0807
ng g c chapter08/page0808
ng g c chapter08/page0809
ng g c chapter08/page0810
ng g c chapter08/page0811
ng g c chapter08/page0812
ng g c chapter08/page0813
ng g c chapter08/page0814
ng g c chapter08/page0815
ng g c chapter08/page0816
ng g c chapter08/page0817

ng g c chapter11/page1101
ng g c chapter11/page1102
ng g c chapter11/page1103a
ng g c chapter11/page1103b
ng g c chapter11/page1104
ng g c chapter11/page1105
ng g c chapter11/page1106
ng g c chapter11/page1107

ng g c chapter12/page1201
ng g c chapter12/page1202
ng g c chapter12/page1203
ng g c chapter12/page1204
ng g c chapter12/page1205
ng g c chapter12/page1206
ng g c chapter12/page1207

ng g c chapter09/page0901
ng g c chapter09/page0902
ng g c chapter09/page0903
ng g c chapter09/page0904
ng g c chapter09/page0905
ng g c chapter09/page0906
ng g c chapter09/page0907
ng g c chapter09/page0908
ng g c chapter09/page0909
ng g c chapter09/page0910
ng g c chapter09/page0911
ng g c chapter09/page0912
ng g c chapter09/page0913
ng g c chapter09/page0914
ng g c chapter09/page0915
ng g c chapter09/page0916

ng g c chapter13
ng g c chapter13/page1301
ng g c chapter13/page1302
ng g c chapter13/page1303
ng g c chapter13/page1304
ng g c chapter13/page1305
ng g c chapter13/page1306
ng g c chapter13/page1307

ng g c examples
ng g c examples/webgl_animation_cloth
ng g c examples/webgl_animation_keyframes
ng g c examples/webgl_animation_skinning_blending
ng g c examples/webgl_animation_skinning_additive_blending
ng g c examples/under_construction
ng g c examples/webgl_animation_skinning_morph
ng g c examples/webgl_animation_multiple
ng g c examples/webgl_camera
ng g c examples/webgl_camera_array
ng g c examples/webgl_camera_cinematic
ng g c examples/webgl_camera_logarithmicdepthbuffer
ng g c examples/webgl_clipping
ng g c examples/webgl_clipping_advanced
ng g c examples/webgl_clipping_intersection
ng g c examples/webgl_clipping_stencil
ng g c examples/webgl_decals
ng g c examples/webgl_depth_texture
ng g c examples/webgl-portal
ng g c examples/webgl_effects_anaglyph
ng g c examples/webgl_effects_ascii
ng g c examples/webgl_effects_parallaxbarrier
ng g c examples/webgl_effects_peppersghost
ng g c examples/webgl_effects_stereo
ng g c examples/webgl_framebuffer_texture
ng g c examples/webgl_geometries
ng g c examples/webgl_geometries_parametric
ng g c examples/webgl_geometry_colors
ng g c examples/webgl_geometry_colors_lookuptable
ng g c examples/webgl_geometry_convex
ng g c examples/webgl_geometry_cube
ng g c examples/webgl_geometry_dynamic
ng g c examples/webgl_geometry_extrude_shapes
ng g c examples/webgl_geometry_extrude_shapes2
ng g c examples/webgl_geometry_extrude_splines
ng g c examples/webgl_geometry_hierarchy
ng g c examples/webgl_geometry_hierarchy2
ng g c examples/webgl_geometry_minecraft
ng g c examples/webgl_geometry_minecraft_ao
ng g c examples/webgl_geometry_normals
ng g c examples/webgl_geometry_nurbs
ng g c examples/webgl_geometry_shapes
ng g c examples/webgl_geometry_spline_editor
ng g c examples/webgl_geometry_teapot
ng g c examples/webgl_geometry_terrain
ng g c examples/webgl_materials_standard_nodes
ng g c examples/webgl_geometry_terrain_fog
ng g c examples/webgl_geometry_terrain_raycast
ng g c examples/webgl_geometry_text
ng g c examples/webgl_geometry_text_shapes
ng g c examples/webgl_geometry_text_stroke
ng g c examples/webgl_helpers
ng g c examples/webgl_instancing_dynamic
ng g c examples/webgl_instancing_performance
ng g c examples/webgl_instancing_raycast
ng g c examples/webgl_instancing_scatter
ng g c examples/webgl_interactive_buffergeometry
ng g c examples/webgl_interactive_cubes
ng g c examples/webgl_interactive_cubes_gpu
ng g c examples/webgl_interactive_cubes_ortho
ng g c examples/webgl_interactive_lines
ng g c examples/webgl_interactive_points
ng g c examples/webgl_interactive_raycasting_points
ng g c examples/webgl_interactive_voxelpainter
ng g c examples/webgl_layers
ng g c examples/webgl_lensflares
ng g c examples/webgl_lightprobe
ng g c examples/webgl_lightprobe_cubecamera
ng g c examples/webgl_lights_hemisphere
ng g c examples/webgl_lights_physical
ng g c examples/webgl_lights_pointlights
ng g c examples/webgl_lights_pointlights2
ng g c examples/webgl_lights_spotlight
ng g c examples/webgl_lights_spotlights
ng g c examples/webgl_lights_rectarealight
ng g c examples/webgl_lines_colors
ng g c examples/webgl_lines_dashed
ng g c examples/webgl_lines_fat
ng g c examples/webgl_lines_fat_wireframe
ng g c examples/webgl_lines_sphere


ng g c examples/webgl_loader_dm3
ng g c examples/webgl_loader_ds3
ng g c examples/webgl_loader_mf3
ng g c examples/webgl_loader_mf3_materials
ng g c examples/webgl_loader_amf
ng g c examples/webgl_loader_assimp
ng g c examples/webgl_loader_bvh
ng g c examples/webgl_loader_collada
ng g c examples/webgl_loader_collada_kinematics
ng g c examples/webgl_loader_collada_skinning
ng g c examples/webgl_loader_draco
ng g c examples/webgl_loader_fbx
ng g c examples/webgl_loader_fbx_nurbs
ng g c examples/webgl_loader_gcode
ng g c examples/webgl_loader_gltf
ng g c examples/webgpu_instance_uniform
ng g c examples/webgl_loader_gltf_compressed
ng g c examples/webgl_loader_gltf_extensions
ng g c examples/webgl_loader_gltf_variants
ng g c examples/webgpu_lights_custom
ng g c examples/webgl_loader_imagebitmap
ng g c examples/webgl_loader_kmz
ng g c examples/webgl_loader_ldraw
ng g c examples/webgl_loader_lwo
ng g c examples/webgl_loader_md2
ng g c examples/webgl_loader_md2_control
ng g c examples/webgl_loader_mdd
ng g c examples/webgl_loader_mmd
ng g c examples/webgl_loader_mmd_pose
ng g c examples/webgl_loader_mmd_audio
ng g c examples/webgl_loader_nrrd
ng g c examples/webgl_loader_obj
ng g c examples/webgpu_lights_selective
ng g c examples/webgpu_materials

ng g c examples/webgl_loader_obj_mtl
ng g c examples/webgl_loader_pcd
ng g c examples/webgl_loader_pdb
ng g c examples/webgl_loader_ply
ng g c examples/webgl_loader_prwm
ng g c examples/webgl_loader_stl
ng g c examples/webgl_loader_svg
ng g c examples/webgl_loader_tilt
ng g c examples/webgl_loader_texture_basis
ng g c examples/webgl_loader_texture_dds
ng g c examples/webgl_loader_texture_exr
ng g c examples/webgl_loader_texture_hdr
ng g c examples/webgl_loader_texture_ktx
ng g c examples/webgl_loader_texture_ktx2
ng g c examples/webgl_loader_texture_lottie
ng g c examples/webgl_loader_texture_pvrtc
ng g c examples/webgl_loader_texture_rgbm
ng g c examples/webgl_loader_texture_tga
ng g c examples/webgl_loader_ttf
ng g c examples/webgl_loader_vox
ng g c examples/webgl_loader_vrm
ng g c examples/webgl_loader_vrml
ng g c examples/webgl_loader_vtk
ng g c examples/webgl_loader_x
ng g c examples/webgl_loader_xyz
ng g c examples/webgl_lod
ng g c examples/webgl_marchingcubes
ng g c examples/webgl_materials
ng g c examples/webgl_materials_blending
ng g c examples/webgl_materials_blending_custom
ng g c examples/webgl_materials_bumpmap
ng g c examples/webgl_materials_car
ng g c examples/webgl_materials_channels
ng g c examples/webgl_materials_cubemap
ng g c examples/webgl_materials_cubemap_balls_reflection
ng g c examples/webgl_materials_cubemap_balls_refraction
ng g c examples/webgl_materials_cubemap_dynamic
ng g c examples/webgl_materials_cubemap_refraction
ng g c examples/webgl_materials_cubemap_mipmaps
ng g c examples/webgl_materials_curvature
ng g c examples/webgl_materials_displacementmap
ng g c examples/webgl_materials_envmaps
ng g c examples/webgl_materials_envmaps_exr
ng g c examples/webgl_materials_envmaps_hdr
ng g c examples/webgl_materials_envmaps_parallax
ng g c examples/webgl_materials_grass
ng g c examples/webgl_materials_lightmap
ng g c examples/webgl_materials_matcap
ng g c examples/webgl_materials_normalmap
ng g c examples/webgl_materials_normalmap_object_space
ng g c examples/webgl_materials_parallaxmap
ng g c examples/webgl_materials_physical_clearcoat
ng g c examples/webgl_materials_physical_reflectivity
ng g c examples/webgl_materials_physical_sheen
ng g c examples/webgl_materials_physical_transmission
ng g c examples/webgl_materials_shaders_fresnel
ng g c examples/webgl_materials_standard
ng g c examples/webgl_materials_subsurface_scattering
ng g c examples/webgl_materials_texture_anisotropy
ng g c examples/webgl_materials_texture_canvas
ng g c examples/webgl_materials_texture_filters
ng g c examples/webgl_materials_texture_manualmipmap
ng g c examples/webgl_materials_texture_partialupdate
ng g c examples/webgl_materials_texture_rotation
ng g c examples/webgl_materials_variations_basic
ng g c examples/webgl_materials_variations_lambert
ng g c examples/webgl_materials_variations_phong
ng g c examples/webgl_materials_variations_standard
ng g c examples/webgl_materials_variations_physical
ng g c examples/webgl_materials_variations_toon
ng g c examples/webgl_materials_video
ng g c examples/webgl_materials_video_webcam
ng g c examples/webgl_materials_wireframe
ng g c examples/misc-exporter-usdz

ng g c examples/webgl_math_obb
ng g c examples/webgl_math_orientation_transform
ng g c examples/webgl_mirror
ng g c examples/webgl_modifier_curve
ng g c examples/webgl_modifier_curve_instanced
ng g c examples/webgl_modifier_edgesplit
ng g c examples/webgl_modifier_simplifier
ng g c examples/webgl_modifier_tessellation
ng g c examples/webgl_morphtargets
ng g c examples/webgl_morphtargets_horse
ng g c examples/webgl_morphtargets_sphere
ng g c examples/webgl_multiple_canvases_circle
ng g c examples/webgl_multiple_canvases_complex
ng g c examples/webgl_multiple_canvases_grid
ng g c examples/webgl_multiple_elements
ng g c examples/webgl_multiple_elements_text
ng g c examples/webgl_multiple_renderers
ng g c examples/webgl_multiple_scenes_comparison
ng g c examples/webgl_multiple_views
ng g c examples/webgl_panorama_cube
ng g c examples/webgl_panorama_equirectangular
ng g c examples/webgl_performance
ng g c examples/webgl_performance_static
ng g c examples/webgl_points_billboards
ng g c examples/webgl_points_dynamic
ng g c examples/webgl_points_sprites
ng g c examples/webgl_points_waves
ng g c examples/webgl_raycast_sprite
ng g c examples/webgl_raycast_texture
ng g c examples/webgl_read_float_buffer
ng g c examples/webgl_refraction
ng g c examples/webgl_rtt
ng g c examples/webgl_sandbox
ng g c examples/webgl_shader
ng g c examples/webgl_shader_lava
ng g c examples/webgl_shader2
ng g c examples/webgl_shaders_ocean
ng g c examples/webgl_shaders_ocean2
ng g c examples/webgl_shaders_sky
ng g c examples/webgl_shaders_tonemapping
ng g c examples/webgl_shaders_vector
ng g c examples/webgl_shading_physical
ng g c examples/webgl_shadow_contact
ng g c examples/webgl_shadowmap
ng g c examples/webgl_shadowmap_performance
ng g c examples/webgl_shadowmap_pointlight
ng g c examples/webgl_shadowmap_viewer
ng g c examples/webgl_shadowmap_vsm

ng g c examples/webgl_shadowmap_progressive
ng g c examples/webgl2_materials_texture3d_partialupdate
ng g c examples/webgl2_multiple_rendertargets
ng g c examples/webgl_postprocessing_ssr
ng g c examples/webgl_postprocessing_ssrr
ng g c examples/physics_oimo_instancing
ng g c examples/webgl_loader_ifc
ng g c examples/webgl_loader_gltf_transmission


ng g c examples/webgl_shadowmesh
ng g c examples/webgl_skinning_simple
ng g c examples/webgl_sprites
ng g c examples/webgl_test_memory
ng g c examples/webgl_test_memory2
ng g c examples/webgl_tonemapping
ng g c examples/webgl_trails
ng g c examples/webgl_video_kinect
ng g c examples/webgl_video_panorama_equirectangular
ng g c examples/webgl_water
ng g c examples/webgl_water_flowmap
ng g c examples/webgl_loader_nodes
ng g c examples/webgl_materials_compile
ng g c examples/webgl_materials_envmaps_hdr_nodes
ng g c examples/webgl_materials_envmaps_pmrem_nodes
ng g c examples/webgl_materials_nodes
ng g c examples/webgl_mirror_nodes
ng g c examples/webgl_performance_nodes
ng g c examples/webgl_postprocessing_nodes
ng g c examples/webgl_postprocessing_nodes_pass
ng g c examples/webgl_sprites_nodes
ng g c examples/webgl_postprocessing
ng g c examples/webgl_postprocessing_d3lut
ng g c examples/webgl_postprocessing_advanced
ng g c examples/webgl_postprocessing_afterimage
ng g c examples/webgl_postprocessing_backgrounds
ng g c examples/webgl_postprocessing_crossfade
ng g c examples/webgl_postprocessing_dof
ng g c examples/webgl_postprocessing_dof2
ng g c examples/webgl_postprocessing_fxaa
ng g c examples/webgl_postprocessing_glitch
ng g c examples/webgl_postprocessing_godrays
ng g c examples/webgl_postprocessing_rgb_halftone
ng g c examples/webgl_postprocessing_masking
ng g c examples/webgl_postprocessing_ssaa
ng g c examples/webgl_postprocessing_outline
ng g c examples/webgl_postprocessing_pixel
ng g c examples/webgl_postprocessing_procedural
ng g c examples/webgl_postprocessing_sao
ng g c examples/webgl_postprocessing_smaa
ng g c examples/webgl_postprocessing_sobel
ng g c examples/webgl_postprocessing_ssao
ng g c examples/webgl_postprocessing_taa
ng g c examples/webgl_postprocessing_unreal_bloom
ng g c examples/webgl_postprocessing_unreal_bloom_selective
ng g c examples/webgl_buffergeometry
ng g c examples/webgl_buffergeometry_compression
ng g c examples/webgl_buffergeometry_custom_attributes_particles
ng g c examples/webgl_buffergeometry_drawrange
ng g c examples/webgl_buffergeometry_glbufferattribute
ng g c examples/webgl_buffergeometry_indexed
ng g c examples/webgl_buffergeometry_instancing
ng g c examples/webgl_buffergeometry_instancing_billboards
ng g c examples/webgl_buffergeometry_instancing_interleaved
ng g c examples/webgl_buffergeometry_lines
ng g c examples/webgl_buffergeometry_lines_indexed
ng g c examples/webgl_buffergeometry_points
ng g c examples/webgl_buffergeometry_points_interleaved
ng g c examples/webgl_buffergeometry_rawshader
ng g c examples/webgl_buffergeometry_selective_draw
ng g c examples/webgl_buffergeometry_uint
ng g c examples/webgl_custom_attributes
ng g c examples/webgl_custom_attributes_lines
ng g c examples/webgl_custom_attributes_points
ng g c examples/webgl_custom_attributes_points2
ng g c examples/webgl_custom_attributes_points3
ng g c examples/webgl_gpgpu_birds
ng g c examples/webgl_gpgpu_birds_gltf
ng g c examples/webgl_gpgpu_water
ng g c examples/webgl_gpgpu_protoplanet
ng g c examples/webgl_instancing_modified
ng g c examples/webgl_lightningstrike
ng g c examples/webgl_materials_modified
ng g c examples/webgl_raymarching_reflect
ng g c examples/webgl_shadowmap_csm
ng g c examples/webgl_shadowmap_pcss
ng g c examples/webgl_simple_gi
ng g c examples/webgl_tiled_forward
ng g c examples/webgl_worker_offscreencanvas
ng g c examples/webgl2_buffergeometry_attributes_integer
ng g c examples/webgl2_materials_texture2darray
ng g c examples/webgl2_materials_texture3d
ng g c examples/webgl2_multisampled_renderbuffers
ng g c examples/webgl2_rendertarget_texture2darray
ng g c examples/webgl2_volume_cloud
ng g c examples/webgl2_volume_instancing
ng g c examples/webgl2_volume_perlin
ng g c examples/webgpu_sandbox
ng g c examples/webgpu_rtt
ng g c examples/webgpu_compute
ng g c examples/webaudio_orientation
ng g c examples/webaudio_sandbox
ng g c examples/webaudio_timing
ng g c examples/webaudio_visualizer
ng g c examples/webxr_ar_cones
ng g c examples/webxr_ar_hittest
ng g c examples/webxr_ar_paint
ng g c examples/webxr_vr_ballshooter
ng g c examples/webxr_vr_cubes
ng g c examples/webxr_vr_dragging
ng g c examples/webxr_vr_handinput
ng g c examples/webxr_vr_handinput_cubes
ng g c examples/webxr_vr_handinput_profiles
ng g c examples/webxr_vr_haptics
ng g c examples/webxr_vr_lorenzattractor
ng g c examples/webxr_vr_panorama
ng g c examples/webxr_vr_panorama_depth
ng g c examples/webxr_vr_paint
ng g c examples/webxr_vr_rollercoaster
ng g c examples/webxr_vr_sandbox
ng g c examples/webxr_vr_sculpt
ng g c examples/webxr_vr_video
ng g c examples/games_fps
ng g c examples/physics_ammo_break
ng g c examples/physics_ammo_cloth
ng g c examples/physics_ammo_instancing
ng g c examples/physics_ammo_rope
ng g c examples/physics_ammo_terrain
ng g c examples/physics_ammo_volume
ng g c examples/misc_animation_groups
ng g c examples/misc_animation_keys
ng g c examples/misc_boxselection
ng g c examples/misc_controls_deviceorientation
ng g c examples/misc_controls_drag
ng g c examples/misc_controls_fly
ng g c examples/misc_controls_map
ng g c examples/misc_controls_orbit
ng g c examples/misc_controls_pointerlock
ng g c examples/misc_controls_trackball
ng g c examples/misc_controls_transform
ng g c examples/misc_exporter_collada
ng g c examples/misc_exporter_draco
ng g c examples/misc_exporter_gltf
ng g c examples/misc_exporter_obj
ng g c examples/misc_exporter_ply
ng g c examples/misc_exporter_stl
ng g c examples/misc_legacy
ng g c examples/misc_lookat
ng g c examples/css2d_label
ng g c examples/css3d_molecules
ng g c examples/css3d_orthographic
ng g c examples/css3d_panorama
ng g c examples/css3d_panorama_deviceorientation
ng g c examples/css3d_periodictable
ng g c examples/css3d_sandbox
ng g c examples/css3d_sprites
ng g c examples/css3d_youtube
ng g c examples/svg_lines
ng g c examples/svg_sandbox
ng g c examples/webgl_furnace_test
ng g c examples/webgl_pmrem_test
ng g c examples/misc_uv_tests

ng g c examples/ngx_material
ng g c examples/ngx_geometry
ng g c examples/ngx_chart_bar
ng g c examples/ngx_chart_line
ng g c examples/ngx_chart_radar
ng g c examples/ngx_chart_scatter
ng g c examples/ngx_chart_area
ng g c examples/ngx_chart_bubble
ng g c examples/ngx_chart_polar
ng g c examples/ngx_chart_mixed


ng g c docs/api-read













ng g c menu

.+ ([a-zA-Z]+): .+;
case '$1' :\nreturn THREE.$1;

([a-zA-Z]+)\?: ([a-z\[\]]+);
@Input() $1 : $2 = null;


@Input\(\) ([a-zA-Z]+) : (.+) =.+
private get$1(def : $2) : $2 {\nconst $1  = this.$1 === null ? def : this.$1;\nreturn $1;\n}\n

^([a-zA-Z]+)\?:.+
([a-zA-Z]+)[\?]*: .+;
$1 : this.get$1(1),

```

```bash
npm install three –save
npm install physijs –save

npm install three-csg-ts –save
npm uninstall three –save
npm uninstall physijs
npm uninstall three-csg-ts –save
npm uninstall physijs-webpack

npm install physijs-webpack
npm install -D worker-loader


npm install @types/three –save-dev
npm install @types/stats-js –save-dev
npm install @types/dat.gui –save-dev
npm install @types/physijs –save-dev
```



ng g c chapter05/page0510
ng g c chapter05/page0511

"editor.wordWrapColumn": 100,


npm run start --node-flags --max-old-space-size=16000 --no-warnings
