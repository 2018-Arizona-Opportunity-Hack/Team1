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
      <PivotTableUI
        data={this.data}
        onchange={(s) => this.setState(s)}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...this.state}
      />
    );

  }
}

export default PivotTableContainer;
