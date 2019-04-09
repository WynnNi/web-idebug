import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class FIAccountingOrganization32a4Entity extends Entity {
  @NgField({
    dataField: 'accOrgID',
    primary: true
  })
  accOrgID: string;

  @NgField({
    dataField: 'accOrgID_Code'
  })
  accOrgID_Code: string;

  @NgField({
    dataField: 'accOrgID_Name'
  })
  accOrgID_Name: string;

  @NgField({
    dataField: 'accOrgID_ShortName'
  })
  accOrgID_ShortName: string;

}

