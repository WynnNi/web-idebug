import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';

@Injectable()
@NgCommandHandler({
  commandName: 'CopyThisAccDoc1'
})
export class CopyThisAccDoc1Handler extends CommandHandler {
  constructor(
    public _StateMachineService1: StateMachineService1,
    public _AccDocService1: AccDocService1,
    public _AccDocEntryService1: AccDocEntryService1
  ) {
    super();
  }

  schedule() {

    this.addTask('copyThisAccDoc1', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/year/value}',
        '{DATA~/basic-form-component/id}',
        ''
      ];
      return this.invoke(this._AccDocService1, 'copyThisAccDoc', args, context);
    });


    this.addTask('transit', (context: CommandContext) => {
      const args = [
        'Create'
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

    this.addLink('createByAccDocType', 'transit', `1==1`);
    this.addLink('transit', 'entryAmount', `1==1`);
    this.addLink('entryAmount', 'assistanceAmount', `1==1`);
  }

}

