import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class ExportExcelFormService {

  private formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
  }

  buildFormExportExcel(): FormGroup {
    return this.formGroup = this.formBuilder.group({
      startDate: [null, [Validators.required]],
      endDate: [null, Validators.required]
    });
  }

}
