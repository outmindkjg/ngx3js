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
 
 const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < 1000; i++) {
  prev += 5 - Math.random() * 10;
  data.push({x: i, y: prev});
  prev2 += 5 - Math.random() * 10;
  data2.push({x: i, y: prev2});
}

const sharedVar = {
	totalDuration : 5000,
	duration : (ctx) => sharedVar.easing(ctx.index / 1000) * 5000 / 1000,
	delay : (ctx) => { sharedVar.easing(ctx.index / 1000) * 5000 },
	previousY : (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y,
	easing : 'helpers.easingEffects.easeOutQuad',
	restart : false,
	restartAnims : (chart) => {
		chart.stop();
		const meta0 = chart.getDatasetMeta(0);
		const meta1 = chart.getDatasetMeta(1);
		for (let i = 0; i < 1000; i++) {
		  const ctx0 = meta0.controller.getContext(i);
		  const ctx1 = meta1.controller.getContext(i);
		  ctx0.xStarted = ctx0.yStarted = false;
		  ctx1.xStarted = ctx1.yStarted = false;
		}
		chart.update();
	  }
  }

const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: sharedVar.duration,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return sharedVar.delay(ctx);
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: sharedVar.duration,
    from: sharedVar.previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return sharedVar.delay(ctx);
    }
  }
};
  
  const actions = [
	{
	  name: 'easeOutQuad',
	  handler(chart) {
		sharedVar.easing = helpers.easingEffects.easeOutQuad;
		sharedVar.restartAnims(chart);
	  }
	},
	{
	  name: 'easeOutCubic',
	  handler(chart) {
		sharedVar.easing = helpers.easingEffects.easeOutCubic;
		sharedVar.restartAnims(chart);
	  }
	},
	{
	  name: 'easeOutQuart',
	  handler(chart) {
		sharedVar.easing = helpers.easingEffects.easeOutQuart;
		sharedVar.restartAnims(chart);
	  }
	},
	{
	  name: 'easeOutQuint',
	  handler(chart) {
		sharedVar.easing = helpers.easingEffects.easeOutQuint;
		sharedVar.restartAnims(chart);
	  }
	},
	{
	  name: 'easeInQuad',
	  handler(chart) {
		sharedVar.easing = helpers.easingEffects.easeInQuad;
		sharedVar.restartAnims(chart);
	  }
	},
	{
	  name: 'easeInCubic',
	  handler(chart) {
		sharedVar.easing = helpers.easingEffects.easeInCubic;
		sharedVar.restartAnims(chart);
	  }
	},
	{
	  name: 'easeInQuart',
	  handler(chart) {
		sharedVar.easing = helpers.easingEffects.easeInQuart;
		sharedVar.restartAnims(chart);
	  }
	},
	{
	  name: 'easeInQuint',
	  handler(chart) {
		sharedVar.easing = helpers.easingEffects.easeInQuint;
		sharedVar.restartAnims(chart);
	  }
	},
  ];

 const config = {
	type: 'line',
	data: {
	  datasets: [{
		borderColor: Utils.CHART_COLORS.red,
		borderWidth: 1,
		radius: 0,
		data: data,
	  },
	  {
		borderColor: Utils.CHART_COLORS.blue,
		borderWidth: 1,
		radius: 0,
		data: data2,
	  }]
	},
	options: {
	  animation,
	  interaction: {
		intersect: false
	  },
	  plugins: {
		legend: false,
		title: {
		  display: true,
		  text: () => sharedVar.easing.name
		}
	  },
	  scales: {
		x: {
		  type: 'linear'
		}
	  }
	}
  };


 const fileName = 'animations-progressive-line-easing';
 // plugins-quadrants
 
 const chartConfig = config;
 chartConfig.actions = actions;
 chartConfig.sharedVar = sharedVar;
 
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
			 //	case 'animations-drop':
			 //	case 'animations-loop ':
			 //	case 'animations-progressive-line ':
			 //	case 'animations-progressive-line-easing ':
			 //	case 'advanced-data-decimation ':
			 //	case 'advanced-progress-bar ':
			 //	case 'advanced-radial-gradient ':
			 //	case 'advanced-linear-gradient ':
			 //	case 'advanced-programmatic-events ':
			 //	case 'advanced-derived-axis-type ':
				 case 'advanced-derived-chart-type ':
				 case 'plugins-chart-area-border':
				 case 'plugins-quadrants':
   */
 