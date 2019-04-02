import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class DFCodeEntity extends Entity {
  @NgField({
    dataField: 'dfCode'
  })
  dfCode: string;

}

