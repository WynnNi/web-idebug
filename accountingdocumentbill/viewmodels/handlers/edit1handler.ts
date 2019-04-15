import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { CardDataService as CardDataService1 } from '@farris/command-services';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';
import { AccDocService as AccDocService1} from '../../services/accountingdocumentbill_frm_accdoc';

@Injectable()
@NgCommandHandler({
  commandName: 'Edit1'
})
export class Edit1Handler extends CommandHandler {
  constructor(
    public _AccDocService1: AccDocService1
  ) {
    super();
  }

  schedule() {

    this.addTask('canEditAccDoc', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._AccDocService1, 'canEitAccDoc', args, context);
    });

  }

}

