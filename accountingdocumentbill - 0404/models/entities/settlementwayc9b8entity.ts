import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { DFCode0d33Entity } from './dfcode0d33entity';
import { DFName4fcfEntity } from './dfname4fcfentity';

export class SettlementWayC9b8Entity extends Entity {
  @NgField({
    dataField: 'settlement',
    primary: true
  })
  settlement: string;

  @NgObject({
    dataField: 'settlement_Code',
    type: DFCode0d33Entity
  })
  settlement_Code: DFCode0d33Entity;

  @NgObject({
    dataField: 'settlement_Name',
    type: DFName4fcfEntity
  })
  settlement_Name: DFName4fcfEntity;

}

