import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { GLAccDocAssistanceEntity } from './glaccdocassistanceentity';
import { AccountTitleF8ccEntity } from './accounttitlef8ccentity';
import { FIYearEntity } from './fiyearentity';
import { AdministrativeInfoEntity } from './administrativeinfoentity';

export class GLAccDocEntryEntity extends Entity {
  @NgField({
    dataField: 'id',
    primary: true
  })
  id: string;

  @NgField({
    dataField: 'accDocID'
  })
  accDocID: string;

  @NgField({
    dataField: 'accOrgID'
  })
  accOrgID: string;

  @NgField({
    dataField: 'ledger'
  })
  ledger: string;

  @NgField({
    dataField: 'accEntryCode'
  })
  accEntryCode: string;

  @NgField({
    dataField: 'accTitleCode'
  })
  accTitleCode: string;

  @NgField({
    dataField: 'settlement'
  })
  settlement: string;

  @NgField({
    dataField: 'abstract'
  })
  abstract: string;

  @NgField({
    dataField: 'amount'
  })
  amount: number;

  @NgField({
    dataField: 'quantity'
  })
  quantity: number;

  @NgField({
    dataField: 'unitPrice'
  })
  unitPrice: number;

  @NgField({
    dataField: 'foreignCurrency'
  })
  foreignCurrency: number;

  @NgField({
    dataField: 'exchangeRate'
  })
  exchangeRate: number;

  @NgField({
    dataField: 'settlementNumber'
  })
  settlementNumber: string;

  @NgField({
    dataField: 'bizDate'
  })
  bizDate: string;

  @NgField({
    dataField: 'currencyID'
  })
  currencyID: string;

  @NgField({
    dataField: 'isAccountCheck'
  })
  isAccountCheck: string;

  @NgField({
    dataField: 'readOnly'
  })
  readOnly: any;

  @NgField({
    dataField: 'modelItem'
  })
  modelItem: string;

  @NgField({
    dataField: 'oppositeAccTitle'
  })
  oppositeAccTitle: string;

  @NgField({
    dataField: 'oppositeAccTitleFlag'
  })
  oppositeAccTitleFlag: string;

  @NgField({
    dataField: 'startEntry'
  })
  startEntry: string;

  @NgField({
    dataField: 'endEntry'
  })
  endEntry: string;

  @NgField({
    dataField: 'creditAmount'
  })
  creditAmount: number;

  @NgField({
    dataField: 'debitAmount'
  })
  debitAmount: number;

  @NgField({
    dataField: 'creditFCurrencyAmount'
  })
  creditFCurrencyAmount: number;

  @NgField({
    dataField: 'debitFCurrencyAmount'
  })
  debitFCurrencyAmount: number;

  @NgField({
    dataField: 'existsAss'
  })
  existsAss: any;

  @NgField({
    dataField: 'accDetDisplay'
  })
  accDetDisplay: string;

  @NgField({
    dataField: 'lendingDirection'
  })
  lendingDirection: any;

  @NgList({
    dataField: 'glAccDocAssistances',
    type: GLAccDocAssistanceEntity
  })
  glAccDocAssistances: EntityList<GLAccDocAssistanceEntity>;

  @NgObject({
    dataField: 'accTitleID',
    type: AccountTitleF8ccEntity
  })
  accTitleID: AccountTitleF8ccEntity;

  @NgObject({
    dataField: 'year',
    type: FIYearEntity
  })
  year: FIYearEntity;

  @NgObject({
    dataField: 'timeStamp',
    type: AdministrativeInfoEntity
  })
  timeStamp: AdministrativeInfoEntity;

}

