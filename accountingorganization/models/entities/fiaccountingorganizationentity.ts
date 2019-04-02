import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { FIAccountingSetEntity } from './fiaccountingsetentity';
import { PathHierarchyInfoEntity } from './pathhierarchyinfoentity';
import { AdminOrganizationDDe1Entity } from './adminorganizationdde1entity';

export class FIAccountingOrganizationEntity extends Entity {
  @NgField({
    dataField: 'id',
    primary: true
  })
  id: string;

  @NgField({
    dataField: 'code'
  })
  code: string;

  @NgField({
    dataField: 'name'
  })
  name: string;

  @NgField({
    dataField: 'shortName'
  })
  shortName: string;

  @NgField({
    dataField: 'orgType'
  })
  orgType: any;

  @NgField({
    dataField: 'parentID'
  })
  parentID: string;

  @NgField({
    dataField: 'sortOrder'
  })
  sortOrder: number;

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

  @NgField({
    dataField: 'remark'
  })
  remark: string;

  @NgList({
    dataField: 'fiAccountingSets',
    type: FIAccountingSetEntity
  })
  fiAccountingSets: EntityList<FIAccountingSetEntity>;

  @NgObject({
    dataField: 'treeInfo',
    type: PathHierarchyInfoEntity
  })
  treeInfo: PathHierarchyInfoEntity;

  @NgObject({
    dataField: 'adminOrgID',
    type: AdminOrganizationDDe1Entity
  })
  adminOrgID: AdminOrganizationDDe1Entity;

}

