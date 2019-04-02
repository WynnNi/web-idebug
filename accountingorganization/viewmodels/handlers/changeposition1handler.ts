import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Injectable()
@NgCommandHandler({
  commandName: 'ChangePosition1'
})
export class ChangePosition1Handler extends CommandHandler {
  constructor(
    public _AccOrgService1: AccOrgService1
  ) {
    super();
  }

  schedule() {

    this.addTask('changeOrgPosition', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/accOrg}',
        '{UISTATE~/root-component/newParent}',
        ''
      ];
      return this.invoke(this._AccOrgService1, 'changeOrgPosition', args, context);
    });

  }

}

