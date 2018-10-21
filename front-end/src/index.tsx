import { CSVUtils } from './csv-utils/csvParseUtils'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3'; 

import FileDragAndDrop from './FileDragAndDrop';
// import PivotTableContainer from './pivot';

import '../styles/styles.less';

interface State {
    files: File[];
}

const data = [['attribute', 'attribute2'], ['value1', 'value2']];

class MainApp extends React.Component<{}, State> {
    mCSVUtils: CSVUtils;

    constructor(props: any) {
        super(props);
        
        this.mCSVUtils = new CSVUtils();

        this.returnFileList = this.returnFileList.bind(this);
        this.state = {
            files: []
        }
    }

    returnFileList(fileList: File[]) {
        this.setState((state) => {
            return { files: fileList.concat(state.files) }
        });
    }

    componentDidUpdate() {
        if( this.state.files.length != 0 )
        {
            this.mCSVUtils.readCSV( this.state.files[0], ( theCSVData : any ) =>
            {
                console.log(theCSVData);
            });
        }
    }

    render() {
        return <FileDragAndDrop returnFileList={(fileList: File[]) => this.returnFileList(fileList)} />;
    }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));