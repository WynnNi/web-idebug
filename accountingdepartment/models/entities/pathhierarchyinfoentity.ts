import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';

export class PathHierarchyInfoEntity extends Entity {
  @NgField({
    dataField: 'path'
  })
  path: string;

  @NgField({
    dataField: 'layer'
  })
  layer: number;

  @NgField({
    dataField: 'isDetail'
  })
  isDetail: any;

}

