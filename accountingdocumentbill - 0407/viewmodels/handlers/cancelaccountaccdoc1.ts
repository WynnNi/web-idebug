import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { LinkViewService as LinkViewService1 } from '../../services/accounitngdocumentbill_frm_linkview';

@Injectable()
@NgCommandHandler({
  commandName: 'CancelAccountAccDoc1'
})
export class CancelAccountAccDoc1Handler extends CommandHandler {
  constructor(
    public _LinkViewService: LinkViewService1
  ) {
    super();
  }

  schedule() {

    this.addTask('cancelAccountAccDoc1', (context: CommandContext) => {
      const args = [
        '0',
        ''
      ];
      return this.invoke(this._LinkViewService, 'accountAccDoc', args, context);
    });
  }

}

