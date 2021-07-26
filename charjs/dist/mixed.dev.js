"use strict";

var data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [{
    type: 'bar',
    label: 'Bar Dataset',
    data: [10, 20, 30, 40],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)'
  }, {
    type: 'line',
    label: 'Line Dataset',
    data: [50, 50, 50, 50],
    fill: false,
    borderColor: 'rgb(54, 162, 235)'
  }]
};
var mixedChart = new Chart(ctx, {
  data: {
    datasets: [{
      type: 'bar',
      label: 'Bar Dataset',
      data: [10, 20, 30, 40]
    }, {
      type: 'line',
      label: 'Line Dataset',
      data: [50, 50, 50, 50]
    }],
    labels: ['January', 'February', 'March', 'April']
  },
  options: options
});
var config = {
  type: 'scatter',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};
var mixedChart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      label: 'Bar Dataset',
      data: [10, 20, 30, 40],
      // this dataset is drawn below
      order: 2
    }, {
      label: 'Line Dataset',
      data: [10, 10, 10, 10],
      type: 'line',
      // this dataset is drawn on top
      order: 1
    }],
    labels: ['January', 'February', 'March', 'April']
  },
  options: options
});