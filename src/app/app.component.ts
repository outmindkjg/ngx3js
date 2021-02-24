import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

export interface SearchMenu {
  id: string;
  name: string;
  image: string;
  selected: boolean;
  tags: string;
}

export interface SearchMenuTop {
  name: string;
  children : SearchMenu[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('search') search: ElementRef;

  private subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.changeRouter(event.urlAfterRedirects || event.url);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnInit(): void {
    this.checkSearch('');
  }

  private menuId: string = '';

  changeRouter(url: string) {
    this.menuId = url;
    if (this.menuId !== null && this.menuId !== undefined) {
      this.searchMenu = this.checkSearchMenuSelected(this.searchMenu);
    }
  }

  ngAfterViewInit() {}

  searchFocused: boolean = false;

  searchFocus() {
    this.searchFocused = true;
  }

  searchKeyUp() {
    const filter = this.search.nativeElement.value;
    if (filter != '') {
      this.checkSearch(filter);
    }
  }

  searchBlur() {
    if (this.search.nativeElement.value === '') {
      this.searchFocused = false;
    } else {
      this.checkSearch(this.search.nativeElement.value);
    }
  }

  searchClear() {
    this.search.nativeElement.value = '';
    this.checkSearch('');
  }

  minimal: boolean = false;
  toggleMinimal() {
    this.minimal = !this.minimal;
  }

  checkSearch(filter: string) {
    if (filter.split(' ').join('') === '') {
      this.searchFocused = false;
    } else {
      this.searchFocused = true;
      filter = filter.toLowerCase();
    }
    const searchMenu : SearchMenuTop[] = [];
    Object.entries(this.files).forEach(([key, value]) => {
      const children = this.getSearchChildren(value, filter, key);
      if (children.length > 0) {
        searchMenu.push({
          name: key.split('_').join(' '),
          children: children,
        });
      }
    });
    this.searchMenu = this.checkSearchMenuSelected(searchMenu);
  }

  checkSearchMenuSelected(searchMenu : SearchMenuTop[]) : SearchMenuTop[] {
    let selectedTop : SearchMenuTop = null;
    searchMenu.forEach(menu => {
      let selectedChild : SearchMenu = null;
      menu.children.forEach(child => {
        child.selected = child.id === this.menuId;
        if (child.selected) {
          selectedChild = child;
        }
      });
      if (selectedChild !== null) {
        selectedTop = menu;
        const children : SearchMenu[] = [];
        children.push(selectedChild);
        let isFounded : boolean = false;
        menu.children.forEach(child => {
          if (isFounded) {
            children.push(child);
          }
          if (child === selectedChild) {
            isFounded = true;
          }
        });
        isFounded = false;
        menu.children.forEach(child => {
          if (child === selectedChild) {
            isFounded = true;
          }
          if (!isFounded) {
            children.push(child);
          }
        });
        selectedTop.children = children;
      }
    })

    return searchMenu;
  }

  private getSearchChildren(
    menu: string[],
    keyword: string,
    parentId: string
  ): SearchMenu[] {
    const children: SearchMenu[] = [];
    menu.forEach((id) => {
      const child = this.getSearchItem(id, keyword, parentId);
      if (child !== null) {
        children.push(child);
      }
    });
    return children;
  }

  private getSearchItem(
    id: string,
    keyword: string,
    parentId: string
  ): SearchMenu {
    const tags: string[] = this.tags[id] !== undefined ? this.tags[id] : [];
    if (
      keyword == '' ||
      tags.indexOf(keyword) > -1 ||
      id.indexOf(keyword) > -1
    ) {
      const itemTags: string[] = [];
      id.split('_').forEach((key) => {
        if (parentId !== key && itemTags.indexOf(key) === -1) {
          itemTags.push(key);
        }
      });
      tags.forEach((key) => {
        if (parentId !== key && itemTags.indexOf(key) === -1) {
          itemTags.push(key);
        }
      });
      let image: string = '';
      let url: string = '';
      switch (parentId) {
        case 'webgl':
        case 'webgl / nodes':
        case 'webgl / postprocessing':
        case 'webgl / advanced':
        case 'webgl2':
        case 'webgpu':
        case 'webaudio':
        case 'webxr':
        case 'games':
        case 'physics':
        case 'misc':
        case 'css2d':
        case 'css3d':
        case 'svg':
        case 'tests':
          image = '/assets/examples/screenshots/' + id + '.jpg';
          url = '/examples/' + id;
          break;
        default :
          image = '/assets/examples/screenshots/css2d_label.jpg';
          url = '/' + parentId + '/' + id;
          break;
      }
      return {
        id: url,
        name: id.split('_').join(' '),
        image: image,
        tags: itemTags.join(' / '),
        selected: false,
      };
    } else {
      return null;
    }
  }

  searchMenu: {
    name: string;
    children: SearchMenu[];
  }[] = [];

  private files = {
    webgl: [
      'webgl_animation_cloth',
      'webgl_animation_keyframes',
      'webgl_animation_skinning_blending',
      'webgl_animation_skinning_additive_blending',
      'webgl_animation_skinning_morph',
      'webgl_animation_multiple',
      'webgl_camera',
      'webgl_camera_array',
      'webgl_camera_cinematic',
      'webgl_camera_logarithmicdepthbuffer',
      'webgl_clipping',
      'webgl_clipping_advanced',
      'webgl_clipping_intersection',
      'webgl_clipping_stencil',
      'webgl_decals',
      'webgl_depth_texture',
      'webgl_effects_anaglyph',
      'webgl_effects_ascii',
      'webgl_effects_parallaxbarrier',
      'webgl_effects_peppersghost',
      'webgl_effects_stereo',
      'webgl_framebuffer_texture',
      'webgl_geometries',
      'webgl_geometries_parametric',
      'webgl_geometry_colors',
      'webgl_geometry_colors_lookuptable',
      'webgl_geometry_convex',
      'webgl_geometry_cube',
      'webgl_geometry_dynamic',
      'webgl_geometry_extrude_shapes',
      'webgl_geometry_extrude_shapes2',
      'webgl_geometry_extrude_splines',
      'webgl_geometry_hierarchy',
      'webgl_geometry_hierarchy2',
      'webgl_geometry_minecraft',
      'webgl_geometry_minecraft_ao',
      'webgl_geometry_normals',
      'webgl_geometry_nurbs',
      'webgl_geometry_shapes',
      'webgl_geometry_spline_editor',
      'webgl_geometry_teapot',
      'webgl_geometry_terrain',
      'webgl_geometry_terrain_fog',
      'webgl_geometry_terrain_raycast',
      'webgl_geometry_text',
      'webgl_geometry_text_shapes',
      'webgl_geometry_text_stroke',
      'webgl_helpers',
      'webgl_instancing_dynamic',
      'webgl_instancing_performance',
      'webgl_instancing_raycast',
      'webgl_instancing_scatter',
      'webgl_interactive_buffergeometry',
      'webgl_interactive_cubes',
      'webgl_interactive_cubes_gpu',
      'webgl_interactive_cubes_ortho',
      'webgl_interactive_lines',
      'webgl_interactive_points',
      'webgl_interactive_raycasting_points',
      'webgl_interactive_voxelpainter',
      'webgl_layers',
      'webgl_lensflares',
      'webgl_lightprobe',
      'webgl_lightprobe_cubecamera',
      'webgl_lights_hemisphere',
      'webgl_lights_physical',
      'webgl_lights_pointlights',
      'webgl_lights_pointlights2',
      'webgl_lights_spotlight',
      'webgl_lights_spotlights',
      'webgl_lights_rectarealight',
      'webgl_lines_colors',
      'webgl_lines_dashed',
      'webgl_lines_fat',
      'webgl_lines_fat_wireframe',
      'webgl_lines_sphere',
      'webgl_loader_3dm',
      'webgl_loader_3ds',
      'webgl_loader_3mf',
      'webgl_loader_3mf_materials',
      'webgl_loader_amf',
      'webgl_loader_assimp',
      'webgl_loader_bvh',
      'webgl_loader_collada',
      'webgl_loader_collada_kinematics',
      'webgl_loader_collada_skinning',
      'webgl_loader_draco',
      'webgl_loader_fbx',
      'webgl_loader_fbx_nurbs',
      'webgl_loader_gcode',
      'webgl_loader_gltf',
      'webgl_loader_gltf_compressed',
      'webgl_loader_gltf_extensions',
      'webgl_loader_gltf_variants',
      'webgl_loader_imagebitmap',
      'webgl_loader_kmz',
      'webgl_loader_ldraw',
      'webgl_loader_lwo',
      'webgl_loader_md2',
      'webgl_loader_md2_control',
      'webgl_loader_mdd',
      'webgl_loader_mmd',
      'webgl_loader_mmd_pose',
      'webgl_loader_mmd_audio',
      'webgl_loader_nrrd',
      'webgl_loader_obj',
      'webgl_loader_obj_mtl',
      'webgl_loader_pcd',
      'webgl_loader_pdb',
      'webgl_loader_ply',
      'webgl_loader_prwm',
      'webgl_loader_stl',
      'webgl_loader_svg',
      'webgl_loader_tilt',
      'webgl_loader_texture_basis',
      'webgl_loader_texture_dds',
      'webgl_loader_texture_exr',
      'webgl_loader_texture_hdr',
      'webgl_loader_texture_ktx',
      'webgl_loader_texture_ktx2',
      'webgl_loader_texture_lottie',
      'webgl_loader_texture_pvrtc',
      'webgl_loader_texture_rgbm',
      'webgl_loader_texture_tga',
      'webgl_loader_ttf',
      'webgl_loader_vox',
      'webgl_loader_vrm',
      'webgl_loader_vrml',
      'webgl_loader_vtk',
      'webgl_loader_x',
      'webgl_loader_xyz',
      'webgl_lod',
      'webgl_marchingcubes',
      'webgl_materials',
      'webgl_materials_blending',
      'webgl_materials_blending_custom',
      'webgl_materials_bumpmap',
      'webgl_materials_car',
      'webgl_materials_channels',
      'webgl_materials_cubemap',
      'webgl_materials_cubemap_balls_reflection',
      'webgl_materials_cubemap_balls_refraction',
      'webgl_materials_cubemap_dynamic',
      'webgl_materials_cubemap_refraction',
      'webgl_materials_cubemap_mipmaps',
      'webgl_materials_curvature',
      'webgl_materials_displacementmap',
      'webgl_materials_envmaps',
      'webgl_materials_envmaps_exr',
      'webgl_materials_envmaps_hdr',
      'webgl_materials_envmaps_parallax',
      'webgl_materials_grass',
      'webgl_materials_lightmap',
      'webgl_materials_matcap',
      'webgl_materials_normalmap',
      'webgl_materials_normalmap_object_space',
      'webgl_materials_parallaxmap',
      'webgl_materials_physical_clearcoat',
      'webgl_materials_physical_reflectivity',
      'webgl_materials_physical_sheen',
      'webgl_materials_physical_transmission',
      'webgl_materials_shaders_fresnel',
      'webgl_materials_standard',
      'webgl_materials_subsurface_scattering',
      'webgl_materials_texture_anisotropy',
      'webgl_materials_texture_canvas',
      'webgl_materials_texture_filters',
      'webgl_materials_texture_manualmipmap',
      'webgl_materials_texture_partialupdate',
      'webgl_materials_texture_rotation',
      'webgl_materials_variations_basic',
      'webgl_materials_variations_lambert',
      'webgl_materials_variations_phong',
      'webgl_materials_variations_standard',
      'webgl_materials_variations_physical',
      'webgl_materials_variations_toon',
      'webgl_materials_video',
      'webgl_materials_video_webcam',
      'webgl_materials_wireframe',
      'webgl_math_obb',
      'webgl_math_orientation_transform',
      'webgl_mirror',
      'webgl_modifier_curve',
      'webgl_modifier_curve_instanced',
      'webgl_modifier_edgesplit',
      'webgl_modifier_simplifier',
      'webgl_modifier_tessellation',
      'webgl_morphtargets',
      'webgl_morphtargets_horse',
      'webgl_morphtargets_sphere',
      'webgl_multiple_canvases_circle',
      'webgl_multiple_canvases_complex',
      'webgl_multiple_canvases_grid',
      'webgl_multiple_elements',
      'webgl_multiple_elements_text',
      'webgl_multiple_renderers',
      'webgl_multiple_scenes_comparison',
      'webgl_multiple_views',
      'webgl_panorama_cube',
      'webgl_panorama_equirectangular',
      'webgl_performance',
      'webgl_performance_static',
      'webgl_points_billboards',
      'webgl_points_dynamic',
      'webgl_points_sprites',
      'webgl_points_waves',
      'webgl_raycast_sprite',
      'webgl_raycast_texture',
      'webgl_read_float_buffer',
      'webgl_refraction',
      'webgl_rtt',
      'webgl_sandbox',
      'webgl_shader',
      'webgl_shader_lava',
      'webgl_shader2',
      'webgl_shaders_ocean',
      'webgl_shaders_ocean2',
      'webgl_shaders_sky',
      'webgl_shaders_tonemapping',
      'webgl_shaders_vector',
      'webgl_shading_physical',
      'webgl_shadow_contact',
      'webgl_shadowmap',
      'webgl_shadowmap_performance',
      'webgl_shadowmap_pointlight',
      'webgl_shadowmap_viewer',
      'webgl_shadowmap_vsm',
      'webgl_shadowmesh',
      'webgl_skinning_simple',
      'webgl_sprites',
      'webgl_test_memory',
      'webgl_test_memory2',
      'webgl_tonemapping',
      'webgl_trails',
      'webgl_video_kinect',
      'webgl_video_panorama_equirectangular',
      'webgl_water',
      'webgl_water_flowmap',
    ],
    'webgl / nodes': [
      'webgl_loader_nodes',
      'webgl_materials_compile',
      'webgl_materials_envmaps_hdr_nodes',
      'webgl_materials_envmaps_pmrem_nodes',
      'webgl_materials_nodes',
      'webgl_mirror_nodes',
      'webgl_performance_nodes',
      'webgl_postprocessing_nodes',
      'webgl_postprocessing_nodes_pass',
      'webgl_sprites_nodes',
    ],
    'webgl / postprocessing': [
      'webgl_postprocessing',
      'webgl_postprocessing_3dlut',
      'webgl_postprocessing_advanced',
      'webgl_postprocessing_afterimage',
      'webgl_postprocessing_backgrounds',
      'webgl_postprocessing_crossfade',
      'webgl_postprocessing_dof',
      'webgl_postprocessing_dof2',
      'webgl_postprocessing_fxaa',
      'webgl_postprocessing_glitch',
      'webgl_postprocessing_godrays',
      'webgl_postprocessing_rgb_halftone',
      'webgl_postprocessing_masking',
      'webgl_postprocessing_ssaa',
      'webgl_postprocessing_outline',
      'webgl_postprocessing_pixel',
      'webgl_postprocessing_procedural',
      'webgl_postprocessing_sao',
      'webgl_postprocessing_smaa',
      'webgl_postprocessing_sobel',
      'webgl_postprocessing_ssao',
      'webgl_postprocessing_taa',
      'webgl_postprocessing_unreal_bloom',
      'webgl_postprocessing_unreal_bloom_selective',
    ],
    'webgl / advanced': [
      'webgl_buffergeometry',
      'webgl_buffergeometry_compression',
      'webgl_buffergeometry_custom_attributes_particles',
      'webgl_buffergeometry_drawrange',
      'webgl_buffergeometry_glbufferattribute',
      'webgl_buffergeometry_indexed',
      'webgl_buffergeometry_instancing',
      'webgl_buffergeometry_instancing_billboards',
      'webgl_buffergeometry_instancing_interleaved',
      'webgl_buffergeometry_lines',
      'webgl_buffergeometry_lines_indexed',
      'webgl_buffergeometry_points',
      'webgl_buffergeometry_points_interleaved',
      'webgl_buffergeometry_rawshader',
      'webgl_buffergeometry_selective_draw',
      'webgl_buffergeometry_uint',
      'webgl_custom_attributes',
      'webgl_custom_attributes_lines',
      'webgl_custom_attributes_points',
      'webgl_custom_attributes_points2',
      'webgl_custom_attributes_points3',
      'webgl_gpgpu_birds',
      'webgl_gpgpu_birds_gltf',
      'webgl_gpgpu_water',
      'webgl_gpgpu_protoplanet',
      'webgl_instancing_modified',
      'webgl_lightningstrike',
      'webgl_materials_modified',
      'webgl_raymarching_reflect',
      'webgl_shadowmap_csm',
      'webgl_shadowmap_pcss',
      'webgl_simple_gi',
      'webgl_tiled_forward',
      'webgl_worker_offscreencanvas',
    ],
    webgl2: [
      'webgl2_buffergeometry_attributes_integer',
      'webgl2_materials_texture2darray',
      'webgl2_materials_texture3d',
      'webgl2_multisampled_renderbuffers',
      'webgl2_volume_cloud',
      'webgl2_volume_instancing',
      'webgl2_volume_perlin',
    ],
    webgpu: ['webgpu_sandbox', 'webgpu_rtt', 'webgpu_compute'],
    webaudio: [
      'webaudio_orientation',
      'webaudio_sandbox',
      'webaudio_timing',
      'webaudio_visualizer',
    ],
    webxr: [
      'webxr_ar_cones',
      'webxr_ar_hittest',
      'webxr_ar_paint',
      'webxr_vr_ballshooter',
      'webxr_vr_cubes',
      'webxr_vr_dragging',
      'webxr_vr_handinput',
      'webxr_vr_handinput_cubes',
      'webxr_vr_handinput_profiles',
      'webxr_vr_haptics',
      'webxr_vr_lorenzattractor',
      'webxr_vr_panorama',
      'webxr_vr_panorama_depth',
      'webxr_vr_paint',
      'webxr_vr_rollercoaster',
      'webxr_vr_sandbox',
      'webxr_vr_sculpt',
      'webxr_vr_video',
    ],
    games: ['games_fps'],
    physics: [
      'physics_ammo_break',
      'physics_ammo_cloth',
      'physics_ammo_instancing',
      'physics_ammo_rope',
      'physics_ammo_terrain',
      'physics_ammo_volume',
    ],
    misc: [
      'misc_animation_groups',
      'misc_animation_keys',
      'misc_boxselection',
      'misc_controls_deviceorientation',
      'misc_controls_drag',
      'misc_controls_fly',
      'misc_controls_map',
      'misc_controls_orbit',
      'misc_controls_pointerlock',
      'misc_controls_trackball',
      'misc_controls_transform',
      'misc_exporter_collada',
      'misc_exporter_draco',
      'misc_exporter_gltf',
      'misc_exporter_obj',
      'misc_exporter_ply',
      'misc_exporter_stl',
      'misc_legacy',
      'misc_lookat',
    ],
    css2d: ['css2d_label'],
    css3d: [
      'css3d_molecules',
      'css3d_orthographic',
      'css3d_panorama',
      'css3d_panorama_deviceorientation',
      'css3d_periodictable',
      'css3d_sandbox',
      'css3d_sprites',
      'css3d_youtube',
    ],
    svg: ['svg_lines', 'svg_sandbox'],
    tests: ['webgl_furnace_test', 'webgl_pmrem_test', 'misc_uv_tests'],
    ch01: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch02: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch03: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch04: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch05: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch06: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch07: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch08: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch09: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch10: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch11: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch12: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ],
    ch13: [
      'pg01',
      'pg02',
      'pg03',
      'pg04',
      'pg05',
      'pg06',
      'pg07',
      'pg08',
      'pg09',
      'pg10',
    ]
  };

