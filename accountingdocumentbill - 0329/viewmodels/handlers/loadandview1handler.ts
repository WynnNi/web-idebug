import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { CardDataService as CardDataService1 } from '@farris/command-services';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'LoadAndView1'
})
export class LoadAndView1Handler extends CommandHandler {
  constructor(
    public _CardDataService1: CardDataService1,
    public _StateMachineService1: StateMachineService1
  ) {
    super();
  }

  schedule() {

    this.addTask('load', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/id}'
      ];
      return this.invoke(this._CardDataService1, 'load', args, context);
    });


    this.addTask('transit', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/transitionAction}'
      ];
      return this.invoke(this._StateMachineService1, 'transit', args, context);
    });

    this.addLink('load', 'transit', `1==1`);
  }

}

