import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class AccDocTypeCC98Entity extends Entity {
  @NgField({
    dataField: 'accDocTypeID',
    primary: true
  })
  accDocTypeID: string;

  @NgField({
    dataField: 'accDocTypeID_Code'
  })
  accDocTypeID_Code: string;

  @NgField({
    dataField: 'accDocTypeID_Name'
  })
  accDocTypeID_Name: string;

  @NgField({
    dataField: 'accDocTypeID_VoucherWord'
  })
  accDocTypeID_VoucherWord: string;

}

