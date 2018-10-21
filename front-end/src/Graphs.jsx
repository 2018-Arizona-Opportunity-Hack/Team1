import * as React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends React.Component {
    constructor(props){
      super(props);
    }
  
    static defaultProps = {
      displayTitle: true,
      displayLegend: true,
      legendPosition:'right',
      location:'City'
    }
  
    render() {
      const { chartData, chartType, displayTitle, displayLegend, legendPosition, location } = this.props;
      let ChartComponent;

      switch (chartType) {
        case 'BAR':
          ChartComponent = <Bar
            data={chartData}
            options={{
              title:{
                display: displayTitle,
                text: 'Largest Cities In '+ location,
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
                text: 'Largest Cities In '+ location,
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
                text: 'Largest Cities In '+ location,
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
