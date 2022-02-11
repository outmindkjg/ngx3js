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
	if (url.startsWith('./')) {
		remoteUrl = cwd + '/src/assets/examples/echarts/' + url;
	} else if (url.startsWith('https://') || url.startsWith('http://') ) {
		remoteUrl = url;
	} else {
		remoteUrl = 'https://echarts.apache.org/examples' + url;
	}

	if (remoteUrl.startsWith('https://') || remoteUrl.startsWith('http://') ) {
		request.get(remoteUrl, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(remoteUrl);
				callBack(body);
			} else {
				console.log(remoteUrl, error, response);
			}
		});
	} else {
		fs.readFile(remoteUrl, 'utf-8',(err, body) => {
			if (err) throw err;
			console.log(remoteUrl);
			if (callBack !== undefined && callBack !== null) {
				callBack(body);
			}
		});
	}
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

let actions = [];
let sharedVar = {};

const fileName = 'geo-seatmap-flight';

try {
	$.getJSON('./' + fileName + '.json', function(option) {
		sharedVar = option.sharedVar || {};
		sharedVar = {};
		actions = [
			{
				name: 'Randomize',
				handler: (chart) => {
					const options = chart.getOption();
					options.geo[0].regions = options.geo[0].regions.map((regions, idx) => {
						if (Math.random() > 0.9) {
							return {
								"name": regions.name,
								"silent": true,
								"itemStyle": {
								  "color": "#bf0e08"
								},
								"emphasis": {
								  "itemStyle": {
									"borderColor": "#aaa",
									"borderWidth": 1
								  }
								},
								"select": {
								  "itemStyle": {
									"color": "#bf0e08"
								  }
								}
							}
						} else {
							return { name : regions.name }
						}
					});
					chart.setOption(options);
				},
			},
		];

		myChart.setOption(option);
	});
} catch (ex) {
	console.log(ex);
}
