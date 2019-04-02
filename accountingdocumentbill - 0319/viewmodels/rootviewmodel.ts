import { Injectable } from '@angular/core';
import { ViewModel, NgCommand } from '@farris/devkit';
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
    name: 'Load1',
    params: {
      action: '{UISTATE~/root-component/action}'
    },
    paramDescriptions: {
      action: { type: 'string' }
    }
  })
  public Load1() {}

  @NgCommand({
    name: 'LoadAndAdd1',
    params: {
      transitionAction: 'Create'
    },
    paramDescriptions: {
      transitionAction: { type: 'string' }
    }
  })
  public LoadAndAdd1() {}

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
  public LoadAndView1() {}

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
  public LoadAndEdit1() {}

  @NgCommand({
    name: 'Add1',
    params: {
      transitionAction: 'Create'
    },
    paramDescriptions: {
      transitionAction: { type: 'string' }
    }
  })
  public Add1() {}

  @NgCommand({
    name: 'Edit1',
    params: {
      transitionAction: 'Edit'
    },
    paramDescriptions: {
      transitionAction: { type: '' }
    }
  })
  public Edit1() {}

  @NgCommand({
    name: 'Save1',
    params: {
      transitionAction: 'Cancel'
    },
    paramDescriptions: {
      transitionAction: { type: 'string' }
    }
  })
  public Save1() {}

  @NgCommand({
    name: 'Cancel1',
    params: {
      transitionAction: 'Cancel'
    },
    paramDescriptions: {
      transitionAction: { type: 'string' }
    }
  })
  public Cancel1() {}

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
  public Close1() {}

  @NgCommand({
    name: 'GetInitData1',
    params: {

    }
  })
  public GetInitData1() {}

  @NgCommand({
    name: 'LinkViewLoad1',
    params: {

    }
  })
  public LinkViewLoad1() {}

  @NgCommand({
    name: 'LoadData1',
    params: {

    }
  })
  public LoadData1() {}

}

