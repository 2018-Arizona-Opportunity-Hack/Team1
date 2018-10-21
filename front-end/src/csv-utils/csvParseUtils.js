import { Parser } from 'csv-parse';

export class CSVUtils {
  // PRIVATE VARS
  constructor() {
    this.mFileReader = new FileReader();
  }

  // projects an attribute from the data
  projectAttribute(aCurrentData, aPrimaryKeyIndex, aNumberDataIndex, aMaxElements) {
    if (aCurrentData.length >= 2) {
      var tags = aCurrentData[0];

      var datatag = tags[aNumberDataIndex];
      var keytag = tags[aPrimaryKeyIndex];

      var dataStrings = [];
      var dataKeyStrings = [];

      var count = 0;
      for (var i = 1; i < aCurrentData.length; i++) {
        if( count > aMaxElements) break;
        if( aCurrentData[i] == null) continue;

        count++;

        dataStrings.push(aCurrentData[i][aNumberDataIndex]);
        dataKeyStrings.push(aCurrentData[i][aPrimaryKeyIndex]);
      }

      var theData = {};
      theData.dataHeader = datatag;
      theData.keyHeader = keytag;
      theData.dataStrings = dataStrings;
      theData.keyStrings = dataKeyStrings;

      return theData;
    }

    return null;
  }

  // NOTE the callback must take the data that is returned from the function
  readCSV(aCurrentFile, aCallback) {
    var that = this;

    this.mFileReader.onload = function() {
      that.stringToCSVObject(that.mFileReader.result.toString(), aCallback);
    };

    this.mFileReader.readAsText(aCurrentFile);
  }

  stringToCSVObject(aCSVString, aCallback) {
    var ret = [];

    var parser = new Parser({
      delimiter: ','
    });

    parser.write(aCSVString);

    parser.end();

    parser.on('readable', function() {
      ret.push(parser.read());
    });

    parser.on('end', function() {
      aCallback(ret);
    });
  }

}
