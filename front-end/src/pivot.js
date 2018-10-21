import * as React from 'react';

import 'react-pivottable/pivottable.css';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import Plot from 'react-plotly.js';

const PlotlyRenderers = createPlotlyRenderers(Plot);

class PivotTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  updateData(data) {
    this.setState({ data: data });
  }

  render() {
    return (
      <div style={{ marginRight: 15, marginLeft: 15, marginBottom: 15, overflowX: 'scroll' }}>
        <PivotTableUI
          data={this.state.data}
          onChange={(s) => this.setState(s)}
          renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
          {...this.state}
        />
      </div>
    );

  }
}

export default PivotTableContainer;
