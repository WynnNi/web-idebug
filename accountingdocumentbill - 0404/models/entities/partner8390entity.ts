import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { DFCodeEntity } from './dfcodeentity';
import { DFNameEntity } from './dfnameentity';

export class Partner8390Entity extends Entity {
  @NgField({
    dataField: 'relatedOrgID',
    primary: true
  })
  relatedOrgID: string;

  @NgObject({
    dataField: 'relatedOrgID_Code',
    type: DFCodeEntity
  })
  relatedOrgID_Code: DFCodeEntity;

  @NgObject({
    dataField: 'relatedOrgID_Name',
    type: DFNameEntity
  })
  relatedOrgID_Name: DFNameEntity;

}

