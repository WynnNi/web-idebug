import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class DFNameEntity extends Entity {
  @NgField({
    dataField: 'dfName'
  })
  dfName: string;

}

