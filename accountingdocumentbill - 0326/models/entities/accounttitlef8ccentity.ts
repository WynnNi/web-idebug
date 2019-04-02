import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class AccountTitleF8ccEntity extends Entity {
  @NgField({
    dataField: 'accTitleID',
    primary: true
  })
  accTitleID: string;

  @NgField({
    dataField: 'accTitleID_AccountTitle_Code'
  })
  accTitleID_AccountTitle_Code: string;

  @NgField({
    dataField: 'accTitleID_AccountTitle_Name'
  })
  accTitleID_AccountTitle_Name: string;

  @NgField({
    dataField: 'accTitleID_AccountTitle_FullName'
  })
  accTitleID_AccountTitle_FullName: string;

}

