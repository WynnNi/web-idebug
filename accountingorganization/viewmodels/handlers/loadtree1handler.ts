import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { TreeDataService as TreeDataService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'LoadTree1'
})
export class LoadTree1Handler extends CommandHandler {
  constructor(
    public _TreeDataService1: TreeDataService1
  ) {
    super();
  }

  schedule() {

    this.addTask('load', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._TreeDataService1, 'load', args, context);
    });

  }

}

