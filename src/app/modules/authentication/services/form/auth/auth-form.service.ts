import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class AuthFormService {

  private formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
  }

  buildFormSignIn(): FormGroup {
    return this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
}
