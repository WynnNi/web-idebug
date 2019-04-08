import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';
import { LinkViewService as LinkViewService1 } from '../../services/accounitngdocumentbill_frm_linkview';
@Injectable()
@NgCommandHandler({
  commandName: 'ChangeAccDocOnLinkView4'
})
export class ChangeAccDocOnLinkView4Handler extends CommandHandler {
  constructor(public _StateMachineService1: StateMachineService1, public _AccDocService1: AccDocService1, public _AccDocEntryService1: AccDocEntryService1, public _LinkViewService1: LinkViewService1) {
    super();
  }
  schedule() {
    this.addTask('lookAccDocOnLinkView', (context: CommandContext) => {
      const args = [
        '4',
        ''
      ];
      return this.invoke(this._LinkViewService1, 'lookAccDocOnLinkView', args, context);
    });
    this.addTask('transit', (context: CommandContext) => {
      const args = [
        'Look'
      ];
      return this.invoke(this._StateMachineService1, 'transit', args, context);
    });
    this.addTask('entryAmount', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDocService1, 'entryAmount', args, context);
    });
    this.addTask('assistanceAmount', (context: CommandContext) => {
      const args = [
        '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
        ''
      ];
      return this.invoke(this._AccDocEntryService1, 'assistanceAmount', args, context);
    });
    this.addLink('loadAccDoc', 'transit', `1==1`);
    this.addLink('transit', 'entryAmount', `1==1`);
    this.addLink('entryAmount', 'assistanceAmount', `1==1`);
  }
}
