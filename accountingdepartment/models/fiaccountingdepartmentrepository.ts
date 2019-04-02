import { Injectable, Injector } from '@angular/core';
import { NgRepository } from '@farris/devkit';
import { BefRepository, NgVariable } from '@farris/bef';
import { FIAccountingDepartmentEntity } from './entities/fiaccountingdepartmententity';

@Injectable()
@NgRepository({
  apiUrl: 'api/bf/df/v1.0/AccountingDepartment_frm',
  entityType: FIAccountingDepartmentEntity
})
export class FIAccountingDepartmentRepository extends BefRepository<FIAccountingDepartmentEntity> {
  @NgVariable({
      mapping: 'accOrg_VO'
  })
  public accOrg_VO: String;

  constructor(injector: Injector) {
    super(injector);
  }
}

