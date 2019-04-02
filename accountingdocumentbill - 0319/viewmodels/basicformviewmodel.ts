import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';

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
  public AddByType1() {}

  @NgCommand({
    name: 'InitAdd1',
    params: {

    }
  })
  public InitAdd1() {}

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
  public ChangeAccDoc1() {}

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
  public ChangeAccDoc2() {}

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
  public ChangeAccDoc3() {}

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
  public ChangeAccDoc4() {}

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
  public DeleteAccDoc1() {}

  @NgCommand({
    name: 'SaveAccDoc1',
    params: {
      accDocID: '{DATA~/basic-form-component/id}'
    },
    paramDescriptions: {
      accDocID: { type: 'string' }
    }
  })
  public SaveAccDoc1() {}

  @NgCommand({
    name: 'AddAccDoc1',
    params: {

    }
  })
  public AddAccDoc1() {}

  @NgCommand({
    name: 'LookUp1',
    params: {

    }
  })
  public LookUp1() {}

  @NgCommand({
    name: 'CancelAccDoc1',
    params: {
      accDocID: '{DATA~/basic-form-component/id}'
    },
    paramDescriptions: {
      accDocID: { type: 'string' }
    }
  })
  public CancelAccDoc1() {}

  @NgCommand({
    name: 'SubscribeChange1',
    params: {

    }
  })
  public SubscribeChange1() {}

}

