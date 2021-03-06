import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';
import { AccDocCommonService } from '../../services/accountingdocumentbill_frm_commonservice';

@Injectable()
@NgCommandHandler({
  commandName: 'MoveDownAccDocEntry1'
})
export class MoveDownAccDocEntry1Handler extends CommandHandler {
  constructor(
    public _AccDocCommonService1: AccDocCommonService,
    public _AccDocService1: AccDocService1,
    public _AccDocEntryService1: AccDocEntryService1
  ) {
    super();
  }

  schedule() {

    this.addTask('moveDownAccDocEntry', (context: CommandContext) => {
      const args = [
        '{DATA~/basic-form-component/id}',
        '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
        ''
      ];
      return this.invoke(this._AccDocEntryService1, 'moveDownAccDocEntry', args, context);
    });


    this.addTask('entryAmount', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDocCommonService1, 'entryAmount', args, context);
    });


    this.addTask('assistanceAmount', (context: CommandContext) => {
      const args = [
        '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
        ''
      ];
      return this.invoke(this._AccDocEntryService1, 'assistanceAmount', args, context);
    });

    this.addLink('moveDownAccDocEntry', 'entryAmount', `1==1`);
    this.addLink('entryAmount', 'assistanceAmount', `1==1`);
  }

}

