import * as CSVParser from 'csv-parser'
//import * as fs from 'fs'

export class CSVUtils
{
    constructor() { }

    readCSV( aCSVPath : string )
    {
        var aCSVUrl : URL = new URL( aCSVPath );
        var theCSVResults: any = [] 

        /*
        fs.createReadStream( aCSVPath )
            .pipe( CSVParser() )
            .on('data', theCSVResults.push)
            .on('end', () => {
                console.log(theCSVResults);
            });
            */
    }
}