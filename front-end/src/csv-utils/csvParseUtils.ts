import { CSVParser } from 'csv-parser'
import { fs } from 'fs'

class CSVUtils
{
    readCSV( aCSVPath : String )
    {
        var theCSVResults = []

        fs.createReadStream( aCSVPath )
            .pipe( CSVParser() )
            .on('data', theCSVResults.push)
            .on('end', () => {
                console.log(theCSVResults);
            });
    }
}