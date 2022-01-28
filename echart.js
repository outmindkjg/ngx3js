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
		cwd + '/src/assets/examples/echarts/' + fileName + (jsonData !== null ? '.json' : '.txt'),
		data,
		(err) => {
			if (err) throw err;
			if (callBack !== undefined && callBack !== null) {
				callBack();
			}
		}
	);
}

const jsonList =[
	{
		"title": "Line",
		"children": [
			{ "url": "line-simple", "name": "Basic Line Chart" },
			{ "url": "line-smooth", "name": "Smoothed Line Chart" },
			{ "url": "area-basic", "name": "Basic area chart" },
			{ "url": "line-stack", "name": "Stacked Line Chart" },
			{ "url": "area-stack", "name": "Stacked Area Chart" },
			{ "url": "area-stack-gradient", "name": "Gradient Stacked Area Chart" },
			{ "url": "line-marker", "name": "Temperature Change in the Coming Week" },
			{ "url": "area-pieces", "name": "Area Pieces" },
			{ "url": "line-gradient", "name": "Line Gradient" },
			{ "url": "line-sections", "name": "Distribution of Electricity" },
			{ "url": "area-simple", "name": "Large scale area chart" },
			{ "url": "confidence-band", "name": "Confidence Band" },
			{ "url": "grid-multiple", "name": "Rainfall vs Evaporation" },
			{ "url": "line-aqi", "name": "Beijing AQI" },
			{ "url": "multiple-x-axis", "name": "Multiple X Axes" },
			{ "url": "area-rainfall", "name": "Rainfall" },
			{ "url": "area-time-axis", "name": "Area Chart with Time Axis" },
			{ "url": "dynamic-data2", "name": "Dynamic Data + Time Axis" },
			{ "url": "line-function", "name": "Function Plot" },
			{ "url": "line-race", "name": "Line Race" },
			{ "url": "line-markline", "name": "Line with Marklines" },
			{ "url": "line-style", "name": "Line Style and Item Style" },
			{
				"url": "line-in-cartesian-coordinate-system",
				"name": "Line Chart in Cartesian Coordinate System"
			},
			{ "url": "line-log", "name": "Log Axis" },
			{ "url": "line-step", "name": "Step Line" },
			{ "url": "line-easing", "name": "Line Easing Visualizing" },
			{ "url": "line-y-category", "name": "Line Y Category" },
			{ "url": "line-graphic", "name": "Custom Graphic Component" },
			{ "url": "line-pen", "name": "Click to Add Points" },
			{ "url": "line-draggable", "name": "Try Dragging these Points" },
			{ "url": "line-polar", "name": "Two Value-Axes in Polar" },
			{ "url": "line-polar2", "name": "Two Value-Axes in Polar" },
			{ "url": "line-tooltip-touch", "name": "Tooltip and DataZoom on Mobile" },
			{ "url": "dataset-link", "name": "Share Dataset" }
		]
	},
	{
		"title": "Bar",
		"children": [
			{ "url": "bar-background", "name": "Bar with Background" },
			{ "url": "bar-simple", "name": "Basic Bar" },
			{ "url": "bar-tick-align", "name": "Axis Align with Tick" },
			{ "url": "bar-data-color", "name": "Set Style of Single Bar." },
			{ "url": "bar-waterfall", "name": "Waterfall Chart" },
			{ "url": "bar-negative2", "name": "Bar Chart with Negative Value" },
			{
				"url": "bar-polar-label-radial",
				"name": "Radial Polar Bar Label Position"
			},
			{
				"url": "bar-polar-label-tangential",
				"name": "Tangential Polar Bar Label Position"
			},
			{ "url": "bar-y-category", "name": "World Population" },
			{ "url": "bar-gradient", "name": "Clickable Column Chart with Gradient" },
			{ "url": "bar-label-rotation", "name": "Bar Label Rotation" },
			{ "url": "bar-stack", "name": "Stacked Column Chart" },
			{ "url": "bar-waterfall2", "name": "Waterfall Chart" },
			{ "url": "bar-y-category-stack", "name": "Stacked Horizontal Bar" },
			{ "url": "bar-brush", "name": "Brush Select on Column Chart" },
			{ "url": "bar-negative", "name": "Bar Chart with Negative Value" },
			{ "url": "bar1", "name": "Rainfall and Evaporation" },
			{ "url": "mix-line-bar", "name": "Mixed Line and Bar" },
			{ "url": "mix-zoom-on-value", "name": "Mix Zoom On Value" },
			{ "url": "multiple-y-axis", "name": "Multiple Y Axes" },
			{ "url": "bar-animation-delay", "name": "Animation Delay" },
			{ "url": "bar-drilldown", "name": "Bar Chart Drilldown Animation." },
			{ "url": "bar-race", "name": "Bar Race" },
			{ "url": "bar-race-country", "name": "Bar Race" },
			{ "url": "bar-rich-text", "name": "Wheater Statistics" },
			{ "url": "dynamic-data", "name": "Dynamic Data" },
			{ "url": "mix-timeline-finance", "name": "Finance Indices 2002" },
			{ "url": "watermark", "name": "Watermark - ECharts Download" },
			{ "url": "bar-polar-real-estate", "name": "Bar Chart on Polar" },
			{ "url": "bar-polar-stack", "name": "Stacked Bar Chart on Polar" },
			{
				"url": "bar-polar-stack-radial",
				"name": "Stacked Bar Chart on Polar(Radial)"
			},
			{ "url": "polar-roundCap", "name": "Rounded Bar on Polar" },
			{ "url": "dataset-encode0", "name": "Simple Encode" },
			{
				"url": "dataset-series-layout-by",
				"name": "Series Layout By Column or Row"
			},
			{ "url": "dataset-simple0", "name": "Simple Example of Dataset" },
			{ "url": "dataset-simple1", "name": "Dataset in Object Array" }
		]
	},
	{
		"title": "Pie",
		"children": [
			{ "url": "pie-simple", "name": "Referer of a Website" },
			{ "url": "pie-borderRadius", "name": "Doughnut Chart with Rounded Corner" },
			{ "url": "pie-doughnut", "name": "Doughnut Chart" },
			{ "url": "pie-custom", "name": "Customized Pie" },
			{ "url": "pie-pattern", "name": "Texture on Pie Chart" },
			{ "url": "pie-roseType", "name": "Nightingale Chart" },
			{ "url": "pie-roseType-simple", "name": "Nightingale Chart" },
			{ "url": "pie-alignTo", "name": "Pie Label Align" },
			{ "url": "pie-labelLine-adjust", "name": "Label Line Adjust" },
			{ "url": "pie-legend", "name": "Pie with Scrollable Legend" },
			{ "url": "pie-rich-text", "name": "Pie Special Label" },
			{ "url": "pie-nest", "name": "Nested Pies" },
			{ "url": "dataset-default", "name": "Default arrangement" },
			{ "url": "calendar-pie", "name": "Calendar Pie" },
			{ "url": "dataset-link", "name": "Share Dataset" }
		]
	},
	{
		"title": "Scatter",
		"children": [
			{ "url": "scatter-simple", "name": "Basic Scatter Chart" },
			{ "url": "scatter-anscombe-quartet", "name": "Anscomb's quartet" },
			{ "url": "scatter-clustering", "name": "Clustering Process" },
			{ "url": "scatter-effect", "name": "Effect Scatter Chart" },
			{ "url": "scatter-punchCard", "name": "Punch Card of Github" },
			{ "url": "scatter-single-axis", "name": "Scatter on Single Axis" },
			{ "url": "scatter-weight", "name": "Distribution of Height and Weight" },
			{ "url": "scatter-aggregate-bar", "name": "Aggregate Scatter to Bar" },
			{ "url": "scatter-label-align-right", "name": "Align Label on the Top" },
			{ "url": "scatter-label-align-top", "name": "Align Label on the Top" },
			{ "url": "scatter-symbol-morph", "name": "Symbol Shape Morph" },
			{ "url": "scatter-stream-visual", "name": "Visual interaction with stream" },
			{ "url": "bubble-gradient", "name": "Bubble Chart" },
			{ "url": "scatter-aqi-color", "name": "Scatter Aqi Color" },
			{ "url": "scatter-nutrients", "name": "Scatter Nutrients" },
			{ "url": "scatter-nutrients-matrix", "name": "Scatter Nutrients Matrix" },
			{ "url": "scatter-polar-punchCard", "name": "Punch Card of Github" },
			{
				"url": "scatter-life-expectancy-timeline",
				"name": "Life Expectancy and GDP"
			},
			{
				"url": "scatter-painter-choice",
				"name": "Master Painter Color Choices Throughout History"
			},
			{ "url": "scatter-matrix", "name": "Scatter Matrix" },
			{ "url": "calendar-charts", "name": "Calendar Charts" }
		]
	},
	{
		"title": "GEO/Map",
		"children": [
			{ "url": "geo-organ", "name": "Organ Data with SVG" },
			{ "url": "geo-seatmap-flight", "name": "Flight Seatmap with SVG" },
			{ "url": "geo-svg-lines", "name": "GEO SVG Lines" },
			{ "url": "geo-svg-map", "name": "GEO SVG Map" },
			{ "url": "geo-svg-scatter-simple", "name": "GEO SVG Scatter" },
			{ "url": "geo-svg-traffic", "name": "GEO SVG Traffic" }
		]
	},
	{
		"title": "Candlestick",
		"children": [
			{ "url": "candlestick-simple", "name": "Basic Candlestick" },
			{ "url": "candlestick-sh", "name": "ShangHai Index" },
			{ "url": "candlestick-touch", "name": "Axis Pointer Link and Touch" },
			{ "url": "candlestick-brush", "name": "Candlestick Brush" },
			{ "url": "candlestick-sh-2015", "name": "ShangHai Index, 2015" }
		]
	},
	{
		"title": "Radar",
		"children": [
			{ "url": "radar", "name": "Basic Radar Chart" },
			{ "url": "radar-aqi", "name": "AQI - Radar Chart" },
			{ "url": "radar-custom", "name": "Customized Radar Chart" },
			{ "url": "radar2", "name": "Proportion of Browsers" },
			{ "url": "radar-multiple", "name": "Multiple Radar" }
		]
	},
	{
		"title": "Heatmap",
		"children": [
			{ "url": "heatmap-cartesian", "name": "Heatmap on Cartesian" },
			{ "url": "heatmap-large", "name": "Heatmap - 20K data" },
			{
				"url": "heatmap-large-piecewise",
				"name": "Heatmap - Discrete Mapping of Color"
			},
			{ "url": "calendar-heatmap", "name": "Calendar Heatmap" },
			{ "url": "calendar-vertical", "name": "Calendar Heatmap Vertical" }
		]
	},
	{
		"title": "Graph",
		"children": [
			{ "url": "graph-force2", "name": "Force Layout" },
			{ "url": "graph-grid", "name": "Graph on Cartesian" },
			{ "url": "graph-simple", "name": "Simple Graph" },
			{ "url": "graph-force", "name": "Force Layout" },
			{ "url": "graph-label-overlap", "name": "Hide Overlapped Label" },
			{ "url": "graph", "name": "Les Miserables" },
			{ "url": "graph-circular-layout", "name": "Les Miserables" },
			{ "url": "graph-force-dynamic", "name": "Graph Dynamic" },
			{ "url": "graph-webkit-dep", "name": "Graph Webkit Dep" },
			{ "url": "graph-npm", "name": "NPM Dependencies" },
			{ "url": "calendar-graph", "name": "Calendar Graph" }
		]
	},
	{
		"title": "Tree",
		"children": [
			{ "url": "tree-basic", "name": "From Left to Right Tree" },
			{ "url": "tree-legend", "name": "Multiple Trees" },
			{ "url": "tree-orient-bottom-top", "name": "From Bottom to Top Tree" },
			{ "url": "tree-orient-right-left", "name": "From Right to Left Tree" },
			{ "url": "tree-polyline", "name": "Tree with Polyline Edge" },
			{ "url": "tree-radial", "name": "Radial Tree" },
			{ "url": "tree-vertical", "name": "From Top to Bottom Tree" }
		]
	},
	{
		"title": "Treemap",
		"children": [
			{
				"url": "treemap-sunburst-transition",
				"name": "Transition between Treemap and Sunburst"
			},
			{ "url": "treemap-disk", "name": "Disk Usage" },
			{ "url": "treemap-drill-down", "name": "ECharts Option Query" },
			{ "url": "treemap-obama", "name": "How $3.7 Trillion is Spent" },
			{ "url": "treemap-show-parent", "name": "Show Parent Labels" },
			{ "url": "treemap-simple", "name": "Basic Treemap" },
			{ "url": "treemap-visual", "name": "Gradient Mapping" }
		]
	},
	{
		"title": "Sunburst",
		"children": [
			{ "url": "sunburst-simple", "name": "Basic Sunburst" },
			{ "url": "sunburst-borderRadius", "name": "Sunburst with Rounded Corner" },
			{ "url": "sunburst-label-rotate", "name": "Sunburst Label Rotate" },
			{ "url": "sunburst-monochrome", "name": "Monochrome Sunburst" },
			{ "url": "sunburst-visualMap", "name": "Sunburst VisualMap" },
			{ "url": "sunburst-drink", "name": "Drink Flavors" },
			{ "url": "sunburst-book", "name": "Book Records" }
		]
	},
	{
		"title": "Parallel",
		"children": [
			{ "url": "parallel-simple", "name": "Basic Parallel" },
			{ "url": "parallel-aqi", "name": "Parallel Aqi" },
			{ "url": "parallel-nutrients", "name": "Parallel Nutrients" },
			{ "url": "scatter-matrix", "name": "Scatter Matrix" }
		]
	},
	{
		"title": "Sankey",
		"children": [
			{ "url": "sankey-simple", "name": "Basic Sankey" },
			{ "url": "sankey-vertical", "name": "Sankey Orient Vertical" },
			{
				"url": "sankey-itemstyle",
				"name": "Specify ItemStyle for Each Node in Sankey"
			},
			{ "url": "sankey-levels", "name": "Sankey with Levels Setting" },
			{ "url": "sankey-energy", "name": "Gradient Edge" },
			{ "url": "sankey-nodeAlign-left", "name": "Node Align Left in Sankey" },
			{ "url": "sankey-nodeAlign-right", "name": "Node Align Right in Sankey" }
		]
	},
	{
		"title": "Funnel",
		"children": [
			{ "url": "funnel", "name": "Funnel Chart" },
			{ "url": "funnel-align", "name": "Funnel Compare" },
			{ "url": "funnel-customize", "name": "Customized Funnel" },
			{ "url": "funnel-mutiple", "name": "Multiple Funnels" }
		]
	},
	{
		"title": "Gauge",
		"children": [
			{ "url": "gauge", "name": "Gauge Basic chart" },
			{ "url": "gauge-simple", "name": "Simple Gauge" },
			{ "url": "gauge-speed", "name": "Speed Gauge" },
			{ "url": "gauge-progress", "name": "Grogress Gauge" },
			{ "url": "gauge-stage", "name": "Stage Speed Gauge" },
			{ "url": "gauge-grade", "name": "Grade Gauge" },
			{ "url": "gauge-multi-title", "name": "Multi Title Gauge" },
			{ "url": "gauge-temperature", "name": "Temperature Gauge chart" },
			{ "url": "gauge-ring", "name": "Ring Gauge" },
			{ "url": "gauge-barometer", "name": "Gauge Barometer chart" },
			{ "url": "gauge-clock", "name": "Clock" },
			{ "url": "gauge-car", "name": "Gauge Car" }
		]
	},
	{
		"title": "PictorialBar",
		"children": [
			{
				"url": "pictorialBar-bar-transition",
				"name": "Transition between pictorialBar and bar"
			},
			{ "url": "pictorialBar-body-fill", "name": "Water Content" },
			{ "url": "pictorialBar-dotted", "name": "Dotted bar" },
			{ "url": "pictorialBar-forest", "name": "Expansion of forest" },
			{ "url": "pictorialBar-hill", "name": "Wish List and Mountain Height" },
			{ "url": "pictorialBar-spirit", "name": "Spirits" },
			{ "url": "pictorialBar-vehicle", "name": "Vehicles" },
			{ "url": "pictorialBar-velocity", "name": "Velocity of Christmas Reindeers" }
		]
	},
	{
		"title": "ThemeRiver",
		"children": [
			{ "url": "themeRiver-basic", "name": "ThemeRiver" },
			{ "url": "themeRiver-lastfm", "name": "ThemeRiver Lastfm" }
		]
	},
	{
		"title": "Calendar",
		"children": [
			{ "url": "calendar-simple", "name": "Simple Calendar" },
			{ "url": "calendar-heatmap", "name": "Calendar Heatmap" },
			{ "url": "calendar-vertical", "name": "Calendar Heatmap Vertical" },
			{ "url": "calendar-horizontal", "name": "Calendar Heatmap Horizontal" },
			{ "url": "calendar-graph", "name": "Calendar Graph" },
			{ "url": "calendar-lunar", "name": "Calendar Lunar" },
			{ "url": "calendar-pie", "name": "Calendar Pie" },
			{ "url": "calendar-charts", "name": "Calendar Charts" },
			{ "url": "custom-calendar-icon", "name": "Custom Calendar Icon" }
		]
	},
	{
		"title": "Dataset",
		"children": [
			{ "url": "dataset-encode0", "name": "Simple Encode" },
			{ "url": "dataset-default", "name": "Default arrangement" },
			{ "url": "dataset-encode1", "name": "Encode and Matrix" },
			{ "url": "dataset-link", "name": "Share Dataset" },
			{
				"url": "dataset-series-layout-by",
				"name": "Series Layout By Column or Row"
			},
			{ "url": "dataset-simple0", "name": "Simple Example of Dataset" },
			{ "url": "dataset-simple1", "name": "Dataset in Object Array" },
			{ "url": "area-simple", "name": "Large scale area chart" },
			{ "url": "line-tooltip-touch", "name": "Tooltip and DataZoom on Mobile" },
			{ "url": "line-draggable", "name": "Try Dragging these Points" }
		]
	},
	{
		"title": "Rich Text",
		"children": [
			{ "url": "pie-rich-text", "name": "Pie Special Label" },
			{ "url": "pie-nest", "name": "Nested Pies" },
			{ "url": "bar-rich-text", "name": "Wheater Statistics" }
		]
	},
	{
		"title": "3D & GL",
		"children": [
			{ "url": "scatter3d-scatter", "name": "3D Scatter with Scatter Matrix" },
			{ "url": "scatter3d", "name": "Scatter3D" },
			{ "url": "globe-displacement", "name": "Globe Displacement" },
			{ "url": "globe-echarts-gl-hello-world", "name": "ECharts-GL Hello World" },
			{ "url": "globe-layers", "name": "Globe Layers" },
			{ "url": "globe-moon", "name": "Moon" },
			{
				"url": "scatter3d-globe-population",
				"name": "Scatter3D - Globe Population"
			},
			{ "url": "flowGL-noise", "name": "Flow on the cartesian" },
			{ "url": "graphgl-gpu-layout", "name": "GraphGL GPU Layout" }
		]
	}
];

