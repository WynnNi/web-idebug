import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class FIAccountingEmployeeE1f1Entity extends Entity {
  @NgField({
    dataField: 'operatorID',
    primary: true
  })
  operatorID: string;

  @NgField({
    dataField: 'operatorID_Code'
  })
  operatorID_Code: string;

  @NgField({
    dataField: 'operatorID_Name'
  })
  operatorID_Name: string;

}

