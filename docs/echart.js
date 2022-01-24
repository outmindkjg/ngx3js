#!/usr/bin/env node
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 */

'use strict';

var request = require('request');
const fs = require('fs');
const cwd = process.cwd();
const colors = require('colors');

function readUrl(url, isGl, callBack) {
	let remoteUrl =
		'https://echarts.apache.org/examples/examples/js/' +
		(isGl ? 'gl/' : '') +
		url +
		'.js';
	request.get(remoteUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(remoteUrl);
			callBack(body);
		} else {
			console.log(remoteUrl, error, response);
		}
	});
}

function writeJson(fileName, jsonData, comment, callBack) {
	let data = JSON.stringify(jsonData, null, 2);
	if (comment !== undefined && comment !== null && comment !== '') {
		data = '/** ' + comment + ' */\n' + data;
	}
	fs.writeFile(
		cwd + '/src/assets/examples/echart/' + fileName + (jsonData !== null ? '.json' : '.txt'),
		data,
		(err) => {
			if (err) throw err;
			if (callBack !== undefined && callBack !== null) {
				callBack();
			}
		}
	);
}

const jsonList = [
	{
		title: 'Line',
		children: [
			{ url: 'line-simple', name: 'Basic Line Chart' },
			{ url: 'line-smooth', name: 'Smoothed Line Chart' },
			{ url: 'area-basic', name: 'Basic area chart' },
			{ url: 'line-stack', name: 'Stacked Line Chart' },
			{ url: 'area-stack', name: 'Stacked Area Chart' },
			{ url: 'area-stack-gradient', name: 'Gradient Stacked Area Chart' },
			{ url: 'line-marker', name: 'Temperature Change in the Coming Week' },
			{ url: 'area-pieces', name: 'Area Pieces' },
			{ url: 'data-transform-filter', name: 'Data Transform Filter' },
			{ url: 'line-gradient', name: 'Line Gradient' },
			{ url: 'line-sections', name: 'Distribution of Electricity' },
			{ url: 'area-simple', name: 'Large scale area chart' },
			{ url: 'confidence-band', name: 'Confidence Band' },
			{ url: 'grid-multiple', name: 'Rainfall vs Evaporation' },
			{ url: 'line-aqi', name: 'Beijing AQI' },
			{ url: 'multiple-x-axis', name: 'Multiple X Axes' },
			{ url: 'area-rainfall', name: 'Rainfall' },
			{ url: 'area-time-axis', name: 'Area Chart with Time Axis' },
			{ url: 'dynamic-data2', name: 'Dynamic Data + Time Axis' },
			{ url: 'line-function', name: 'Function Plot' },
			{ url: 'line-race', name: 'Line Race' },
			{ url: 'line-markline', name: 'Line with Marklines' },
			{ url: 'line-style', name: 'Line Style and Item Style' },
			{
				url: 'line-in-cartesian-coordinate-system',
				name: 'Line Chart in Cartesian Coordinate System',
			},
			{ url: 'line-log', name: 'Log Axis' },
			{ url: 'line-step', name: 'Step Line' },
			{ url: 'line-easing', name: 'Line Easing Visualizing' },
			{ url: 'line-y-category', name: 'Line Y Category' },
			{ url: 'line-graphic', name: 'Custom Graphic Component' },
			{ url: 'line-pen', name: 'Click to Add Points' },
			{ url: 'line-draggable', name: 'Try Dragging these Points' },
			{ url: 'line-polar', name: 'Two Value-Axes in Polar' },
			{ url: 'line-polar2', name: 'Two Value-Axes in Polar' },
			{ url: 'line-tooltip-touch', name: 'Tooltip and DataZoom on Mobile' },
			{ url: 'dataset-link', name: 'Share Dataset' },
		],
	},
	{
		title: 'Bar',
		children: [
			{ url: 'bar-background', name: 'Bar with Background' },
			{ url: 'bar-simple', name: 'Basic Bar' },
			{ url: 'bar-tick-align', name: 'Axis Align with Tick' },
			{ url: 'bar-data-color', name: 'Set Style of Single Bar.' },
			{ url: 'bar-waterfall', name: 'Waterfall Chart' },
			{ url: 'bar-negative2', name: 'Bar Chart with Negative Value' },
			{
				url: 'bar-polar-label-radial',
				name: 'Radial Polar Bar Label Position',
			},
			{
				url: 'bar-polar-label-tangential',
				name: 'Tangential Polar Bar Label Position',
			},
			{ url: 'bar-y-category', name: 'World Population' },
			{ url: 'bar-gradient', name: 'Clickable Column Chart with Gradient' },
			{ url: 'bar-label-rotation', name: 'Bar Label Rotation' },
			{ url: 'bar-stack', name: 'Stacked Column Chart' },
			{ url: 'bar-waterfall2', name: 'Waterfall Chart' },
			{ url: 'bar-y-category-stack', name: 'Stacked Horizontal Bar' },
			{ url: 'bar-brush', name: 'Brush Select on Column Chart' },
			{ url: 'bar-negative', name: 'Bar Chart with Negative Value' },
			{ url: 'bar1', name: 'Rainfall and Evaporation' },
			{ url: 'mix-line-bar', name: 'Mixed Line and Bar' },
			{ url: 'mix-zoom-on-value', name: 'Mix Zoom On Value' },
			{ url: 'multiple-y-axis', name: 'Multiple Y Axes' },
			{ url: 'bar-animation-delay', name: 'Animation Delay' },
			{ url: 'bar-drilldown', name: 'Bar Chart Drilldown Animation.' },
			{ url: 'bar-large', name: 'Large Scale Bar Chart' },
			{ url: 'bar-race', name: 'Bar Race' },
			{ url: 'bar-race-country', name: 'Bar Race' },
			{ url: 'bar-rich-text', name: 'Wheater Statistics' },
			{ url: 'dynamic-data', name: 'Dynamic Data' },
			{ url: 'mix-timeline-finance', name: 'Finance Indices 2002' },
			{ url: 'watermark', name: 'Watermark - ECharts Download' },
			{ url: 'bar-polar-real-estate', name: 'Bar Chart on Polar' },
			{ url: 'bar-polar-stack', name: 'Stacked Bar Chart on Polar' },
			{
				url: 'bar-polar-stack-radial',
				name: 'Stacked Bar Chart on Polar(Radial)',
			},
			{ url: 'polar-roundCap', name: 'Rounded Bar on Polar' },
			{ url: 'data-transform-sort-bar', name: 'Sort Data in Bar Chart' },
			{ url: 'dataset-encode0', name: 'Simple Encode' },
			{
				url: 'dataset-series-layout-by',
				name: 'Series Layout By Column or Row',
			},
			{ url: 'dataset-simple0', name: 'Simple Example of Dataset' },
			{ url: 'dataset-simple1', name: 'Dataset in Object Array' },
		],
	},
	{
		title: 'Pie',
		children: [
			{ url: 'pie-simple', name: 'Referer of a Website' },
			{ url: 'pie-borderRadius', name: 'Doughnut Chart with Rounded Corner' },
			{ url: 'pie-doughnut', name: 'Doughnut Chart' },
			{ url: 'pie-custom', name: 'Customized Pie' },
			{ url: 'pie-pattern', name: 'Texture on Pie Chart' },
			{ url: 'pie-roseType', name: 'Nightingale Chart' },
			{ url: 'pie-roseType-simple', name: 'Nightingale Chart' },
			{ url: 'pie-alignTo', name: 'Pie Label Align' },
			{ url: 'pie-labelLine-adjust', name: 'Label Line Adjust' },
			{ url: 'pie-legend', name: 'Pie with Scrollable Legend' },
			{ url: 'pie-rich-text', name: 'Pie Special Label' },
			{ url: 'pie-nest', name: 'Nested Pies' },
			{ url: 'data-transform-multiple-pie', name: 'Partition Data to Pies' },
			{ url: 'dataset-default', name: 'Default arrangement' },
			{ url: 'calendar-pie', name: 'Calendar Pie' },
			{ url: 'dataset-link', name: 'Share Dataset' },
		],
	},
	{
		title: 'Scatter',
		children: [
			{ url: 'scatter-simple', name: 'Basic Scatter Chart' },
			{ url: 'scatter-anscombe-quartet', name: "Anscomb's quartet" },
			{ url: 'scatter-clustering', name: 'Clustering Process' },
			{ url: 'scatter-clustering-process', name: 'Clustering Process' },
			{ url: 'scatter-exponential-regression', name: 'Exponential Regression' },
			{ url: 'scatter-effect', name: 'Effect Scatter Chart' },
			{ url: 'scatter-linear-regression', name: 'Linear Regression' },
			{ url: 'scatter-polynomial-regression', name: 'Polynomial Regression' },
			{ url: 'scatter-punchCard', name: 'Punch Card of Github' },
			{ url: 'scatter-single-axis', name: 'Scatter on Single Axis' },
			{ url: 'scatter-weight', name: 'Distribution of Height and Weight' },
			{ url: 'scatter-aggregate-bar', name: 'Aggregate Scatter to Bar' },
			{ url: 'scatter-label-align-right', name: 'Align Label on the Top' },
			{ url: 'scatter-label-align-top', name: 'Align Label on the Top' },
			{ url: 'scatter-symbol-morph', name: 'Symbol Shape Morph' },
			{ url: 'scatter-large', name: 'Large Scatter' },
			{ url: 'scatter-nebula', name: 'Scatter Nebula' },
			{ url: 'scatter-stream-visual', name: 'Visual interaction with stream' },
			{ url: 'bubble-gradient', name: 'Bubble Chart' },
			{ url: 'scatter-aqi-color', name: 'Scatter Aqi Color' },
			{ url: 'scatter-nutrients', name: 'Scatter Nutrients' },
			{ url: 'scatter-nutrients-matrix', name: 'Scatter Nutrients Matrix' },
			{ url: 'scatter-polar-punchCard', name: 'Punch Card of Github' },
			{
				url: 'scatter-life-expectancy-timeline',
				name: 'Life Expectancy and GDP',
			},
			{
				url: 'scatter-painter-choice',
				name: 'Master Painter Color Choices Throughout History',
			},
			{ url: 'effectScatter-bmap', name: 'Air Quality - Baidu Map' },
			{ url: 'scatter-logarithmic-regression', name: 'Logarithmic Regression' },
			{ url: 'scatter-matrix', name: 'Scatter Matrix' },
			{ url: 'calendar-charts', name: 'Calendar Charts' },
		],
	},
	{
		title: 'GEO/Map',
		children: [
			{ url: 'geo-organ', name: 'Organ Data with SVG' },
			{ url: 'geo-seatmap-flight', name: 'Flight Seatmap with SVG' },
			{ url: 'geo-svg-lines', name: 'GEO SVG Lines' },
			{ url: 'geo-svg-map', name: 'GEO SVG Map' },
			{ url: 'geo-svg-scatter-simple', name: 'GEO SVG Scatter' },
			{ url: 'geo-svg-traffic', name: 'GEO SVG Traffic' },
			{ url: 'lines-bmap', name: 'A Hiking Trail in Hangzhou - Baidu Map' },
			{ url: 'lines-bmap-bus', name: 'Bus Lines of Beijing - Baidu Map' },
			{ url: 'lines-bmap-effect', name: 'Bus Lines of Beijing - Line Effect' },
			{ url: 'lines-ny', name: 'Use lines to draw 1 million ny streets.' },
			{ url: 'map-bar-morph', name: 'Morphing between Map and Bar' },
			{ url: 'map-bin', name: 'Binning on Map' },
			{ url: 'map-HK', name: 'Population Density of HongKong (2011)' },
			{ url: 'map-polygon', name: 'Draw Polygon on Map' },
			{ url: 'map-usa', name: 'USA Population Estimates (2012)' },
			{ url: 'custom-hexbin', name: 'Hexagonal Binning' },
			{ url: 'effectScatter-bmap', name: 'Air Quality - Baidu Map' },
		],
	},
	{
		title: 'Candlestick',
		children: [
			{ url: 'candlestick-simple', name: 'Basic Candlestick' },
			{ url: 'custom-ohlc', name: 'OHLC Chart' },
			{ url: 'candlestick-sh', name: 'ShangHai Index' },
			{ url: 'candlestick-large', name: 'Large Scale Candlestick' },
			{ url: 'candlestick-touch', name: 'Axis Pointer Link and Touch' },
			{ url: 'candlestick-brush', name: 'Candlestick Brush' },
			{ url: 'candlestick-sh-2015', name: 'ShangHai Index, 2015' },
		],
	},
	{
		title: 'Radar',
		children: [
			{ url: 'radar', name: 'Basic Radar Chart' },
			{ url: 'radar-aqi', name: 'AQI - Radar Chart' },
			{ url: 'radar-custom', name: 'Customized Radar Chart' },
			{ url: 'radar2', name: 'Proportion of Browsers' },
			{ url: 'radar-multiple', name: 'Multiple Radar' },
		],
	},
	{
		title: 'Boxplot',
		children: [
			{
				url: 'data-transform-aggregate',
				name: 'Data Transform Simple Aggregate',
			},
			{ url: 'boxplot-light-velocity', name: 'Boxplot Light Velocity' },
			{ url: 'boxplot-light-velocity2', name: 'Boxplot Light Velocity2' },
			{ url: 'boxplot-multi', name: 'Multiple Categories' },
		],
	},
	{
		title: 'Heatmap',
		children: [
			{ url: 'heatmap-cartesian', name: 'Heatmap on Cartesian' },
			{ url: 'heatmap-large', name: 'Heatmap - 20K data' },
			{
				url: 'heatmap-large-piecewise',
				name: 'Heatmap - Discrete Mapping of Color',
			},
			{ url: 'heatmap-bmap', name: 'Heatmap on Baidu Map Extension' },
			{ url: 'calendar-heatmap', name: 'Calendar Heatmap' },
			{ url: 'calendar-vertical', name: 'Calendar Heatmap Vertical' },
		],
	},
	{
		title: 'Graph',
		children: [
			{ url: 'graph-force2', name: 'Force Layout' },
			{ url: 'graph-grid', name: 'Graph on Cartesian' },
			{ url: 'graph-simple', name: 'Simple Graph' },
			{ url: 'graph-force', name: 'Force Layout' },
			{ url: 'graph-label-overlap', name: 'Hide Overlapped Label' },
			{ url: 'graph', name: 'Les Miserables' },
			{ url: 'graph-circular-layout', name: 'Les Miserables' },
			{ url: 'graph-force-dynamic', name: 'Graph Dynamic' },
			{ url: 'graph-life-expectancy', name: 'Graph Life Expectancy' },
			{ url: 'graph-webkit-dep', name: 'Graph Webkit Dep' },
			{ url: 'graph-npm', name: 'NPM Dependencies' },
			{ url: 'calendar-graph', name: 'Calendar Graph' },
		],
	},
	{
		title: 'Lines',
		children: [
			{ url: 'lines-bmap', name: 'A Hiking Trail in Hangzhou - Baidu Map' },
			{ url: 'lines-bmap-bus', name: 'Bus Lines of Beijing - Baidu Map' },
			{ url: 'lines-bmap-effect', name: 'Bus Lines of Beijing - Line Effect' },
			{ url: 'lines-ny', name: 'Use lines to draw 1 million ny streets.' },
		],
	},
	{
		title: 'Tree',
		children: [
			{ url: 'tree-basic', name: 'From Left to Right Tree' },
			{ url: 'tree-legend', name: 'Multiple Trees' },
			{ url: 'tree-orient-bottom-top', name: 'From Bottom to Top Tree' },
			{ url: 'tree-orient-right-left', name: 'From Right to Left Tree' },
			{ url: 'tree-polyline', name: 'Tree with Polyline Edge' },
			{ url: 'tree-radial', name: 'Radial Tree' },
			{ url: 'tree-vertical', name: 'From Top to Bottom Tree' },
		],
	},
	{
		title: 'Treemap',
		children: [
			{
				url: 'treemap-sunburst-transition',
				name: 'Transition between Treemap and Sunburst',
			},
			{ url: 'treemap-disk', name: 'Disk Usage' },
			{ url: 'treemap-drill-down', name: 'ECharts Option Query' },
			{ url: 'treemap-obama', name: 'How $3.7 Trillion is Spent' },
			{ url: 'treemap-show-parent', name: 'Show Parent Labels' },
			{ url: 'treemap-simple', name: 'Basic Treemap' },
			{ url: 'treemap-visual', name: 'Gradient Mapping' },
		],
	},
	{
		title: 'Sunburst',
		children: [
			{ url: 'sunburst-simple', name: 'Basic Sunburst' },
			{ url: 'sunburst-borderRadius', name: 'Sunburst with Rounded Corner' },
			{ url: 'sunburst-label-rotate', name: 'Sunburst Label Rotate' },
			{ url: 'sunburst-monochrome', name: 'Monochrome Sunburst' },
			{ url: 'sunburst-visualMap', name: 'Sunburst VisualMap' },
			{ url: 'sunburst-drink', name: 'Drink Flavors' },
			{ url: 'sunburst-book', name: 'Book Records' },
		],
	},
	{
		title: 'Parallel',
		children: [
			{ url: 'parallel-simple', name: 'Basic Parallel' },
			{ url: 'parallel-aqi', name: 'Parallel Aqi' },
			{ url: 'parallel-nutrients', name: 'Parallel Nutrients' },
			{ url: 'scatter-matrix', name: 'Scatter Matrix' },
		],
	},
	{
		title: 'Sankey',
		children: [
			{ url: 'sankey-simple', name: 'Basic Sankey' },
			{ url: 'sankey-vertical', name: 'Sankey Orient Vertical' },
			{
				url: 'sankey-itemstyle',
				name: 'Specify ItemStyle for Each Node in Sankey',
			},
			{ url: 'sankey-levels', name: 'Sankey with Levels Setting' },
			{ url: 'sankey-energy', name: 'Gradient Edge' },
			{ url: 'sankey-nodeAlign-left', name: 'Node Align Left in Sankey' },
			{ url: 'sankey-nodeAlign-right', name: 'Node Align Right in Sankey' },
		],
	},
	{
		title: 'Funnel',
		children: [
			{ url: 'funnel', name: 'Funnel Chart' },
			{ url: 'funnel-align', name: 'Funnel Compare' },
			{ url: 'funnel-customize', name: 'Customized Funnel' },
			{ url: 'funnel-mutiple', name: 'Multiple Funnels' },
		],
	},
	{
		title: 'Gauge',
		children: [
			{ url: 'gauge', name: 'Gauge Basic chart' },
			{ url: 'gauge-simple', name: 'Simple Gauge' },
			{ url: 'gauge-speed', name: 'Speed Gauge' },
			{ url: 'gauge-progress', name: 'Grogress Gauge' },
			{ url: 'gauge-stage', name: 'Stage Speed Gauge' },
			{ url: 'gauge-grade', name: 'Grade Gauge' },
			{ url: 'gauge-multi-title', name: 'Multi Title Gauge' },
			{ url: 'gauge-temperature', name: 'Temperature Gauge chart' },
			{ url: 'gauge-ring', name: 'Ring Gauge' },
			{ url: 'gauge-barometer', name: 'Gauge Barometer chart' },
			{ url: 'gauge-clock', name: 'Clock' },
			{ url: 'gauge-car', name: 'Gauge Car' },
		],
	},
	{
		title: 'PictorialBar',
		children: [
			{
				url: 'pictorialBar-bar-transition',
				name: 'Transition between pictorialBar and bar',
			},
			{ url: 'pictorialBar-body-fill', name: 'Water Content' },
			{ url: 'pictorialBar-dotted', name: 'Dotted bar' },
			{ url: 'pictorialBar-forest', name: 'Expansion of forest' },
			{ url: 'pictorialBar-hill', name: 'Wish List and Mountain Height' },
			{ url: 'pictorialBar-spirit', name: 'Spirits' },
			{ url: 'pictorialBar-vehicle', name: 'Vehicles' },
			{ url: 'pictorialBar-velocity', name: 'Velocity of Christmas Reindeers' },
		],
	},
	{
		title: 'ThemeRiver',
		children: [
			{ url: 'themeRiver-basic', name: 'ThemeRiver' },
			{ url: 'themeRiver-lastfm', name: 'ThemeRiver Lastfm' },
		],
	},
	{
		title: 'Calendar',
		children: [
			{ url: 'calendar-simple', name: 'Simple Calendar' },
			{ url: 'calendar-heatmap', name: 'Calendar Heatmap' },
			{ url: 'calendar-vertical', name: 'Calendar Heatmap Vertical' },
			{ url: 'calendar-horizontal', name: 'Calendar Heatmap Horizontal' },
			{ url: 'calendar-graph', name: 'Calendar Graph' },
			{ url: 'calendar-lunar', name: 'Calendar Lunar' },
			{ url: 'calendar-pie', name: 'Calendar Pie' },
			{ url: 'calendar-charts', name: 'Calendar Charts' },
			{ url: 'custom-calendar-icon', name: 'Custom Calendar Icon' },
		],
	},
	{
		title: 'Custom',
		children: [
			{ url: 'bar-histogram', name: 'Histogram with Custom Series' },
			{ url: 'custom-profit', name: 'Profit' },
			{ url: 'custom-error-scatter', name: 'Error Scatter on Catesian' },
			{ url: 'custom-bar-trend', name: 'Custom Bar Trend' },
			{ url: 'custom-cartesian-polygon', name: 'Custom Cartesian Polygon' },
			{ url: 'custom-error-bar', name: 'Error Bar on Catesian' },
			{ url: 'custom-profile', name: 'Profile' },
			{ url: 'cycle-plot', name: 'Cycle Plot' },
			{ url: 'custom-gantt-flight', name: 'Gantt Chart of Airport Flights' },
			{ url: 'custom-polar-heatmap', name: 'Polar Heatmap' },
			{ url: 'wind-barb', name: 'Wind Barb' },
			{ url: 'custom-hexbin', name: 'Hexagonal Binning' },
			{ url: 'custom-calendar-icon', name: 'Custom Calendar Icon' },
			{ url: 'custom-wind', name: 'Use custom series to draw wind vectors' },
			{ url: 'custom-gauge', name: 'Custom Gauge' },
			{
				url: 'pie-parliament-transition',
				name: 'Transition of Parliament and Pie Chart',
			},
			{ url: 'circle-packing-with-d3', name: 'Circle Packing with d3' },
			{ url: 'custom-spiral-race', name: 'Custom Spiral Race' },
		],
	},
	{
		title: 'Dataset',
		children: [
			{ url: 'data-transform-sort-bar', name: 'Sort Data in Bar Chart' },
			{ url: 'dataset-encode0', name: 'Simple Encode' },
			{ url: 'data-transform-multiple-pie', name: 'Partition Data to Pies' },
			{ url: 'dataset-default', name: 'Default arrangement' },
			{ url: 'dataset-encode1', name: 'Encode and Matrix' },
			{ url: 'dataset-link', name: 'Share Dataset' },
			{
				url: 'dataset-series-layout-by',
				name: 'Series Layout By Column or Row',
			},
			{ url: 'dataset-simple0', name: 'Simple Example of Dataset' },
			{ url: 'dataset-simple1', name: 'Dataset in Object Array' },
		],
	},
	{
		title: 'DataZoom',
		children: [
			{ url: 'custom-error-scatter', name: 'Error Scatter on Catesian' },
			{ url: 'area-simple', name: 'Large scale area chart' },
			{ url: 'custom-gantt-flight', name: 'Gantt Chart of Airport Flights' },
			{ url: 'wind-barb', name: 'Wind Barb' },
			{ url: 'line-tooltip-touch', name: 'Tooltip and DataZoom on Mobile' },
		],
	},
	{
		title: 'Drag',
		children: [
			{ url: 'line-draggable', name: 'Try Dragging these Points' },
			{ url: 'custom-gantt-flight', name: 'Gantt Chart of Airport Flights' },
		],
	},
	{
		title: 'Rich Text',
		children: [
			{ url: 'pie-rich-text', name: 'Pie Special Label' },
			{ url: 'pie-nest', name: 'Nested Pies' },
			{ url: 'bar-rich-text', name: 'Wheater Statistics' },
		],
	},
	{
		title: '3D Globe',
		children: [
			{ url: 'animating-contour-on-globe', name: 'Animating Contour on Globe' },
			{ url: 'globe-atmosphere', name: 'Globe with Atmosphere' },
			{ url: 'globe-contour-paint', name: 'Contour Paint' },
			{ url: 'globe-displacement', name: 'Globe Displacement' },
			{ url: 'globe-echarts-gl-hello-world', name: 'ECharts-GL Hello World' },
			{ url: 'globe-layers', name: 'Globe Layers' },
			{ url: 'globe-moon', name: 'Moon' },
			{ url: 'iron-globe', name: 'Iron globe' },
		],
	},
	{
		title: '3D Bar',
		children: [
			{ url: 'bar3d-dataset', name: '3D Bar with Dataset' },
			{ url: 'bar3d-global-population', name: 'Bar3D - Global Population' },
			{ url: 'bar3d-myth', name: '星云' },
			{
				url: 'bar3d-noise-modified-from-marpi-demo',
				name: "Noise modified from marpi's demo",
			},
			{ url: 'bar3d-punch-card', name: 'Bar3D - Punch Card' },
			{ url: 'bar3d-simplex-noise', name: 'Bar3D - Simplex Noise' },
			{ url: 'bar3d-voxelize-image', name: 'Voxelize image' },
			{
				url: 'global-population-bar3d-on-globe',
				name: 'Global Population - Bar3D on Globe',
			},
			{ url: 'image-to-bar3d', name: 'Image to Bar3D' },
			{ url: 'metal-bar3d', name: 'Metal Bar3D' },
			{ url: 'stacked-bar3d', name: 'Stacked Bar3D' },
			{ url: 'transparent-bar3d', name: 'Transparent Bar3D' },
		],
	},
	{
		title: '3D Scatter',
		children: [
			{ url: 'scatter3d', name: 'Scatter3D' },
			{ url: 'scatter3D-dataset', name: '3D Scatter with Dataset' },
			{
				url: 'scatter3d-globe-population',
				name: 'Scatter3D - Globe Population',
			},
			{ url: 'scatter3d-orthographic', name: '三维散点图正交投影' },
			{ url: 'scatter3d-scatter', name: '3D Scatter with Scatter Matrix' },
			{ url: 'scatter3d-simplex-noise', name: 'Scatter3D - Simplex Noise' },
		],
	},
	{
		title: '3D Surface',
		children: [
			{ url: 'image-surface-sushuang', name: 'Image Surface Sushuang' },
			{ url: 'metal-surface', name: 'Metal Surface' },
			{ url: 'parametric-surface-rose', name: 'Parametric Surface Rose' },
			{ url: 'simple-surface', name: 'Simple Surface' },
			{ url: 'sphere-parametric-surface', name: 'Sphere Parametric Surface' },
			{ url: 'surface-breather', name: 'Breather' },
			{ url: 'surface-golden-rose', name: 'Golden Rose' },
			{ url: 'surface-leather', name: 'Leather Material' },
			{ url: 'surface-mollusc-shell', name: 'Mollusc Shell' },
			{ url: 'surface-theme-roses', name: 'Theme Roses' },
			{ url: 'surface-wave', name: 'Surface Wave' },
		],
	},
	{
		title: '3D Map',
		children: [
			{ url: 'map3d-buildings', name: 'Buildings' },
			{ url: 'map3d-wood-city', name: 'Wood City' },
		],
	},
	{
		title: '3D Lines',
		children: [
			{ url: 'lines3d-airline-on-globe', name: 'Airline on Globe' },
			{ url: 'lines3d-flights', name: 'Flights' },
			{ url: 'lines3d-flights-gl', name: 'Flights GL' },
			{ url: 'lines3d-flights-on-geo3d', name: 'Flights on Geo3D' },
		],
	},
	{
		title: '3D Line',
		children: [{ url: 'line3d-orthographic', name: 'Orthographic Projection' }],
	},
	{
		title: 'Scatter GL',
		children: [{ url: 'scatterGL-gps', name: '10 million Bulk GPS points' }],
	},
	{
		title: 'Lines GL',
		children: [
			{ url: 'linesGL-ny', name: 'Use linesGL to draw 1 million ny streets.' },
		],
	},
	{
		title: 'Flow GL',
		children: [
			{ url: 'flowGL-noise', name: 'Flow on the cartesian' },
			{ url: 'global-wind-visualization', name: 'Global wind visualization' },
			{
				url: 'global-wind-visualization-2',
				name: 'Global Wind Visualization 2',
			},
		],
	},
	{
		title: 'Graph GL',
		children: [
			{ url: 'graphgl-gpu-layout', name: 'GraphGL GPU Layout' },
			{ url: 'graphgl-large-internet', name: 'GraphGL - Large Internet' },
			{ url: 'graphgl-npm-dep', name: 'NPM Dependencies with graphGL' },
		],
	},
];


jsonList.forEach(info => {
    console.log(info.title);
    let title = info.title;
    info.children.forEach(child => {
        let url = child.url;
        let name = child.name;
        readUrl(url, title.endsWith(' GL') || title.startsWith('3D '), (body) => {
            body = body
                .replace(/\/\*(.*\n|)(.*\n|)(.*\n|)(.*\n|)(.*\n|)(.*\n|)\*\//m, '')
                .trim();
            body = body.replace(/option *= */m, '').trim();
            body = body.replace(/};/m, '}').trim();
            let json = null;
            try {
                eval('json = ' + body);
                // console.log(JSON.stringify(json, null, '\t'));
                writeJson(url, json, null, () => {
                    console.log('Json file modified -> ' + (url + '.json').red  + '('+name+')');
                });
            } catch(ex) {
                writeJson(url, null, body, () => {
                    console.log('Json Error : ' + (url + '.json').red );
                });
            }
        });
    })
});