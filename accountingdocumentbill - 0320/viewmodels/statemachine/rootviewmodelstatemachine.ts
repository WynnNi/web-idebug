import { Injectable } from '@angular/core';
import { StateMachine, State, NgState, RenderState,  NgRenderState, Action, NgAction } from '@farris/devkit';

@Injectable()
export class RootViewmodelStateMachine extends StateMachine {
  @NgState()
  add: State;

  @NgState({
     initialState: true
  })
  init: State;

  @NgState()
  edit: State;

  @NgState()
  view: State;

  @NgRenderState({
     render: (context: any) => context.state === 'view'
  })
  canAdd: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'view'
  })
  canEdit: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'edit' || context.state == 'add'
  })
  canCancel: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  canSave: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'view'
  })
  canRemove: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  canAddDetail: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  canRemoveDetail: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  editable: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'view' || context.state == 'edit' || context.state == 'add'
  })
  canLook: RenderState;

  @NgRenderState({
     render: (context: any) => context.state == 'init'
  })
  canInit: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'view' || context.state == 'init'
  })
  canConfirm: RenderState;

  @NgAction({
     transitTo: 'add'
  })
  Create: Action;

  @NgAction({
     transitTo: 'edit'
  })
  Edit: Action;

  @NgAction({
     transitTo: 'view'
  })
  Cancel: Action;

  @NgAction({
     transitTo: 'view'
  })
  Save: Action;

  @NgAction({
     transitTo: 'view'
  })
  Look: Action;

  @NgAction({
     transitTo: 'init'
  })
  InitAction: Action;

}

