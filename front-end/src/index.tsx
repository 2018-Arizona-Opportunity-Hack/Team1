import { CSVUtils } from './csv-utils/csvParseUtils'

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class MainApp extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        // test code remove
        var mCSVUtil: CSVUtils = new CSVUtils();
        mCSVUtil.readCSV("./FL_insurance_sample.csv")

        return <div>TEST</div>;
    }

    setState() {

    }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));