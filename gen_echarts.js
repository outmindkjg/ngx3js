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
					min: 100,
					max: 1700,
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
				options.yAxis.forEach((yAxis) => {
					yAxis.data.push(Utils.dayofweek({ count: yAxis.data.length + 1 }).pop());
				});
				options.series.forEach((series) => {
					const value = Math.round(Utils.rand(500, 1500));
					series.data.push(value);
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
				options.yAxis.forEach((yAxis) => {
					yAxis.data.splice(-1, 1);
				});
				options.series.forEach((series) => {
					series.data.pop();
				});
				chart.setOption(options);
			}
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

const fileName = 'bar-y-category-stack';

const jsHtml = `
option = {
	tooltip: {
	  trigger: 'axis',
	  axisPointer: {
		// Use axis to trigger tooltip
		type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
	  }
	},
	legend: {},
	grid: {
	  left: '3%',
	  right: '4%',
	  bottom: '3%',
	  containLabel: true
	},
	xAxis: {
	  type: 'value'
	},
	yAxis: {
	  type: 'category',
	  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	series: [
	  {
		name: 'Direct',
		type: 'bar',
		stack: 'total',
		label: {
		  show: true
		},
		emphasis: {
		  focus: 'series'
		},
		data: [320, 302, 301, 334, 390, 330, 320]
	  },
	  {
		name: 'Mail Ad',
		type: 'bar',
		stack: 'total',
		label: {
		  show: true
		},
		emphasis: {
		  focus: 'series'
		},
		data: [120, 132, 101, 134, 90, 230, 210]
	  },
	  {
		name: 'Affiliate Ad',
		type: 'bar',
		stack: 'total',
		label: {
		  show: true
		},
		emphasis: {
		  focus: 'series'
		},
		data: [220, 182, 191, 234, 290, 330, 310]
	  },
	  {
		name: 'Video Ad',
		type: 'bar',
		stack: 'total',
		label: {
		  show: true
		},
		emphasis: {
		  focus: 'series'
		},
		data: [150, 212, 201, 154, 190, 330, 410]
	  },
	  {
		name: 'Search Engine',
		type: 'bar',
		stack: 'total',
		label: {
		  show: true
		},
		emphasis: {
		  focus: 'series'
		},
		data: [820, 832, 901, 934, 1290, 1330, 1320]
	  }
	]
  };

  `;

try {
	eval(jsHtml.replace(/new echarts\.graphic\./gi,'').replace('<br/>','\\n'));
	myChart.setOption(option);
} catch (ex) {
	console.log(ex);
}
