import * as React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


interface Props {
    chartData: Object;
    legendPosition: String;
    displayTitle: Boolean;
    displayLegend: Boolean;
    chartType: String;
    title: String;
}

class Chart extends React.Component<Props>{
    constructor(props: Props){
      super(props);
    }
  
    static defaultProps = {
      displayTitle: true,
      displayLegend: true,
      legendPosition:'right',
      title: "Data"
    }
  
    render() {
      const { chartData, chartType, displayTitle, displayLegend, legendPosition, title } = this.props;
      let ChartComponent;

      switch (chartType) {
        case 'BAR':
          ChartComponent = <Bar
            data={chartData}
            options={{
              title:{
                display: displayTitle,
                text: title,
                fontSize: 25
              },
              legend: {
                display: displayLegend,
                position: legendPosition
              }
            }}
          />;
          break;
        case 'LINE':
          ChartComponent = <Line
            data={chartData}
            options={{
              title:{
                display: displayTitle,
                text: title,
                fontSize: 25
              },
              legend: {
                display: displayLegend,
                position: legendPosition
              }
            }}
          />;
          break;
        case 'PIE':
          ChartComponent = <Pie
            data={chartData}
            options={{
              title:{
                display: displayTitle,
                text: title,
                fontSize: 25
              },
              legend:{
                display: displayLegend,
                position: legendPosition
              }
            }}
          />;
          break;
      }
      return (
        <div className="chart">
          {ChartComponent}
        </div>
      )
    }
  }
  
  export default Chart;