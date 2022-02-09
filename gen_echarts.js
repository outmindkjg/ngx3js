#!/usr/bin/env node
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 */

'use strict';

var request = require('request');
const fs = require('fs');
const ChartUtils = require('./chart-utils.js');
const cwd = process.cwd();
const colors = require('colors');

function readUrl(url, callBack) {
	let remoteUrl = url;
	if (url.startsWith('https://') || url.startsWith('http://')) {
		remoteUrl = url;
	} else {
		remoteUrl = 'https://echarts.apache.org/examples' + url;
	}
	request.get(remoteUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(remoteUrl);
			callBack(body);
		} else {
			console.log(remoteUrl, error, response);
		}
	});
}

const $ = {
	get: function (url, callBack) {
		readUrl(url, (txt) => {
			callBack(JSON.parse(txt));
		});
	},
	getJSON: function (url, callBack) {
		readUrl(url, (txt) => {
			callBack(JSON.parse(txt));
		});
	},
	when: function (url1, url2, callBack) {
		readUrl(url1, (txt) => {
			const json1 = JSON.parse(txt);
			readUrl(url2, (txt) => {
				const json2 = JSON.parse(txt);
				callBack(json1, json2);
			});
		});
	},
};

const echarts = {
	number: {
		parseDate: function (dateStr) {
			return new Date(dateStr);
		},
		
	},
	format : {
		formatTime : function(format, time) {
			const date = new Date(time);
			format = format.replace("yyyy", '' + date.getFullYear());
			const month = date.getMonth() + 1;
			format = format.replace("MM", month > 9 ? '' + month : '0' + month);
			const day = date.getDate();
			format = format.replace("dd", day > 9 ? '' + day : '0' + day);
			return format;
		}		
	},
	color: {
		modifyHSL: function (color, hstep) {
			return Utils.transparentize(color, hstep / 360);
		},
	},
};
const Utils = ChartUtils;

function LinearGradient(x, y, x2, y2, colorStops, globalCoord) {
	return {
		colorStops: colorStops || [],
		x: x == null ? 0 : x,
		y: y == null ? 0 : y,
		x2: x2 == null ? 1 : x2,
		y2: y2 == null ? 0 : y2,
		type: 'linear',
		global: globalCoord || false,
	};
}

function RadialGradient(x, y, r, colorStops, globalCoord) {
	return {
		colorStops: colorStops || [],
		x: x == null ? 0 : x,
		y: y == null ? 0 : y,
		r: r == null ? 1 : r,
		type: 'radial',
		global: globalCoord || false,
	};
}

const ROOT_PATH = '';
let option = {};
const myChart = {
	showLoading: function () {},
	hideLoading: function () {},
	setOption: function (option) {
		setTimeout(function () {
			const chartConfig = option;
			chartConfig.actions = actions;
			chartConfig.sharedVar = sharedVar;
			writeJson(fileName, chartConfig);
		}, 100);
	},
	getWidth: function () {
		return 512;
	},
	getHeight: function () {
		return 512;
	},
};

function writeJson(fileName, jsonData, comment, callBack) {
	let data = ChartUtils.stringify(jsonData);
	if (comment !== undefined && comment !== null && comment !== '') {
		data = '/** ' + comment + ' */' + data;
	}
	const filePath =
		cwd +
		'/src/assets/examples/echarts/' +
		fileName +
		(jsonData !== null ? '.json' : '.txt');
	fs.writeFile(filePath, data, (err) => {
		if (err) throw err;
		console.log(filePath);
		if (callBack !== undefined && callBack !== null) {
			callBack();
		}
	});
}

const actions2 = [
	{
		name: 'Randomize',
		handler: (chart) => {
			const options = chart.getOption();
			options.series.forEach((series, idx) => {
				series.data = Utils.numbers({
					count: series.data.length,
					decimals: 1,
					min: 0,
					max: 3500,
				});
			});
			chart.setOption(options);
		},
	},
	{
		name: 'Add Data',
		handler: (chart) => {
			const options = chart.getOption();
			if (options.series.length > 0) {
				options.xAxis.forEach((xAxis) => {
					xAxis.data.push(Utils.months({ count: xAxis.data.length + 1 }).pop());
				});
				options.series.forEach((series, idx) => {
					series.data.push(Math.round(Utils.rand(0, 3500)));
				});
				chart.setOption(options);
			}
		},
	},
	{
		name: 'Remove Data',
		handler: (chart) => {
			const options = chart.getOption();
			if (options.series.length > 0) {
				options.xAxis.forEach((xAxis) => {
					xAxis.data.splice(-1, 1);
				});
				options.series.forEach((series) => {
					series.data.pop();
				});
				chart.setOption(options);
			}
		},
	},
];

let actions3 = [
	{
		name: 'Randomize',
		handler: (chart) => {
			const options = chart.getOption();
			options.series.forEach((series, idx) => {
				series.data[0].value = Math.round(Utils.rand(0, 1) * 1000) / 1000;
			});
			chart.setOption(options);
		},
	},	
];
let actions = [];
const sharedVar = {};

const fileName = 'graphgl-gpu-layout';
const jsHtml = `
function createNodes(widthCount, heightCount) {
	var nodes = [];
	for (var i = 0; i < widthCount; i++) {
	  for (var j = 0; j < heightCount; j++) {
		nodes.push({
		  x: Math.random() * 1024,
		  y: Math.random() * 1024,
		  value: 1
		});
	  }
	}
	return nodes;
  }
  function createEdges(widthCount, heightCount) {
	var edges = [];
	for (var i = 0; i < widthCount; i++) {
	  for (var j = 0; j < heightCount; j++) {
		if (i < widthCount - 1) {
		  edges.push({
			source: i + j * widthCount,
			target: i + 1 + j * widthCount,
			value: 1
		  });
		}
		if (j < heightCount - 1) {
		  edges.push({
			source: i + j * widthCount,
			target: i + (j + 1) * widthCount,
			value: 1
		  });
		}
	  }
	}
	return edges;
  }
  var nodes = createNodes(50, 50);
  var edges = createEdges(50, 50);
  option = {
	series: [
	  {
		type: 'graphGL',
		nodes: nodes,
		edges: edges,
		itemStyle: {
		  color: 'rgba(255,255,255,0.8)'
		},
		lineStyle: {
		  color: 'rgba(255,255,255,0.8)',
		  width: 3
		},
		forceAtlas2: {
		  steps: 5,
		  jitterTolerence: 10,
		  edgeWeightInfluence: 4
		}
	  }
	]
  };

  `;

try {
	eval(
		jsHtml
			.replace(/new echarts\.graphic\./gi, '')
			.replace(/<br( \/|\/|)>/gi, '\\n')
	);
	myChart.setOption(option);
	// sharedVar
} catch (ex) {
	console.log(ex);
}
