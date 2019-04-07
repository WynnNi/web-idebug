import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';

@Injectable()
@NgCommandHandler({
  commandName: 'ChangeAccDoc2'
})
export class ChangeAccDoc2Handler extends CommandHandler {
  constructor(
    public _StateMachineService1: StateMachineService1,
    public _AccDocService1: AccDocService1,
    public _AccDocEntryService1: AccDocEntryService1
  ) {
    super();
  }

  schedule() {

    this.addTask('loadAccDoc', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/year/value}',
        '{COMMAND~/params/accDocID}',
        '{COMMAND~/params/queryFlag}',
        ''
      ];
      return this.invoke(this._AccDocService1, 'loadAccDoc', args, context);
    });


    this.addTask('transit', (context: CommandContext) => {
      const args = [
        'Look'
      ];
      return this.invoke(this._StateMachineService1, 'transit', args, context);
    });


    this.addTask('updateInfo', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDocService1, 'updateInfo', args, context);
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
    this.addLink('transit', 'updateInfo', `1==1`);
    this.addLink('updateInfo', 'entryAmount', `1==1`);
    this.addLink('entryAmount', 'assistanceAmount', `1==1`);
  }

}

