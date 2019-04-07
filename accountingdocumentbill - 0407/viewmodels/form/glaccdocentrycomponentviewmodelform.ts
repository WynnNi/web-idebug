import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Form, NgFormControl, NgChildForm, NgChildFormArray } from '@farris/devkit';
import { DateConverter } from '@farris/kendo-binding';

@Injectable()
export class GLAccDocEntryComponentViewmodelForm extends Form {
  @NgFormControl({
    binding: 'abstract'
  })
  abstract: FormControl;

  @NgFormControl({
    binding: 'accTitleID.accTitleID_AccountTitle_Code'
  })
  accTitleID_AccountTitle_Code: FormControl;

  @NgFormControl({
    binding: 'accTitleID.accTitleID_AccountTitle_Name'
  })
  accTitleID_AccountTitle_Name: FormControl;

  @NgFormControl({
    binding: 'creditAmount'
  })
  creditAmount: FormControl;

  @NgFormControl({
    binding: 'debitAmount'
  })
  debitAmount: FormControl;

  @NgFormControl({
    binding: 'lendingDirection'
  })
  lendingDirection: FormControl;

}

