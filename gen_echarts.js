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
	getJSON : function (url, callBack) {
		readUrl(url, (txt) => {
			callBack(JSON.parse(txt));
		});
	},
	when : function(url1, url2, callBack) {
		readUrl(url1, (txt) => {
			const json1 = JSON.parse(txt);
			readUrl(url2, (txt) => {
				const json2 = JSON.parse(txt);
				callBack(json1, json2);
			});
		});
	}
};

const echarts = {
  number : {
    parseDate : function(dateStr) {
      return new Date(dateStr);
    }
  },
  color : {
    modifyHSL : function(color, hstep) {
      return Utils.transparentize(color, hstep / 360);
    }
  }
}
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
					max: 150,
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
					const value = Math.round(Utils.rand(0, 150));
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

let actions = [];

const sharedVar = {};

const fileName = 'geo-seatmap-flight';
const jsHtml = `
const takenSeatNames = ['26E', '26D', '26C', '25D', '23C', '21A', '20F'];
  option = {
    tooltip: {},
    geo: {
      map: {"name" : "flight-seats", "url" : "echarts/files/flight-seats.svg" },
      roam: true,
      selectedMode: 'multiple',
      layoutCenter: ['50%', '50%'],
      layoutSize: '95%',
      tooltip: {
        show: true
      },
      itemStyle: {
        color: '#fff'
      },
      emphasis: {
        itemStyle: {
          color: undefined,
          borderColor: 'green',
          borderWidth: 2
        },
        label: {
          show: false
        }
      },
      select: {
        itemStyle: {
          color: 'green'
        },
        label: {
          show: false,
          textBorderColor: '#fff',
          textBorderWidth: 2
        }
      },
      regions: makeTakenRegions(takenSeatNames)
    }
  };
  function makeTakenRegions(takenSeatNames) {
    var regions = [];
    for (var i = 0; i < takenSeatNames.length; i++) {
      regions.push({
        name: takenSeatNames[i],
        silent: true,
        itemStyle: {
          color: '#bf0e08'
        },
        emphasis: {
          itemStyle: {
            borderColor: '#aaa',
            borderWidth: 1
          }
        },
        select: {
          itemStyle: {
            color: '#bf0e08'
          }
        }
      });
    }
    return regions;
  }

`;

try {
	eval(jsHtml.replace(/new echarts\.graphic\./gi, '').replace(/<br( \/|\/|)>/gi, '\\n'));
	myChart.setOption(option);
  // sharedVar
} catch (ex) {
	console.log(ex);
}
