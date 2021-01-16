import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {HumidityPeriod} from '@models/humidity-period';
import {Humidity} from '@modules/dashboard/models/humidity';


const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() {
  }

  exportToExcel(excelData: Humidity[], filename: string): void {

    const data = [];
    const udt  = {
      data: [
        { A: '#', B: 'วัน/เดือน/ปี', C: 'เวลา', D: 'อุณภมิ', E: 'ความชื้น' }, // table header
      ],
      skipHeader: true
    };
    excelData.forEach((d, index) => {
      udt.data.push({
        A: `${ index + 1 }`,
        B: d.date,
        C: d.time,
        D: (d.temperature)?.toString(),
        E: (d.humidity)?.toString()
      });
    });
    data.push(udt);

    this.exportJsonToExcel(data, filename);
  }


  private exportJsonToExcel(json: any[], fileName: string): void {
    // inserting first blank row
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      json[0].data,
      this.getOptions(json[0])
    );

    for (let i = 1, length = json.length; i < length; i++) {
      // adding a dummy row for separation
      XLSX.utils.sheet_add_json(
        worksheet,
        [{}],
        this.getOptions(
          {
            data: [],
            skipHeader: true
          }, -1)
      );
      XLSX.utils.sheet_add_json(
        worksheet,
        json[i].data,
        this.getOptions(json[i], -1)
      );
    }
    const workbook: XLSX.WorkBook = {Sheets: {Sheet1: worksheet}, SheetNames: ['Sheet1']};
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }

  private getOptions(json: any, origin?: number): any {
    // adding actual data
    const options = {
      skipHeader: true,
      origin: -1,
      header: []
    };
    options.skipHeader = json.skipHeader ? json.skipHeader : false;
    if (!options.skipHeader && json.header && json.header.length) {
      options.header = json.header;
    }
    if (origin) {
      options.origin = origin ? origin : -1;
    }
    return options;
  }

}
