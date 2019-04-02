import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { DFCodeEntity } from './dfcodeentity';
import { DFNameEntity } from './dfnameentity';

export class Departments8864Entity extends Entity {
  @NgField({
    dataField: 'adminDeptID',
    primary: true
  })
  adminDeptID: string;

  @NgObject({
    dataField: 'adminDeptID_Code',
    type: DFCodeEntity
  })
  adminDeptID_Code: DFCodeEntity;

  @NgObject({
    dataField: 'adminDeptID_Name',
    type: DFNameEntity
  })
  adminDeptID_Name: DFNameEntity;

}

