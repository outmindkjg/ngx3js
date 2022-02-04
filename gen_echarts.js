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
	let remoteUrl = 'https://echarts.apache.org/examples' + url;
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

const ROOT_PATH = '';
let option = {};
const myChart = {
	showLoading: function () {},
	hideLoading: function () {},
	setOption: function (option) {
		const chartConfig = option;
		chartConfig.actions = actions;
		chartConfig.sharedVar = sharedVar;
		writeJson(fileName, chartConfig);
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

const actions = [
	{
		name: 'Randomize',
		handler: (chart) => {
			const options = chart.getOption();
			options.series.forEach((series, idx) => {
					series.data = Utils.numbers({
						count: series.data.length,
						decimals: 0,
						min: 0,
						max: 200,
					});
			});
			sharedVar.changeData(chart, options);
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
					const value = Math.round(Utils.rand(0, 200));
					series.data.push(value);
				});
				sharedVar.changeData(chart, options);
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
			sharedVar.changeData(chart, options);
		},
	},
];

const actions2 = [
	{
		name: 'Randomize',
		handler: (chart) => {
			const options = chart.getOption();
			const dataset = options.dataset[0];
			dataset.source = dataset.source.map((data, idx) => {
				if (idx === 0) {
					return data;
				} else {
					return data.map((value, no) => {
						if (no === 0) {
							return value;
						} else {
							return Math.round(value + (Math.random() - 0.5) * 30);
						}
					})
				}
			});
			chart.setOption(options);
		},
	}	
];

const sharedVar = {};

const fileName = 'bar1';

const jsHtml = `
option = {
	title: {
	  text: 'Rainfall vs Evaporation',
	  subtext: 'Fake Data'
	},
	tooltip: {
	  trigger: 'axis'
	},
	legend: {
	  data: ['Rainfall', 'Evaporation']
	},
	toolbox: {
	  show: true,
	  feature: {
		dataView: { show: true, readOnly: false },
		magicType: { show: true, type: ['line', 'bar'] },
		restore: { show: true },
		saveAsImage: { show: true }
	  }
	},
	calculable: true,
	xAxis: [
	  {
		type: 'category',
		// prettier-ignore
		data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	  }
	],
	yAxis: [
	  {
		type: 'value'
	  }
	],
	series: [
	  {
		name: 'Rainfall',
		type: 'bar',
		data: [
		  2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
		],
		markPoint: {
		  data: [
			{ type: 'max', name: 'Max' },
			{ type: 'min', name: 'Min' }
		  ]
		},
		markLine: {
		  data: [{ type: 'average', name: 'Avg' }]
		}
	  },
	  {
		name: 'Evaporation',
		type: 'bar',
		data: [
		  2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
		],
		markPoint: {
		  data: [
			{ name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
			{ name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
		  ]
		},
		markLine: {
		  data: [{ type: 'average', name: 'Avg' }]
		}
	  }
	]
  };
  sharedVar.changeData = function( chart , options) {
	let minValue = { name: 'Min', value: Infinity, xAxis: 0, yAxis: 0 };
	let maxValue = { name: 'Max', value: -Infinity, xAxis: 0, yAxis: 0 };
	const data = options.series[1].data;
	data.forEach((value, idx) => {
		if (value > maxValue.value) {
			maxValue.value = value;
			maxValue.xAxis = idx;
			maxValue.yAxis = value;
		}
		if (value < minValue.value) {
			minValue.value = value;
			minValue.xAxis = idx;
			minValue.yAxis = value;
		}
	});
	options.series[1].markPoint.data = [maxValue, minValue];
	chart.setOption(options);
  }

  `;

try {
	eval(jsHtml.replace(/new echarts\.graphic\./gi,'').replace('<br/>','\\n'));
	myChart.setOption(option);
} catch (ex) {
	console.log(ex);
}
