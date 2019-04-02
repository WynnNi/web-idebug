import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class FIAccountingSetEntity extends Entity {
  @NgField({
    dataField: 'id',
    primary: true
  })
  id: string;

  @NgField({
    dataField: 'accOrgID'
  })
  accOrgID: string;

  @NgField({
    dataField: 'code'
  })
  code: string;

  @NgField({
    dataField: 'name'
  })
  name: string;

  @NgField({
    dataField: 'accProperty'
  })
  accProperty: any;

  @NgField({
    dataField: 'accType'
  })
  accType: any;

  @NgField({
    dataField: 'enableFlag'
  })
  enableFlag: any;

  @NgField({
    dataField: 'isDisable'
  })
  isDisable: any;

  @NgField({
    dataField: 'disableYear'
  })
  disableYear: string;

}

