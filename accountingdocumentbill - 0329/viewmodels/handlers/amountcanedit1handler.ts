import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';

@Injectable()
@NgCommandHandler({
  commandName: 'AmountCanEdit1'
})
export class AmountCanEdit1Handler extends CommandHandler {
  constructor(
    public _AccDocService1: AccDocService1
  ) {
    super();
  }

  schedule() {

    this.addTask('amountCanEdit', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDocService1, 'amountCanEdit', args, context);
    });

  }

}

