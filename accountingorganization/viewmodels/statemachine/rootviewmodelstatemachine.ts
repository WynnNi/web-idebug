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

  @NgRenderState({
     render: (context: any) => context.state === 'init'
  })
  canAdd: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'init'
  })
  canEdit: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  canCancel: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  canSave: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'init'
  })
  canRemove: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  editable: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  canAddDetail: RenderState;

  @NgRenderState({
     render: (context: any) => context.state === 'add' || context.state === 'edit'
  })
  canRemoveDetail: RenderState;

  @NgAction({
     transitTo: 'add'
  })
  Create: Action;

  @NgAction({
     transitTo: 'edit'
  })
  Edit: Action;

  @NgAction({
     transitTo: 'init'
  })
  Cancel: Action;

  @NgAction({
     transitTo: 'init'
  })
  Save: Action;

}