// jsonList.forEach(info => {
//     console.log(info.title);
//     let title = info.title;
//     info.children.forEach(child => {
//         let url = child.url;
//         let name = child.name;
//         readUrl(url, title.endsWith(' GL') || title.startsWith('3D '), (body) => {
//             body = body
//                 .replace(/\/\*(.*\n|)(.*\n|)(.*\n|)(.*\n|)(.*\n|)(.*\n|)\*\//m, '')
//                 .trim();
//             body = body.replace(/option *= */m, '').trim();
//             body = body.replace(/};/m, '}').trim();
//             let json = null;
//             try {
//                 eval('json = ' + body);
//                 // console.log(JSON.stringify(json, null, '\t'));
//                 writeJson(url, json, null, () => {
//                     console.log('Json file modified -> ' + (url + '.json').red  + '('+name+')');
//                 });
//             } catch(ex) {
//                 writeJson(url, null, body, () => {
//                     console.log('Json Error : ' + (url + '.json').red );
//                 });
//             }
//         });
//     })
// });

const allList = [];
jsonList.forEach(info => {
     console.log(info.title);
     let title = info.title;
     info.children.forEach(child => {
		 const fileName = child.url + '.json';
		fs.copyFile(cwd + '/src/assets/examples/echart/' + fileName, cwd + '/src/assets/examples/echarts/' + fileName , (err) => {
			if (err) throw err;
			console.log(fileName);
		});
		allList.push(child.url);
	 })
})