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
	let data = ChartUtils.stringify(jsonData);
	if (comment !== undefined && comment !== null && comment !== '') {
		data = '/** ' + comment + ' */\n' + data;
	}
	const filePath =
		cwd +
		'/src/assets/examples/chartjs/' +
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

const Utils = ChartUtils;

const inputs = {
	min: 8,
	max: 16,
	count: 8,
	decimals: 2,
	continuity: 1
  };
  
  const generateLabels = () => {
	return Utils.months({count: inputs.count});
  };
  
  const generateData = () => {
	const values = Utils.numbers(inputs);
	inputs.from = values;
	return values;
  };
  
  const labels = Utils.months({count: 8});
  const data = {
	labels: generateLabels(),
	datasets: [
	  {
		label: 'D0',
		data: generateData(),
		borderColor: Utils.CHART_COLORS.red,
		backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red),
	  },
	  {
		label: 'D1',
		data: generateData(),
		borderColor: Utils.CHART_COLORS.orange,
		hidden: true,
		backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange),
		fill: '-1'
	  },
	  {
		label: 'D2',
		data: generateData(),
		borderColor: Utils.CHART_COLORS.yellow,
		backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow),
		fill: 1
	  },
	  {
		label: 'D3',
		data: generateData(),
		borderColor: Utils.CHART_COLORS.green,
		backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green),
		fill: false
	  },
	  {
		label: 'D4',
		data: generateData(),
		borderColor: Utils.CHART_COLORS.blue,
		backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue),
		fill: '-1'
	  },
	  {
		label: 'D5',
		data: generateData(),
		borderColor: Utils.CHART_COLORS.purple,
		backgroundColor: Utils.transparentize(Utils.CHART_COLORS.purple),
		fill: '-1'
	  },
	  {
		label: 'D6',
		data: generateData(),
		borderColor: Utils.CHART_COLORS.grey,
		backgroundColor: Utils.transparentize(Utils.CHART_COLORS.grey),
		fill: {value: 85}
	  }
	]
  };

  const sharedVar = {}

  const actions = [
	{
	  name: 'Randomize',
	  handler(chart) {
		const inputs = {
			min: 8,
			max: 16,
			count: 8,
			decimals: 2,
			continuity: 1
		  };
		  const generateLabels = () => {
			return Utils.months({count: inputs.count});
		  };
		  
		  const generateData = () => {
			const values = Utils.numbers(inputs);
			inputs.from = values;
			return values;
		  };
		
		inputs.from = [];
		chart.data.datasets.forEach(dataset => {
		  dataset.data = generateData();
		});
		chart.update();
	  }
	},
	{
	  name: 'Propagate',
	  handler(chart) {
		sharedVar.propagate = !sharedVar.propagate;
		chart.options.plugins.filler.propagate = sharedVar.propagate;
		chart.update();
	  }
	},
	{
	  name: 'Smooth',
	  handler(chart) {
		sharedVar.smooth = !sharedVar.smooth;
		chart.options.elements.line.tension = sharedVar.smooth ? 0.4 : 0;
		chart.update();
	  }
	}
  ];

const config = {
	type: 'radar',
	data: data,
	options: {
	  plugins: {
		filler: {
		  propagate: false
		},
		'samples-filler-analyser': {
		  target: 'chart-analyser'
		}
	  },
	  interaction: {
		intersect: false
	  }
	}
  };

const fileName = 'area-radar';

const chartConfig = config;
chartConfig.actions = actions;

writeJson(fileName, chartConfig);

/*
			//	case 'bar-vertical':
			//	case 'bar-horizontal':
			//	case 'bar-stacked':
			//	case 'bar-stacked-groups':
			//	case 'bar-floating':
			//	case 'bar-border-radius':
			//	case 'line-line':
			//	case 'line-multi-axis':
			//	case 'line-stepped':
			//	case 'line-interpolation':
			//	case 'line-styling':
			//	case 'line-segments':
			//	case 'other-bubble':
			//	case 'other-scatter':
			//	case 'other-scatter-multi-axis':
			//	case 'other-doughnut':
			//	case 'other-pie':
			//	case 'other-multi-series-pie':
			//	case 'other-polar-area':
			//	case 'other-polar-area-center-labels':
			//	case 'other-radar':
			//	case 'other-radar-skip-points':
			//	case 'other-combo-bar-line':
			//	case 'other-stacked-bar-line':
			//	case 'area-line-boundaries':
			//	case 'area-line-datasets':
			//	case 'area-line-drawtime':
			//	case 'area-line-stacked':
			//	case 'area-radar':
				case 'scales-linear-min-max':
				case 'scales-linear-min-max-suggested':
				case 'scales-linear-step-size':
				case 'scales-log':
				case 'scales-time-line':
				case 'scales-time-max-span':
				case 'scales-time-combo':
				case 'scales-stacked':
				case 'scales-grid-options':
				case 'scales-ticks-options':
				case 'scales-titles-options':
				case 'scales-center-options':
				case 'legend-position':
				case 'legend-title':
				case 'legend-point-style':
				case 'legend-events':
				case 'legend-html ':
				case 'title-alignment':
				case 'title-subtitle':
				case 'tooltip-position':
				case 'tooltip-interactions':
				case 'tooltip-point-style':
				case 'tooltip-content':
				case 'tooltip-html':
				case 'scriptable-bar':
				case 'scriptable-bubble':
				case 'scriptable-pie':
				case 'scriptable-line':
				case 'scriptable-polar':
				case 'scriptable-radar':
				case 'animations-delay':
				case 'animations-drop':
				case 'animations-loop ':
				case 'animations-progressive-line ':
				case 'animations-progressive-line-easing ':
				case 'advanced-data-decimation ':
				case 'advanced-progress-bar ':
				case 'advanced-radial-gradient ':
				case 'advanced-linear-gradient ':
				case 'advanced-programmatic-events ':
				case 'advanced-derived-axis-type ':
				case 'advanced-derived-chart-type ':
  */
