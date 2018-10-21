import * as React from 'react';
import Dropzone from 'react-dropzone';

class FileDragAndDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggingOver: false
    };
  }

  onDragEnter() {
    this.setState({ draggingOver: true });
  }

  onDragLeave() {
    this.setState({ draggingOver: false });
  }

  onDrop(files) {
    this.props.returnFileList(files);
    this.setState({ draggingOver: false });
  }

  render() {
    const { draggingOver } = this.state;
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };

    return (
        <Dropzone 
          className='drop_zone'
          disableClick
          onDrop={this.onDrop.bind(this)}
          onDragEnter={this.onDragEnter.bind(this)}
          onDragLeave={this.onDragLeave.bind(this)}
        >
          {draggingOver && <div style={overlayStyle}>{}</div>}
        </Dropzone>
    );
  }
}

export default FileDragAndDrop;
