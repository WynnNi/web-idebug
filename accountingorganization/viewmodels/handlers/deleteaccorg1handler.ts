import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Injectable()
@NgCommandHandler({
  commandName: 'DeleteAccOrg1'
})
export class DeleteAccOrg1Handler extends CommandHandler {
  constructor(
    public _AccOrgService1: AccOrgService1
  ) {
    super();
  }

  schedule() {

    this.addTask('deleteAccOrg', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/id}',
        ''
      ];
      return this.invoke(this._AccOrgService1, 'deleteAccOrg', args, context);
    });

  }

}

