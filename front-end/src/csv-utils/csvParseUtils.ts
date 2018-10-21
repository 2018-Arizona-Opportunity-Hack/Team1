import { Parser } from 'csv-parse';

export class CSVUtils
{
    // PRIVATE VARS

    mFileReader : FileReader;

    constructor() 
    {
        this.mFileReader = new FileReader();
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