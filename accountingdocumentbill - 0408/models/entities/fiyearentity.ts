import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class FIYearEntity extends Entity {
  @NgField({
    dataField: 'fiYear'
  })
  fiYear: string;

}

