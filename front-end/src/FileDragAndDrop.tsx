import * as React from 'react';

class FileDragAndDrop extends React.Component<{}> {
  constructor() {
    super();
  }

  dropHandler(event: Event) {
    console.log('Dropped a file'); // eslint-disable-line

    event.preventDefault();

    if (event.dataTransfer.items) {
      console.log('Shit'); // eslint-disable-line
    }

    this.removeDragData(event);
  }

  removeDragData(event: Event) {
    console.log('Removing drag data'); // eslint-disable-line

    if (event.dataTransfer.items) {
      event.dataTransfer.items.clear();
    } else {
      event.dataTransfer.clearData();
    }
  }

  render() {
    return <div onDrop={this.dropHandler(event)} />;
  }
}

export default FileDragAndDrop;