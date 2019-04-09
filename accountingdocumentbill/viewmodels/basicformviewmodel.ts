import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';

@Injectable()
export class BasicFormViewmodel extends ViewModel {
  public bindingPath = '/';

  public dom = {};


  @NgCommand({
    name: 'AddByType1',
    params: {
      year: '{UISTATE~/root-component/year}',
      accOrgID: '{DATA~/basic-form-component/accOrgID/accOrgID}',
      ledger: '{DATA~/basic-form-component/ledger}',
      accDocTypeID: '{DATA~/basic-form-component/accDocTypeID/accDocTypeID}',
      bizDate: '{DATA~/basic-form-component/accDocDate}'
    },
    paramDescriptions: {
      year: { type: 'string' },
      accOrgID: { type: 'string' },
      ledger: { type: 'string' },
      accDocTypeID: { type: 'string' },
      bizDate: { type: 'string' }
    }
  })
  public AddByType1(): Observable<any> { return; }

  @NgCommand({
    name: 'InitAdd1',
    params: {

    }
  })
  public InitAdd1(): Observable<any> { return; }

  @NgCommand({
    name: 'ChangeAccDoc1',
    params: {
      year: '{UISTATE~/root-component/year}',
      accDocID: '{DATA~/basic-form-component/id}',
      queryFlag: '1'
    },
    paramDescriptions: {
      year: { type: 'string' },
      accDocID: { type: 'string' },
      queryFlag: { type: 'string' }
    }
  })
  public ChangeAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'ChangeAccDoc2',
    params: {
      year: '{UISTATE~/root-component/year}',
      accDocID: '{DATA~/basic-form-component/id}',
      queryFlag: '2'
    },
    paramDescriptions: {
      year: { type: 'string' },
      accDocID: { type: 'string' },
      queryFlag: { type: 'string' }
    }
  })
  public ChangeAccDoc2(): Observable<any> { return; }

  @NgCommand({
    name: 'ChangeAccDoc3',
    params: {
      year: '{UISTATE~/root-component/year}',
      accDocID: '{DATA~/basic-form-component/id}',
      queryFlag: '3'
    },
    paramDescriptions: {
      year: { type: 'string' },
      accDocID: { type: 'string' },
      queryFlag: { type: 'string' }
    }
  })
  public ChangeAccDoc3(): Observable<any> { return; }

  @NgCommand({
    name: 'ChangeAccDoc4',
    params: {
      year: '{UISTATE~/root-component/year}',
      accDocID: '{DATA~/basic-form-component/id}',
      queryFlag: '4'
    },
    paramDescriptions: {
      year: { type: 'string' },
      accDocID: { type: 'string' },
      queryFlag: { type: 'string' }
    }
  })
  public ChangeAccDoc4(): Observable<any> { return; }

  @NgCommand({
    name: 'DeleteAccDoc1',
    params: {
      year: '{UISTATE~/root-component/year}',
      accDocID: '{DATA~/basic-form-component/id}'
    },
    paramDescriptions: {
      year: { type: 'string' },
      accDocID: { type: 'string' }
    }
  })
  public DeleteAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'SaveAccDoc1',
    params: {
      accDocID: '{DATA~/basic-form-component/id}'
    },
    paramDescriptions: {
      accDocID: { type: 'string' }
    }
  })
  public SaveAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'AddAccDoc1',
    params: {

    }
  })
  public AddAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'LookUp1',
    params: {

    }
  })
  public LookUp1(): Observable<any> { return; }

  @NgCommand({
    name: 'CancelAccDoc1',
    params: {
      accDocID: '{DATA~/basic-form-component/id}'
    },
    paramDescriptions: {
      accDocID: { type: 'string' }
    }
  })
  public CancelAccDoc1(): Observable<any> { return; }

}

