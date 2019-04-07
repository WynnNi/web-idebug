import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class AdministrativeInfoEntity extends Entity {
  @NgField({
    dataField: 'createdBy'
  })
  createdBy: string;

  @NgField({
    dataField: 'createdOn'
  })
  createdOn: string;

  @NgField({
    dataField: 'lastChangedBy'
  })
  lastChangedBy: string;

  @NgField({
    dataField: 'lastChangedOn'
  })
  lastChangedOn: string;

}

