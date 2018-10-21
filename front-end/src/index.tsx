import { CSVUtils } from './csv-utils/csvParseUtils'
import Chart from './Graphs';


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3'; 

import FileDragAndDrop from './FileDragAndDrop';
// import PivotTableContainer from './pivot';

import '../styles/styles.less';

interface State {
    files: File[];
    chartData: {}
}

const data = [['attribute', 'attribute2'], ['value1', 'value2']];

class MainApp extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        
        this.returnFileList = this.returnFileList.bind(this);
        this.state = ({
            files: [],
            chartData: {}
        })
    }

    returnFileList(fileList: File[]) {
        this.setState((state) => {
            return { files: fileList.concat(state.files) }
        });
    }

    componentWillMount(){
        this.getChartData();
      }

    getChartData(){
        // Ajax calls here
        this.setState({
          chartData:{
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
            datasets:[
              {
                label:'Population',
                data:[
                  617594,
                  181045,
                  153060,
                  106519,
                  105162,
                  95072
                ],
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ]
              }
            ]
          }
        });
      }

    render() {
        // test code remove
        // var mCSVUtil: CSVUtils = new CSVUtils();
        // mCSVUtil.readCSV("./FL_insurance_sample.csv");
        return (
            <div className='wrapper'>
                <FileDragAndDrop returnFileList={(fileList: File[]) => this.returnFileList(fileList)} />
                {/* <PivotTableContainer data={data}/> */}
                <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
            </div>
        );
    }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));