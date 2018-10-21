/*
import * as React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';

import 'react-pivottable/pivottable.css';
import { TableRenderers } from 'react-pivottable/TableRenderers';
// import { Plot } from './react-plotly';
import { createPlotlyRenderers } from 'react-pivottable/PlotlyRenderers';


type DataFrame = any;

interface PivotTableState {
    data: DataFrame;
}

class Plot {}

const PlotlyRenderers = createPlotlyRenderers(Plot);

class PivotTableContainer extends React.Component<any, PivotTableState> {
    private data: DataFrame;

    constructor(props: PivotTableState) {
        super(props);
        this.state = props;
    }

    updateData(data: DataFrame) {
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
*/