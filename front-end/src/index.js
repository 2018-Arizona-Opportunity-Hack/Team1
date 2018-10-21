
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Chart from './Graphs';
import { CSVUtils } from './csv-utils/csvParseUtils';

import FileDragAndDrop from './FileDragAndDrop';
import PivotTableContainer from './pivot';

import '../styles/styles.less';

const data = [['attribute', 'attribute2'], ['value1', 'value2']];

class MainApp extends React.Component {

  constructor(props) {
    super(props);

    this.mCSVUtils = new CSVUtils();

    this.returnFileList = this.returnFileList.bind(this);
    this.state = ({
      files: [],
      chartData: {},
      loadingVisible: false,
      chartVisible: false
    });
  }

  returnFileList(fileList) {
    this.mMapNeedsRender = true;

    this.setState((state) => {
      return {
        loadingVisible: true,
        files: fileList.concat(state.files) };
    });
  }

  componentWillMount() {
  }

  getChartData() {
    if(this.mTableData === null) return;
    if(!this.mMapNeedsRender) return;

    if(this.messagesEnd !== null) {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    this.mMapNeedsRender = false;

    var numValues = this.mTableData.keyStrings.length;
    this.setState({
      chartData:{
        labels: this.mTableData.keyStrings,
        datasets:[
          {
            label: this.mTableData.dataHeader,
            data: this.mTableData.dataStrings,
            backgroundColor: this.generateRandomRgbaValues(numValues, .6)
          }
        ]
      },
      loadingVisible: false,
      chartVisible: true
    });
  }

  generateRandomRgbaValues(aNumValues, aOpacity)
  {
    var retStrings = [];

    for (var i = 0; i < aNumValues; i++) {

      var r = Math.floor(Math.random () * 255);
      var g = Math.floor(Math.random () * 255);
      var b = Math.floor(Math.random () * 255);

      var currString = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + aOpacity + ')';
      retStrings.push(currString);
    }

    return retStrings;
  }

  componentDidUpdate() {
    if(this.state.files.length !== 0)
    {
      var that = this;

      this.mCSVUtils.readCSV(this.state.files[0], (theCSVData) =>
      {
        that.mTableData = that.mCSVUtils.projectAttribute(theCSVData, 0, 7, 10);
        this.getChartData();
      });
    }
  }

  render() {
    return (
      <div className = { !this.state.loadingVisible ? '' : 'loadingBackground' }>
        { !this.state.loadingVisible ? null : <div className = 'loader' /> }

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

          {!this.state.chartVisible ?
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
                        title='Bar Chart Data'
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
                        title='Line Chart Data'
                        legendPosition='bottom'
                      />
                    </div>
                  </div>
                  <div className='card-body'>
                    <Chart
                      chartData={this.state.chartData}
                      chartType='PIE'
                      title='Bar Chart Data'
                      legendPosition='bottom'
                    />
                  </div>
                </div>
              </div>
            </div>}

          <div style={{ float:'left', clear: 'both' }}
            ref={(el) => { this.messagesEnd = el; }} />
        </div>
        <PivotTableContainer data={data} />
      </div>
    );
  }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));
