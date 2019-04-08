import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { LinkViewService as LinkViewService1} from '../../services/accounitngdocumentbill_frm_linkview';

@Injectable()
@NgCommandHandler({
  commandName: 'ApproveAccDoc1'
})
export class ApproveAccDoc1Handler extends CommandHandler {
  constructor(
    public _LinkViewService: LinkViewService1
  ) {
    super();
  }

  schedule() {

    this.addTask('approveAccDoc1', (context: CommandContext) => {
      const args = [
        '1',
        ''
      ];
      return this.invoke(this._LinkViewService, 'approveAccDoc', args, context);
    });
  }

}

