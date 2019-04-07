import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { SubListDataService as SubListDataService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'GLAccDocAssistanceRemoveItem1'
})
export class GLAccDocAssistanceRemoveItem1Handler extends CommandHandler {
  constructor(
    public _SubListDataService1: SubListDataService1
  ) {
    super();
  }

  schedule() {

    this.addTask('remove', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/id}'
      ];
      return this.invoke(this._SubListDataService1, 'remove', args, context);
    });

  }

}

