import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { SubListDataService as SubListDataService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'GLAccDocEntryAddItem1'
})
export class GLAccDocEntryAddItem1Handler extends CommandHandler {
  constructor(
    public _SubListDataService1: SubListDataService1
  ) {
    super();
  }

  schedule() {

    this.addTask('add', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._SubListDataService1, 'add', args, context);
    });

  }

}

