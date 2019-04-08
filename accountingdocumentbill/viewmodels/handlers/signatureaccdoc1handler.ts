import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { LinkViewService as LinkViewService1} from '../../services/accounitngdocumentbill_frm_linkview';

@Injectable()
@NgCommandHandler({
  commandName: 'SignatureAccDoc1'
})
export class SignatureAccDoc1Handler extends CommandHandler {
  constructor(
    public _LinkViewService: LinkViewService1
  ) {
    super();
  }

  schedule() {

    this.addTask('signatureAccDoc1', (context: CommandContext) => {
      const args = [
        '1',
        ''
      ];
      return this.invoke(this._LinkViewService, 'signatureAccDoc', args, context);
    });
  }

}

