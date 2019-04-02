import { Injectable, Injector } from '@angular/core';
import { NgRepository } from '@farris/devkit';
import { BefRepository, NgVariable } from '@farris/bef';
import { FIAccountingOrganizationEntity } from './entities/fiaccountingorganizationentity';

@Injectable()
@NgRepository({
  apiUrl: 'api/bf/df/v1.0/AccountingOrganization_frm',
  entityType: FIAccountingOrganizationEntity
})
export class FIAccountingOrganizationRepository extends BefRepository<FIAccountingOrganizationEntity> {
  constructor(injector: Injector) {
    super(injector);
  }
}

