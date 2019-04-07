import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { CardDataService as CardDataService1 } from '@farris/command-services';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';
import { AccDocAssistanceService as AccDocAssistanceService1 } from '../../services/accountingdocumentbill_frm_accdocassistant';

@Injectable()
@NgCommandHandler({
  commandName: 'DeleteAccDocAssistant1'
})
export class DeleteAccDocAssistant1Handler extends CommandHandler {
  constructor(
    public _CardDataService1: CardDataService1,
    public _AccDocEntryService1: AccDocEntryService1,
    public _AccDocAssistanceService1: AccDocAssistanceService1
  ) {
    super();
  }

  schedule() {

    this.addTask('deleteAssistance', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/year/value}',
        '{COMMAND~/params/accDocID}',
        '{COMMAND~/params/entryID}',
        '{COMMAND~/params/assID}',
        ''
      ];
      return this.invoke(this._AccDocAssistanceService1, 'deleteAssistance', args, context);
    });


    this.addTask('update', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._CardDataService1, 'update', args, context);
    });


    this.addTask('assistanceAmount', (context: CommandContext) => {
      const args = [
        '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
        ''
      ];
      return this.invoke(this._AccDocEntryService1, 'assistanceAmount', args, context);
    });

    this.addLink('deleteAssistance', 'update', `1==1`);
    this.addLink('update', 'assistanceAmount', `1==1`);
  }

}

