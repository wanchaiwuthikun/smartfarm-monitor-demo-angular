import { TestBed } from '@angular/core/testing';

import { ExportExcelFormService } from './export-excel-form.service';

describe('ExportExcelFormService', () => {
  let service: ExportExcelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportExcelFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
