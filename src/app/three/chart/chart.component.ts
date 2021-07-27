import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent, GuiControlParam, RendererTimer, ThreeColor, ThreeUtil, ThreeVector } from '../interface';

export interface ChartData {
  datasets: {
    data: (number | { x: number; y: number; r?: number })[];
    type?: string;
    label?: string;
    backgroundColor?: ThreeColor[] | ThreeColor;
    borderColor?: ThreeColor[] | ThreeColor;
    borderWidth?: number;
    fill?: boolean;
    pointBackgroundColor?: ThreeColor;
    pointBorderColor?: ThreeColor;
    pointHoverBackgroundColor?: ThreeColor;
    pointHoverBorderColor?: ThreeColor;
    hoverOffset?: number;
    tension?: number;
    order?: number;
  }[];
  labels?: string[];
  options?: any;
}

@Component({
  selector: 'ngx3js-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent extends BaseComponent<any> implements OnChanges {
  @Input() guiControl: any = null;
  @Input() guiParams: GuiControlParam[] = null;
  @Input() type: string = 'bar';
  @Input() data: ChartData = {
    labels: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6', 'Data7'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ['rgba(255, 99, 132, 0.9)', 'rgba(255, 159, 64, 0.9)', 'rgba(255, 205, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(153, 102, 255, 0.9)', 'rgba(201, 203, 207, 0.9)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
        borderWidth: 1,
      },
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ['rgba(255, 99, 132, 0.9)', 'rgba(255, 159, 64, 0.9)', 'rgba(255, 205, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(153, 102, 255, 0.9)', 'rgba(201, 203, 207, 0.9)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
        borderWidth: 1,
      },
    ],
    
  };

  @Input() options: any = null;

  @Input() width: number = 1000;
  @Input() height: number = 700;
  @Input() depth: number = 200;
  @Input() padding: number = 0.5;

  constructor() {
    super({}, []);
  }

  ngOnInit() {}

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   *
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {}

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of a component's view.
   * It is invoked only once when the view is instantiated.
   */
  ngAfterViewInit() {
    window.setTimeout(() => {
      this.drawChart();
    }, 100);
  }

  private getColorOpacity(colorStr: string): { color: string; opacity: number } {
    if (colorStr.indexOf('rgba') >= 0) {
      let [_, val1, val2, val3, alpha] = (colorStr + ',,,,')
        .replace('(', ',')
        .replace(')', ',')
        .replace(':', ',')
        .replace(/[^A-Za-z\-0-9\.,]/g, '')
        .split(',');
      let opacity = parseFloat(alpha);
      return { color: 'rgb(' + val1 + ',' + val2 + ',' + val3 + ')', opacity: opacity };
    } else {
      return { color: colorStr, opacity: 1 };
    }
  }

  private drawChart() {
    let minValue = Infinity;
    let maxValue = -Infinity;
    let barChartZIdx = 0;
    let barChartXMax = 0;
    this.barChart = null;
    this.data.datasets.forEach((data) => {
      // const tmpValue : number[] = [];
      data.data.forEach((value) => {
        //value = Math.random() * 50 - 20;
        // tmpValue.push(value);
        if (typeof value === 'number') {
          minValue = Math.min(minValue, value);
          maxValue = Math.max(maxValue, value);
        }
      });
      // data.data = tmpValue;
      const type = ThreeUtil.getTypeSafe(data.type, this.type, 'bar');
      switch (type.toLowerCase()) {
        case 'bar':
          barChartXMax = Math.max(barChartXMax, data.data.length);
          barChartZIdx++;
          break;
      }
    });
    let xStep = 0;
    let xZero = 0;
    let yStep = 0;
    let yZero = 0;
    let zStep = 0;
    let zZero = 0;
    if (maxValue <= 10) {
      maxValue = 10;
    } else if (maxValue <= 50) {
      maxValue = 50;
    } else if (maxValue <= 100) {
      maxValue = 100;
    } else if (maxValue <= 200) {
      maxValue = 200;
    } else if (maxValue <= 500) {
      maxValue = 500;
    } else if (maxValue <= 1000) {
      maxValue = 1000;
    }
    if (barChartZIdx > 0) {
      this.barChart = [];
      this.barGeometryInfo = {
        width: (this.width / barChartXMax) * this.padding,
        height: this.height,
        depth: (this.depth / barChartZIdx) * this.padding,
      };
      xStep = -(this.width / barChartXMax) ;
      xZero = xStep * (barChartXMax / 2 - 0.5);
      yStep = 1 / maxValue;
      yZero = this.height / 2;
      zStep = this.depth / barChartZIdx;
      zZero = zStep * (barChartZIdx / 2 - 0.5);
    }
    let barChartCurrIdx = 0;
    this.data.datasets.forEach((data, idx) => {
      const type = ThreeUtil.getTypeSafe(data.type, this.type, 'bar');
      switch (type.toLowerCase()) {
        case 'bar':
          const backgroundColor: { color: ThreeColor; opacity: number }[] = [];
          if (Array.isArray(data.backgroundColor)) {
            data.backgroundColor.forEach(color => {
              if (typeof color === 'string') {
                const { color: strColor, opacity: opacity } = this.getColorOpacity(color);
                backgroundColor.push({
                  color: strColor,
                  opacity: opacity,
                });
              } else {
                backgroundColor.push({
                  color: color,
                  opacity: 1,
                });
              }
            });
          } else {
            if (typeof data.backgroundColor === 'string') {
              const { color: strColor, opacity: opacity } = this.getColorOpacity(data.backgroundColor);
              backgroundColor.push({
                color: strColor,
                opacity: opacity,
              });
            } else {
              backgroundColor.push({
                color: data.backgroundColor,
                opacity: 1,
              });
            }
          }
          const z = zStep * barChartCurrIdx - zZero;
          data.data.forEach((value, idx) => {
            const scaleY = (typeof value === 'number') ? yStep * value : 0;
            const x = xStep * idx - xZero;
            const y = - this.height / 2;
            const colorInfo = backgroundColor[idx % backgroundColor.length];
            this.barChart.push({
              position: { x: x, y: y, z: z },
              scale: { x: 1, y: 0 , z: 1 },
              userData : { type : 'bar', scaleY : scaleY },
              color: colorInfo.color,
              opacity: colorInfo.opacity
            });
          });
          barChartCurrIdx++;
          break;
      }
    });
    this.axisX = { x: 0, y: -this.height / 2, z: 0 };
    this.axisY = { x: this.width / 2, y: 0, z: 0 };
    this.axisZ = { x: 0, y: 0, z: this.depth / 2 };
    this.grideInfo = {
      color1 : 0xff0000,
      color2 : 0xffffff,
      offset : 2,
      widthSegments : 20,
      heightSegments : 20
    }
    this.yLabel = [];
    const labelStep = (maxValue - minValue) / 10;
    for(let i = minValue; i < maxValue ;  i+= labelStep) {
      const y = yStep * i * this.height - this.height / 2;
      this.yLabel.push({
        position : { x : this.width / 2, y : y, z : 0 },
        text : i.toFixed(2)
      })
    }
    this.xLabel = [];
    this.data.labels.forEach((label, idx) => {
      const x = xStep * idx - xZero;
      this.xLabel.push({
        position : { x : -x, y : 0 , z : this.depth / 2 },
        text : label
      })
    })
    this.elapsedTime = 0;
  }

  public axisX: ThreeVector = null;
  public axisY: ThreeVector = null;
  public axisZ: ThreeVector = null;
  public grideInfo: {
    color1 : ThreeColor;
    color2 : ThreeColor;
    offset : number;
    widthSegments : number;
    heightSegments : number;
  } = null;

  public barChart: { position: ThreeVector; scale: ThreeVector; userData : any , color: ThreeColor; opacity: number }[] = null;
  public barGeometryInfo: { width: number; height: number; depth: number } = {
    width : 100, height : 100, depth : 100
  };
  public yLabel: { position: ThreeVector; text : string }[] = null;
  public xLabel: { position: ThreeVector; text : string }[] = null;
  private elapsedTime : number = null;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.elapsedTime !== null && this.elapsedTime < 1) {
      this.elapsedTime = Math.min(1, this.elapsedTime + timer.delta / 10);
      this.meshObject3d.traverse(child => {
        if (child.userData.type !== undefined) {
          switch(child.userData.type) {
            case 'bar' :
              const childScaleY = child.scale.y;
              const targetScaleY = child.userData.scaleY;  
              child.scale.y = (targetScaleY - childScaleY) * this.elapsedTime + childScaleY;
              break;
          }
        }
      })

    }
  }
}
