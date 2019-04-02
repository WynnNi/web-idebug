import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Injectable()
@NgCommandHandler({
  commandName: 'CancelAccOrg1'
})
export class CancelAccOrg1Handler extends CommandHandler {
  constructor(
    public _AccOrgService1: AccOrgService1
  ) {
    super();
  }

  schedule() {

    this.addTask('cancelAccOrg', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccOrgService1, 'cancelAccOrg', args, context);
    });

  }

}

