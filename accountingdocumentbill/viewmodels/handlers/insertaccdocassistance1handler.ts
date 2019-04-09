import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';
import { AccDocAssistanceService as AccDocAssistanceService1 } from '../../services/accountingdocumentbill_frm_accdocassistant';

@Injectable()
@NgCommandHandler({
  commandName: 'InsertAccDocAssistance1'
})
export class InsertAccDocAssistance1Handler extends CommandHandler {
  constructor(
    public _AccDocEntryService1: AccDocEntryService1,
    public _AccDocAssistanceService1: AccDocAssistanceService1
  ) {
    super();
  }

  schedule() {

    this.addTask('insertAccDocAssistance1', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/year/value}',
        '{DATA~/basic-form-component/id}',
        '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
        '{DATA~/glaccdocassistance-component/glAccDocEntrys/glAccDocAssistances/id}',
        ''
      ];
      return this.invoke(this._AccDocAssistanceService1, 'insertAccDocAssistance', args, context);
    });


    this.addTask('assistanceAmount', (context: CommandContext) => {
      const args = [
        '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
        ''
      ];
      return this.invoke(this._AccDocEntryService1, 'assistanceAmount', args, context);
    });

    this.addLink('insertAccDocAssistance1', 'assistanceAmount', `1==1`);
  }

}

