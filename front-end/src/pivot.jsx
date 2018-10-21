import * as React from 'react';

import 'react-pivottable/pivottable.css';
import { PivotTableUI, createPlotlyRenderers, TableRenderers } from 'react-pivottable';
import { Plot } from 'react-plotly.js'

const PlotlyRenderers = createPlotlyRenderers(Plot);

class PivotTableContainer extends React.Component {
    private data;

    constructor(props) {
        super(props);
        this.state = props;
    }

    updateData(data) {
        this.setState({ data: data });
    }

    render() {
        return (
            <PivotTableUI
                data={this.data}
                onchange={(s: PivotTableState) => this.setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...this.state}
            />
        );

    }
}

export default PivotTableContainer;
