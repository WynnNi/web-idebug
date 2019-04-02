import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Injectable()
@NgCommandHandler({
  commandName: 'RefCopyAdminOrg1'
})
export class RefCopyAdminOrg1Handler extends CommandHandler {
  constructor(
    public _AccOrgService1: AccOrgService1
  ) {
    super();
  }

  schedule() {

    this.addTask('refCopyAdminOrg', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/adminOrgs}',
        ''
      ];
      return this.invoke(this._AccOrgService1, 'refCopyAdminOrg', args, context);
    });

  }

}

