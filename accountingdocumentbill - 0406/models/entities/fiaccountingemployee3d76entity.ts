import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class FIAccountingEmployee3d76Entity extends Entity {
  @NgField({
    dataField: 'accEmployeeID',
    primary: true
  })
  accEmployeeID: string;

  @NgField({
    dataField: 'accEmployeeID_Code'
  })
  accEmployeeID_Code: string;

  @NgField({
    dataField: 'accEmployeeID_Name'
  })
  accEmployeeID_Name: string;

}

