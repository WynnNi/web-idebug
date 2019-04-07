import { Entity, NgField, NgObject, EntityList, NgList } from '@farris/devkit';
import { FIAccountingDepartment0ffcEntity } from './fiaccountingdepartment0ffcentity';
import { Partner8390Entity } from './partner8390entity';
import { Currency1df6Entity } from './currency1df6entity';
import { SettlementWayC9b8Entity } from './settlementwayc9b8entity';
import { FIYearEntity } from './fiyearentity';
import { AdministrativeInfoEntity } from './administrativeinfoentity';
import { FIAccountingEmployee3d76Entity } from './fiaccountingemployee3d76entity';

export class GLAccDocAssistanceEntity extends Entity {
  @NgField({
    dataField: 'id',
    primary: true
  })
  id: string;

  @NgField({
    dataField: 'accDocEntryID'
  })
  accDocEntryID: string;

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
    dataField: 'accAssCode'
  })
  accAssCode: string;

  @NgField({
    dataField: 'accTitleID'
  })
  accTitleID: string;

  @NgField({
    dataField: 'accTitleCode'
  })
  accTitleCode: string;

  @NgField({
    dataField: 'lendingDirection'
  })
  lendingDirection: any;

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
    dataField: 'amount'
  })
  amount: number;

  @NgField({
    dataField: 'bizDate'
  })
  bizDate: string;

  @NgField({
    dataField: 'operator'
  })
  operator: string;

  @NgField({
    dataField: 'billNumber'
  })
  billNumber: string;

  @NgField({
    dataField: 'accOrgCheckAccount'
  })
  accOrgCheckAccount: string;

  @NgField({
    dataField: 'sJ01'
  })
  sJ01: number;

  @NgField({
    dataField: 'sJ02'
  })
  sJ02: number;

  @NgField({
    dataField: 'sJ03'
  })
  sJ03: number;

  @NgField({
    dataField: 'sJ04'
  })
  sJ04: number;

  @NgField({
    dataField: 'sJ05'
  })
  sJ05: number;

  @NgField({
    dataField: 'sM04'
  })
  sM04: string;

  @NgField({
    dataField: 'sM05'
  })
  sM05: string;

  @NgField({
    dataField: 'sM06'
  })
  sM06: string;

  @NgField({
    dataField: 'sM07'
  })
  sM07: string;

  @NgField({
    dataField: 'sM08'
  })
  sM08: string;

  @NgField({
    dataField: 'sM09'
  })
  sM09: string;

  @NgField({
    dataField: 'sM10'
  })
  sM10: string;

  @NgField({
    dataField: 'sM03'
  })
  sM03: string;

  @NgField({
    dataField: 'sM02'
  })
  sM02: string;

  @NgField({
    dataField: 'sM01'
  })
  sM01: string;

  @NgField({
    dataField: 'settlementNumber'
  })
  settlementNumber: string;

  @NgField({
    dataField: 'application'
  })
  application: string;

  @NgField({
    dataField: 'isAccountCheck'
  })
  isAccountCheck: string;

  @NgField({
    dataField: 'settlementDate'
  })
  settlementDate: string;

  @NgField({
    dataField: 'readOnly'
  })
  readOnly: string;

  @NgField({
    dataField: 'cashProject'
  })
  cashProject: string;

  @NgField({
    dataField: 'chequePrinted'
  })
  chequePrinted: string;

  @NgField({
    dataField: 'deptVersion'
  })
  deptVersion: number;

  @NgField({
    dataField: 'relatedOrgVersion'
  })
  relatedOrgVersion: number;

  @NgField({
    dataField: 'billStateOfCapital'
  })
  billStateOfCapital: string;

  @NgField({
    dataField: 'belongDept'
  })
  belongDept: string;

  @NgField({
    dataField: 'bizCode'
  })
  bizCode: string;

  @NgField({
    dataField: 'isCC'
  })
  isCC: string;

  @NgField({
    dataField: 'speCateId99'
  })
  speCateId99: string;

  @NgField({
    dataField: 'speCateId98'
  })
  speCateId98: string;

  @NgField({
    dataField: 'speCateId97'
  })
  speCateId97: string;

  @NgField({
    dataField: 'speCateId96'
  })
  speCateId96: string;

  @NgField({
    dataField: 'speCateId95'
  })
  speCateId95: string;

  @NgField({
    dataField: 'speCateId94'
  })
  speCateId94: string;

  @NgField({
    dataField: 'speCateId93'
  })
  speCateId93: string;

  @NgField({
    dataField: 'speCateId92'
  })
  speCateId92: string;

  @NgField({
    dataField: 'speCateId91'
  })
  speCateId91: string;

  @NgField({
    dataField: 'speCateId90'
  })
  speCateId90: string;

  @NgField({
    dataField: 'speCateId89'
  })
  speCateId89: string;

  @NgField({
    dataField: 'speCateId88'
  })
  speCateId88: string;

  @NgField({
    dataField: 'speCateId87'
  })
  speCateId87: string;

  @NgField({
    dataField: 'speCateId86'
  })
  speCateId86: string;

  @NgField({
    dataField: 'speCateId85'
  })
  speCateId85: string;

  @NgField({
    dataField: 'speCateId84'
  })
  speCateId84: string;

  @NgField({
    dataField: 'speCateId83'
  })
  speCateId83: string;

  @NgField({
    dataField: 'speCateId82'
  })
  speCateId82: string;

  @NgField({
    dataField: 'speCateId81'
  })
  speCateId81: string;

  @NgField({
    dataField: 'speCateId80'
  })
  speCateId80: string;

  @NgField({
    dataField: 'speCateId79'
  })
  speCateId79: string;

  @NgField({
    dataField: 'speCateId78'
  })
  speCateId78: string;

  @NgField({
    dataField: 'speCateId77'
  })
  speCateId77: string;

  @NgField({
    dataField: 'speCateId76'
  })
  speCateId76: string;

  @NgField({
    dataField: 'speCateId75'
  })
  speCateId75: string;

  @NgField({
    dataField: 'speCateId74'
  })
  speCateId74: string;

  @NgField({
    dataField: 'speCateId73'
  })
  speCateId73: string;

  @NgField({
    dataField: 'speCateId72'
  })
  speCateId72: string;

  @NgField({
    dataField: 'speCateId71'
  })
  speCateId71: string;

  @NgField({
    dataField: 'speCateId70'
  })
  speCateId70: string;

  @NgField({
    dataField: 'speCateId69'
  })
  speCateId69: string;

  @NgField({
    dataField: 'speCateId68'
  })
  speCateId68: string;

  @NgField({
    dataField: 'speCateId67'
  })
  speCateId67: string;

  @NgField({
    dataField: 'speCateId66'
  })
  speCateId66: string;

  @NgField({
    dataField: 'speCateId65'
  })
  speCateId65: string;

  @NgField({
    dataField: 'speCateId64'
  })
  speCateId64: string;

  @NgField({
    dataField: 'speCateId63'
  })
  speCateId63: string;

  @NgField({
    dataField: 'speCateId62'
  })
  speCateId62: string;

  @NgField({
    dataField: 'speCateId61'
  })
  speCateId61: string;

  @NgField({
    dataField: 'speCateId60'
  })
  speCateId60: string;

  @NgField({
    dataField: 'speCateId59'
  })
  speCateId59: string;

  @NgField({
    dataField: 'speCateId58'
  })
  speCateId58: string;

  @NgField({
    dataField: 'speCateId57'
  })
  speCateId57: string;

  @NgField({
    dataField: 'speCateId56'
  })
  speCateId56: string;

  @NgField({
    dataField: 'speCateId55'
  })
  speCateId55: string;

  @NgField({
    dataField: 'speCateId54'
  })
  speCateId54: string;

  @NgField({
    dataField: 'speCateId53'
  })
  speCateId53: string;

  @NgField({
    dataField: 'speCateId52'
  })
  speCateId52: string;

  @NgField({
    dataField: 'speCateId51'
  })
  speCateId51: string;

  @NgField({
    dataField: 'speCateId50'
  })
  speCateId50: string;

  @NgField({
    dataField: 'speCateId49'
  })
  speCateId49: string;

  @NgField({
    dataField: 'speCateId48'
  })
  speCateId48: string;

  @NgField({
    dataField: 'speCateId47'
  })
  speCateId47: string;

  @NgField({
    dataField: 'speCateId46'
  })
  speCateId46: string;

  @NgField({
    dataField: 'speCateId45'
  })
  speCateId45: string;

  @NgField({
    dataField: 'speCateId44'
  })
  speCateId44: string;

  @NgField({
    dataField: 'speCateId43'
  })
  speCateId43: string;

  @NgField({
    dataField: 'speCateId42'
  })
  speCateId42: string;

  @NgField({
    dataField: 'speCateId41'
  })
  speCateId41: string;

  @NgField({
    dataField: 'speCateId40'
  })
  speCateId40: string;

  @NgField({
    dataField: 'speCateId39'
  })
  speCateId39: string;

  @NgField({
    dataField: 'speCateId38'
  })
  speCateId38: string;

  @NgField({
    dataField: 'speCateId37'
  })
  speCateId37: string;

  @NgField({
    dataField: 'speCateId36'
  })
  speCateId36: string;

  @NgField({
    dataField: 'speCateId35'
  })
  speCateId35: string;

  @NgField({
    dataField: 'speCateId34'
  })
  speCateId34: string;

  @NgField({
    dataField: 'speCateId33'
  })
  speCateId33: string;

  @NgField({
    dataField: 'speCateId32'
  })
  speCateId32: string;

  @NgField({
    dataField: 'speCateId31'
  })
  speCateId31: string;

  @NgField({
    dataField: 'speCateId30'
  })
  speCateId30: string;

  @NgField({
    dataField: 'speCateId29'
  })
  speCateId29: string;

  @NgField({
    dataField: 'speCateId28'
  })
  speCateId28: string;

  @NgField({
    dataField: 'speCateId27'
  })
  speCateId27: string;

  @NgField({
    dataField: 'speCateId26'
  })
  speCateId26: string;

  @NgField({
    dataField: 'speCateId25'
  })
  speCateId25: string;

  @NgField({
    dataField: 'speCateId24'
  })
  speCateId24: string;

  @NgField({
    dataField: 'speCateId23'
  })
  speCateId23: string;

  @NgField({
    dataField: 'speCateId22'
  })
  speCateId22: string;

  @NgField({
    dataField: 'speCateId21'
  })
  speCateId21: string;

  @NgField({
    dataField: 'speCateId20'
  })
  speCateId20: string;

  @NgField({
    dataField: 'speCateId19'
  })
  speCateId19: string;

  @NgField({
    dataField: 'speCateId18'
  })
  speCateId18: string;

  @NgField({
    dataField: 'speCateId17'
  })
  speCateId17: string;

  @NgField({
    dataField: 'speCateId16'
  })
  speCateId16: string;

  @NgField({
    dataField: 'speCateId15'
  })
  speCateId15: string;

  @NgField({
    dataField: 'speCateId14'
  })
  speCateId14: string;

  @NgField({
    dataField: 'speCateId13'
  })
  speCateId13: string;

  @NgField({
    dataField: 'speCateId12'
  })
  speCateId12: string;

  @NgField({
    dataField: 'speCateId11'
  })
  speCateId11: string;

  @NgField({
    dataField: 'speCateId10'
  })
  speCateId10: string;

  @NgField({
    dataField: 'speCateId09'
  })
  speCateId09: string;

  @NgField({
    dataField: 'speCateId08'
  })
  speCateId08: string;

  @NgField({
    dataField: 'speCateId07'
  })
  speCateId07: string;

  @NgField({
    dataField: 'speCateId06'
  })
  speCateId06: string;

  @NgField({
    dataField: 'speCateId05'
  })
  speCateId05: string;

  @NgField({
    dataField: 'speCateId04'
  })
  speCateId04: string;

  @NgField({
    dataField: 'speCateId03'
  })
  speCateId03: string;

  @NgField({
    dataField: 'speCateId02'
  })
  speCateId02: string;

  @NgField({
    dataField: 'speCateId01'
  })
  speCateId01: string;

  @NgField({
    dataField: 'bizDateDis'
  })
  bizDateDis: string;

  @NgField({
    dataField: 'exchangeRateType'
  })
  exchangeRateType: string;

  @NgObject({
    dataField: 'deptID',
    type: FIAccountingDepartment0ffcEntity
  })
  deptID: FIAccountingDepartment0ffcEntity;

  @NgObject({
    dataField: 'relatedOrgID',
    type: Partner8390Entity
  })
  relatedOrgID: Partner8390Entity;

  @NgObject({
    dataField: 'foreignCurrencyID',
    type: Currency1df6Entity
  })
  foreignCurrencyID: Currency1df6Entity;

  @NgObject({
    dataField: 'settlement',
    type: SettlementWayC9b8Entity
  })
  settlement: SettlementWayC9b8Entity;

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

  @NgObject({
    dataField: 'accEmployeeID',
    type: FIAccountingEmployee3d76Entity
  })
  accEmployeeID: FIAccountingEmployee3d76Entity;

}

