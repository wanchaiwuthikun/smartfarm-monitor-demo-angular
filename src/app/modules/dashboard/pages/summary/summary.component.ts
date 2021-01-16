import {Component, OnDestroy, OnInit} from '@angular/core';

import {ExportService} from '@app/core/services/export/export.service';
import {HumidityService} from '@modules/dashboard/services/humidity/humidity.service';
import {Humidity} from '@modules/dashboard/models/humidity';
import {Subscription} from 'rxjs';
import {SensorsStatus} from '@modules/dashboard/models/sensorsStatus';
import {DateTimeService} from '@app/core/services/date-time/date-time.service';
import {ModalService} from '@app/core/services/modal/modal.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit, OnDestroy {

  private firstDateForExportExcel: NgbDateStruct;

  humidityData: Humidity | null = null;
  wifiStatus: SensorsStatus  = { status: 'DISCONNECTED' } ;
  humidityStatus: SensorsStatus  = { status: 'DISCONNECTED' } ;

  private subscription = new Subscription();

  constructor(private exportService: ExportService,
              private humidityService: HumidityService,
              private dateTimeService: DateTimeService,
              private modalService: ModalService
  ) {
    this.firstDateForExportExcel = this.dateTimeService.getDateObject(new Date());
  }

  ngOnInit(): void {
    this.getStatusHumiditySensors();
    this.getStatusWifiSensors();
    this.getCurrentHumidity();
    this.getFirstDateForExport();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getCurrentHumidity(): void {

    const humiditySubscription = this.humidityService.getLastRecord().subscribe((data) => {
      this.humidityData = Array.isArray(data) ? data[0] : null;
    });

    this.subscription.add(humiditySubscription);
  }

  private getStatusWifiSensors(): void {
    const wifiSensorsSubscription = this.humidityService.getWifiStatus().subscribe((data) => {
      const status = Array.isArray(data) ? data[0] : 'DISCONNECTED';
      this.wifiStatus = { status };
    });

    this.subscription.add(wifiSensorsSubscription);
  }

  private getStatusHumiditySensors(): void {
    const humiditySensorsSubscription = this.humidityService.getHumidityStatus().subscribe((data) => {
      const status = Array.isArray(data) ? data[0] : null;
      this.humidityStatus = { status };
    });
    this.subscription.add(humiditySensorsSubscription);
  }

  private getFirstDateForExport(): void {
    const humidityFirstRecordSubscription = this.humidityService.getFirstRecord().subscribe((data) => {
      const humidityDate: string  = Array.isArray(data) ? data[0]?.date : new Date().toISOString();
      this.firstDateForExportExcel = this.dateTimeService.getDateObject( new Date(humidityDate));
    });
    this.subscription.add(humidityFirstRecordSubscription);
  }

  private getDataForExportExcel(startDate: string, endDate: string): void {
    const humidityListRecordSubscription = this.humidityService.getListWithPeriod(startDate, endDate).subscribe((data) => {
      const filename = `temperature_${startDate}-${endDate}`;
      this.exportExcel(data, filename);
    });
    this.subscription.add(humidityListRecordSubscription);
  }

  private exportExcel(data: Humidity[], filename: string): void {
    this.exportService.exportToExcel(data, filename);
  }

  onRefresh(): void {
    location.reload();
  }

  onExportExcel(): void {
    this.modalService.modalExportExcel(this.firstDateForExportExcel).then((data) => {
      this.getDataForExportExcel(data.startDate, data.endDate);
    }, () => {});
  }
}
