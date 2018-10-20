import * as React from 'react';

class FileDragAndDrop extends React.Component<{}> {
  constructor() {
    super({});
  }

  dropHandler(event: React.DragEvent) {
    console.log('Dropped a file');

    event.preventDefault();

    if (event.dataTransfer.items) {
      console.log('Shit');
    }

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