  tags = {
    webgl_animation_cloth: ['physics', 'integration', 'shadow'],
    webgl_clipping: ['solid'],
    webgl_clipping_advanced: ['solid'],
    webgl_clipping_intersection: ['solid'],
    webgl_clipping_stencil: ['solid'],
    webgl_decals: ['normals'],
    webgl_depth_texture: ['renderTarget'],
    webgl_framebuffer_texture: ['renderTarget'],
    webgl_geometry_colors_lookuptable: ['vertex'],
    webgl_geometry_hierarchy: ['group'],
    webgl_geometry_hierarchy2: ['scene graph'],
    webgl_geometry_minecraft_ao: ['ambient occlusion'],
    webgl_geometry_nurbs: ['curve', 'surface'],
    webgl_geometry_spline_editor: ['curve'],
    webgl_geometry_text: ['font'],
    webgl_geometry_text_shapes: ['font'],
    webgl_geometry_text_stroke: ['font'],
    webgl_helpers: ['normals', 'tangents', 'bounding box'],
    webgl_instancing_performance: ['batching', 'merging'],
    webgl_interactive_buffergeometry: ['raycast', 'outline'],
    webgl_interactive_cubes: ['raycast', 'highlinght'],
    webgl_interactive_cubes_gpu: ['raycast', 'highlight'],
    webgl_interactive_cubes_ortho: ['raycast', 'highlight'],
    webgl_interactive_lines: ['raycast'],
    webgl_interactive_points: ['raycast'],
    webgl_interactive_raycasting_points: ['raycast'],
    webgl_interactive_voxelpainter: ['raycast'],
    webgl_layers: ['groups'],
    webgl_lights_hemisphere: ['directional'],
    webgl_lights_pointlights: ['multiple'],
    webgl_loader_ttf: ['text', 'font'],
    webgl_loader_pdb: ['molecules', 'css2d'],
    webgl_lod: ['level', 'details'],
    webgl_materials_blending: ['alpha'],
    webgl_materials_blending_custom: ['alpha'],
    webgl_materials_channels: ['normal', 'depth', 'rgba packing'],
    webgl_materials_cubemap_mipmaps: ['envmap'],
    webgl_materials_envmaps_parallax: ['onBeforeCompile'],
    webgl_materials_lightmap: ['shadow'],
    webgl_materials_physical_clearcoat: ['anisotropy'],
    webgl_materials_physical_transmission: ['alpha'],
    webgl_materials_shaders_fresnel: ['refraction'],
    webgl_materials_standard: ['pbr'],
    webgl_materials_texture_canvas: ['paint'],
    webgl_materials_texture_filters: ['mipmap', 'min', 'mag'],
    webgl_materials_texture_manualmipmap: ['mipmap', 'min', 'mag'],
    webgl_materials_subsurface_scattering: ['derivatives', 'translucency'],
    webgl_materials_wireframe: ['derivatives'],
    webgl_math_obb: ['intersection', 'bounding'],
    webgl_math_orientation_transform: ['rotation'],
    webgl_mirror: ['reflection'],
    webgl_morphtargets_horse: ['animation'],
    webgl_multiple_elements: ['differential equations', 'physics'],
    webgl_multiple_elements_text: ['font'],
    webgl_panorama_cube: ['envmap'],
    webgl_panorama_equirectangular: ['envmap'],
    webgl_points_billboards: ['particles'],
    webgl_points_dynamic: ['particles'],
    webgl_points_sprites: ['particles', 'snow'],
    webgl_points_waves: ['particles'],
    webgl_read_float_buffer: ['texture'],
    webgl_refraction: ['water'],
    webgl_rtt: ['renderTarget', 'texture'],
    webgl_shaders_ocean: ['water'],
    webgl_shaders_ocean2: ['water'],
    webgl_shaders_sky: ['sun'],
    webgl_shaders_tonemapping: ['hrd'],
    webgl_shaders_vector: ['font'],
    webgl_shading_physical: ['pbr'],
    webgl_shadow_contact: ['onBeforeCompile', 'soft'],
    webgl_shadowmap_viewer: ['directional', 'spot'],
    webgl_skinning_simple: ['animation'],
    webgl_tonemapping: ['gltf'],
    webgl_loader_nodes: ['caustics', 'displace', 'xray'],
    webgl_postprocessing_afterimage: ['trails'],
    webgl_postprocessing_dof: ['bokeh'],
    webgl_postprocessing_dof2: ['bokeh'],
    webgl_postprocessing_fxaa: ['msaa', 'multisampled'],
    webgl_postprocessing_godrays: ['light scattering'],
    webgl_postprocessing_ssaa: ['msaa', 'multisampled'],
    webgl_postprocessing_ssaa_unbiased: ['msaa', 'multisampled'],
    webgl_postprocessing_sao: ['ambient occlusion'],
    webgl_postprocessing_smaa: ['msaa', 'multisampled'],
    webgl_postprocessing_sobel: ['filter', 'edge detection'],
    webgl_postprocessing_ssao: ['ambient occlusion'],
    webgl_postprocessing_unreal_bloom: ['glow'],
    webgl_postprocessing_unreal_bloom_selective: ['glow'],
    webgl_postprocessing_3dlut: ['color grading'],
    webgl_materials_modified: ['onBeforeCompile'],
    webgl_shadowmap_csm: ['cascade'],
    webgl_shadowmap_pcss: ['soft'],
    webgl_simple_gi: ['global illumination'],
    webgl_tiled_forward: ['derivatives'],
    webgl2_multisampled_renderbuffers: ['msaa'],
    physics_ammo_cloth: ['integration'],
    misc_controls_deviceorientation: ['accelerometer', 'sensors'],
    misc_controls_drag: ['translate'],
    misc_controls_map: ['drag'],
    misc_controls_orbit: ['rotation'],
    misc_controls_trackball: ['rotation'],
    misc_controls_transform: ['scale', 'rotate', 'translate'],
  };
}
