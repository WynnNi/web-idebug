import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Injectable()
@NgCommandHandler({
  commandName: 'RefCopyAdminDepartment1'
})
export class RefCopyAdminDepartment1Handler extends CommandHandler {
  constructor(
    public _AccDeptService1: AccDeptService1
  ) {
    super();
  }

  schedule() {

    this.addTask('refCopyAdminDepartment', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/departments}',
        '{UISTATE~/root-component/accOrg}',
        '{UISTATE~/root-component/year}',
        ''
      ];
      return this.invoke(this._AccDeptService1, 'refCopyAdminDepartment', args, context);
    });

  }

}

