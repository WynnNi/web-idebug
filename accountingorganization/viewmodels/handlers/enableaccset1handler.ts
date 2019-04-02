import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Injectable()
@NgCommandHandler({
  commandName: 'EnableAccSet1'
})
export class EnableAccSet1Handler extends CommandHandler {
  constructor(
    public _AccOrgService1: AccOrgService1
  ) {
    super();
  }

  schedule() {

    this.addTask('enableAccSet', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/accOrgID}',
        '{COMMAND~/params/accSetID}',
        ''
      ];
      return this.invoke(this._AccOrgService1, 'enableAccSet', args, context);
    });

  }

}

