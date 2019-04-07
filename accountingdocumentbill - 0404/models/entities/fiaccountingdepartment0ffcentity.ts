import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class FIAccountingDepartment0ffcEntity extends Entity {
  @NgField({
    dataField: 'deptID',
    primary: true
  })
  deptID: string;

  @NgField({
    dataField: 'deptID_Code'
  })
  deptID_Code: string;

  @NgField({
    dataField: 'deptID_Name'
  })
  deptID_Name: string;

  @NgField({
    dataField: 'deptID_FullName'
  })
  deptID_FullName: string;

  @NgField({
    dataField: 'deptID_DisableYear'
  })
  deptID_DisableYear: string;

}

