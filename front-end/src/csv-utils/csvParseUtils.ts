import { Parser } from 'csv-parse';

import { CSVData } from './csvData.model'

export class CSVUtils
{
    // PRIVATE VARS

    mFileReader : FileReader;

    constructor() 
    {
        this.mFileReader = new FileReader();
    }

    // projects an attribute from the data
    public projectAttribute( aCurrentData : any, aPrimaryKeyIndex : number, aNumberDataIndex : number, maxSize : number ) : CSVData
    {
        if( aCurrentData.length >= 2 ) {
            var tags : Array<string> = aCurrentData[0]

            var datatag : string = tags[aNumberDataIndex];
            var keytag : string = tags[aPrimaryKeyIndex];
        
            var dataStrings : Array< string > = [];
            var dataKeyStrings : Array< string > = [];

            var count = 0;
            for ( var i = 1 ; i < aCurrentData.length && count <= maxSize; i++) {                
                count++;
                dataStrings.push( aCurrentData[i][aNumberDataIndex] );
                dataKeyStrings.push( aCurrentData[i][aPrimaryKeyIndex] );
            }

            var theData : CSVData = new CSVData();
            theData.dataHeader = datatag;
            theData.keyHeader = keytag;
            theData.dataStrings = dataStrings;
            theData.keyStrings = dataKeyStrings;

            //console.log("header: " + theData.dataHeader);
            //console.log("data strings: " + theData.dataStrings);
            //console.log("key strings: " + theData.keyStrings);
            //console.log();

            return theData;
        }

        return null;
    }

    // NOTE the callback must take the data that is returned from the function
    public readCSV( aCurrentFile : File, aCallback : Function = ( data : any ) => { } )
    {
        var that = this;

        this.mFileReader.onload = function()
        {
            that.stringToCSVObject( that.mFileReader.result.toString(), aCallback );
        }

        this.mFileReader.readAsText( aCurrentFile );
    }

    private stringToCSVObject( aCSVString : string, aCallback : Function )
    {
        var ret: any = [];

        var parser: any = new Parser({
            delimiter: ','
        })

        parser.write( aCSVString );

        parser.end()

        parser.on('readable', function()
        {
            ret.push(parser.read());
        })

        parser.on('end', function(){
            aCallback( ret );
        })
    }

}