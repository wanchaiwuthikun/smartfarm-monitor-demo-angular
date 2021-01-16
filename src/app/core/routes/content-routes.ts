import { Routes } from '@angular/router';
import {AuthGuard} from '@app/core/guards/auth/auth.guard';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'prefix'
  },
];
