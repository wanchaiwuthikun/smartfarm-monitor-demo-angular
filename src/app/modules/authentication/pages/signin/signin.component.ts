import { Component, OnInit } from '@angular/core';
import {AuthenService} from '@app/core/services/authen/authen.service';
import {AuthFormService} from '@modules/authentication/services/form/auth/auth-form.service';
import {FormGroup} from '@angular/forms';
import {SignIn} from '@modules/authentication/models/signIn';
import {Router} from '@angular/router';
import {User} from '@models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass'],
  providers: [ AuthFormService ]
})
export class SigninComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});

  constructor(
    private authenService: AuthenService,
    private authFormService: AuthFormService,
    private router: Router  ) { }

  ngOnInit(): void {
   this.formGroup = this.authFormService.buildFormSignIn();
  }

  async onSignIn(): Promise<void>  {
    try {
      const signInData: SignIn = this.formGroup.value;
      const  userCredential =  await this.authenService.signInWithEmailAndPassword( signInData );
      console.log(userCredential.user);
      if (userCredential.user) {
        const { uid, email, displayName, photoURL, emailVerified } = userCredential.user;
        this.authenService.setUserData( { uid, email, displayName, photoURL, emailVerified } as User);
        this.router.navigate(['dashboard']);

      }

    } catch (err) {

      console.log(err);
    }
  }
}
