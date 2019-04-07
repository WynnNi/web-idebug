import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { LinkViewService as LinkViewService1} from '../../services/accounitngdocumentbill_frm_linkview';

@Injectable()
@NgCommandHandler({
  commandName: 'LinkViewLoad1'
})
export class LinkViewLoad1Handler extends CommandHandler {
  constructor(
    public _LinkViewService: LinkViewService1
  ) {
    super();
  }

  schedule() {

    this.addTask('linkView1', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._LinkViewService, 'linkViewLoad', args, context);
    });
  }

}

