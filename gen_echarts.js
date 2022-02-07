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

const fileName = 'scatter-life-expectancy-timeline';
const jsHtml = `
myChart.showLoading();
$.get(ROOT_PATH + '/data/asset/data/life-expectancy.json', function (data) {
  myChart.hideLoading();
  var itemStyle = {
    opacity: 0.8
  };
  var sizeFunction = function (x) {
    var y = Math.sqrt(x / 5e8) + 0.1;
    return y * 80;
  };
  // Schema:
  var schema = [
    { name: 'Income', index: 0, text: '人均收入', unit: '美元' },
    { name: 'LifeExpectancy', index: 1, text: '人均寿命', unit: '岁' },
    { name: 'Population', index: 2, text: '总人口', unit: '' },
    { name: 'Country', index: 3, text: '国家', unit: '' }
  ];
  option = {
    baseOption: {
      timeline: {
        axisType: 'category',
        orient: 'vertical',
        autoPlay: true,
        inverse: true,
        playInterval: 1000,
        left: null,
        right: 0,
        top: 20,
        bottom: 20,
        width: 55,
        height: null,
        symbol: 'none',
        checkpointStyle: {
          borderWidth: 2
        },
        controlStyle: {
          showNextBtn: false,
          showPrevBtn: false
        },
        data: []
      },
      title: [
        {
          text: data.timeline[0],
          textAlign: 'center',
          left: '63%',
          top: '55%',
          textStyle: {
            fontSize: 100
          }
        },
        {
          text: '各国人均寿命与GDP关系演变',
          left: 'center',
          top: 10,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 20
          }
        }
      ],
      tooltip: {
        padding: 5,
        borderWidth: 1,
        formatter: function (obj) {
          var value = obj.value;
          // prettier-ignore
          const schema = sharedVar.schema;
          return schema[3].text + '：' + value[3] + '<br>'
                        + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                        + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>';
        }
      },
      grid: {
        top: 100,
        containLabel: true,
        left: 30,
        right: '110'
      },
      xAxis: {
        type: 'log',
        name: '人均收入',
        max: 100000,
        min: 300,
        nameGap: 25,
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 18
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} $'
        }
      },
      yAxis: {
        type: 'value',
        name: '平均寿命',
        max: 100,
        nameTextStyle: {
          fontSize: 18
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: '{value} 岁'
        }
      },
      visualMap: [
        {
          show: false,
          dimension: 3,
          categories: data.counties,
          inRange: {
            color: (function () {
              // prettier-ignore
              var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
              return colors.concat(colors);
            })()
          }
        }
      ],
      series: [
        {
          type: 'scatter',
          itemStyle: itemStyle,
          data: data.series[0],
          symbolSize: function (val) {
            return sharedVar.sizeFunction(val[2]);
          }
        }
      ],
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'quinticInOut'
    },
    options: []
  };
  
  sharedVar.schema = schema;
  sharedVar.sizeFunction = sizeFunction;

  for (var n = 0; n < data.timeline.length; n++) {
    option.baseOption.timeline.data.push(data.timeline[n]);
    option.options.push({
      title: {
        show: true,
        text: data.timeline[n] + ''
      },
      series: {
        name: data.timeline[n],
        type: 'scatter',
        itemStyle: itemStyle,
        data: data.series[n],
        symbolSize: function (val) {
          return sharedVar.sizeFunction(val[2]);
        }
      }
    });
  }
  myChart.setOption(option);
});

`;

try {
	eval(jsHtml.replace(/new echarts\.graphic\./gi, '').replace(/<br( \/|\/|)>/gi, '\\n'));
	// myChart.setOption(option);
  // sharedVar
} catch (ex) {
	console.log(ex);
}
