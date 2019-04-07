import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';

@Injectable()
@NgCommandHandler({
  commandName: 'InitAdd1'
})
export class InitAdd1Handler extends CommandHandler {
  constructor(
    public _StateMachineService1: StateMachineService1,
    public _AccDocService1: AccDocService1
  ) {
    super();
  }

  schedule() {

    this.addTask('transit', (context: CommandContext) => {
      const args = [
        'Create'
      ];
      return this.invoke(this._StateMachineService1, 'transit', args, context);
    });


    this.addTask('initData', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDocService1, 'initData', args, context);
    });

    this.addLink('transit', 'initData', `1==1`);
  }

}

