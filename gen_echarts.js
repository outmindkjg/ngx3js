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

const fileName = 'bar-brush';

const jsHtml = `
let xAxisData = [];
let data1 = [];
let data2 = [];
let data3 = [];
let data4 = [];
for (let i = 0; i < 10; i++) {
  xAxisData.push('Class' + i);
  data1.push(+(Math.random() * 2).toFixed(2));
  data2.push(+(Math.random() * 5).toFixed(2));
  data3.push(+(Math.random() + 0.3).toFixed(2));
  data4.push(+Math.random().toFixed(2));
}
var emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)'
  }
};
option = {
  legend: {
    data: ['bar', 'bar2', 'bar3', 'bar4'],
    left: '10%'
  },
  brush: {
    toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
    xAxisIndex: 0
  },
  toolbox: {
    feature: {
      magicType: {
        type: ['stack']
      },
      dataView: {}
    }
  },
  tooltip: {},
  xAxis: {
    data: xAxisData,
    name: 'X Axis',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false }
  },
  yAxis: {},
  grid: {
    bottom: 100
  },
  series: [
    {
      name: 'bar',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data1
    },
    {
      name: 'bar2',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data2
    },
    {
      name: 'bar3',
      type: 'bar',
      stack: 'two',
      emphasis: emphasisStyle,
      data: data3
    },
    {
      name: 'bar4',
      type: 'bar',
      stack: 'two',
      emphasis: emphasisStyle,
      data: data4
    }
  ]
};
sharedVar.brushSelected = function (params) {
  var brushed = [];
  var brushComponent = params.batch[0];
  for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
    var rawIndices = brushComponent.selected[sIdx].dataIndex;
    brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
  }
  sharedVar.myChart.setOption({
    title: {
      backgroundColor: '#333',
      text: 'SELECTED DATA INDICES: \\n' + brushed.join('\\n'),
      bottom: 0,
      right: '10%',
      width: 100,
      textStyle: {
        fontSize: 12,
        color: '#fff'
      }
    }
  });
};
  `;

try {
	eval(jsHtml.replace(/new echarts\.graphic\./gi,'').replace('<br/>','\\n'));
	myChart.setOption(option);
} catch (ex) {
	console.log(ex);
}
