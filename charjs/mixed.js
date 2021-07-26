const data = {
  labels: [
    'January',
    'February',
    'March',
    'April'
  ],
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
          data: [50, 50, 50, 50],
      }],
      labels: ['January', 'February', 'March', 'April']
  },
  options: options
});


const config = {
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


const config = {
  type: 'line',
  data: data,
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 100
      }
    }
  }
};


var chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
      plugins: {
          title: {
              display: true,
              text: 'Custom Chart Title'
          }
      }
  }
});


var chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
      plugins: {
          title: {
              display: true,
              text: 'Custom Chart Title',
              padding: {
                  top: 10,
                  bottom: 30
              }
          }
      }
  }
});

var chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
      plugins: {
          subtitle: {
              display: true,
              text: 'Custom Chart Subtitle'
          }
      }
  }
});

/*

enabled	boolean	true	Are on-canvas tooltips enabled?
external	function	null	See external tooltip section.
mode	string	interaction.mode	Sets which elements appear in the tooltip. more....
intersect	boolean	interaction.intersect	If true, the tooltip mode applies only when the mouse position intersects with an element. If false, the mode will be applied at all times.
position	string	'average'	The mode for positioning the tooltip. more...
callbacks	object		See the callbacks section.
itemSort	function		Sort tooltip items. more...
filter	function		Filter tooltip items. more...
backgroundColor
Color
'rgba(0, 0, 0, 0.8)'	Background color of the tooltip.
titleColor
Color
'#fff'	Color of title text.
titleFont	Font	{weight: 'bold'}	See Fonts.
titleAlign	string	'left'	Horizontal alignment of the title text lines. more...
titleSpacing	number	2	Spacing to add to top and bottom of each title line.
titleMarginBottom	number	6	Margin to add on bottom of title section.
bodyColor
Color
'#fff'	Color of body text.
bodyFont	Font	{}	See Fonts.
bodyAlign	string	'left'	Horizontal alignment of the body text lines. more...
bodySpacing	number	2	Spacing to add to top and bottom of each tooltip item.
footerColor
Color
'#fff'	Color of footer text.
footerFont	Font	{weight: 'bold'}	See Fonts.
footerAlign	string	'left'	Horizontal alignment of the footer text lines. more...
footerSpacing	number	2	Spacing to add to top and bottom of each footer line.
footerMarginTop	number	6	Margin to add before drawing the footer.
padding
Padding
6	Padding inside the tooltip.
caretPadding	number	2	Extra distance to move the end of the tooltip arrow away from the tooltip point.
caretSize	number	5	Size, in px, of the tooltip arrow.
cornerRadius	number	6	Radius of tooltip corner curves.
multiKeyBackground
Color
'#fff'	Color to draw behind the colored boxes when multiple items are in the tooltip.
displayColors	boolean	true	If true, color boxes are shown in the tooltip.
boxWidth	number	bodyFont.size	Width of the color box if displayColors is true.
boxHeight	number	bodyFont.size	Height of the color box if displayColors is true.
usePointStyle	boolean	false	Use the corresponding point style (from dataset options) instead of color boxes, ex: star, triangle etc. (size is based on the minimum value between boxWidth and boxHeight).
borderColor
Color
'rgba(0, 0, 0, 0)'	Color of the border.
borderWidth	number	0	Size of the border.
rtl	boolean		true for rendering the tooltip from right to left.
textDirection	string	canvas' default	This will force the text direction 'rtl' or 'ltr on the canvas for rendering the tooltips, regardless of the css specified on the canvas
xAlign	string	undefined	Position of the tooltip caret in the X direction. more
yAlign	string	undefined	Position of the tooltip caret in the Y direction. more
#

*/

let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      data: [1, 2, 3]
    }]
  },
  options: {
    scales: {
      myScale: {
        type: 'logarithmic',
        position: 'right', // `axis` is determined by the position as `'y'`
      }
    }
  }
});


let chart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      yAxisID: 'yAxis'
    }]
  },
  options: {
    scales: {
      xAxis: {
        // The axis for this scale is determined from the first letter of the id as `'x'`
        // It is recommended to specify `position` and / or `axis` explicitly.
        type: 'time',
      }
    }
  }
});


const config = {
  type: 'line',
  data,
  options: {
    scales: {
      x: {
        grid: {
          color: 'red',
          borderColor: 'grey',
          tickColor: 'grey'
        }
      }
    }
  }
};






