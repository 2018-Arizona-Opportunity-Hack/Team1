import { CSVUtils } from './csv-utils/csvParseUtils'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3'; 

import FileDragAndDrop from './FileDragAndDrop';
import PivotTableContainer from './pivot';

import '../styles/styles.less';

interface State {
    files: File[];
}

const data = [['attribute', 'attribute2'], ['value1', 'value2']];

class MainApp extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        
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

    render() {
        // test code remove
        // var mCSVUtil: CSVUtils = new CSVUtils();
        // mCSVUtil.readCSV("./FL_insurance_sample.csv");
        return (
            <div className='wrapper'>
                {/* <FileDragAndDrop returnFileList={(fileList: File[]) => this.returnFileList(fileList)} /> */}
                <PivotTableContainer data={data}/>
            </div>
        );
    }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));