import * as React from 'react';

interface Props {
  returnFileList: Function;
}

class FileDragAndDrop extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  dropHandler(event: React.DragEvent) {
    console.log('Dropped a file');

    event.preventDefault();

    let newFileList = [];

    if (event.dataTransfer.items) {
      let fileList = event.dataTransfer.items;
      console.log('Shit');
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].kind == 'file') {
          let file = fileList[i].getAsFile();
          newFileList.push(file);
          console.log('File name: ' + file.name);
        }
      }
    } else {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        newFileList.push(event.dataTransfer.files[i]);
        console.log('File name: ' + event.dataTransfer.files[i].name);
      }
    }

    this.props.returnFileList(newFileList);
    
    this.removeDragData(event);
  }

  dragOverHandler(event: React.DragEvent) {
    console.log('File(s) in drop zone');

    event.preventDefault();
  }

  removeDragData(event: React.DragEvent) {
    console.log('Removing drag data');

    if (event.dataTransfer.items) {
      event.dataTransfer.items.clear();
    } else {
      event.dataTransfer.clearData();
    }
  }

  render() {
    return (
      <div
        className='drop_zone'
        onDrop={(event: React.DragEvent) => this.dropHandler(event)}
        onDrag={(event: React.DragEvent) => this.dragOverHandler(event)}
      />
    );
  }
}

export default FileDragAndDrop;