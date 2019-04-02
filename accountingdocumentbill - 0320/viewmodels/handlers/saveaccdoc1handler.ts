import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { CardDataService as CardDataService1 } from '@farris/command-services';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';

@Injectable()
@NgCommandHandler({
  commandName: 'SaveAccDoc1'
})
export class SaveAccDoc1Handler extends CommandHandler {
  constructor(
    public _CardDataService1: CardDataService1,
    public _StateMachineService1: StateMachineService1,
    public _AccDocService1: AccDocService1,
    public _AccDocEntryService1: AccDocEntryService1
  ) {
    super();
  }

  schedule() {

    this.addTask('saveAccDoc', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDocService1, 'saveAccDoc', args, context);
    });


    this.addTask('load', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/accDocID}'
      ];
      return this.invoke(this._CardDataService1, 'load', args, context);
    });


    this.addTask('total', (context: CommandContext) => {
      const args = [
        '',
        ''
      ];
      return this.invoke(this._AccDocService1, 'total', args, context);
    });


    this.addTask('transit', (context: CommandContext) => {
      const args = [
        'Cancel'
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

    this.addLink('saveAccDoc', 'load', `1==1`);
    this.addLink('load', 'total', `1==1`);
    this.addLink('total', 'transit', `1==1`);
    this.addLink('transit', 'entryAmount', `1==1`);
    this.addLink('entryAmount', 'assistanceAmount', `1==1`);
  }

}

