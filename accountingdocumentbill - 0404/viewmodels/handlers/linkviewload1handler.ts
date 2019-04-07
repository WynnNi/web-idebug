import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { CardDataService as CardDataService1 } from '@farris/command-services';
import { StateMachineService as StateMachineService1 } from '@farris/command-services';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';

@Injectable()
@NgCommandHandler({
  commandName: 'LinkViewLoad1'
})
export class LinkViewLoad1Handler extends CommandHandler {
  constructor(
    public _CardDataService1: CardDataService1,
    public _StateMachineService1: StateMachineService1,
    public _AccDocService1: AccDocService1,
    public _AccDocEntryService1: AccDocEntryService1
  ) {
    super();
  }

  schedule() {

    this.addTask('changeYear', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/newyear}',
        ''
      ];
      return this.invoke(this._AccDocService1, 'changeYear', args, context);
    });


    this.addTask('load', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/id}'
      ];
      return this.invoke(this._CardDataService1, 'load', args, context);
    });


    this.addTask('transit', (context: CommandContext) => {
      const args = [
        'InitAction'
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

    this.addLink('changeYear', 'load', `1==1`);
    this.addLink('load', 'transit', `1==1`);
    this.addLink('transit', 'entryAmount', `1==1`);
    this.addLink('entryAmount', 'assistanceAmount', `1==1`);
  }

}

