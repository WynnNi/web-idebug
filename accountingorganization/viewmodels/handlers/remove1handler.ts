import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { TreeDataService as TreeDataService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'Remove1'
})
export class Remove1Handler extends CommandHandler {
  constructor(
    public _TreeDataService1: TreeDataService1
  ) {
    super();
  }

  schedule() {

    this.addTask('remove', (context: CommandContext) => {
      const args = [
        '{DATA~/tree-grid-component/id}'
      ];
      return this.invoke(this._TreeDataService1, 'remove', args, context);
    });


    this.addTask('load', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._TreeDataService1, 'load', args, context);
    });

    this.addLink('remove', 'load', `1==1`);
  }

}

