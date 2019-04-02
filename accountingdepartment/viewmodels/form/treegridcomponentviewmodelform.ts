import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Form, NgFormControl, NgChildForm, NgChildFormArray } from '@farris/devkit';
import { DateConverter } from '@farris/kendo-binding';

@Injectable()
export class TreeGridComponentViewmodelForm extends Form {
  @NgFormControl({
    binding: 'code'
  })
  code: FormControl;

  @NgFormControl({
    binding: 'name'
  })
  name: FormControl;

  @NgFormControl({
    binding: 'isDisable'
  })
  isDisable: FormControl;

}

