import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { DFCodeEntity } from './dfcodeentity';
import { DFNameEntity } from './dfnameentity';

export class AdminOrganizationDDe1Entity extends Entity {
  @NgField({
    dataField: 'adminOrgID',
    primary: true
  })
  adminOrgID: string;

  @NgObject({
    dataField: 'adminOrgID_Code',
    type: DFCodeEntity
  })
  adminOrgID_Code: DFCodeEntity;

  @NgObject({
    dataField: 'adminOrgID_Name',
    type: DFNameEntity
  })
  adminOrgID_Name: DFNameEntity;

}

