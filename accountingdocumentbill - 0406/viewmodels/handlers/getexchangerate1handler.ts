import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDocAssistanceService as AccDocAssistanceService1 } from '../../services/accountingdocumentbill_frm_accdocassistant';

@Injectable()
@NgCommandHandler({
  commandName: 'GetExchangeRate1'
})
export class GetExchangeRate1Handler extends CommandHandler {
  constructor(
    public _AccDocAssistanceService1: AccDocAssistanceService1
  ) {
    super();
  }

  schedule() {

    this.addTask('getExchangeRate', (context: CommandContext) => {
      const args = [
        '{DATA~/glaccdocentry-component/glAccDocEntrys/id}',
        '{DATA~/glaccdocassistance-component/glAccDocEntrys/glAccDocAssistances/id}',
        ''
      ];
      return this.invoke(this._AccDocAssistanceService1, 'getExchangeRate', args, context);
    });

  }

}

