import {Injectable} from '@angular/core';
import {NgbDateStruct, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {HumidityPeriod} from '@models/humidity-period';
import {ExportExcelComponent} from '@app/core/components/form/export-excel/export-excel.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {}

  private getDefaultOption(): NgbModalOptions {
    return {centered: true, size: 'md', backdropClass: 'backdrop', backdrop: 'static'} as NgbModalOptions;
  }

  public setOptionsModal( modalOptions?: NgbModalOptions): NgbModalOptions {
    const defaultOptions = this.getDefaultOption();
    return {...defaultOptions, ...modalOptions};
  }


  public modalExportExcel(firstDateForExportExcel: NgbDateStruct, modalOptions?: NgbModalOptions): Promise<HumidityPeriod> {
    const options: NgbModalOptions = this.setOptionsModal( modalOptions );
    const modal = this.modalService.open(ExportExcelComponent, options);
    modal.componentInstance.firstDate = firstDateForExportExcel;
    return modal.result;
  }
}
