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
		cwd + '/src/assets/examples/chartjs/' + fileName + (jsonData !== null ? '.json' : '.txt'),
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
		"title": "Bar Charts",
		"children": [
			{ "url": "bar-vertical", "name": "Vertical Bar Chart" },
			{ "url": "bar-horizontal", "name": "Horizontal Bar Chart" },
			{ "url": "bar-stacked", "name": "Stacked Bar Chart" },
			{ "url": "bar-stacked-groups", "name": "Stacked Bar Chart with Groups" },
			{ "url": "bar-floating", "name": "Floating Bars" },
			{ "url": "bar-border-radius", "name": "Bar Chart Border Radius" }
		]
	},
	{
		"title": "Line Charts",
		"children": [
			{ "url": "line-line", "name": "Line Chart" },
			{ "url": "line-multi-axis", "name": "Multi Axis Line Chart" },
			{ "url": "line-stepped", "name": "Stepped Line Charts" },
			{ "url": "line-interpolation", "name": "Interpolation Modes" },
			{ "url": "line-styling", "name": "Line Styling" },
			{ "url": "line-segments", "name": "Line Segment Styling" }
		]
	},
	{
		"title": "Other charts",
		"children": [
			{ "url": "other-bubble", "name": "Bubble" },
			{ "url": "other-scatter", "name": "Scatter" },
			{ "url": "other-scatter-multi-axis", "name": "Scatter - Multi axis" },
			{ "url": "other-doughnut", "name": "Doughnut" },
			{ "url": "other-pie", "name": "Pie" },
			{ "url": "other-multi-series-pie", "name": "Multi Series Pie" },
			{ "url": "other-polar-area", "name": "Polar area" },
			{ "url": "other-polar-area-center-labels", "name": "Polar area centered point labels" },
			{ "url": "other-radar", "name": "Radar" },
			{ "url": "other-radar-skip-points", "name": "Radar skip points" },
			{ "url": "other-combo-bar-line", "name": "Combo bar/line" },
			{ "url": "other-stacked-bar-line", "name": "Stacked bar/line" }
		]
	},
	{
		"title": "Area charts",
		"children": [
			{ "url": "area-line-boundaries", "name": "Line Chart Boundaries" },
			{ "url": "area-line-datasets", "name": "Line Chart Datasets" },
			{ "url": "area-line-drawtime", "name": "Line Chart drawTime" },
			{ "url": "area-line-stacked", "name": "Line Chart Stacked" },
			{ "url": "area-radar", "name": "Radar Chart Stacked" }
		]
	},
	{
		"title": "Scales",
		"children": [
			{ "url": "scales-linear-min-max", "name": "Linear Scale - Min-Max" },
			{ "url": "scales-linear-min-max-suggested", "name": "Linear Scale - Suggested Min-Max" },
			{ "url": "scales-linear-step-size", "name": "Linear Scale - Step Size" },
			{ "url": "scales-log", "name": "Log Scale" },
			{ "url": "scales-time-line", "name": "Time Scale" },
			{ "url": "scales-time-max-span", "name": "Time Scale - Max Span" },
			{ "url": "scales-time-combo", "name": "Time Scale - Combo Chart" },
			{ "url": "scales-stacked", "name": "Stacked Linear / Category" },
			{ "url": "scales-grid-options", "name": "Grid Configuration" },
			{ "url": "scales-ticks-options", "name": "Tick Configuration" },
			{ "url": "scales-titles-options", "name": "Title Configuration" },
			{ "url": "scales-center-options", "name": "Center Positioning" }
		]
	},
	{
		"title": "Legend",
		"children": [
			{ "url": "legend-position", "name": "Position" },
			{ "url": "legend-title", "name": "Alignment and Title Position" },
			{ "url": "legend-point-style", "name": "Point Style" },
			{ "url": "legend-events", "name": "Events" },
			{ "url": "legend-html", "name": "HTML Legend" }
		]
	},
	{
		"title": "Title",
		"children": [
			{ "url": "title-alignment", "name": "Title Alignment" },
			{ "url": "title-subtitle", "name": "Subtitle Basic" }
		]
	},
	{
		"title": "Tooltip",
		"children": [
			{ "url": "tooltip-position", "name": "Position" },
			{ "url": "tooltip-interactions", "name": "Interaction Modes" },
			{ "url": "tooltip-point-style", "name": "Point Style" },
			{ "url": "tooltip-content", "name": "Custom Tooltip Content" },
			{ "url": "tooltip-html", "name": "External HTML Tooltip" }
		]
	},
	{
		"title": "Scriptable Options",
		"children": [
			{ "url": "scriptable-bar", "name": "Bar Chart" },
			{ "url": "scriptable-bubble", "name": "Bubble Chart" },
			{ "url": "scriptable-pie", "name": "Pie Chart" },
			{ "url": "scriptable-line", "name": "Line Chart" },
			{ "url": "scriptable-polar", "name": "Polar Area Chart" },
			{ "url": "scriptable-radar", "name": "Radar Chart" }
		]
	},
	{
		"title": "Animations",
		"children": [
			{ "url": "animations-delay", "name": "Delay" },
			{ "url": "animations-drop", "name": "Drop" },
			{ "url": "animations-loop", "name": "Loop" },
			{ "url": "animations-progressive-line", "name": "Progressive Line" },
			{ "url": "animations-progressive-line-easing", "name": "Progressive Line With Easing" }
		]
	},
	{
		"title": "Advanced",
		"children": [
			{ "url": "advanced-data-decimation", "name": "Data Decimation" },
			{ "url": "advanced-progress-bar", "name": "Animation Progress Bar" },
			{ "url": "advanced-radial-gradient", "name": "Radial Gradient" },
			{ "url": "advanced-linear-gradient", "name": "Linear Gradient" },
			{ "url": "advanced-programmatic-events", "name": "Programmatic Event Triggers" },
			{ "url": "advanced-derived-axis-type", "name": "Derived Axis Type" },
			{ "url": "advanced-derived-chart-type", "name": "Derived Chart Type" }
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
     let title = info.title;
     info.children.forEach(child => {
		 const fileName = child.url;
		 console.log("case '"+child.url+" ' :");
		 // writeJson(fileName, null ,  title + " / "  + child.url ,() => {
		//	console.log(fileName);
		 // })
	 })
})