import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { PathHierarchyInfoEntity } from './pathhierarchyinfoentity';
import { Departments8864Entity } from './departments8864entity';
import { AdministrativeInfoEntity } from './administrativeinfoentity';

export class FIAccountingDepartmentEntity extends Entity {
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
    dataField: 'fullNameRole'
  })
  fullNameRole: any;

  @NgField({
    dataField: 'fullName'
  })
  fullName: string;

  @NgField({
    dataField: 'mnemonicCode'
  })
  mnemonicCode: string;

  @NgField({
    dataField: 'parentID'
  })
  parentID: string;

  @NgField({
    dataField: 'isDisable'
  })
  isDisable: any;

  @NgField({
    dataField: 'sortOrder'
  })
  sortOrder: number;

  @NgField({
    dataField: 'remark'
  })
  remark: string;

  @NgField({
    dataField: 'disableYear'
  })
  disableYear: string;

  @NgField({
    dataField: 'accOrgID'
  })
  accOrgID: string;

  @NgObject({
    dataField: 'treeInfo',
    type: PathHierarchyInfoEntity
  })
  treeInfo: PathHierarchyInfoEntity;

  @NgObject({
    dataField: 'adminDeptID',
    type: Departments8864Entity
  })
  adminDeptID: Departments8864Entity;

  @NgObject({
    dataField: 'timeStamp',
    type: AdministrativeInfoEntity
  })
  timeStamp: AdministrativeInfoEntity;

}

