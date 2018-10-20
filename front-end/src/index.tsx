import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class MainApp extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        return <div>TEST</div>;
    }

    setState() {

    }
}

ReactDOM.render(<MainApp />, document.getElementById('main-app'));
