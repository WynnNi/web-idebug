import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { GLAccDocEntryEntity } from './glaccdocentryentity';
import { FIYearEntity } from './fiyearentity';
import { AccDocTypeCC98Entity } from './accdoctypecc98entity';
import { FIAccountingEmployeeE1f1Entity } from './fiaccountingemployeee1f1entity';
import { AdministrativeInfoEntity } from './administrativeinfoentity';
import { FIAccountingOrganization32a4Entity } from './fiaccountingorganization32a4entity';

export class GLAccountingDocumentEntity extends Entity {
  @NgField({
    dataField: 'id',
    primary: true
  })
  id: string;

  @NgField({
    dataField: 'ledger'
  })
  ledger: string;

  @NgField({
    dataField: 'accPeriodCode'
  })
  accPeriodCode: string;

  @NgField({
    dataField: 'accPeriodID'
  })
  accPeriodID: string;

  @NgField({
    dataField: 'accDocDate'
  })
  accDocDate: string;

  @NgField({
    dataField: 'accDocCode'
  })
  accDocCode: string;

  @NgField({
    dataField: 'numberOfAttch'
  })
  numberOfAttch: number;

  @NgField({
    dataField: 'sourceClass'
  })
  sourceClass: string;

  @NgField({
    dataField: 'makerID'
  })
  makerID: string;

  @NgField({
    dataField: 'makerName'
  })
  makerName: string;

  @NgField({
    dataField: 'approverID'
  })
  approverID: string;

  @NgField({
    dataField: 'approverName'
  })
  approverName: string;

  @NgField({
    dataField: 'auditor'
  })
  auditor: string;

  @NgField({
    dataField: 'auditorName'
  })
  auditorName: string;

  @NgField({
    dataField: 'bookerID'
  })
  bookerID: string;

  @NgField({
    dataField: 'bookerName'
  })
  bookerName: string;

  @NgField({
    dataField: 'cashierID'
  })
  cashierID: string;

  @NgField({
    dataField: 'cashierName'
  })
  cashierName: string;

  @NgField({
    dataField: 'accManagerID'
  })
  accManagerID: string;

  @NgField({
    dataField: 'accManagerName'
  })
  accManagerName: string;

  @NgField({
    dataField: 'isAudit'
  })
  isAudit: any;

  @NgField({
    dataField: 'isBook'
  })
  isBook: any;

  @NgField({
    dataField: 'isComplete'
  })
  isComplete: any;

  @NgField({
    dataField: 'isVoid'
  })
  isVoid: any;

  @NgField({
    dataField: 'isCashFlowRead'
  })
  isCashFlowRead: string;

  @NgField({
    dataField: 'isApproved'
  })
  isApproved: any;

  @NgField({
    dataField: 'bizInterfaceType'
  })
  bizInterfaceType: string;

  @NgField({
    dataField: 'leadInYear'
  })
  leadInYear: string;

  @NgField({
    dataField: 'leadInPeriod'
  })
  leadInPeriod: string;

  @NgField({
    dataField: 'externalDoc'
  })
  externalDoc: string;

  @NgField({
    dataField: 'reasonForRefusal'
  })
  reasonForRefusal: string;

  @NgField({
    dataField: 'readonlyFlag'
  })
  readonlyFlag: any;

  @NgField({
    dataField: 'reasonForNAudit'
  })
  reasonForNAudit: string;

  @NgField({
    dataField: 'numberOfNote'
  })
  numberOfNote: number;

  @NgField({
    dataField: 'signMessage'
  })
  signMessage: string;

  @NgField({
    dataField: 'cerBase64String'
  })
  cerBase64String: string;

  @NgField({
    dataField: 'realTimeTally'
  })
  realTimeTally: any;

  @NgField({
    dataField: 'abstract'
  })
  abstract: string;

  @NgField({
    dataField: 'amount'
  })
  amount: number;

  @NgField({
    dataField: 'operatorName'
  })
  operatorName: string;

  @NgField({
    dataField: 'moduleID'
  })
  moduleID: string;

  @NgField({
    dataField: 'secretLevelNum'
  })
  secretLevelNum: string;

  @NgField({
    dataField: 'imageBarCode'
  })
  imageBarCode: string;

  @NgField({
    dataField: 'imageElecAccDoc'
  })
  imageElecAccDoc: string;

  @NgField({
    dataField: 'printFlag'
  })
  printFlag: any;

  @NgField({
    dataField: 'pzkid'
  })
  pzkid: string;

  @NgField({
    dataField: 'makerCode'
  })
  makerCode: string;

  @NgField({
    dataField: 'geElecDoc'
  })
  geElecDoc: string;

  @NgField({
    dataField: 'imageFlag'
  })
  imageFlag: string;

  @NgField({
    dataField: 'cancellationAccDocISN'
  })
  cancellationAccDocISN: string;

  @NgField({
    dataField: 'accDocCodeDisplay'
  })
  accDocCodeDisplay: string;

  @NgField({
    dataField: 'accDocDateDisplay'
  })
  accDocDateDisplay: string;

  @NgField({
    dataField: 'mainLedgerName'
  })
  mainLedgerName: string;

  @NgField({
    dataField: 'accDwDisplay'
  })
  accDwDisplay: string;

  @NgField({
    dataField: 'dwVersion'
  })
  dwVersion: number;

  @NgField({
    dataField: 'secretLevelID'
  })
  secretLevelID: any;

  @NgList({
    dataField: 'glAccDocEntrys',
    type: GLAccDocEntryEntity
  })
  glAccDocEntrys: EntityList<GLAccDocEntryEntity>;

  @NgObject({
    dataField: 'year',
    type: FIYearEntity
  })
  year: FIYearEntity;

  @NgObject({
    dataField: 'accDocTypeID',
    type: AccDocTypeCC98Entity
  })
  accDocTypeID: AccDocTypeCC98Entity;

  @NgObject({
    dataField: 'operatorID',
    type: FIAccountingEmployeeE1f1Entity
  })
  operatorID: FIAccountingEmployeeE1f1Entity;

  @NgObject({
    dataField: 'timeStamp',
    type: AdministrativeInfoEntity
  })
  timeStamp: AdministrativeInfoEntity;

  @NgObject({
    dataField: 'accOrgID',
    type: FIAccountingOrganization32a4Entity
  })
  accOrgID: FIAccountingOrganization32a4Entity;

}

