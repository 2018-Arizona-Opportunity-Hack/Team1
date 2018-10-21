import * as React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


interface Props {
    chartData: Object;
    location: String;
    legendPosition: String;
    displayTitle: Boolean;
    displayLegend: Boolean;
}

interface State {
    chartData: Object;
}

class Chart extends React.Component<Props, State>{
    constructor(props: Props){
      super(props);
      this.state = {
        chartData:props.chartData
      }
    }
  
    static defaultProps = {
      displayTitle:true,
      displayLegend: true,
      legendPosition:'right',
      location:'City'
    }
  
    render(){
      return (
        <div className="chart">
          <Bar
            data={this.state.chartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'Largest Cities In '+this.props.location,
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
  
          <Line
            data={this.state.chartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'Largest Cities In '+this.props.location,
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
  
          <Pie
            data={this.state.chartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:'Largest Cities In '+this.props.location,
                fontSize:25
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
        </div>
      )
    }
  }
  
  export default Chart;