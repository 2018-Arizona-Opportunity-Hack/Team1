
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Chart from './Graphs';
import { CSVUtils } from './csv-utils/csvParseUtils';

import FileDragAndDrop from './FileDragAndDrop';
import PivotTableContainer from './pivot';

import '../styles/styles.less';

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

    this.mAttributeProjection = 7;
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

  createDropdown() {
    var ret = [];
    var that = this;

    this.mCSVData[0].map((function( data, index ) {
      ret.push(<button className="dropdown-item" onClick = { (e) => that.onDropdownSelected( e, index ) } key = {index} value={index} > {data} </button>)
    }));

    return ret;
  }

  onDropdownSelected( event, index ) {
    console.log("selecting: " + index); //eslint-disable-line

    if( this.mCSVData == null ) return;

    this.mMapNeedsRender = true;
    this.mAttributeProjection = index;
    this.mTableData = this.mCSVUtils.projectAttribute( this.mCSVData, 0, this.mAttributeProjection, 10);

    this.getChartData();
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
        that.mCSVData = theCSVData;
        that.mCSVData.pop();
        that.mTableData = that.mCSVUtils.projectAttribute(theCSVData, 0, this.mAttributeProjection, 10);
        this.getChartData();
      });
    }
  }

  render() {
    return (
      <div className = { !this.state.loadingVisible ? '' : 'loadingBackground' }>
        { !this.state.loadingVisible ? null : <div className = 'loader' /> }
        <div>
          <nav className='site-header sticky-top py-1'>
            <div className='container d-flex flex-column flex-md-row justify-content-between' />
          </nav>

          <div className='overlay position-relative overflow-hidden p-2 p-md-5 m-md-3 text-center bg-light'>
            <div className='dragger' >
              <div className='wrapper'>
                {<FileDragAndDrop returnFileList={(fileList) => this.returnFileList(fileList)} /> }
              </div>
            </div>
            <div className='col-md-5 p-lg-5 mx-auto my-5'>
              <h1 className='display-4 font-weight-normal'> Progress Tracker </h1>
              <p className='lead font-weight-normal'> Drag a CSV File Here!</p>
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
                  <div className='card mb-5 box-shadow'>
                    <div className='card-header'>
                      <h4 className='my-0 font-weight-normal'> Pie Chart </h4>
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
              </div>

              <div className="dropdown-style dropdown menu" aria-labelledby="dropdownMenuButton">
                <div className = "dropdown" >
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Attribute List
                  <span className="caret"></span></button>
                  <ul className="dropdown-menu" onChange = { this.onDropdownSelected } >
                    { this.state.chartData == null || this.state.chartData.labels == null ? 
                      null : this.createDropdown()
                    }
                  </ul>
                </div>
              </div>
              <PivotTableContainer data = {this.mCSVData} />
            </div>}
            
          <div style={{ float:'left', clear: 'both' }}
            ref={(el) => { this.messagesEnd = el; }} />
        </div>


      </div>
    );
  }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));
