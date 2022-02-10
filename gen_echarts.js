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

const fileName = 'map-bar-morph';
const jsHtml = `
var data = [
    { name: 'Alabama', value: 4822023 },
    { name: 'Alaska', value: 731449 },
    { name: 'Arizona', value: 6553255 },
    { name: 'Arkansas', value: 2949131 },
    { name: 'California', value: 38041430 },
    { name: 'Colorado', value: 5187582 },
    { name: 'Connecticut', value: 3590347 },
    { name: 'Delaware', value: 917092 },
    { name: 'District of Columbia', value: 632323 },
    { name: 'Florida', value: 19317568 },
    { name: 'Georgia', value: 9919945 },
    { name: 'Hawaii', value: 1392313 },
    { name: 'Idaho', value: 1595728 },
    { name: 'Illinois', value: 12875255 },
    { name: 'Indiana', value: 6537334 },
    { name: 'Iowa', value: 3074186 },
    { name: 'Kansas', value: 2885905 },
    { name: 'Kentucky', value: 4380415 },
    { name: 'Louisiana', value: 4601893 },
    { name: 'Maine', value: 1329192 },
    { name: 'Maryland', value: 5884563 },
    { name: 'Massachusetts', value: 6646144 },
    { name: 'Michigan', value: 9883360 },
    { name: 'Minnesota', value: 5379139 },
    { name: 'Mississippi', value: 2984926 },
    { name: 'Missouri', value: 6021988 },
    { name: 'Montana', value: 1005141 },
    { name: 'Nebraska', value: 1855525 },
    { name: 'Nevada', value: 2758931 },
    { name: 'New Hampshire', value: 1320718 },
    { name: 'New Jersey', value: 8864590 },
    { name: 'New Mexico', value: 2085538 },
    { name: 'New York', value: 19570261 },
    { name: 'North Carolina', value: 9752073 },
    { name: 'North Dakota', value: 699628 },
    { name: 'Ohio', value: 11544225 },
    { name: 'Oklahoma', value: 3814820 },
    { name: 'Oregon', value: 3899353 },
    { name: 'Pennsylvania', value: 12763536 },
    { name: 'Rhode Island', value: 1050292 },
    { name: 'South Carolina', value: 4723723 },
    { name: 'South Dakota', value: 833354 },
    { name: 'Tennessee', value: 6456243 },
    { name: 'Texas', value: 26059203 },
    { name: 'Utah', value: 2855287 },
    { name: 'Vermont', value: 626011 },
    { name: 'Virginia', value: 8185867 },
    { name: 'Washington', value: 6897012 },
    { name: 'West Virginia', value: 1855413 },
    { name: 'Wisconsin', value: 5726398 },
    { name: 'Wyoming', value: 576412 },
    { name: 'Puerto Rico', value: 3667084 }
  ];
  data.sort(function (a, b) {
    return a.value - b.value;
  });
  const mapOption = {
    visualMap: {
      left: 'right',
      min: 500000,
      max: 38000000,
      inRange: {
        // prettier-ignore
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      text: ['High', 'Low'],
      calculable: true
    },
    series: [
      {
        id: 'population',
        type: 'map',
        roam: true,
        map: 'USA',
        animationDurationUpdate: 1000,
        universalTransition: true,
        data: data
      }
    ]
  };
  const barOption = {
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        rotate: 30
      },
      data: data.map(function (item) {
        return item.name;
      })
    },
    animationDurationUpdate: 1000,
    series: {
      type: 'bar',
      id: 'population',
      data: data.map(function (item) {
        return item.value;
      }),
      universalTransition: true
    }
  };
  sharedVar.registerMap = [
	{
		"name": "USA",
		"url": "echarts/files/USA.json",
		"specialAreas" : {
			Alaska: {
			  // 把阿拉斯加移到美国主大陆左下方
			  left: -131,
			  top: 25,
			  width: 15
			},
			Hawaii: {
			  left: -110,
			  top: 28,
			  width: 5
			},
			'Puerto Rico': {
			  // 波多黎各
			  left: -76,
			  top: 26,
			  width: 2
			}
		  }
	}
  ];
  sharedVar.currentOption = null;
  sharedVar.mapOption = Object.assign({}, mapOption);
  sharedVar.barOption = Object.assign({}, barOption);
  let currentOption = mapOption;
  myChart.setOption(mapOption);
  sharedVar.setInterval = function(myChart) {
	return setInterval(function () {
		sharedVar.currentOption = sharedVar.currentOption === sharedVar.mapOption ? sharedVar.barOption : sharedVar.mapOption;
		if (!sharedVar.currentOption.backgroundColor) {
			sharedVar.currentOption.backgroundColor = myChart.getOption().backgroundColor;
		}
		myChart.setOption(sharedVar.currentOption, true);
	}, 2000);
 }

  `;

try {
	eval(
		jsHtml
			.replace(/new echarts\.graphic\./gi, '')
			.replace(/<br( \/|\/|)>/gi, '\\n')
	);
	// myChart.setOption(option);
	// sharedVar
} catch (ex) {
	console.log(ex);
}
