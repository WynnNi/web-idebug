import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Injectable()
@NgCommandHandler({
  commandName: 'ChangeDepartmentPosition1'
})
export class ChangeDepartmentPosition1Handler extends CommandHandler {
  constructor(
    public _AccDeptService1: AccDeptService1
  ) {
    super();
  }

  schedule() {

    this.addTask('changeDepartmentPosition', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/accOrg}',
        '{UISTATE~/root-component/year}',
        '{UISTATE~/root-component/newParent/key}',
        '{COMMAND~/params/accDept}',
        ''
      ];
      return this.invoke(this._AccDeptService1, 'changeDepartmentPosition', args, context);
    });

  }

}

