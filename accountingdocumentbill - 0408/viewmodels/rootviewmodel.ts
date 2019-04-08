import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
import { Observable } from 'rxjs';
import { BasicFormViewmodel } from './basicformviewmodel';
import { GLAccDocEntryComponentViewmodel } from './glaccdocentrycomponentviewmodel';
import { GLAccDocAssistanceComponentViewmodel } from './glaccdocassistancecomponentviewmodel';

@Injectable()
export class RootViewmodel extends ViewModel {
  public bindingPath = '/';

  public dom = {};

  public basicFormViewmodel: BasicFormViewmodel;
  public gLAccDocEntryComponentViewmodel: GLAccDocEntryComponentViewmodel;
  public gLAccDocAssistanceComponentViewmodel: GLAccDocAssistanceComponentViewmodel;



  @NgCommand({
    name: 'MessageShow1',
    params: {

    }
  })
  public MessageShow1(): Observable<any> { return; }

  @NgCommand({
    name: 'Load1',
    params: {
      action: '{UISTATE~/root-component/action}'
    },
    paramDescriptions: {
      action: { type: 'string' }
    }
  })
  public Load1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadAndAdd1',
    params: {
      transitionAction: 'Create'
    },
    paramDescriptions: {
      transitionAction: { type: 'string' }
    }
  })
  public LoadAndAdd1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadAndView1',
    params: {
      id: '{UISTATE~/root-component/id}',
      transitionAction: 'Cancel'
    },
    paramDescriptions: {
      id: { type: 'string' },
      transitionAction: { type: 'string' }
    }
  })
  public LoadAndView1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadAndEdit1',
    params: {
      id: '{UISTATE~/root-component/id}',
      transitionAction: 'Edit'
    },
    paramDescriptions: {
      id: { type: 'string' },
      transitionAction: { type: 'string' }
    }
  })
  public LoadAndEdit1(): Observable<any> { return; }

  @NgCommand({
    name: 'Add1',
    params: {
      transitionAction: 'Create'
    },
    paramDescriptions: {
      transitionAction: { type: 'string' }
    }
  })
  public Add1(): Observable<any> { return; }

  @NgCommand({
    name: 'Edit1',
    params: {
      transitionAction: 'Edit'
    },
    paramDescriptions: {
      transitionAction: { type: '' }
    }
  })
  public Edit1(): Observable<any> { return; }

  @NgCommand({
    name: 'Save1',
    params: {
      transitionAction: 'Cancel'
    },
    paramDescriptions: {
      transitionAction: { type: 'string' }
    }
  })
  public Save1(): Observable<any> { return; }

  @NgCommand({
    name: 'Cancel1',
    params: {
      transitionAction: 'Cancel'
    },
    paramDescriptions: {
      transitionAction: { type: 'string' }
    }
  })
  public Cancel1(): Observable<any> { return; }

  @NgCommand({
    name: 'Close1',
    params: {
      url: '',
      params: ''
    },
    paramDescriptions: {
      url: { type: 'string' },
      params: { type: 'string' }
    }
  })
  public Close1(): Observable<any> { return; }

  @NgCommand({
    name: 'GetInitData1',
    params: {

    }
  })
  public GetInitData1(): Observable<any> { return; }

  @NgCommand({
    name: 'LinkViewLoad1',
    params: {

    }
  })
  public LinkViewLoad1(): Observable<any> { return; }

  @NgCommand({
    name: 'LoadData1',
    params: {

    }
  })
  public LoadData1(): Observable<any> { return; }

  @NgCommand({
    name: 'AccSetAfterLookUp1',
    params: {

    }
  })
  public AccSetAfterLookUp1(): Observable<any> { return; }

  @NgCommand({
    name: 'AccountAccDoc1',
    params: {

    }
  })
  public AccountAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'CanceAccountAccDoc1',
    params: {

    }
  })
  public CanceAccountAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'CheckAccDoc1',
    params: {

    }
  })
  public CheckAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'CancelCheckAccDoc1',
    params: {

    }
  })
  public CancelCheckAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'ApproveAccDoc1',
    params: {

    }
  })
  public ApproveAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'CancelApproveAccDoc1',
    params: {

    }
  })
  public CancelApproveAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'SignatureAccDoc1',
    params: {

    }
  })
  public SignatureAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'CancelSignatureAccDoc1',
    params: {

    }
  })
  public CancelSignatureAccDoc1(): Observable<any> { return; }

  @NgCommand({
    name: 'CopyThisAccDoc1',
    params: {

    }
  })
  public CopyThisAccDoc1(): Observable<any> { return; }

}

