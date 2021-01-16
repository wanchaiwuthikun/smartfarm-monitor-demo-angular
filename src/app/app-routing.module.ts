import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentLayoutComponent} from '@app/core/components/layouts/content-layout/content-layout.component';
import {CONTENT_ROUTES} from '@app/core/routes/content-routes';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren:  () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: CONTENT_ROUTES
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
