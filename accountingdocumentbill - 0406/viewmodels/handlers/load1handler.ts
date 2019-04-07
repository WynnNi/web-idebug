import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { CommandService as CommandService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'Load1'
})
export class Load1Handler extends CommandHandler {
  constructor(
    public _CommandService1: CommandService1
  ) {
    super();
  }

  schedule() {

    this.addTask('execute', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/action}'
      ];
      return this.invoke(this._CommandService1, 'execute', args, context);
    });

  }

}

