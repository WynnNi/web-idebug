import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { TreeDataService as TreeDataService1 } from '@farris/command-services';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'AddSibling1'
})
export class AddSibling1Handler extends CommandHandler {
  constructor(
    public _TreeDataService1: TreeDataService1,
    public _StateMachineService1: StateMachineService1
  ) {
    super();
  }

  schedule() {

    this.addTask('addSibling', (context: CommandContext) => {
      const args = [
        '{DATA~/tree-grid-component/id}'
      ];
      return this.invoke(this._TreeDataService1, 'addSibling', args, context);
    });


    this.addTask('transit', (context: CommandContext) => {
      const args = [
        'Create'
      ];
      return this.invoke(this._StateMachineService1, 'transit', args, context);
    });

    this.addLink('addSibling', 'transit', `1==1`);
  }

}

