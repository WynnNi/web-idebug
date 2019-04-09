import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDocService as AccDocService1 } from '../../services/accountingdocumentbill_frm_accdoc';
import { AccDocEntryService as AccDocEntryService1 } from '../../services/accountingdocumentbill_frm_accdocentry';
import { AccDocAssistanceService as AccDocAssistanceService1 } from '../../services/accountingdocumentbill_frm_accdocassistant';
import { AccDocCommonService as AccDocCommonService1} from '../../services/accountingdocumentbill_frm_commonservice';

@Injectable()
@NgCommandHandler({
  commandName: 'ChangeEntry1'
})
export class ChangeEntry1Handler extends CommandHandler {
  constructor(
    public _AccDocCommonService1: AccDocCommonService1,
    public _AccDocService1: AccDocService1,
    public _AccDocEntryService1: AccDocEntryService1,
    public _AccDocAssistanceService1: AccDocAssistanceService1
  ) {
    super();
  }

  schedule() {

    this.addTask('displayAssistance', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/year/value}',
        '{UISTATE~/root-component/AccSet/key}',
        '{DATA~/glaccdocentry-component/glAccDocEntrys/accTitleID/accTitleID}',
        ''
      ];
      return this.invoke(this._AccDocAssistanceService1, 'displayAssistance', args, context);
    });


    this.addTask('total', (context: CommandContext) => {
      const args = [
        '',
        ''
      ];
      return this.invoke(this._AccDocCommonService1, 'total', args, context);
    });


    this.addTask('assistanceAmount', (context: CommandContext) => {
      const args = [
        '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
        ''
      ];
      return this.invoke(this._AccDocEntryService1, 'assistanceAmount', args, context);
    });

    this.addLink('displayAssistance', 'total', `1==1`);
    this.addLink('total', 'assistanceAmount', `1==1`);
  }

}

