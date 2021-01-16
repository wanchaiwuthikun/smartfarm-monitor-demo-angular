import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationRouting} from './authentication.routing';
import { SigninComponent } from './pages/signin/signin.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    AuthenticationRouting,
    ReactiveFormsModule
  ],
})
export class AuthenticationModule { }
