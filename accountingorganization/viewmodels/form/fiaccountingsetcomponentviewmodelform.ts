import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Form, NgFormControl, NgChildForm, NgChildFormArray } from '@farris/devkit';
import { DateConverter } from '@farris/kendo-binding';

@Injectable()
export class FIAccountingSetComponentViewmodelForm extends Form {
  @NgFormControl({
    binding: 'code'
  })
  code: FormControl;

  @NgFormControl({
    binding: 'name'
  })
  name: FormControl;

  @NgFormControl({
    binding: 'accProperty'
  })
  accProperty: FormControl;

  @NgFormControl({
    binding: 'accType'
  })
  accType: FormControl;

  @NgFormControl({
    binding: 'isDisable'
  })
  isDisable: FormControl;

}

