import {Component, Input, OnInit} from '@angular/core';
import {ExportExcelFormService} from '@app/core/services/form/export-excel-form/export-excel-form.service';
import {FormGroup} from '@angular/forms';
import {DateTimeService} from '@app/core/services/date-time/date-time.service';
import {NgbActiveModal, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DateObject} from 'luxon';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.sass'],
  providers: [ExportExcelFormService]
})
export class ExportExcelComponent implements OnInit {

  @Input() firstDate: NgbDateStruct ;
  minDate: NgbDateStruct ;
  maxDate: NgbDateStruct ;

  formGroup: FormGroup = new FormGroup({});

  constructor(
    private exportExcelForm: ExportExcelFormService,
    private dateTimeService: DateTimeService,
    private activeModal: NgbActiveModal
  ) {
    this.minDate = this.dateTimeService.getDateObject(new Date());
    this.maxDate = this.dateTimeService.getDateObject(new Date());
    this.firstDate = this.dateTimeService.getDateObject(new Date());
  }

  ngOnInit(): void {
    this.formGroup = this.exportExcelForm.buildFormExportExcel();
    const { year, month, day } = this.firstDate;
    this.minDate = this.dateTimeService.getDateObject(new Date(year, month - 1, day));
  }


  onExport(): void {
    let {startDate, endDate} = this.formGroup.value;
    startDate = this.dateTimeService.newISODateWithDateStruct(startDate);
    endDate = this.dateTimeService.newISODateWithDateStruct(endDate);
    const data = {startDate, endDate};
    this.activeModal.close(data);
  }

  onCancel(): void {
    this.activeModal.dismiss();
  }

  onDateSelect($event: NgbDate): void {
    const { year, month, day } = $event;
    this.minDate = this.dateTimeService.getDateObject(new Date(year, month - 1, day));
  }
}
