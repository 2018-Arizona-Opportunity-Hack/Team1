import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3'; 

import FileDragAndDrop from './FileDragAndDrop';

import '../styles/styles.less';

interface State {
    files: File[];
}

export default class MainApp extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        
        this.returnFileList = this.returnFileList.bind(this);
    }

    returnFileList(fileList: File[]) {
        this.setState((state: State) => {files: fileList});
        console.log(this.state);
    }

    render() {
        return <FileDragAndDrop returnFileList={(fileList: File[]) => this.returnFileList(fileList)} />;
    }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));
