import React from 'react';
import ReactDOM from 'react-dom';
import { CSVUtils } from './csv-utils/csvParseUtils';
import Chart from './Graphs';

import FileDragAndDrop from './FileDragAndDrop';
// import PivotTableContainer from './pivot';

import '../styles/styles.less';

const data = [['attribute', 'attribute2'], ['value1', 'value2']];

class MainApp extends React.Component {
  constructor(props) {
    super(props);

    this.mCSVUtils = new CSVUtils();

    this.returnFileList = this.returnFileList.bind(this);
    this.state = ({
      files: [],
      chartData: {}
    });
  }

  returnFileList(fileList) {
    this.setState((state) => {
      return { files: fileList.concat(state.files) };
    });
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
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
  componentDidUpdate() {
    if(this.state.files.length !== 0)
    {
      this.mCSVUtils.readCSV(this.state.files[0], (theCSVData) =>
      {
        console.log(theCSVData); // eslint-disable-line
      });
    }
  }

  render() {
    return (
      <div>
        <div className='dragger' >
          <div className='wrapper'>
            {<FileDragAndDrop returnFileList={(fileList) => this.returnFileList(fileList)} /> }
          </div>
        </div>

        <div>
          <nav className='site-header sticky-top py-1'>
            <div className='container d-flex flex-column flex-md-row justify-content-between'>
              <a className='py-6 d-none d-md-inline-block' href='#'> . </a>
            </div>
          </nav>

          <div className='overlay position-relative overflow-hidden p-2 p-md-5 m-md-3 text-center bg-light'>
            <div className='col-md-5 p-lg-5 mx-auto my-5'>
              <h1 className='display-4 font-weight-normal'> Progress Tracker </h1>
              <p className='lead font-weight-normal'> Drag a CSV File to the Screen To Fuck Your Mom!</p>
            </div>
            <div className='product-device box-shadow d-none d-md-block' />
            <div className='product-device product-device-2 box-shadow d-none d-md-block' />
          </div>

          {this.state.files.length < 1 ?
            null :
            <div className = 'quickstat slide'>
              <div className='quick-stats-container'>
                <div className='card-deck mb-5 text-center width-100-percent mr0 ml0'>
                  <div className='card mb-5 box-shadow'>
                    <div className='card-header'>
                      <h4 className='my-0 font-weight-normal'> Bar Chart </h4>
                    </div>
                    <div className='card-body'>
                      <Chart
                        chartData={this.state.chartData}
                        chartType='BAR'
                        location='Massachusetts'
                        legendPosition='bottom'
                      />
                    </div>
                  </div>
                  <div className='card mb-5 box-shadow'>
                    <div className='card-header'>
                      <h4 className='my-0 font-weight-normal'> Line Chart </h4>
                    </div>
                    <div className='card-body'>
                      <Chart
                        chartData={this.state.chartData}
                        chartType='LINE'
                        location='Massachusetts'
                        legendPosition='bottom'
                      />
                    </div>
                  </div>
                  <div className='card mb-5 box-shadow'>
                    <div className='card-header'>
                      <h4 className='my-0 font-weight-normal'> Pie Chart </h4>
                    </div>
                    <div className='card-body'>
                      <Chart
                        chartData={this.state.chartData}
                        chartType='PIE'
                        location='Massachusetts'
                        legendPosition='bottom'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
        {/* <PivotTableContainer data={data} /> */}
      </div>
    );
  }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));