import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Form, NgFormControl, NgChildForm, NgChildFormArray } from '@farris/devkit';
import { DateConverter } from '@farris/kendo-binding';

@Injectable()
export class BasicFormViewmodelForm extends Form {
  @NgFormControl({
    binding: 'accDocDateDisplay',
    valueConverter: new DateConverter('yyyy-MM-dd')
  })
  accDocDateDisplay: FormControl;

  @NgFormControl({
    binding: 'accDocTypeID.accDocTypeID_VoucherWord'
  })
  accDocTypeID_VoucherWord: FormControl;

  @NgFormControl({
    binding: 'accDocCodeDisplay'
  })
  accDocCodeDisplay: FormControl;

  @NgFormControl({
    binding: 'operatorID.operatorID_Name'
  })
  operatorID_Name: FormControl;

  @NgFormControl({
    binding: 'numberOfAttch'
  })
  numberOfAttch: FormControl;

  @NgFormControl({
    binding: 'numberOfNote'
  })
  numberOfNote: FormControl;

  @NgFormControl({
    binding: 'secretLevelID'
  })
  secretLevelID: FormControl;

}

