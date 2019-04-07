import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { CardDataService as CardDataService1 } from '@farris/command-services';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';

@Injectable()
@NgCommandHandler({
  commandName: 'DeleteEntryByID1'
})
export class DeleteEntryByID1Handler extends CommandHandler {
  constructor(
    public _CardDataService1: CardDataService1,
    public _AccDocService1: AccDocService1,
    public _AccDocEntryService1: AccDocEntryService1
  ) {
    super();
  }

  schedule() {

    this.addTask('deleteEntryByID', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/year/value}',
        '{COMMAND~/params/accDocID}',
        '{COMMAND~/params/entryID}',
        ''
      ];
      return this.invoke(this._AccDocEntryService1, 'deleteEntryByID', args, context);
    });


    this.addTask('update', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._CardDataService1, 'update', args, context);
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

    this.addLink('deleteEntryByID', 'update', `1==1`);
    this.addLink('update', 'entryAmount', `1==1`);
    this.addLink('entryAmount', 'assistanceAmount', `1==1`);
  }

}

