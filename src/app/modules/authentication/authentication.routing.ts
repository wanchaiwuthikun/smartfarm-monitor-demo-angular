import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from '@modules/authentication/pages/signin/signin.component';


export const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRouting {
}
