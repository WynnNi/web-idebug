import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { DFCodeEntity } from './dfcodeentity';
import { DFNameEntity } from './dfnameentity';

export class Currency1df6Entity extends Entity {
  @NgField({
    dataField: 'foreignCurrencyID',
    primary: true
  })
  foreignCurrencyID: string;

  @NgField({
    dataField: 'foreignCurrencyID_Accuracy'
  })
  foreignCurrencyID_Accuracy: number;

  @NgObject({
    dataField: 'foreignCurrencyID_Code',
    type: DFCodeEntity
  })
  foreignCurrencyID_Code: DFCodeEntity;

  @NgObject({
    dataField: 'foreignCurrencyID_Name',
    type: DFNameEntity
  })
  foreignCurrencyID_Name: DFNameEntity;

}

