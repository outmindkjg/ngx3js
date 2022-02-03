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
		data = '/** ' + comment + ' */\n' + data;
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
				switch (idx) {
					case 0:
						series.data = Utils.numbers({
							count: series.data.length,
							decimals: 0,
							min: 9,
							max: 15,
						});
						break;
					case 1:
						series.data = Utils.numbers({
							count: series.data.length,
							decimals: 0,
							min: -2,
							max: 5,
						});
						break;
				}
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
					xAxis.data = Utils.dayofweek({ count: xAxis.data.length + 1 });
				});
				options.series.forEach((series, idx) => {
					switch (idx) {
						case 0:
							series.data.push(Utils.rand(9, 15));
							break;
						case 1:
							series.data.push(Utils.rand(-2, 5));
							break;
					}
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

const actions = [
	{
		name: 'Randomize',
		handler: (chart) => {
			const options = chart.getOption();
			const data = sharedVar.data;
			options.series.forEach((series, idx) => {
				switch (idx) {
					case 0:
						series.data = series.data.map(function (value) {
							return value + Math.round((Math.random() -0.5)* 10) / 10 * 20;
						  });
						break;
					case 1:
						series.data = series.data.map(function (value) {
							return value + Math.round((Math.random() -0.5)* 10) / 10 * 20;
						});
						break;
					}
			});
			chart.setOption(options);
		},
	},
];

const sharedVar = {};

const fileName = 'multiple-x-axis';

const jsHtml = `
const colors = ['#5470C6', '#EE6666'];
option = {
  color: colors,
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {},
  grid: {
    top: 70,
    bottom: 50
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[1]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              'Precipitation  ' +
              params.value +
              (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            );
          }
        }
      },
      // prettier-ignore
      data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
    },
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              'Precipitation  ' +
              params.value +
              (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            );
          }
        }
      },
      // prettier-ignore
      data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Precipitation(2015)',
      type: 'line',
      xAxisIndex: 1,
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Precipitation(2016)',
      type: 'line',
      smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: [
        3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
      ]
    }
  ]
};
  `;

eval(jsHtml);

myChart.setOption(option)