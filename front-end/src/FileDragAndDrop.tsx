import * as React from 'react';
import Dropzone from 'react-dropzone';

interface Props {
  returnFileList: Function;
}

class FileDragAndDrop extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onDrop(files: []) {
    console.log(files);
    this.props.returnFileList(files);
  }
  
  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)}/>
      </div>
    );
  }
}

export default FileDragAndDrop;