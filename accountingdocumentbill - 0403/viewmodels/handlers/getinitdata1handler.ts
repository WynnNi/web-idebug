import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';

@Injectable()
@NgCommandHandler({
  commandName: 'GetInitData1'
})
export class GetInitData1Handler extends CommandHandler {
  constructor(
    public _StateMachineService1: StateMachineService1,
    public _AccDocService1: AccDocService1
  ) {
    super();
  }

  schedule() {

    this.addTask('getInitData', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDocService1, 'getInitData', args, context);
    });


    this.addTask('transit', (context: CommandContext) => {
      const args = [
        'InitAction'
      ];
      return this.invoke(this._StateMachineService1, 'transit', args, context);
    });

    this.addLink('getInitData', 'transit', `1==1`);
  }

}

