import { Injectable, Injector } from '@angular/core';
import { NgRepository } from '@farris/devkit';
import { BefRepository } from '@farris/bef';
import { GLAccountingDocumentEntity } from './entities/glaccountingdocumententity';

@Injectable()
@NgRepository({
  apiUrl: 'api/fi/gl/v1.0/AccountingDocumentBill',
  entityType: GLAccountingDocumentEntity
})
export class GLAccountingDocumentRepository extends BefRepository<GLAccountingDocumentEntity> {
  constructor(injector: Injector) {
    super(injector);
  }
}

