import * as React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

class Chart extends React.Component {
  constructor(props) {
    super(props);
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
              text: 'Largest Cities In ' + location,
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
              text: 'Largest Cities In ' + location,
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
              text: 'Largest Cities In ' + location,
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
      <div className='chart'>
        {ChartComponent}
      </div>
    );
  }
}

Chart.propTypes = {
  chartData: PropTypes.object,
  chartType: PropTypes.string,
  displayLegend: PropTypes.bool,
  displayTitle: PropTypes.bool,
  legendPosition: PropTypes.string,
  location: PropTypes.string
};

export default Chart;
