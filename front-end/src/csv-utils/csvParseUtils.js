import { Parser } from 'csv-parse';

import { CSVData } from './csvData.model'

export class CSVUtils {
    // PRIVATE VARS
    constructor() {
        this.mFileReader = new FileReader();
    }

    // projects an attribute from the data
    public projectAttribute(aCurrentData, aPrimaryKeyIndex, aNumberDataIndex): CSVData {
        if (aCurrentData.length >= 2) {
            var tags = aCurrentData[0]

            var datatag = tags[aNumberDataIndex];
            var keytag = tags[aPrimaryKeyIndex];

            var dataStrings = [];
            var dataKeyStrings = [];

            for (var i = 1; i < aCurrentData.length; i++) {
                dataStrings.push(aCurrentData[i][aNumberDataIndex]);
                dataKeyStrings.push(aCurrentData[i][aPrimaryKeyIndex]);
            }

            var theData = new CSVData();
            theData.dataHeader = datatag;
            theData.keyHeader = keytag;
            theData.dataStrings = dataStrings;
            theData.keyStrings = dataKeyStrings;

            return theData;
        }

        return null;
    }

    // NOTE the callback must take the data that is returned from the function
    public readCSV(aCurrentFile, aCallback) {
        var that = this;

        this.mFileReader.onload = function() {
            that.stringToCSVObject(that.mFileReader.result.toString(), aCallback);
        }

        this.mFileReader.readAsText(aCurrentFile);
    }

    private stringToCSVObject(aCSVString, aCallback) {
        var ret = [];

        var parser = new Parser({
            delimiter: ','
        })

        parser.write(aCSVString);

        parser.end()

        parser.on('readable', function() {
            ret.push(parser.read());
        })

        parser.on('end', function() {
            aCallback(ret);
        })
    }

}
