import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Form, NgFormControl, NgChildForm, NgChildFormArray } from '@farris/devkit';
import { DateConverter } from '@farris/kendo-binding';

@Injectable()
export class GLAccDocAssistanceComponentViewmodelForm extends Form {
  @NgFormControl({
    binding: 'application'
  })
  application: FormControl;

  @NgFormControl({
    binding: 'deptID.deptID_Name'
  })
  deptID_Name: FormControl;

  @NgFormControl({
    binding: 'relatedOrgID.relatedOrgID_Name.dfName'
  })
  relatedOrgID_Name_DFName: FormControl;

  @NgFormControl({
    binding: 'accEmployeeID.accEmployeeID_Name'
  })
  accEmployeeID_Name: FormControl;

  @NgFormControl({
    binding: 'foreignCurrencyID.foreignCurrencyID_Name.dfName'
  })
  foreignCurrencyID_Name_DFName: FormControl;

  @NgFormControl({
    binding: 'quantity'
  })
  quantity: FormControl;

  @NgFormControl({
    binding: 'unitPrice'
  })
  unitPrice: FormControl;

  @NgFormControl({
    binding: 'foreignCurrency'
  })
  foreignCurrency: FormControl;

  @NgFormControl({
    binding: 'exchangeRate'
  })
  exchangeRate: FormControl;

  @NgFormControl({
    binding: 'amount'
  })
  amount: FormControl;

  @NgFormControl({
    binding: 'settlement.settlement_Name.dfName'
  })
  settlement_Name_DFName: FormControl;

  @NgFormControl({
    binding: 'settlementNumber'
  })
  settlementNumber: FormControl;

  @NgFormControl({
    binding: 'billNumber'
  })
  billNumber: FormControl;

  @NgFormControl({
    binding: 'bizCode'
  })
  bizCode: FormControl;

  @NgFormControl({
    binding: 'bizDateDis',
    valueConverter: new DateConverter('yyyy-MM-dd')
  })
  bizDateDis: FormControl;

}

