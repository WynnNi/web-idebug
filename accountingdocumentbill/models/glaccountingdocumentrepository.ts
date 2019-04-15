import { Injectable, Injector } from '@angular/core';
import { NgRepository } from '@farris/devkit';
import { BefRepository, NgVariable } from '@farris/bef';
import { GLAccountingDocumentEntity } from './entities/glaccountingdocumententity';

@Injectable()
@NgRepository({
  apiUrl: 'api/fi/gl/v1.0/AccountingDocumentBill',
  entityType: GLAccountingDocumentEntity
})
export class GLAccountingDocumentRepository extends BefRepository<GLAccountingDocumentEntity> {
  @NgVariable({
      mapping: 'accSet_VO'
  })
  public accSet_VO: String;

  @NgVariable({
      mapping: 'period_VO'
  })
  public period_VO: String;

  @NgVariable({
      mapping: 'year_VO'
  })
  public year_VO: String;

  @NgVariable({
      mapping: 'accOrg_VO'
  })
  public accOrg_VO: String;

  @NgVariable({
      mapping: 'chartOfAccount_VO'
  })
  public chartOfAccount_VO: String;

  @NgVariable({
      mapping: 'standardCurrency_VO'
  })
  public standardCurrency_VO: String;

  @NgVariable({
      mapping: 'fiSets_VO'
  })
  public fiSets_VO: String;

  @NgVariable({
      mapping: 'bizDate_VO'
  })
  public bizDate_VO: String;

  @NgVariable({
      mapping: 'accCanlendar_VO'
  })
  public accCanlendar_VO: String;

  @NgVariable({
      mapping: 'beginDate_VO'
  })
  public beginDate_VO: String;

  @NgVariable({
      mapping: 'endDate_VO'
  })
  public endDate_VO: String;

  @NgVariable({
      mapping: 'accDocType_VO'
  })
  public accDocType_VO: String;

  @NgVariable({
      mapping: 'makeID_VO'
  })
  public makeID_VO: String;

  @NgVariable({
      mapping: 'beginCode_VO'
  })
  public beginCode_VO: String;

  @NgVariable({
      mapping: 'endCode_VO'
  })
  public endCode_VO: String;

  constructor(injector: Injector) {
    super(injector);
  }
}

