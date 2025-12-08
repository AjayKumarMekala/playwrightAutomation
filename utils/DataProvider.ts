import{parse} from 'csv-parse/sync';
import fs from 'fs';
export class DataProvider{

    static getTestDataFromJson(filepath:string)
    {
      let data:string= JSON.parse(fs.readFileSync(filepath,'utf8'));
      return data;
    }
    static getTestDataFromcsv(filepath:string)
    {
      let data= parse(fs.readFileSync(filepath),{columns:true,skip_empty_lines:true});
      return data;
    }
}