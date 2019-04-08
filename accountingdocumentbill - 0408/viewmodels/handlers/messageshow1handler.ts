import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDocService } from '../../services/accountingdocumentbill_frm_accdoc';

@Injectable()
@NgCommandHandler({
  commandName: 'MessageShow1'
})
export class MessageShow1Handler extends CommandHandler {
  constructor(
    public _AccDocService: AccDocService
  ) {
    super();
  }

  schedule() {

    this.addTask('messageShow1', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDocService, 'messageShow', args, context);
    });
  }

}

