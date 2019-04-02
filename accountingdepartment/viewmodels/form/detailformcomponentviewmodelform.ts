import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Form, NgFormControl, NgChildForm, NgChildFormArray } from '@farris/devkit';
import { DateConverter } from '@farris/kendo-binding';

@Injectable()
export class DetailFormComponentViewmodelForm extends Form {
  @NgFormControl({
    binding: 'adminDeptID.adminDeptID_Name.dfName'
  })
  adminDeptID_Name_DFName: FormControl;

  @NgFormControl({
    binding: 'code'
  })
  code: FormControl;

  @NgFormControl({
    binding: 'name'
  })
  name: FormControl;

  @NgFormControl({
    binding: 'fullNameRole'
  })
  fullNameRole: FormControl;

  @NgFormControl({
    binding: 'fullName'
  })
  fullName: FormControl;

  @NgFormControl({
    binding: 'mnemonicCode'
  })
  mnemonicCode: FormControl;

  @NgFormControl({
    binding: 'sortOrder'
  })
  sortOrder: FormControl;

  @NgFormControl({
    binding: 'remark'
  })
  remark: FormControl;

}

