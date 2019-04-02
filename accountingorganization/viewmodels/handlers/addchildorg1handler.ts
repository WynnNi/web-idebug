import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Injectable()
@NgCommandHandler({
  commandName: 'AddChildOrg1'
})
export class AddChildOrg1Handler extends CommandHandler {
  constructor(
    public _AccOrgService1: AccOrgService1
  ) {
    super();
  }

  schedule() {

    this.addTask('addChildOrg', (context: CommandContext) => {
      const args = [
        '{DATA~/tree-grid-component/id}',
        ''
      ];
      return this.invoke(this._AccOrgService1, 'addChildOrg', args, context);
    });

  }

}

