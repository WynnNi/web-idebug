import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { LinkViewService as LinkViewService1 } from '../../services/accounitngdocumentbill_frm_linkview';

@Injectable()
@NgCommandHandler({
  commandName: 'CancelCheckAccDoc1'
})
export class CancelCheckAccDoc1Handler extends CommandHandler {
  constructor(
    public _LinkViewService: LinkViewService1
  ) {
    super();
  }

  schedule() {

    this.addTask('cancelCheckAccDoc1', (context: CommandContext) => {
      const args = [
        '0',
        ''
      ];
      return this.invoke(this._LinkViewService, 'checkAccDoc', args, context);
    });
  }

}

