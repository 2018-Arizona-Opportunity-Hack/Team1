import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3'; 

import '../styles/styles.less';

export default class MainApp extends React.Component<{}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return <div>TEST</div>;
    }

    setState() {

    }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));
