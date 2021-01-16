import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SummaryComponent} from '@modules/dashboard/pages/summary/summary.component';
import {AuthGuard} from '@app/core/guards/auth/auth.guard';


export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: SummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouting {
}
