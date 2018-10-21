import * as React from 'react';

import 'react-pivottable/pivottable.css';
import {PivotTableUI, createPlotlyRenderers, TableRenderers} from 'react-pivottable';

type DataFrame = any;

interface PivotTableState {
    data: DataFrame;
};

const Plot = 0;

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
