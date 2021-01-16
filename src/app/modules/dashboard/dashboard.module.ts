import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './pages/setting/setting.component';
import { SummaryComponent } from './pages/summary/summary.component';
import {DashboardRouting} from '@modules/dashboard/dashboard.routing';
import {DateTimePipe} from '@app/core/pipes/concat-date-time/date-time.pipe';



@NgModule({
  declarations: [SettingComponent, SummaryComponent, DateTimePipe],
  imports: [
    CommonModule,
    DashboardRouting
  ]
})
export class DashboardModule { }
